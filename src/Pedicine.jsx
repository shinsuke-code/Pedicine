import { useState, useRef, useEffect } from "react";

// ── マスタ ────────────────────────────────────────────────────────────────────
const POC_HOSPITAL  = { id:1, name:"代官山動物病院",      address:"東京都渋谷区代官山町" };
const POC_PHARMACY  = { id:1, name:"アイランド薬局小杉店", address:"神奈川県川崎市中原区小杉町" };

const MEDICINES = [
  { id:1,  maker:"ゼノアック",           name:"アプガード錠0.75㎎",        form:"錠",  category:"利尿薬",                price:49.1   ,type:"vet"   },
  { id:2,  maker:"ゾエティス",           name:"アポキル 3.6mg",            form:"錠",  category:"代謝性用薬",            price:153.9  ,type:"vet"   },
  { id:3,  maker:"ゾエティス",           name:"アポキル 3.6mg チュアブル錠",form:"錠",  category:"代謝性用薬",            price:146.5  ,type:"vet"   },
  { id:4,  maker:"ゾエティス",           name:"アポキル 5.4mg",            form:"錠",  category:"代謝性用薬",            price:165.4  ,type:"vet"   },
  { id:5,  maker:"ゾエティス",           name:"アポキル 5.4mg チュアブル錠",form:"錠",  category:"代謝性用薬",            price:157.5  ,type:"vet"   },
  { id:6,  maker:"ゾエティス",           name:"アポキル 16mg",             form:"錠",  category:"代謝性用薬",            price:340.2  ,type:"vet"   },
  { id:7,  maker:"ゾエティス",           name:"アポキル 16mg チュアブル錠", form:"錠",  category:"代謝性用薬",            price:324    ,type:"vet"   },
  { id:8,  maker:"DSファーマ",           name:"コンセーブ 100mg",          form:"錠",  category:"神経系",                price:33.3   ,type:"vet"   },
  { id:9,  maker:"DSファーマ",           name:"コンセーブ 25mg",           form:"錠",  category:"神経系",                price:17     ,type:"vet"   },
  { id:10, maker:"ビルバック",           name:"シクラバンス 15ml",         form:"本",  category:"免疫抑制薬",            price:5500   ,type:"vet"   },
  { id:11, maker:"エランコ",             name:"ゼンレリア 4.8mg",          form:"錠",  category:"抗掻痒薬",              price:140    ,type:"vet"   },
  { id:12, maker:"エランコ",             name:"ゼンレリア 6.4mg",          form:"錠",  category:"抗掻痒薬",              price:150    ,type:"vet"   },
  { id:13, maker:"エランコ",             name:"ゼンレリア 8.5mg",          form:"錠",  category:"抗掻痒薬",              price:155    ,type:"vet"   },
  { id:14, maker:"DSファーマ",           name:"チロブロック 1.25mg",       form:"錠",  category:"ホルモン関連薬",        price:25     ,type:"vet"   },
  { id:15, maker:"DSファーマ",           name:"チロブロック 2.5mg",        form:"錠",  category:"ホルモン関連薬",        price:28     ,type:"vet"   },
  { id:16, maker:"あすかアニマルヘルス", name:"トリロスタン 10mg",         form:"錠",  category:"ホルモン関連薬",        price:99     ,type:"vet"   },
  { id:17, maker:"あすかアニマルヘルス", name:"トリロスタン 2.5mg",        form:"錠",  category:"ホルモン関連薬",        price:62.5   ,type:"vet"   },
  { id:18, maker:"あすかアニマルヘルス", name:"トリロスタン 5mg",          form:"錠",  category:"ホルモン関連薬",        price:71.5   ,type:"vet"   },
  { id:19, maker:"ゾエティス",           name:"パラディア 10",             form:"錠",  category:"抗がん剤",              price:533    ,type:"vet"   },
  { id:20, maker:"ゾエティス",           name:"パラディア 15",             form:"錠",  category:"抗がん剤",              price:792    ,type:"vet"   },
  { id:21, maker:"リケンベッツ",         name:"ビオイムバスター",          form:"錠",  category:"整腸剤",                price:20     ,type:"vet"   },
  { id:22, maker:"共立",                 name:"ピモベハート 1.25mg",       form:"錠",  category:"循環器薬",              price:35     ,type:"vet"   },
  { id:23, maker:"共立",                 name:"ピモベハート 2.5mg",        form:"錠",  category:"循環器薬",              price:60     ,type:"vet"   },
  { id:24, maker:"共立",                 name:"ピモベハート 5mg",          form:"錠",  category:"循環器薬",              price:120    ,type:"vet"   },
  { id:25, maker:"共立",                 name:"フォーサイロン 200μg",      form:"錠",  category:"ホルモン関連薬",        price:35     ,type:"vet"   },
  { id:26, maker:"共立",                 name:"フォーサイロン 400μg",      form:"錠",  category:"ホルモン関連薬",        price:45     ,type:"vet"   },
  { id:27, maker:"共立",                 name:"ラプロス",                  form:"錠",  category:"循環器薬",              price:66     ,type:"vet"   },
  { id:28, maker:"武田",                 name:"アテノロール 25mg",         form:"錠",  category:"循環器薬",              price:6.1    ,type:"human" },
  { id:29, maker:"ニプロ",               name:"アムロジピン 2.5mg",        form:"錠",  category:"循環器薬",              price:10.4   ,type:"human" },
  { id:30, maker:"サノフィ",             name:"アラバ 20mg",               form:"錠",  category:"免疫抑制薬",            price:144.8  ,type:"human" },
  { id:31, maker:"ユーシービージャパン", name:"イーケプラ 250mg",          form:"錠",  category:"抗てんかん薬",          price:69.3   ,type:"human" },
  { id:32, maker:"田辺三菱",             name:"ウルソ 100mg",              form:"錠",  category:"消化器薬",              price:10.4   ,type:"human" },
  { id:33, maker:"田辺三菱",             name:"ウルソ 50mg",               form:"錠",  category:"消化器薬",              price:10.4   ,type:"human" },
  { id:34, maker:"BMD",                  name:"シクロスポリン 10mg",       form:"錠",  category:"免疫抑制薬",            price:34.6   ,type:"human" },
  { id:35, maker:"BMD",                  name:"シクロスポリン 25mg",       form:"錠",  category:"免疫抑制薬",            price:48.9   ,type:"human" },
  { id:36, maker:"BMD",                  name:"シクロスポリン 50mg",       form:"錠",  category:"免疫抑制薬",            price:109.8  ,type:"human" },
  { id:37, maker:"大原薬品",             name:"スパカール 40mg",           form:"錠",  category:"膵・胆道疾患治療薬",    price:15.3   ,type:"human" },
  { id:38, maker:"日医工",               name:"セチリジン塩酸塩錠10mg",    form:"錠",  category:"アレルギー性疾患治療薬",price:10.4   ,type:"human" },
  { id:39, maker:"中外",                 name:"セルセプト 250mg",          form:"CP",  category:"免疫抑制薬",            price:91.1   ,type:"human" },
  { id:40, maker:"ゼリア新薬工業",       name:"ゼンタコート 3mg",          form:"CP",  category:"免疫抑制薬",            price:172.4  ,type:"human" },
  { id:41, maker:"東和",                 name:"炭酸ランタン顆粒250mg",     form:"顆粒",category:"高リン血症治療薬",      price:40.1   ,type:"human" },
  { id:42, maker:"武田",                 name:"チラーヂン 100μg",          form:"錠",  category:"ホルモン関連薬",        price:11.6   ,type:"human" },
  { id:43, maker:"武田",                 name:"チラーヂン 50μg",           form:"錠",  category:"ホルモン関連薬",        price:10.4   ,type:"human" },
  { id:44, maker:"YD",                   name:"テルミサルタン 20mg",       form:"錠",  category:"循環器薬",              price:10.4   ,type:"human" },
  { id:45, maker:"沢井",                 name:"ファモチジンD錠10mg",       form:"錠",  category:"消化器薬",              price:10.4   ,type:"human" },
  { id:46, maker:"第一三共",             name:"フェノバール 30mg",         form:"錠",  category:"神経系",                price:10.4   ,type:"human" },
  { id:47, maker:"シオノギ",             name:"フラジール 250mg",          form:"錠",  category:"抗原虫剤",              price:36.2   ,type:"human" },
  { id:48, maker:"武田テバ",             name:"プラバスタチン",            form:"錠",  category:"消化器薬",              price:10.4   ,type:"human" },
  { id:49, maker:"旭化成",               name:"プレドニゾロン 1mg",        form:"錠",  category:"ステロイド薬",          price:8.6    ,type:"human" },
  { id:50, maker:"シオノギ",             name:"プレドニン 5mg",            form:"錠",  category:"ステロイド薬",          price:10.1   ,type:"human" },
  { id:51, maker:"サンド",               name:"フロリネフ 0.1mg",          form:"錠",  category:"ホルモン関連薬",        price:207.5  ,type:"human" },
  { id:52, maker:"日医工",               name:"ベザフィブラートSR 100mg",  form:"錠",  category:"消化器薬",              price:10.4   ,type:"human" },
  { id:53, maker:"日医工",               name:"モサプリド 2.5mg",          form:"錠",  category:"消化器薬",              price:10.1   ,type:"human" },
  { id:54, maker:"日医工",               name:"モサプリド 5mg",            form:"錠",  category:"消化器薬",              price:10.4   ,type:"human" },
  { id:55, maker:"鳥居",                 name:"リオナ 250mg",              form:"錠",  category:"高リン血症治療薬",      price:70.4   ,type:"human" },
  { id:56, maker:"沢井",                 name:"レベチラセタム 250mg",      form:"錠",  category:"抗てんかん薬",          price:25.4   ,type:"human" },
  { id:57, maker:"ヤマゼン",             name:"臭化カリウム 10g",          form:"g",   category:"神経系",                price:82.6   ,type:"human" },
];

const CATEGORIES = [...new Set(MEDICINES.map(m => m.category))];
const CAT_COLORS = {
  "循環器薬":"#e8f5e9","免疫抑制薬":"#fce4ec","ホルモン関連薬":"#fff8e1",
  "代謝性用薬":"#dbeafe","神経系":"#f3e5f5","消化器薬":"#e0f2f1",
  "ステロイド薬":"#fff3e0","抗がん剤":"#fdecea","抗てんかん薬":"#e8eaf6",
  "抗掻痒薬":"#f9fbe7","利尿薬":"#e0f7fa","整腸剤":"#f1f8e9",
  "高リン血症治療薬":"#fce4ec","膵・胆道疾患治療薬":"#ede7f6",
  "アレルギー性疾患治療薬":"#e3f2fd","抗原虫剤":"#f5f5f5",
};
const STATUS_STYLE = {
  "待機中": { bg:"#fffbeb", c:"#92400e", bd:"#fcd34d" },
  "送信済み":{ bg:"#f0fdf4", c:"#166534", bd:"#86efac" },
};

