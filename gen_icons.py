#!/usr/bin/env python3
"""Pedicine PWAアイコン生成（192px・512px）"""
import struct, zlib, math

def make_png(size):
    # SVGをラスタライズする代わりにシンプルなアイコンを直接描画
    # 黒背景 + 白文字「P」+ 十字マーク
    img = [[(0,0,0,255)]*size for _ in range(size)]

    def fill_rect(x0, y0, x1, y1, color):
        for y in range(max(0,y0), min(size,y1)):
            for x in range(max(0,x0), min(size,x1)):
                img[y][x] = color

    def fill_circle(cx, cy, r, color):
        for y in range(max(0,cy-r), min(size,cy+r+1)):
            for x in range(max(0,cx-r), min(size,cx+r+1)):
                if (x-cx)**2+(y-cy)**2 <= r*r:
                    img[y][x] = color

    s = size
    # 角丸の背景（黒）はすでに黒で初期化済み
    # 角を丸める（四隅を透明に）
    r = s // 5
    for y in range(s):
        for x in range(s):
            in_tl = x < r and y < r and (x-r)**2+(y-r)**2 > r*r
            in_tr = x >= s-r and y < r and (x-(s-r))**2+(y-r)**2 > r*r
            in_bl = x < r and y >= s-r and (x-r)**2+(y-(s-r))**2 > r*r
            in_br = x >= s-r and y >= s-r and (x-(s-r))**2+(y-(s-r))**2 > r*r
            if in_tl or in_tr or in_bl or in_br:
                img[y][x] = (0,0,0,0)

    W = (255,255,255,255)

    # 「P」の文字（太め）
    px = s//5
    py = s//6
    pw = s*3//10
    ph = s*2//3
    thick = max(2, s//20)

    # 縦棒
    fill_rect(px, py, px+thick*2, py+ph, W)
    # 横棒（上）
    fill_rect(px, py, px+pw, py+thick*2, W)
    # 横棒（中）
    fill_rect(px, py+ph//2-thick, px+pw, py+ph//2+thick, W)
    # 右の丸み（上半分の右側）
    cx = px+pw
    cy_top = py+thick
    cy_bot = py+ph//2-thick
    mid_h = cy_bot - cy_top
    r2 = mid_h//2
    fill_circle(cx, cy_top+r2, r2, W)
    fill_rect(cx-thick, cy_top, cx+thick, cy_top+mid_h, (0,0,0,255))
    fill_circle(cx, cy_top+r2, r2-thick*2, (0,0,0,255))

    # 十字（右下エリア）
    cross_cx = s*3//4
    cross_cy = s*3//4
    arm = s//8
    bar = max(2, s//28)
    fill_rect(cross_cx-arm, cross_cy-bar, cross_cx+arm, cross_cy+bar, W)
    fill_rect(cross_cx-bar, cross_cy-arm, cross_cx+bar, cross_cy+arm, W)

    # PNG エンコード
    def png_chunk(name, data):
        c = zlib.crc32(name+data) & 0xffffffff
        return struct.pack('>I',len(data)) + name + data + struct.pack('>I',c)

    raw = b''
    for row in img:
        raw += b'\x00'
        for r,g,b,a in row:
            raw += bytes([r,g,b,a])
    compressed = zlib.compress(raw, 9)

    ihdr = struct.pack('>IIBBBBB', s, s, 8, 6, 0, 0, 0)
    png  = b'\x89PNG\r\n\x1a\n'
    png += png_chunk(b'IHDR', ihdr)
    png += png_chunk(b'IDAT', compressed)
    png += png_chunk(b'IEND', b'')
    return png

import os
os.makedirs('public/icons', exist_ok=True)
for sz in [192, 512]:
    with open(f'public/icons/icon-{sz}.png','wb') as f:
        f.write(make_png(sz))
    print(f'icon-{sz}.png 生成完了')
