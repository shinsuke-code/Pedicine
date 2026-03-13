# Pedicine PWA — セットアップ手順

## 必要なもの
- Node.js（https://nodejs.org からLTS版をインストール）
- GitHubアカウント（すでにお持ちとのこと）

---

## STEP 1 — ローカルで動作確認

ターミナル（Mac: Terminal、Windows: PowerShell）を開いて順番に実行：

```bash
# このフォルダに移動
cd pedicine-pwa

# パッケージをインストール
npm install

# 開発サーバー起動
npm run dev
```

ブラウザで http://localhost:5173 を開いて動作確認できます。

---

## STEP 2 — GitHubにアップロード

1. https://github.com にログイン
2. 右上「＋」→「New repository」をクリック
3. Repository name: `pedicine` → 「Create repository」
4. 表示されたコマンドをターミナルで実行:

```bash
cd pedicine-pwa
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/あなたのID/pedicine.git
git push -u origin main
```

---

## STEP 3 — Vercelにデプロイ（無料）

1. https://vercel.com にアクセス → 「Sign Up」→「Continue with GitHub」
2. 「Add New Project」→ `pedicine` リポジトリを選択
3. Framework Preset: **Vite** を選択
4. 「Deploy」ボタンを押す
5. 数分後に `https://pedicine-xxxx.vercel.app` のようなURLが発行される

---

## STEP 4 — iPhoneのホーム画面に追加

1. iPhoneのSafariで発行されたURLを開く
2. 画面下の「共有」ボタン（四角から矢印が出るアイコン）をタップ
3. 「ホーム画面に追加」をタップ
4. 「追加」をタップ

→ ホーム画面に「Pedicine」アイコンが出現！
→ タップするとフルスクリーンでアプリとして起動します 🎉

---

## スタッフへの配布方法

Vercelで発行されたURLをLINEやメールで共有するだけ。
各自がSTEP 4の手順でホーム画面に追加できます。

---

## ファイル構成

```
pedicine-pwa/
├── index.html          # iPhoneアプリ設定含む
├── vite.config.js      # PWA設定
├── package.json
├── public/
│   └── icons/
│       ├── icon-192.png   # ホーム画面アイコン
│       └── icon-512.png   # スプラッシュ用
└── src/
    ├── main.jsx
    └── Pedicine.jsx    # メインアプリ（修正済み）
```