// ── ピクトグラムアイコン（白背景・黒シルエット）────────────────────────────────
const PictoWrap = ({ size, children }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="31" fill="#f4f4f4" stroke="#e0e0e0" strokeWidth="1"/>
    <g fill="#1a1a1a">{children}</g>
  </svg>
);
const SmallDogIcon = ({ size=52 }) => (
  <PictoWrap size={size}>
    <ellipse cx="21" cy="22" rx="6" ry="9" transform="rotate(-10 21 22)"/>
    <ellipse cx="43" cy="22" rx="6" ry="9" transform="rotate(10 43 22)"/>
    <circle cx="32" cy="26" r="13"/>
    <circle cx="27" cy="24" r="2.5" fill="#f4f4f4"/>
    <circle cx="37" cy="24" r="2.5" fill="#f4f4f4"/>
    <ellipse cx="32" cy="30" rx="2.5" ry="1.8" fill="#f4f4f4"/>
    <rect x="23" y="37" width="18" height="14" rx="7"/>
    <rect x="23" y="46" width="6" height="10" rx="3"/>
    <rect x="35" y="46" width="6" height="10" rx="3"/>
    <path d="M41 40 Q52 34 50 43 Q48 50 41 47" fill="#1a1a1a"/>
  </PictoWrap>
);
const MediumDogIcon = ({ size=52 }) => (
  <PictoWrap size={size}>
    <polygon points="21,24 16,8 28,20"/>
    <polygon points="43,24 48,8 36,20"/>
    <circle cx="32" cy="27" r="13"/>
    <circle cx="27" cy="25" r="2.5" fill="#f4f4f4"/>
    <circle cx="37" cy="25" r="2.5" fill="#f4f4f4"/>
    <ellipse cx="32" cy="31" rx="2.8" ry="2" fill="#f4f4f4"/>
    <rect x="22" y="38" width="20" height="13" rx="7"/>
    <rect x="22" y="46" width="7" height="10" rx="3.5"/>
    <rect x="35" y="46" width="7" height="10" rx="3.5"/>
    <path d="M42 39 Q55 30 53 42 Q51 52 42 48" fill="#1a1a1a"/>
  </PictoWrap>
);
const LargeDogIcon = ({ size=52 }) => (
  <PictoWrap size={size}>
    <ellipse cx="18" cy="26" rx="7" ry="13" transform="rotate(12 18 26)"/>
    <ellipse cx="46" cy="26" rx="7" ry="13" transform="rotate(-12 46 26)"/>
    <circle cx="32" cy="25" r="14"/>
    <circle cx="26" cy="23" r="3" fill="#f4f4f4"/>
    <circle cx="38" cy="23" r="3" fill="#f4f4f4"/>
    <ellipse cx="32" cy="30" rx="3.5" ry="2.5" fill="#f4f4f4"/>
    <rect x="20" y="38" width="24" height="14" rx="8"/>
    <rect x="20" y="46" width="8" height="11" rx="4"/>
    <rect x="36" y="46" width="8" height="11" rx="4"/>
    <path d="M44 40 Q58 28 55 43 Q52 54 44 49" fill="#1a1a1a"/>
  </PictoWrap>
);
const CatIcon = ({ size=52 }) => (
  <PictoWrap size={size}>
    <polygon points="20,26 14,8 30,22"/>
    <polygon points="44,26 50,8 34,22"/>
    <circle cx="32" cy="28" r="13"/>
    <ellipse cx="26" cy="26" rx="3" ry="2.5" fill="#f4f4f4"/>
    <ellipse cx="38" cy="26" rx="3" ry="2.5" fill="#f4f4f4"/>
    <polygon points="32,31 29.5,34 34.5,34" fill="#f4f4f4"/>
    <rect x="24" y="39" width="16" height="13" rx="6"/>
    <rect x="24" y="47" width="6" height="9" rx="3"/>
    <rect x="34" y="47" width="6" height="9" rx="3"/>
    <path d="M40 46 Q56 38 54 50 Q53 58 42 54" fill="#1a1a1a"/>
    <rect x="14" y="33" width="9" height="1.2" rx="0.6"/>
    <rect x="14" y="36" width="9" height="1.2" rx="0.6"/>
    <rect x="41" y="33" width="9" height="1.2" rx="0.6"/>
    <rect x="41" y="36" width="9" height="1.2" rx="0.6"/>
  </PictoWrap>
);

const SMALL_KW = ["チワワ","トイプードル","ポメラニアン","マルチーズ","ヨークシャー","シーズー","パピヨン","ミニチュアダックス","ダックスフンド","ペキニーズ","キャバリア","ビション","ジャックラッセル","スピッツ"];
const LARGE_KW = ["ゴールデン","ラブラドール","シェパード","ハスキー","マラミュート","バーニーズ","グレートデン","セントバーナード","ドーベルマン","ロットワイラー","コリー","サモエド","秋田","土佐","ダルメシアン"];
function getBreedType(species, breed) {
  if (species === "猫") return "cat";
  if (!breed) return "medium";
  if (SMALL_KW.some(k => breed.includes(k))) return "small";
  if (LARGE_KW.some(k => breed.includes(k))) return "large";
  return "medium";
}
function PetIcon({ species, breed, size=52 }) {
  const t = getBreedType(species, breed);
  if (t === "cat")   return <CatIcon size={size}/>;
  if (t === "small") return <SmallDogIcon size={size}/>;
  if (t === "large") return <LargeDogIcon size={size}/>;
  return <MediumDogIcon size={size}/>;
}

// ── 共通スタイル ──────────────────────────────────────────────────────────────
const C = {
  bg:"#ffffff", card:"#ffffff", border:"#e5e5e5", border2:"#d0d0d0",
  text:"#111111", sub:"#666666", sub2:"#999999",
  accent:"#111111", accentBg:"#f5f5f5",
  green:"#1a6b2a", greenBg:"#f0fdf4", greenBd:"#86efac",
  blue:"#1e40af",  blueBg:"#eff6ff",
  red:"#dc2626",   redBg:"#fef2f2",
  shadow:"rgba(0,0,0,0.06)",
};
const baseInp = {
  width:"100%", border:`1px solid ${C.border2}`, borderRadius:8,
  padding:"10px 12px", fontSize:14, outline:"none",
  boxSizing:"border-box", background:"#fff", color:C.text,
  fontFamily:"'Noto Sans JP',sans-serif",
};

// ── rxItem初期値 ──────────────────────────────────────────────────────────────
const emptyItem = () => ({ med:null, perDose:"", freqPerDay:"", freqDays:"", qty:"", note:"" });

// 錠数自動計算
function calcQty(perDose, freqPerDay, freqDays) {
  const a = parseInt(perDose)||0, b = parseInt(freqPerDay)||0, c = parseInt(freqDays)||0;
  if (a && b && c) return String(a * b * c);
  return "";
}

// ── 薬選択モーダル ─────────────────────────────────────────────────────────────
function MedSearchModal({ onSelect, onClose }) {
  const [q, setQ] = useState(""); const [cat, setCat] = useState("");
  const ref = useRef(null);
  useEffect(()=>{ ref.current?.focus(); },[]);
  const results = MEDICINES.filter(m =>
    (!cat || m.category===cat) &&
    (!q   || m.name.includes(q) || m.maker.includes(q) || m.category.includes(q))
  );
  return (
    <div style={{ position:"fixed", inset:0, zIndex:300, display:"flex", flexDirection:"column", background:"#fff", maxWidth:430, margin:"0 auto" }}>
      <div style={{ background:"#111", color:"#fff", padding:"13px 16px", display:"flex", alignItems:"center", gap:10 }}>
        <button onClick={onClose} style={{ background:"#333", border:"none", borderRadius:7, color:"#ccc", padding:"6px 12px", fontSize:13, cursor:"pointer" }}>← 戻る</button>
        <span style={{ fontWeight:800, fontSize:15 }}>薬を選択</span>
        <span style={{ marginLeft:"auto", fontSize:11, color:"#aaa" }}>{results.length}件</span>
      </div>
      <div style={{ padding:"10px 14px 6px", background:"#f8f8f8", borderBottom:`1px solid ${C.border}` }}>
        <input ref={ref} value={q} onChange={e=>setQ(e.target.value)} placeholder="薬品名・メーカーで検索…"
          style={{ ...baseInp, border:`1px solid ${C.border2}` }}/>
      </div>
      <div style={{ display:"flex", gap:6, padding:"8px 14px", overflowX:"auto", background:"#f8f8f8", borderBottom:`1px solid ${C.border}` }}>
        {["", ...CATEGORIES].map(c=>(
          <button key={c} onClick={()=>setCat(c)}
            style={{ flexShrink:0, padding:"5px 11px", borderRadius:20, border:`1px solid ${cat===c?"#111":C.border2}`, background:cat===c?"#111":"#fff", color:cat===c?"#fff":C.sub, fontSize:11, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap" }}>
            {c||"すべて"}
          </button>
        ))}
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"8px 14px 24px" }}>
        {["vet","human"].map(type=>{
          const items=results.filter(m=>m.type===type);
          if(!items.length) return null;
          return (
            <div key={type}>
              <div style={{ fontSize:10, fontWeight:700, color:C.sub2, letterSpacing:1, padding:"12px 0 6px", textTransform:"uppercase" }}>
                {type==="vet"?"動物用医薬品":"ヒト用医薬品"} — {items.length}品目
              </div>
              {items.map(m=>(
                <button key={m.id} onClick={()=>onSelect(m)}
                  style={{ width:"100%", background:"#fff", border:`1px solid ${C.border}`, borderRadius:10, padding:"11px 13px", marginBottom:7, display:"flex", alignItems:"center", gap:10, cursor:"pointer", textAlign:"left", fontFamily:"'Noto Sans JP',sans-serif" }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, fontSize:14, color:C.text }}>{m.name}</div>
                    <div style={{ fontSize:11, color:C.sub, marginTop:2 }}>{m.maker} · {m.form}</div>
                    <span style={{ background:CAT_COLORS[m.category]||"#f5f5f5", color:"#444", borderRadius:5, padding:"2px 8px", fontSize:10, fontWeight:600, marginTop:5, display:"inline-block" }}>{m.category}</span>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontWeight:800, fontSize:15, color:C.text }}>¥{m.price.toLocaleString()}</div>
                    <div style={{ fontSize:10, color:C.sub }}>/{m.form}</div>
                  </div>
                </button>
              ))}
            </div>
          );
        })}
        {!results.length && <div style={{ textAlign:"center", color:C.sub2, padding:"60px 0", fontSize:13 }}>該当する薬が見つかりません</div>}
      </div>
    </div>
  );
}

// ── ペット登録モーダル ─────────────────────────────────────────────────────────
function PetRegisterModal({ onSave, onClose }) {
  const [name,setName]=useState(""); const [species,setSpecies]=useState("犬");
  const [breed,setBreed]=useState(""); const [ageNum,setAgeNum]=useState("");
  const [weightNum,setWeightNum]=useState(""); const [owner,setOwner]=useState("");
  const valid = name.trim() && owner.trim();
  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.4)", display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
      <div style={{ background:"#fff", borderRadius:"20px 20px 0 0", width:"100%", maxWidth:430, padding:"20px 20px 36px", maxHeight:"90vh", overflowY:"auto", fontFamily:"'Noto Sans JP',sans-serif" }}>
        <div style={{ width:36, height:4, background:"#ddd", borderRadius:2, margin:"0 auto 18px" }}/>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div style={{ fontSize:16, fontWeight:800 }}>ペットを登録</div>
          <button onClick={onClose} style={{ background:"#f5f5f5", border:"none", borderRadius:8, padding:"6px 14px", fontSize:13, cursor:"pointer" }}>閉じる</button>
        </div>
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.sub, marginBottom:8, letterSpacing:0.5 }}>種類</div>
          <div style={{ display:"flex", gap:10 }}>
            {["犬","猫"].map(s=>(
              <button key={s} onClick={()=>setSpecies(s)}
                style={{ flex:1, padding:"14px 0", borderRadius:12, border:`2px solid ${species===s?"#111":C.border}`, background:species===s?"#f5f5f5":"#fff", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
                <PetIcon species={s} breed={s==="犬"?breed:""} size={48}/>
                <span style={{ fontSize:13, fontWeight:700, color:species===s?"#111":C.sub }}>{s}</span>
              </button>
            ))}
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
          {[["ペット名","text",name,setName,"例：ポチ",true],["品種","text",breed,setBreed,"例：柴犬",false]].map(([lbl,,val,set,ph,req])=>(
            <div key={lbl}>
              <div style={{ fontSize:11, fontWeight:700, color:C.sub, marginBottom:5 }}>{lbl}{req&&<span style={{color:"#e00"}}> *</span>}</div>
              <input style={baseInp} placeholder={ph} value={val} onChange={e=>set(e.target.value)}/>
            </div>
          ))}
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:C.sub, marginBottom:5 }}>年齢</div>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <input style={{ ...baseInp, flex:1, width:"auto" }} type="number" min="0" placeholder="3" value={ageNum} onChange={e=>setAgeNum(e.target.value)}/>
              <span style={{ fontSize:13, color:C.sub, flexShrink:0 }}>歳</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:C.sub, marginBottom:5 }}>体重</div>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <input style={{ ...baseInp, flex:1, width:"auto" }} type="number" min="0" step="0.1" placeholder="8.5" value={weightNum} onChange={e=>setWeightNum(e.target.value)}/>
              <span style={{ fontSize:13, color:C.sub, flexShrink:0 }}>kg</span>
            </div>
          </div>
        </div>
        <div style={{ marginBottom:22 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.sub, marginBottom:5 }}>飼い主名<span style={{color:"#e00"}}> *</span></div>
          <input style={baseInp} placeholder="例：田中 太郎" value={owner} onChange={e=>setOwner(e.target.value)}/>
        </div>
        <button onClick={()=>valid&&onSave({ id:Date.now(), name:name.trim(), species, breed, age:ageNum?`${ageNum}歳`:"", weight:weightNum?`${weightNum}kg`:"", owner:owner.trim() })} disabled={!valid}
          style={{ width:"100%", background:valid?"#111":"#ddd", color:valid?"#fff":"#aaa", border:"none", borderRadius:12, padding:"14px 0", fontSize:14, fontWeight:700, cursor:valid?"pointer":"default" }}>
          登録する
        </button>
      </div>
    </div>
  );
}

// ── 送信確認モーダル ──────────────────────────────────────────────────────────
function ConfirmModal({ pet, rxItems, doctorNote, onConfirm, onSave, onBack }) {
  const valid = rxItems.filter(r=>r.med);
  const subtotal = valid.reduce((s,r)=>s+r.med.price*(parseInt(r.qty)||0),0);
  const tax = Math.round(subtotal*0.1);
  const total = subtotal+tax;
  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.45)", display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
      <div style={{ background:"#fff", borderRadius:"20px 20px 0 0", width:"100%", maxWidth:430, maxHeight:"92vh", display:"flex", flexDirection:"column", fontFamily:"'Noto Sans JP',sans-serif" }}>
        <div style={{ width:36, height:4, background:"#ddd", borderRadius:2, margin:"14px auto 0" }}/>
        <div style={{ padding:"14px 20px 10px", borderBottom:`1px solid ${C.border}` }}>
          <div style={{ fontSize:16, fontWeight:800 }}>内容の確認</div>
          <div style={{ fontSize:12, color:C.sub, marginTop:2 }}>「保存」は待機中、「送信」は送信済みで記録されます</div>
        </div>
        <div style={{ overflowY:"auto", flex:1, padding:"14px 20px" }}>
          <div style={{ background:C.greenBg, borderRadius:10, padding:"10px 14px", marginBottom:14, display:"flex", alignItems:"center", gap:10, border:`1px solid ${C.greenBd}` }}>
            <span style={{ fontSize:18 }}>→</span>
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:C.green }}>送信先</div>
              <div style={{ fontSize:13, fontWeight:800, color:C.green }}>{POC_PHARMACY.name}</div>
            </div>
          </div>
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.sub, letterSpacing:0.8, marginBottom:8 }}>患者情報</div>
            <div style={{ background:"#fafafa", border:`1px solid ${C.border}`, borderRadius:12, padding:"12px 14px", display:"flex", alignItems:"center", gap:12 }}>
              <PetIcon species={pet.species} breed={pet.breed} size={48}/>
              <div>
                <div style={{ fontWeight:800, fontSize:15 }}>{pet.name}</div>
                <div style={{ fontSize:12, color:C.sub }}>{[pet.breed,pet.age,pet.weight].filter(Boolean).join(" · ")}</div>
                <div style={{ fontSize:12, color:C.sub }}>飼い主：{pet.owner}</div>
              </div>
            </div>
          </div>
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.sub, letterSpacing:0.8, marginBottom:8 }}>処方内訳</div>
            <div style={{ background:"#fafafa", border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
              {valid.map((r,i)=>(
                <div key={i} style={{ padding:"11px 14px", borderBottom:i<valid.length-1?`1px solid ${C.border}`:"none" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <div style={{ flex:1, marginRight:8 }}>
                      <div style={{ fontWeight:700, fontSize:13 }}>{r.med.name}</div>
                      <div style={{ fontSize:11, color:C.sub, marginTop:2 }}>
                        {r.med.maker}
                        {r.perDose && ` · 1回${r.perDose}${r.med.form}`}
                        {r.freqPerDay && ` · 1日${r.freqPerDay}回`}
                        {r.freqDays && ` · ${r.freqDays}日分`}
                        {r.note && <span style={{ color:C.green }}> · {r.note}</span>}
                      </div>
                    </div>
                    <div style={{ textAlign:"right", flexShrink:0 }}>
                      <div style={{ fontSize:12, color:C.sub }}>¥{r.med.price.toLocaleString()} × {r.qty}{r.med.form}</div>
                      <div style={{ fontSize:14, fontWeight:800 }}>¥{(r.med.price*(parseInt(r.qty)||0)).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ background:"#f5f5f5", borderTop:`2px solid ${C.border}` }}>
                <div style={{ padding:"8px 14px 4px", display:"flex", justifyContent:"space-between", fontSize:13 }}>
                  <span style={{ color:C.sub }}>薬価小計</span><span style={{ fontWeight:600 }}>¥{subtotal.toLocaleString()}</span>
                </div>
                <div style={{ padding:"4px 14px 8px", display:"flex", justifyContent:"space-between", fontSize:13 }}>
                  <span style={{ color:C.sub }}>消費税（10%）</span><span style={{ fontWeight:600 }}>¥{tax.toLocaleString()}</span>
                </div>
                <div style={{ padding:"10px 14px 12px", borderTop:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:14, fontWeight:800 }}>合計金額</span>
                  <span style={{ fontSize:22, fontWeight:900 }}>¥{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          {doctorNote && (
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.sub, letterSpacing:0.8, marginBottom:8 }}>備考</div>
              <div style={{ background:"#fafafa", border:`1px solid ${C.border}`, borderRadius:10, padding:"11px 14px", fontSize:13, color:C.text, lineHeight:1.6 }}>{doctorNote}</div>
            </div>
          )}
        </div>
        {/* 3ボタン */}
        <div style={{ padding:"12px 20px 32px", borderTop:`1px solid ${C.border}` }}>
          <div style={{ display:"flex", gap:8, marginBottom:8 }}>
            <button onClick={onBack}
              style={{ flex:1, background:"#f5f5f5", color:C.text, border:`1px solid ${C.border}`, borderRadius:12, padding:"13px 0", fontSize:13, fontWeight:600, cursor:"pointer" }}>
              ✏️ 修正する
            </button>
            <button onClick={onSave}
              style={{ flex:1, background:"#fffbeb", color:"#92400e", border:"1px solid #fcd34d", borderRadius:12, padding:"13px 0", fontSize:13, fontWeight:700, cursor:"pointer" }}>
              📋 保存する
            </button>
          </div>
          <button onClick={onConfirm}
            style={{ width:"100%", background:"#111", color:"#fff", border:"none", borderRadius:12, padding:"14px 0", fontSize:14, fontWeight:800, cursor:"pointer", letterSpacing:0.5 }}>
            ✉️ 送信する →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── 待機中 内容確認モーダル ────────────────────────────────────────────────────
function PendingDetailModal({ rx, pet, onEdit, onSendNow, onClose }) {
  const subtotal = rx.items.reduce((s,it)=>{
    const med = MEDICINES.find(m=>m.name===it.name);
    const qtyNum = parseInt(it.qty)||0;
    return s + (med ? med.price * qtyNum : 0);
  },0);
  const tax   = Math.round(subtotal*0.1);
  const total = subtotal+tax;

  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.45)", display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
      <div style={{ background:"#fff", borderRadius:"20px 20px 0 0", width:"100%", maxWidth:430, maxHeight:"88vh", display:"flex", flexDirection:"column", fontFamily:"'Noto Sans JP',sans-serif" }}>
        <div style={{ width:36, height:4, background:"#ddd", borderRadius:2, margin:"14px auto 0" }}/>
        {/* ヘッダー */}
        <div style={{ padding:"12px 18px 10px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize:15, fontWeight:800 }}>待機中の処方箋</div>
            <div style={{ fontSize:11, color:C.sub, marginTop:2 }}>{rx.id} · {rx.date}</div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ background:"#fffbeb", color:"#92400e", border:"1px solid #fcd34d", borderRadius:20, padding:"3px 10px", fontSize:11, fontWeight:700 }}>待機中</span>
            <button onClick={onClose} style={{ background:"#f5f5f5", border:"none", borderRadius:8, padding:"6px 12px", fontSize:12, cursor:"pointer" }}>✕</button>
          </div>
        </div>

        <div style={{ overflowY:"auto", flex:1, padding:"14px 18px" }}>
          {/* 患者情報 */}
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.sub, letterSpacing:0.8, marginBottom:8 }}>患者情報</div>
            <div style={{ background:"#fafafa", border:`1px solid ${C.border}`, borderRadius:12, padding:"12px 14px", display:"flex", alignItems:"center", gap:12 }}>
              {pet ? <PetIcon species={pet.species} breed={pet.breed} size={46}/> : <div style={{ width:46, height:46, borderRadius:"50%", background:"#f5f5f5" }}/>}
              <div>
                <div style={{ fontWeight:800, fontSize:15 }}>{rx.pet}</div>
                {pet && <div style={{ fontSize:12, color:C.sub }}>{[pet.breed,pet.age,pet.weight].filter(Boolean).join(" · ")}</div>}
                <div style={{ fontSize:12, color:C.sub }}>飼い主：{rx.owner}</div>
              </div>
            </div>
          </div>

          {/* 処方内訳 */}
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.sub, letterSpacing:0.8, marginBottom:8 }}>処方内訳</div>
            <div style={{ background:"#fafafa", border:`1px solid ${C.border}`, borderRadius:12, overflow:"hidden" }}>
              {rx.items.map((it,i)=>{
                const med = MEDICINES.find(m=>m.name===it.name);
                const qtyNum = parseInt(it.qty)||0;
                const lineTotal = med ? med.price * qtyNum : 0;
                return (
                  <div key={i} style={{ padding:"11px 14px", borderBottom:i<rx.items.length-1?`1px solid ${C.border}`:"none" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                      <div style={{ flex:1, marginRight:8 }}>
                        <div style={{ fontWeight:700, fontSize:13 }}>{it.name}</div>
                        <div style={{ fontSize:11, color:C.sub, marginTop:2 }}>
                          {it.perDose && `1回${it.perDose} · `}
                          {it.freqPerDay && `1日${it.freqPerDay}回 · `}
                          {it.freqDays && `${it.freqDays}日分`}
                        </div>
                      </div>
                      <div style={{ textAlign:"right", flexShrink:0 }}>
                        {med && <div style={{ fontSize:12, color:C.sub }}>¥{med.price.toLocaleString()} × {qtyNum}</div>}
                        <div style={{ fontSize:14, fontWeight:800 }}>{it.qty}</div>
                        {lineTotal>0 && <div style={{ fontSize:12, color:C.sub }}>¥{lineTotal.toLocaleString()}</div>}
                      </div>
                    </div>
                  </div>
                );
              })}
              {subtotal>0 && (
                <div style={{ background:"#f5f5f5", borderTop:`2px solid ${C.border}` }}>
                  <div style={{ padding:"7px 14px 4px", display:"flex", justifyContent:"space-between", fontSize:12, color:C.sub }}>
                    <span>薬価小計</span><span>¥{subtotal.toLocaleString()}</span>
                  </div>
                  <div style={{ padding:"4px 14px 7px", display:"flex", justifyContent:"space-between", fontSize:12, color:C.sub }}>
                    <span>消費税（10%）</span><span>¥{tax.toLocaleString()}</span>
                  </div>
                  <div style={{ padding:"10px 14px 12px", borderTop:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:14, fontWeight:800 }}>合計金額</span>
                    <span style={{ fontSize:20, fontWeight:900 }}>¥{total.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3ボタン */}
        <div style={{ padding:"12px 18px 32px", borderTop:`1px solid ${C.border}` }}>
          <div style={{ display:"flex", gap:8, marginBottom:8 }}>
            <button onClick={onClose}
              style={{ flex:1, background:"#f5f5f5", color:C.text, border:`1px solid ${C.border}`, borderRadius:12, padding:"13px 0", fontSize:13, fontWeight:600, cursor:"pointer" }}>
              閉じる
            </button>
            <button onClick={onEdit}
              style={{ flex:1, background:"#fffbeb", color:"#92400e", border:"1px solid #fcd34d", borderRadius:12, padding:"13px 0", fontSize:13, fontWeight:700, cursor:"pointer" }}>
              ✏️ 修正する
            </button>
          </div>
          <button onClick={onSendNow}
            style={{ width:"100%", background:"#111", color:"#fff", border:"none", borderRadius:12, padding:"14px 0", fontSize:14, fontWeight:800, cursor:"pointer", letterSpacing:0.5 }}>
            ✉️ このまま送信する →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── 投与履歴モーダル ──────────────────────────────────────────────────────────
function PetHistoryModal({ pet, history, onClose }) {
  const petHistory = history.filter(h => h.pet === pet.name);
  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.4)", display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
      <div style={{ background:"#fff", borderRadius:"20px 20px 0 0", width:"100%", maxWidth:430, maxHeight:"85vh", display:"flex", flexDirection:"column", fontFamily:"'Noto Sans JP',sans-serif" }}>
        <div style={{ width:36, height:4, background:"#ddd", borderRadius:2, margin:"14px auto 0" }}/>
        <div style={{ padding:"14px 20px 10px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:12 }}>
          <PetIcon species={pet.species} breed={pet.breed} size={40}/>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:15, fontWeight:800 }}>{pet.name} の投与履歴</div>
            <div style={{ fontSize:12, color:C.sub }}>全{petHistory.length}件</div>
          </div>
          <button onClick={onClose} style={{ background:"#f5f5f5", border:"none", borderRadius:8, padding:"6px 12px", fontSize:13, cursor:"pointer" }}>閉じる</button>
        </div>
        <div style={{ overflowY:"auto", flex:1, padding:"12px 16px 24px" }}>
          {petHistory.length === 0 && (
            <div style={{ textAlign:"center", color:C.sub2, padding:"50px 0", fontSize:14 }}>投与履歴がありません</div>
          )}
          {petHistory.map(rx => {
            const st = STATUS_STYLE[rx.status]||{ bg:"#f5f5f5", c:"#666", bd:"#ccc" };
            return (
              <div key={rx.id} style={{ background:"#fafafa", border:`1px solid ${C.border}`, borderRadius:12, padding:"12px 14px", marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                  <div>
                    <div style={{ fontWeight:700, fontSize:14 }}>{rx.date}</div>
                    <div style={{ fontSize:11, color:C.sub, marginTop:1 }}>{rx.id}</div>
                  </div>
                  <span style={{ background:st.bg, color:st.c, border:`1px solid ${st.bd}`, borderRadius:20, padding:"3px 10px", fontSize:11, fontWeight:700 }}>{rx.status}</span>
                </div>
                {rx.items.map((it,i)=>(
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 0", borderTop:`1px solid ${C.border}` }}>
                    <div>
                      <div style={{ fontSize:13, fontWeight:600 }}>{it.name}</div>
                      {it.perDose && <div style={{ fontSize:11, color:C.sub }}>1回{it.perDose} · 1日{it.freqPerDay}回 · {it.freqDays}日分</div>}
                    </div>
                    <div style={{ fontSize:13, fontWeight:700, color:C.text }}>{it.qty}</div>
                  </div>
                ))}
                {rx.total>0 && (
                  <div style={{ marginTop:8, paddingTop:8, borderTop:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", fontSize:12 }}>
                    <span style={{ color:C.sub }}>合計金額</span>
                    <span style={{ fontWeight:800 }}>¥{rx.total.toLocaleString()}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── ログカード ────────────────────────────────────────────────────────────────
function RxLogCard({ rx, pets, onShowHistory }) {
  const pet = pets.find(p=>p.name===rx.pet);
  const st = STATUS_STYLE[rx.status]||{ bg:"#f5f5f5", c:"#666", bd:"#ccc" };
  return (
    <div style={{ background:"#fff", borderRadius:12, border:`1px solid ${C.border}`, marginBottom:10, overflow:"hidden" }}>
      <div style={{ padding:"12px 14px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ flexShrink:0, cursor:"pointer" }} onClick={()=>pet&&onShowHistory(pet)}>
            {pet ? <PetIcon species={pet.species} breed={pet.breed} size={44}/> : <div style={{ width:44, height:44, borderRadius:"50%", background:"#f5f5f5", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, color:"#ccc" }}>?</div>}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div>
                <span style={{ fontWeight:800, fontSize:14 }}>{rx.pet}</span>
                <span style={{ fontSize:11, color:C.sub, marginLeft:5 }}>({rx.owner})</span>
              </div>
              <span style={{ background:st.bg, color:st.c, border:`1px solid ${st.bd}`, borderRadius:20, padding:"3px 9px", fontSize:11, fontWeight:700, flexShrink:0, marginLeft:6 }}>{rx.status}</span>
            </div>
            <div style={{ fontSize:11, color:C.sub2, marginTop:2 }}>{rx.date} · <span style={{ color:"#666", fontWeight:600 }}>{rx.id}</span></div>
          </div>
        </div>
        <div style={{ marginTop:10, display:"flex", flexWrap:"wrap", gap:6 }}>
          {rx.items.map((it,i)=>(
            <span key={i} style={{ background:C.accentBg, color:C.text, borderRadius:20, padding:"4px 10px", fontSize:11, fontWeight:600, border:`1px solid ${C.border}` }}>
              {it.name} <span style={{ background:"#e5e5e5", borderRadius:8, padding:"1px 6px", fontSize:10 }}>{it.qty}</span>
            </span>
          ))}
        </div>
        {pet && (
          <button onClick={()=>onShowHistory(pet)} style={{ marginTop:8, background:"none", border:`1px solid ${C.border}`, borderRadius:7, padding:"4px 10px", fontSize:11, color:C.sub, cursor:"pointer" }}>
            投与履歴を見る
          </button>
        )}
      </div>
    </div>
  );
}

// ── 患者検索コンポーネント ─────────────────────────────────────────────────────
function PetSearchInput({ pets, selectedPet, onSelect, onRegister }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const filtered = pets.filter(p =>
    !q || p.name.includes(q) || p.owner.includes(q) || (p.breed&&p.breed.includes(q))
  );

  // 外側クリックで閉じる
  useEffect(()=>{
    const handler = e => { if(ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return ()=>document.removeEventListener("mousedown", handler);
  },[]);

  return (
    <div ref={ref} style={{ position:"relative" }}>
      <div style={{ position:"relative" }}>
        <input
          value={selectedPet ? `${selectedPet.name}（${selectedPet.owner}）` : q}
          onChange={e=>{ setQ(e.target.value); setSelectedPet&&onSelect(null); setOpen(true); }}
          onFocus={()=>setOpen(true)}
          placeholder="ペット名・飼い主名で検索…"
          style={{ ...baseInp, paddingRight:36, background:selectedPet?"#f0fdf4":"#fff", borderColor:selectedPet?"#86efac":C.border2 }}
          readOnly={!!selectedPet}
        />
        {selectedPet && (
          <button onClick={()=>{ onSelect(null); setQ(""); setOpen(true); }}
            style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", fontSize:16, color:C.sub, cursor:"pointer", lineHeight:1 }}>✕</button>
        )}
      </div>

      {open && !selectedPet && (
        <div style={{ position:"absolute", top:"calc(100% + 4px)", left:0, right:0, background:"#fff", border:`1px solid ${C.border2}`, borderRadius:10, boxShadow:"0 4px 20px rgba(0,0,0,0.12)", zIndex:100, maxHeight:260, overflowY:"auto" }}>
          {filtered.length === 0 && (
            <div style={{ padding:"14px 16px", fontSize:13, color:C.sub }}>該当するペットがいません</div>
          )}
          {filtered.map(pet=>(
            <div key={pet.id} onClick={()=>{ onSelect(pet); setQ(""); setOpen(false); }}
              style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", cursor:"pointer", borderBottom:`1px solid ${C.border}` }}
              onMouseEnter={e=>e.currentTarget.style.background="#f5f5f5"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <PetIcon species={pet.species} breed={pet.breed} size={40}/>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:14 }}>{pet.name}</div>
                <div style={{ fontSize:11, color:C.sub }}>
                  {[pet.breed, pet.age, pet.weight].filter(Boolean).join(" · ")}
                  {" · "}{pet.owner}
                </div>
              </div>
            </div>
          ))}
          <div onClick={()=>{ setOpen(false); onRegister(); }}
            style={{ padding:"12px 16px", fontSize:13, color:C.green, fontWeight:700, cursor:"pointer", borderTop:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:6 }}
            onMouseEnter={e=>e.currentTarget.style.background="#f0fdf4"}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            ＋ 新規ペットを登録
          </div>
        </div>
      )}
    </div>
  );
}

// ── スワイプ削除コンポーネント ─────────────────────────────────────────────────
function SwipeToDelete({ onDelete, children }) {
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const THRESHOLD = 80; // 削除確定に必要なスワイプ距離

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setSwiping(true);
  };
  const handleTouchMove = (e) => {
    if (!swiping) return;
    const diff = e.touches[0].clientX - startX;
    if (diff < 0) setOffsetX(Math.max(diff, -120));
  };
  const handleTouchEnd = () => {
    setSwiping(false);
    if (offsetX < -THRESHOLD) {
      // 削除確定：アニメーション後に削除
      setOffsetX(-400);
      setTimeout(() => onDelete(), 250);
    } else {
      setOffsetX(0);
    }
  };

  return (
    <div style={{ position:"relative", overflow:"hidden" }}>
      {/* 削除背景 */}
      <div style={{
        position:"absolute", inset:0, background:"#ef4444",
        display:"flex", alignItems:"center", justifyContent:"flex-end",
        paddingRight:24, borderRadius:0,
      }}>
        <div style={{ color:"#fff", fontSize:12, fontWeight:700, textAlign:"center", lineHeight:1.4 }}>
          <div style={{ fontSize:18, marginBottom:2 }}>🗑️</div>
          削除
        </div>
      </div>
      {/* スワイプ対象コンテンツ */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform:`translateX(${offsetX}px)`,
          transition: swiping ? "none" : "transform 0.25s ease",
          position:"relative", zIndex:1, background:"transparent",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ── ナビバー ──────────────────────────────────────────────────────────────────
function NavBar({ active, setScreen, setSent, setSaved }) {
  return (
    <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:"#fff", borderTop:`1px solid ${C.border}`, display:"flex", zIndex:10 }}>
      {[
        ["ホーム","dashboard","M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"],
        ["新規作成","new","M12 4v16m8-8H4"],
        ["品目一覧","medicines","M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"],
      ].map(([label,key,path])=>(
        <div key={key} onClick={()=>{ setSent(false); setSaved(false); setScreen(key); }}
          style={{ flex:1, padding:"10px 0 8px", textAlign:"center", cursor:"pointer", color:active===key?"#111":C.sub, fontSize:10, fontWeight:active===key?700:400, borderTop:`2px solid ${active===key?"#111":"transparent"}` }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active===key?2:1.5} strokeLinecap="round" strokeLinejoin="round" style={{ display:"block", margin:"0 auto 3px" }}>
            <path d={path}/>
          </svg>
          {label}
        </div>
      ))}
    </div>
  );
}

// ── メインアプリ ──────────────────────────────────────────────────────────────
export default function Pedicine() {
  const [screen, setScreen]           = useState("dashboard");
  const [pets, setPets]               = useState([
    { id:1, name:"ポチ",  species:"犬", breed:"柴犬",        age:"3歳",  weight:"8.5kg",  owner:"田中 太郎" },
    { id:2, name:"ミケ",  species:"猫", breed:"三毛",        age:"5歳",  weight:"4.2kg",  owner:"佐藤 花子" },
    { id:3, name:"ハナ",  species:"犬", breed:"トイプードル", age:"2歳",  weight:"3.1kg",  owner:"鈴木 次郎" },
    { id:4, name:"モコ",  species:"犬", breed:"ゴールデン",   age:"7歳",  weight:"32.0kg", owner:"山本 健一" },
    { id:5, name:"ソラ",  species:"猫", breed:"ロシアンブルー",age:"4歳", weight:"4.8kg",  owner:"高橋 美咲" },
  ]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [rxItems, setRxItems]         = useState([emptyItem()]);
  const [openMedIdx, setOpenMedIdx]   = useState(null);
  const [showPetReg, setShowPetReg]   = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [doctorNote, setDoctorNote]   = useState("");
  const [sent, setSent]               = useState(false);
  const [saved, setSaved]             = useState(false);
  const [editingRxId, setEditingRxId]   = useState(null); // 待機中レコードの編集ID
  const [pendingDetail, setPendingDetail] = useState(null); // 待機中の内容確認モーダル用レコード
  const [medListCat, setMedListCat]   = useState("");
  const [medListSearch, setMedListSearch] = useState("");
  const [historyPet, setHistoryPet]   = useState(null); // ペット履歴モーダル用
  const [history, setHistory]         = useState([
    { id:"RX-001", pet:"ポチ", owner:"田中 太郎", date:"2026/03/10", status:"送信済み", total:4614,
      items:[{ name:"アポキル 5.4mg", qty:"30錠", perDose:"1", freqPerDay:"2", freqDays:"14" }] },
    { id:"RX-002", pet:"ミケ", owner:"佐藤 花子", date:"2026/03/11", status:"待機中", total:1414,
      items:[{ name:"プレドニン 5mg",  qty:"14錠", perDose:"1", freqPerDay:"1", freqDays:"14" }] },
    { id:"RX-003", pet:"ポチ", owner:"田中 太郎", date:"2026/02/20", status:"送信済み", total:9924,
      items:[{ name:"アポキル 5.4mg", qty:"60錠", perDose:"1", freqPerDay:"2", freqDays:"28" }] },
  ]);

  const updateItem = (i,f,v) => {
    const u = [...rxItems];
    u[i] = { ...u[i], [f]:v };
    // 自動計算: perDose, freqPerDay, freqDays のどれかが変わったら qty を更新
    if (["perDose","freqPerDay","freqDays"].includes(f)) {
      const base = { ...u[i], [f]:v };
      const auto = calcQty(base.perDose, base.freqPerDay, base.freqDays);
      if (auto) u[i].qty = auto;
    }
    setRxItems(u);
  };
  const removeItem = i => setRxItems(rxItems.filter((_,idx)=>idx!==i));
  const addRow     = () => setRxItems([...rxItems, emptyItem()]);

  const validItems = rxItems.filter(r=>r.med);
  const subtotal   = validItems.reduce((s,r)=>s+r.med.price*(parseInt(r.qty)||0),0);
  const tax        = Math.round(subtotal*0.1);
  const total      = subtotal+tax;

  const handleConfirmedSend = () => {
    if (editingRxId) {
      // 待機中レコードを送信済みに更新
      setHistory(history.map(h => h.id === editingRxId
        ? { ...h, status:"送信済み", total, date:new Date().toLocaleDateString("ja-JP"),
            items:validItems.map(r=>({ name:r.med.name, qty:`${r.qty}${r.med.form}`, perDose:r.perDose, freqPerDay:r.freqPerDay, freqDays:r.freqDays })) }
        : h
      ));
      setEditingRxId(null);
    } else {
      setHistory([{
        id:`RX-${String(history.length+1).padStart(3,"0")}`,
        pet:selectedPet?.name, owner:selectedPet?.owner,
        date:new Date().toLocaleDateString("ja-JP"),
        status:"送信済み", total,
        items:validItems.map(r=>({ name:r.med.name, qty:`${r.qty}${r.med.form}`, perDose:r.perDose, freqPerDay:r.freqPerDay, freqDays:r.freqDays })),
      },...history]);
    }
    setShowConfirm(false); setSent(true);
  };
  const handleSave = () => {
    if (editingRxId) {
      // 待機中レコードを上書き保存
      setHistory(history.map(h => h.id === editingRxId
        ? { ...h, status:"待機中", total, date:new Date().toLocaleDateString("ja-JP"),
            items:validItems.map(r=>({ name:r.med.name, qty:`${r.qty}${r.med.form}`, perDose:r.perDose, freqPerDay:r.freqPerDay, freqDays:r.freqDays })) }
        : h
      ));
      setEditingRxId(null);
    } else {
      setHistory([{
        id:`RX-${String(history.length+1).padStart(3,"0")}`,
        pet:selectedPet?.name, owner:selectedPet?.owner,
        date:new Date().toLocaleDateString("ja-JP"),
        status:"待機中", total,
        items:validItems.map(r=>({ name:r.med.name, qty:`${r.qty}${r.med.form}`, perDose:r.perDose, freqPerDay:r.freqPerDay, freqDays:r.freqDays })),
      },...history]);
    }
    setShowConfirm(false); setSaved(true);
  };

  // 待機中レコードを編集フォームに読み込む
  const loadPendingForEdit = (rx) => {
    const pet = pets.find(p => p.name === rx.pet);
    setSelectedPet(pet || null);
    setRxItems(rx.items.map(it => {
      const med = MEDICINES.find(m => m.name === it.name) || null;
      const form = med?.form || "";
      const qtyNum = it.qty ? it.qty.replace(form,"").trim() : "";
      return { med, qty:qtyNum, perDose:it.perDose||"", freqPerDay:it.freqPerDay||"", freqDays:it.freqDays||"", note:it.note||"" };
    }));
    setDoctorNote("");
    setEditingRxId(rx.id);
    setPendingDetail(null);
    setScreen("new");
  };
  const resetForm = () => {
    setSelectedPet(null); setRxItems([emptyItem()]); setDoctorNote("");
    setSent(false); setSaved(false); setOpenMedIdx(null); setShowConfirm(false);
    setEditingRxId(null); setPendingDetail(null); setScreen("dashboard");
  };

  const inp = baseInp;

  // ── 薬選択オーバーレイ ───────────────────────────────────────────────────
  if (openMedIdx !== null) return (
    <div style={{ fontFamily:"'Noto Sans JP',sans-serif", maxWidth:430, margin:"0 auto", minHeight:"100vh" }}>
      <MedSearchModal onSelect={m=>{ updateItem(openMedIdx,"med",m); setOpenMedIdx(null); }} onClose={()=>setOpenMedIdx(null)}/>
    </div>
  );

  const today = new Date().toLocaleDateString("ja-JP");

  // ── ダッシュボード ────────────────────────────────────────────────────────
  if (screen === "dashboard") {
    const pending  = history.filter(h=>h.status==="待機中");
    const sent_log = history.filter(h=>h.status==="送信済み");
    return (
    <div style={{ fontFamily:"'Noto Sans JP',sans-serif", maxWidth:430, margin:"0 auto", minHeight:"100vh", background:"#fff" }}>
      <div style={{ background:"#111", color:"#fff", padding:"18px 20px 16px" }}>
        <div style={{ fontSize:24, fontWeight:900, letterSpacing:2 }}>Pedicine</div>
        <div style={{ fontSize:11, color:"#888", marginTop:2, letterSpacing:1 }}>ペディスン — 処方箋送信システム</div>
      </div>

      <div style={{ padding:"14px 14px 80px" }}>
        {/* 送信経路 */}
        <div style={{ background:"#fafafa", borderRadius:12, padding:12, marginBottom:14, border:`1px solid ${C.border}`, display:"flex", alignItems:"center" }}>
          <div style={{ flex:1, background:C.blueBg, borderRadius:9, padding:"9px 12px" }}>
            <div style={{ fontSize:10, fontWeight:700, color:C.blue }}>送信元</div>
            <div style={{ fontSize:12, fontWeight:800, color:C.blue, marginTop:2 }}>{POC_HOSPITAL.name}</div>
          </div>
          <div style={{ padding:"0 10px", color:C.sub2, fontSize:18 }}>→</div>
          <div style={{ flex:1, background:C.greenBg, borderRadius:9, padding:"9px 12px" }}>
            <div style={{ fontSize:10, fontWeight:700, color:C.green }}>送信先</div>
            <div style={{ fontSize:12, fontWeight:800, color:C.green, marginTop:2 }}>{POC_PHARMACY.name}</div>
          </div>
        </div>

        {/* 統計：待機中 / 送信済み */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
          <div style={{ background:"#fffbeb", borderRadius:12, padding:"16px 12px", border:"1px solid #fcd34d", display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ fontSize:28, fontWeight:900, color:"#92400e" }}>{pending.length}</div>
            <div>
              <div style={{ fontSize:13, fontWeight:800, color:"#92400e" }}>待機中</div>
              <div style={{ fontSize:10, color:"#b45309", marginTop:1 }}>未送信の処方箋</div>
            </div>
          </div>
          <div style={{ background:C.greenBg, borderRadius:12, padding:"16px 12px", border:`1px solid ${C.greenBd}`, display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ fontSize:28, fontWeight:900, color:C.green }}>{sent_log.length}</div>
            <div>
              <div style={{ fontSize:13, fontWeight:800, color:C.green }}>送信済み</div>
              <div style={{ fontSize:10, color:"#15803d", marginTop:1 }}>薬局へ送信完了</div>
            </div>
          </div>
        </div>

        <button onClick={()=>setScreen("new")}
          style={{ background:"#111", color:"#fff", border:"none", borderRadius:12, padding:"14px 0", width:"100%", fontSize:14, fontWeight:800, cursor:"pointer", marginBottom:20, letterSpacing:0.5 }}>
          ＋ 新しい処方箋を作成
        </button>

        {/* 待機中 セクション */}
        {pending.length > 0 && (
          <div style={{ marginBottom:20 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
              <div style={{ width:4, height:18, background:"#f59e0b", borderRadius:2 }}/>
              <div style={{ fontSize:13, fontWeight:800, color:"#92400e" }}>待機中</div>
              <div style={{ background:"#fcd34d", color:"#78350f", borderRadius:20, padding:"1px 8px", fontSize:11, fontWeight:700 }}>{pending.length}</div>
            </div>
            <div style={{ background:"#fffbeb", borderRadius:12, border:"1px solid #fde68a", overflow:"hidden" }}>
              {pending.map((rx,idx)=>{
                const pet = pets.find(p=>p.name===rx.pet);
                return (
                  <SwipeToDelete key={rx.id} onDelete={()=>setHistory(history.filter(h=>h.id!==rx.id))}>
                    <div onClick={()=>setPendingDetail(rx)}
                      style={{ padding:"12px 14px", borderBottom:idx<pending.length-1?"1px solid #fde68a":"none", cursor:"pointer", background:"#fffbeb" }}
                      onMouseEnter={e=>e.currentTarget.style.background="#fef9c3"}
                      onMouseLeave={e=>e.currentTarget.style.background="#fffbeb"}>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{ flexShrink:0 }}>
                          {pet ? <PetIcon species={pet.species} breed={pet.breed} size={42}/> : <div style={{ width:42, height:42, borderRadius:"50%", background:"#fef3c7", display:"flex", alignItems:"center", justifyContent:"center", color:"#ccc", fontSize:18 }}>?</div>}
                        </div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                            <div>
                              <span style={{ fontWeight:800, fontSize:14 }}>{rx.pet}</span>
                              <span style={{ fontSize:11, color:"#92400e", marginLeft:5 }}>({rx.owner})</span>
                            </div>
                            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                              <span style={{ fontSize:11, color:"#92400e", fontWeight:600 }}>{rx.date}</span>
                              <span style={{ fontSize:13, color:"#b45309" }}>›</span>
                            </div>
                          </div>
                          <div style={{ fontSize:11, color:"#b45309", marginTop:2 }}>{rx.id}</div>
                        </div>
                      </div>
                      <div style={{ marginTop:8, display:"flex", flexWrap:"wrap", gap:5 }}>
                        {rx.items.map((it,i)=>(
                          <span key={i} style={{ background:"#fef3c7", color:"#78350f", borderRadius:20, padding:"3px 9px", fontSize:11, fontWeight:600, border:"1px solid #fde68a" }}>
                            {it.name} <span style={{ background:"#fcd34d", borderRadius:8, padding:"1px 5px", fontSize:10 }}>{it.qty}</span>
                          </span>
                        ))}
                      </div>
                      {rx.total>0 && <div style={{ fontSize:11, color:"#b45309", marginTop:5, fontWeight:600 }}>合計 ¥{rx.total.toLocaleString()}</div>}
                      <div style={{ fontSize:10, color:"#b45309", marginTop:4, opacity:0.6 }}>← 左にスワイプで削除</div>
                    </div>
                  </SwipeToDelete>
                );
              })}
            </div>
          </div>
        )}

        {/* 送信済み セクション */}
        <div style={{ marginBottom:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
            <div style={{ width:4, height:18, background:"#22c55e", borderRadius:2 }}/>
            <div style={{ fontSize:13, fontWeight:800, color:C.green }}>送信済み</div>
            <div style={{ background:C.greenBd, color:"#14532d", borderRadius:20, padding:"1px 8px", fontSize:11, fontWeight:700 }}>{sent_log.length}</div>
          </div>
          {sent_log.length === 0 && (
            <div style={{ textAlign:"center", color:C.sub2, padding:"20px 0", fontSize:13 }}>送信済みの処方箋はありません</div>
          )}
          {sent_log.map((rx,idx)=>{
            const pet = pets.find(p=>p.name===rx.pet);
            return (
              <div key={rx.id} style={{ background:"#fafafa", borderRadius:12, border:`1px solid ${C.border}`, marginBottom:8, padding:"12px 14px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ cursor:"pointer", flexShrink:0 }} onClick={()=>pet&&setHistoryPet(pet)}>
                    {pet ? <PetIcon species={pet.species} breed={pet.breed} size={42}/> : <div style={{ width:42, height:42, borderRadius:"50%", background:"#f5f5f5", display:"flex", alignItems:"center", justifyContent:"center", color:"#ccc", fontSize:18 }}>?</div>}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                      <div>
                        <span style={{ fontWeight:800, fontSize:14 }}>{rx.pet}</span>
                        <span style={{ fontSize:11, color:C.sub, marginLeft:5 }}>({rx.owner})</span>
                      </div>
                      <span style={{ fontSize:11, color:C.sub }}>{rx.date}</span>
                    </div>
                    <div style={{ fontSize:11, color:C.sub2, marginTop:2 }}>{rx.id}</div>
                  </div>
                </div>
                <div style={{ marginTop:8, display:"flex", flexWrap:"wrap", gap:5 }}>
                  {rx.items.map((it,i)=>(
                    <span key={i} style={{ background:C.accentBg, color:C.text, borderRadius:20, padding:"3px 9px", fontSize:11, fontWeight:600, border:`1px solid ${C.border}` }}>
                      {it.name} <span style={{ background:"#e5e5e5", borderRadius:8, padding:"1px 5px", fontSize:10 }}>{it.qty}</span>
                    </span>
                  ))}
                </div>
                {rx.total>0 && <div style={{ fontSize:11, color:C.sub, marginTop:5, fontWeight:600 }}>合計 ¥{rx.total.toLocaleString()}</div>}
                {pet && (
                  <button onClick={()=>setHistoryPet(pet)} style={{ marginTop:6, background:"none", border:`1px solid ${C.border}`, borderRadius:7, padding:"3px 10px", fontSize:11, color:C.sub, cursor:"pointer" }}>
                    投与履歴を見る
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showPetReg && <PetRegisterModal onSave={p=>{ setPets([...pets,p]); setShowPetReg(false); }} onClose={()=>setShowPetReg(false)}/>}
      {historyPet && <PetHistoryModal pet={historyPet} history={history} onClose={()=>setHistoryPet(null)}/>}
      {pendingDetail && (
        <PendingDetailModal
          rx={pendingDetail}
          pet={pets.find(p=>p.name===pendingDetail.pet)}
          onEdit={()=>loadPendingForEdit(pendingDetail)}
          onSendNow={()=>{
            setHistory(history.map(h=>h.id===pendingDetail.id?{...h,status:"送信済み",date:new Date().toLocaleDateString("ja-JP")}:h));
            setPendingDetail(null);
          }}
          onClose={()=>setPendingDetail(null)}
        />
      )}
      <NavBar active="dashboard" setScreen={setScreen} setSent={setSent} setSaved={setSaved}/>
    </div>
  );
  }

  // ── 品目一覧 ─────────────────────────────────────────────────────────────
  if (screen === "medicines") {
    const shown = MEDICINES.filter(m=>(!medListCat||m.category===medListCat)&&(!medListSearch||m.name.includes(medListSearch)||m.maker.includes(medListSearch)));
    return (
      <div style={{ fontFamily:"'Noto Sans JP',sans-serif", maxWidth:430, margin:"0 auto", minHeight:"100vh", background:"#fff" }}>
        <div style={{ background:"#111", color:"#fff", padding:"14px 16px", display:"flex", alignItems:"center", gap:10, position:"sticky", top:0, zIndex:5 }}>
          <button onClick={()=>setScreen("dashboard")} style={{ background:"#333", border:"none", borderRadius:7, color:"#ccc", padding:"6px 11px", fontSize:12, cursor:"pointer" }}>← 戻る</button>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:15, fontWeight:800 }}>取扱品目一覧</div>
            <div style={{ fontSize:10, color:"#888", marginTop:1 }}>全{MEDICINES.length}品目</div>
          </div>
        </div>
        <div style={{ padding:14, paddingBottom:80 }}>
          <input style={{ ...inp, marginBottom:8 }} placeholder="薬品名・メーカーで検索" value={medListSearch} onChange={e=>setMedListSearch(e.target.value)}/>
          <div style={{ display:"flex", gap:6, overflowX:"auto", marginBottom:14, paddingBottom:2 }}>
            {["", ...CATEGORIES].map(c=>(
              <button key={c} onClick={()=>setMedListCat(c)}
                style={{ flexShrink:0, padding:"5px 11px", borderRadius:20, border:`1px solid ${medListCat===c?"#111":C.border2}`, background:medListCat===c?"#111":"#fff", color:medListCat===c?"#fff":C.sub, fontSize:11, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap" }}>
                {c||"すべて"}
              </button>
            ))}
          </div>
          {["vet","human"].map(type=>{
            const items=shown.filter(m=>m.type===type);
            if(!items.length) return null;
            return (
              <div key={type}>
                <div style={{ fontSize:10, fontWeight:700, color:C.sub2, letterSpacing:1, marginBottom:8, textTransform:"uppercase" }}>
                  {type==="vet"?"動物用医薬品":"ヒト用医薬品"} — {items.length}品目
                </div>
                {items.map(m=>(
                  <div key={m.id} style={{ background:"#fafafa", borderRadius:10, padding:"10px 13px", marginBottom:7, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700, fontSize:13 }}>{m.name}</div>
                      <div style={{ fontSize:11, color:C.sub, marginTop:2 }}>{m.maker} · {m.form}</div>
                      <span style={{ background:CAT_COLORS[m.category]||"#f5f5f5", color:"#444", borderRadius:5, padding:"2px 7px", fontSize:10, fontWeight:600, marginTop:4, display:"inline-block" }}>{m.category}</span>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontWeight:800, fontSize:14 }}>¥{m.price.toLocaleString()}</div>
                      <div style={{ fontSize:10, color:C.sub }}>/{m.form}</div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <NavBar active="medicines" setScreen={setScreen} setSent={setSent} setSaved={setSaved}/>
      </div>
    );
  }

  // ── 新規処方箋 ────────────────────────────────────────────────────────────
  if (screen === "new" && !sent && !saved) {
    const canSend = selectedPet && validItems.length > 0;
    return (
      <div style={{ fontFamily:"'Noto Sans JP',sans-serif", maxWidth:430, margin:"0 auto", minHeight:"100vh", background:"#fff" }}>
        <div style={{ background:"#111", color:"#fff", padding:"14px 16px", display:"flex", alignItems:"center", gap:10, position:"sticky", top:0, zIndex:5 }}>
          <button onClick={()=>{ setEditingRxId(null); setPendingDetail(null); setScreen("dashboard"); }} style={{ background:"#333", border:"none", borderRadius:7, color:"#ccc", padding:"6px 11px", fontSize:12, cursor:"pointer" }}>← 戻る</button>
          <div>
            <div style={{ fontSize:15, fontWeight:800 }}>{editingRxId ? "処方箋を編集" : "新規処方箋"}</div>
            <div style={{ fontSize:10, color:"#888" }}>{editingRxId ? <span style={{ color:"#fcd34d" }}>待機中レコードを編集中</span> : "処方内容を入力"}</div>
          </div>
        </div>

        <div style={{ padding:14, paddingBottom:90 }}>
          {/* 送信経路 */}
          <div style={{ background:"#fafafa", borderRadius:12, padding:12, marginBottom:14, border:`1px solid ${C.border}`, display:"flex", alignItems:"center" }}>
            <div style={{ flex:1, background:C.blueBg, borderRadius:9, padding:"9px 12px" }}>
              <div style={{ fontSize:10, fontWeight:700, color:C.blue }}>送信元</div>
              <div style={{ fontSize:12, fontWeight:800, color:C.blue, marginTop:2 }}>{POC_HOSPITAL.name}</div>
            </div>
            <div style={{ padding:"0 10px", color:C.sub2, fontSize:18 }}>→</div>
            <div style={{ flex:1, background:C.greenBg, borderRadius:9, padding:"9px 12px" }}>
              <div style={{ fontSize:10, fontWeight:700, color:C.green }}>送信先</div>
              <div style={{ fontSize:12, fontWeight:800, color:C.green, marginTop:2 }}>{POC_PHARMACY.name}</div>
            </div>
          </div>

          {/* 患者選択（検索式） */}
          <div style={{ background:"#fff", borderRadius:14, padding:14, marginBottom:14, border:`1px solid ${C.border}` }}>
            <div style={{ fontSize:12, fontWeight:800, marginBottom:10 }}>患者を選択</div>
            <PetSearchInput
              pets={pets}
              selectedPet={selectedPet}
              onSelect={setSelectedPet}
              onRegister={()=>setShowPetReg(true)}
            />
            {selectedPet && (
              <div style={{ background:C.greenBg, borderRadius:10, padding:"10px 12px", marginTop:10, display:"flex", alignItems:"center", gap:10, border:`1px solid ${C.greenBd}` }}>
                <PetIcon species={selectedPet.species} breed={selectedPet.breed} size={44}/>
                <div style={{ fontSize:12 }}>
                  <div style={{ fontWeight:800, fontSize:14 }}>{selectedPet.name}</div>
                  <div style={{ color:C.sub, marginTop:1 }}>
                    {[selectedPet.breed, selectedPet.age, selectedPet.weight].filter(Boolean).join(" · ")}
                  </div>
                  <div style={{ color:C.sub }}>飼い主：{selectedPet.owner}</div>
                </div>
                <button onClick={()=>setHistoryPet(selectedPet)}
                  style={{ marginLeft:"auto", background:"#fff", border:`1px solid ${C.greenBd}`, borderRadius:8, padding:"5px 10px", fontSize:11, color:C.green, cursor:"pointer", fontWeight:600, flexShrink:0 }}>
                  履歴
                </button>
              </div>
            )}
          </div>

          {/* 処方薬 */}
          <div style={{ background:"#fff", borderRadius:14, padding:14, marginBottom:14, border:`1px solid ${C.border}` }}>
            <div style={{ fontSize:12, fontWeight:800, marginBottom:10 }}>処方薬</div>
            {rxItems.map((item,i)=>(
              <div key={i} style={{ background:"#fafafa", border:`1px solid ${C.border}`, borderRadius:12, padding:12, marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                  <span style={{ fontSize:11, fontWeight:700, color:C.sub }}>薬 {i+1}</span>
                  {rxItems.length>1 && <button onClick={()=>removeItem(i)} style={{ background:C.redBg, color:C.red, border:`1px solid #fecaca`, borderRadius:7, padding:"4px 9px", fontSize:11, cursor:"pointer" }}>削除</button>}
                </div>

                {!item.med ? (
                  <button onClick={()=>setOpenMedIdx(i)}
                    style={{ width:"100%", background:"#fff", border:`1.5px dashed ${C.border2}`, borderRadius:10, padding:"12px", fontSize:13, color:C.sub, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:8, fontFamily:"'Noto Sans JP',sans-serif" }}>
                    ＋ 薬を検索して選択<span style={{ marginLeft:"auto", fontSize:11, color:C.sub2 }}>57品目 →</span>
                  </button>
                ) : (
                  <div style={{ background:"#f0fdf4", borderRadius:10, padding:"10px 12px", marginBottom:10, display:"flex", alignItems:"center", gap:8, border:`1px solid ${C.greenBd}` }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700, fontSize:13 }}>{item.med.name}</div>
                      <div style={{ fontSize:11, color:C.sub, marginTop:2 }}>{item.med.maker} · ¥{item.med.price}/{item.med.form}</div>
                    </div>
                    <button onClick={()=>setOpenMedIdx(i)} style={{ background:"#fff", border:`1px solid ${C.greenBd}`, borderRadius:7, color:C.green, padding:"5px 9px", fontSize:11, cursor:"pointer", fontWeight:600 }}>変更</button>
                  </div>
                )}

                {item.med && (
                  <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    {/* 1回量 */}
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ fontSize:11, color:C.sub, whiteSpace:"nowrap", width:88 }}>1回の量</div>
                      <input style={{ ...inp, width:80, flex:"none" }} type="number" min="0.5" step="0.5" placeholder="1" value={item.perDose}
                        onChange={e=>updateItem(i,"perDose",e.target.value)}/>
                      <span style={{ fontSize:13, color:C.sub, whiteSpace:"nowrap" }}>{item.med.form}</span>
                    </div>

                    {/* 1日の回数 */}
                    <div>
                      <div style={{ fontSize:11, color:C.sub, marginBottom:6 }}>1日の回数</div>
                      <div style={{ display:"flex", gap:7 }}>
                        {["1","2","3","4"].map(n=>(
                          <button key={n} onClick={()=>updateItem(i,"freqPerDay", item.freqPerDay===n?"":n)}
                            style={{ flex:1, padding:"9px 0", borderRadius:8, border:`1px solid ${item.freqPerDay===n?"#111":C.border2}`, background:item.freqPerDay===n?"#111":"#fff", color:item.freqPerDay===n?"#fff":C.text, fontSize:13, fontWeight:700, cursor:"pointer" }}>
                            {n}回
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 投与日数 */}
                    <div>
                      <div style={{ fontSize:11, color:C.sub, marginBottom:6 }}>投与日数</div>
                      <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                        {["7","14","21","28","30","60","90"].map(n=>(
                          <button key={n} onClick={()=>updateItem(i,"freqDays", item.freqDays===n?"":n)}
                            style={{ padding:"8px 0", minWidth:48, borderRadius:8, border:`1px solid ${item.freqDays===n?"#111":C.border2}`, background:item.freqDays===n?"#111":"#fff", color:item.freqDays===n?"#fff":C.text, fontSize:12, fontWeight:700, cursor:"pointer" }}>
                            {n}日
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 処方錠数（自動計算） */}
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ fontSize:11, whiteSpace:"nowrap", width:88 }}>
                        <span style={{ color:C.sub }}>処方数量</span>
                        {item.perDose && item.freqPerDay && item.freqDays &&
                          <span style={{ fontSize:10, color:C.green, marginLeft:4 }}>自動計算</span>}
                      </div>
                      <input
                        style={{ ...inp, flex:1,
                          background: item.perDose&&item.freqPerDay&&item.freqDays ? "#f0fdf4" : "#fff",
                          borderColor: item.perDose&&item.freqPerDay&&item.freqDays ? C.greenBd : C.border2,
                          fontWeight: 700,
                        }}
                        type="number" min="1" placeholder="例：28"
                        value={item.qty}
                        onChange={e=>updateItem(i,"qty",e.target.value)}
                      />
                      <span style={{ fontSize:13, color:C.sub, whiteSpace:"nowrap" }}>{item.med.form}</span>
                    </div>

                    {/* 行金額プレビュー */}
                    {item.qty && (
                      <div style={{ display:"flex", justifyContent:"flex-end", fontSize:12, color:C.sub }}>
                        ¥{item.med.price.toLocaleString()} × {item.qty} =
                        <span style={{ fontWeight:800, color:C.text, marginLeft:4 }}>¥{(item.med.price*(parseInt(item.qty)||0)).toLocaleString()}</span>
                      </div>
                    )}

                    {/* メモ */}
                    <div>
                      <div style={{ fontSize:11, color:C.sub, marginBottom:5 }}>メモ・指示事項</div>
                      <textarea style={{ ...inp, height:52, resize:"none" }} placeholder="例：食後投与、粉砕可…"
                        value={item.note} onChange={e=>updateItem(i,"note",e.target.value)}/>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button onClick={addRow} style={{ background:"#f5f5f5", color:C.sub, border:`1px solid ${C.border}`, borderRadius:10, padding:"10px 0", width:"100%", fontSize:13, fontWeight:600, cursor:"pointer" }}>
              ＋ 薬を追加
            </button>
          </div>

          {/* 備考 */}
          <div style={{ background:"#fff", borderRadius:14, padding:14, marginBottom:14, border:`1px solid ${C.border}` }}>
            <div style={{ fontSize:12, fontWeight:800, marginBottom:8 }}>備考・特記事項</div>
            <textarea style={{ ...inp, height:68, resize:"none" }} placeholder="薬局への全体的な注意事項…" value={doctorNote} onChange={e=>setDoctorNote(e.target.value)}/>
          </div>

          {/* 薬価サマリー */}
          {validItems.length > 0 && (
            <div style={{ background:C.greenBg, borderRadius:12, padding:"10px 14px", marginBottom:14, border:`1px solid ${C.greenBd}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ fontSize:12, color:C.green }}>{validItems.length}品目 · 薬価小計 ¥{subtotal.toLocaleString()}</div>
              <div style={{ fontSize:14, fontWeight:800, color:C.green }}>税込 ¥{total.toLocaleString()}</div>
            </div>
          )}

          <button onClick={()=>setShowConfirm(true)} disabled={!canSend}
            style={{ background:canSend?"#111":"#ddd", color:canSend?"#fff":"#aaa", border:"none", borderRadius:12, padding:"14px 0", width:"100%", fontSize:14, fontWeight:800, cursor:canSend?"pointer":"default" }}>
            送信内容を確認する →
          </button>
        </div>

        {showPetReg && <PetRegisterModal onSave={p=>{ setPets([...pets,p]); setShowPetReg(false); }} onClose={()=>setShowPetReg(false)}/>}
        {historyPet && <PetHistoryModal pet={historyPet} history={history} onClose={()=>setHistoryPet(null)}/>}
        {showConfirm && selectedPet && (
          <ConfirmModal pet={selectedPet} rxItems={rxItems} doctorNote={doctorNote} onConfirm={handleConfirmedSend} onSave={handleSave} onBack={()=>setShowConfirm(false)}/>
        )}
        <NavBar active="new" setScreen={setScreen} setSent={setSent} setSaved={setSaved}/>
      </div>
    );
  }

  // ── 保存完了 ──────────────────────────────────────────────────────────────
  if (saved) return (
    <div style={{ fontFamily:"'Noto Sans JP',sans-serif", maxWidth:430, margin:"0 auto", minHeight:"100vh", background:"#fff" }}>
      <div style={{ background:"#111", color:"#fff", padding:"14px 20px" }}>
        <div style={{ fontSize:16, fontWeight:900, letterSpacing:2 }}>Pedicine</div>
      </div>
      <div style={{ padding:"32px 16px 80px", textAlign:"center" }}>
        <div style={{ width:72, height:72, borderRadius:"50%", background:"#fffbeb", border:"2px solid #fcd34d", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
          </svg>
        </div>
        <div style={{ fontSize:22, fontWeight:900, marginBottom:6 }}>保存しました</div>
        <div style={{ background:"#fffbeb", borderRadius:8, display:"inline-block", padding:"5px 14px", fontSize:13, fontWeight:700, color:"#92400e", marginBottom:6, border:"1px solid #fcd34d" }}>
          待機中
        </div>
        <div style={{ fontSize:12, color:C.sub, marginBottom:24 }}>ダッシュボードの「待機中」に表示されます。送信準備ができたら送信してください。</div>
        <div style={{ background:"#fafafa", borderRadius:16, padding:16, textAlign:"left", border:`1px solid ${C.border}`, marginBottom:16 }}>
          <div style={{ display:"flex", gap:12, alignItems:"center", paddingBottom:12, borderBottom:`1px solid ${C.border}` }}>
            <PetIcon species={selectedPet?.species} breed={selectedPet?.breed} size={48}/>
            <div>
              <div style={{ fontWeight:800, fontSize:15 }}>{selectedPet?.name}</div>
              <div style={{ fontSize:12, color:C.sub }}>{[selectedPet?.breed,selectedPet?.age,selectedPet?.weight].filter(Boolean).join(" · ")}</div>
              <div style={{ fontSize:12, color:C.sub }}>飼い主：{selectedPet?.owner}</div>
            </div>
          </div>
          <div style={{ paddingTop:10 }}>
            {validItems.map((r,i)=>(
              <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:`1px solid #f0f0f0` }}>
                <div>
                  <div style={{ fontWeight:700, fontSize:13 }}>{r.med.name}</div>
                  <div style={{ fontSize:11, color:C.sub }}>
                    {r.perDose&&`1回${r.perDose}${r.med.form}`}{r.freqPerDay&&` · 1日${r.freqPerDay}回`}{r.freqDays&&` · ${r.freqDays}日分`}
                  </div>
                </div>
                <div style={{ fontWeight:700, fontSize:13 }}>{r.qty}{r.med.form}</div>
              </div>
            ))}
            <div style={{ paddingTop:10, borderTop:`1px solid ${C.border}`, marginTop:2, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:14, fontWeight:800 }}>合計金額</span>
              <span style={{ fontSize:22, fontWeight:900 }}>¥{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <button onClick={resetForm}
          style={{ background:"#111", color:"#fff", border:"none", borderRadius:12, padding:"14px 0", width:"100%", fontSize:14, fontWeight:800, cursor:"pointer", marginBottom:10 }}>
          ホームに戻る
        </button>
        <button onClick={()=>{ setSaved(false); setScreen("new"); }}
          style={{ background:"#f5f5f5", color:C.text, border:`1px solid ${C.border}`, borderRadius:12, padding:"12px 0", width:"100%", fontSize:13, fontWeight:700, cursor:"pointer" }}>
          新しい処方箋を作成
        </button>
      </div>
    </div>
  );

  // ── 送信完了 ──────────────────────────────────────────────────────────────
  if (sent) return (
    <div style={{ fontFamily:"'Noto Sans JP',sans-serif", maxWidth:430, margin:"0 auto", minHeight:"100vh", background:"#fff" }}>
      <div style={{ background:"#111", color:"#fff", padding:"14px 20px" }}>
        <div style={{ fontSize:16, fontWeight:900, letterSpacing:2 }}>Pedicine</div>
      </div>
      <div style={{ padding:"32px 16px 80px", textAlign:"center" }}>
        <div style={{ width:72, height:72, borderRadius:"50%", background:C.greenBg, border:`2px solid ${C.greenBd}`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div style={{ fontSize:22, fontWeight:900, marginBottom:6 }}>送信完了</div>
        <div style={{ background:C.greenBg, borderRadius:8, display:"inline-block", padding:"5px 14px", fontSize:13, fontWeight:700, color:C.green, marginBottom:6, border:`1px solid ${C.greenBd}` }}>
          {POC_PHARMACY.name}
        </div>
        <div style={{ fontSize:12, color:C.sub, marginBottom:24 }}>に送信されました。薬局からの連絡をお待ちください。</div>

        <div style={{ background:"#fafafa", borderRadius:16, padding:16, textAlign:"left", border:`1px solid ${C.border}`, marginBottom:16 }}>
          <div style={{ display:"flex", gap:12, alignItems:"center", paddingBottom:12, borderBottom:`1px solid ${C.border}` }}>
            <PetIcon species={selectedPet?.species} breed={selectedPet?.breed} size={50}/>
            <div>
              <div style={{ fontWeight:800, fontSize:15 }}>{selectedPet?.name}</div>
              <div style={{ fontSize:12, color:C.sub }}>{[selectedPet?.breed,selectedPet?.age,selectedPet?.weight].filter(Boolean).join(" · ")}</div>
              <div style={{ fontSize:12, color:C.sub }}>飼い主：{selectedPet?.owner}</div>
            </div>
          </div>
          <div style={{ paddingTop:10 }}>
            {validItems.map((r,i)=>{
              const lineTotal = r.med.price*(parseInt(r.qty)||0);
              return (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:`1px solid #f0f0f0` }}>
                  <div>
                    <div style={{ fontWeight:700, fontSize:13 }}>{r.med.name}</div>
                    <div style={{ fontSize:11, color:C.sub }}>
                      {r.perDose&&`1回${r.perDose}${r.med.form}`}
                      {r.freqPerDay&&` · 1日${r.freqPerDay}回`}
                      {r.freqDays&&` · ${r.freqDays}日分`}
                    </div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontWeight:700, fontSize:13 }}>{r.qty}{r.med.form}</div>
                    <div style={{ fontSize:11, color:C.sub }}>¥{lineTotal.toLocaleString()}</div>
                  </div>
                </div>
              );
            })}
            <div style={{ paddingTop:10, borderTop:`1px solid ${C.border}`, marginTop:2 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:C.sub, marginBottom:4 }}>
                <span>薬価小計</span><span>¥{subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:C.sub, marginBottom:8 }}>
                <span>消費税（10%）</span><span>¥{tax.toLocaleString()}</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:8, borderTop:`2px solid ${C.border}` }}>
                <span style={{ fontSize:14, fontWeight:800 }}>合計金額</span>
                <span style={{ fontSize:24, fontWeight:900 }}>¥{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <button onClick={resetForm}
          style={{ background:"#111", color:"#fff", border:"none", borderRadius:12, padding:"14px 0", width:"100%", fontSize:14, fontWeight:800, cursor:"pointer", marginBottom:10 }}>
          ホームに戻る
        </button>
        <button onClick={()=>{ setSent(false); setScreen("new"); }}
          style={{ background:"#f5f5f5", color:C.text, border:`1px solid ${C.border}`, borderRadius:12, padding:"12px 0", width:"100%", fontSize:13, fontWeight:700, cursor:"pointer" }}>
          新しい処方箋を作成
        </button>
      </div>
    </div>
  );

  return null;
}
