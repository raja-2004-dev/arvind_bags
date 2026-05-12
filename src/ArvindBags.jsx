import { useState, useEffect } from "react";

/* ── CSS-in-JS via a style tag injected once ── */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --navy:    #1D2765;
  --navy-dk: #131a47;
  --navy-md: #243090;
  --gold:    #C9973A;
  --gold-lt: #e8b95a;
  --cream:   #FAF8F3;
  --white:   #FFFDF9;
  --txt:     #1a1a2e;
  --txt-mid: #4a4a6a;
  --txt-lt:  #8888aa;
  --border:  #e8e4f0;
}
html { scroll-behavior: smooth; }
body { font-family: 'DM Sans', sans-serif; background: var(--white); color: var(--txt); }

/* NAV */
.ab-nav {
  position: sticky; top: 0; z-index: 200;
  background: var(--navy);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 5vw; height: 66px;
  box-shadow: 0 2px 24px rgba(19,26,71,.22);
}
.ab-logo { display: flex; align-items: center; gap: 11px; text-decoration: none; cursor:pointer; }
.ab-logo-mark {
  width: 34px; height: 34px; border-radius: 7px;
  background: var(--gold); display: flex; align-items: center; justify-content: center;
  font-family: 'Playfair Display', serif; font-weight: 700; font-size: 17px; color: var(--navy-dk);
}
.ab-logo-name { font-family: 'Playfair Display', serif; font-size: 19px; font-weight: 600; color: #fff; }
.ab-logo-name b { color: var(--gold-lt); font-weight: 600; }
.ab-nav-links { display: flex; align-items: center; gap: 1.8rem; list-style: none; }
.ab-nav-links a { color: rgba(255,255,255,.7); text-decoration: none; font-size: 14px; transition: color .2s; cursor:pointer; }
.ab-nav-links a:hover, .ab-nav-links a.active-link { color: var(--gold-lt); }
.ab-nav-cta { background: var(--gold); color: var(--navy-dk) !important; font-weight: 600 !important; padding: 8px 22px; border-radius: 6px; transition: background .2s !important; }
.ab-nav-cta:hover { background: var(--gold-lt) !important; }

/* HERO */
.ab-hero {
  background: var(--navy);
  padding: 80px 5vw 90px;
  display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;
  position: relative; overflow: hidden;
}
.ab-hero::before { content:''; position:absolute; right:-120px; top:-120px; width:500px; height:500px; border-radius:50%; background:rgba(201,151,58,.06); pointer-events:none; }
.ab-hero::after  { content:''; position:absolute; left:-80px; bottom:-100px; width:320px; height:320px; border-radius:50%; background:rgba(255,255,255,.03); pointer-events:none; }
.ab-hero-badge { display:inline-block; font-size:11px; font-weight:600; letter-spacing:2.5px; text-transform:uppercase; color:var(--gold-lt); margin-bottom:18px; padding:5px 14px; border:1px solid rgba(201,151,58,.35); border-radius:4px; }
.ab-hero h1 { font-family:'Playfair Display',serif; font-size:clamp(2.2rem,3.6vw,3.4rem); font-weight:700; line-height:1.17; color:#fff; margin-bottom:18px; }
.ab-hero h1 em { font-style:italic; color:var(--gold-lt); }
.ab-hero p { font-size:16px; color:rgba(255,255,255,.62); line-height:1.72; max-width:420px; margin-bottom:34px; }

.ab-hero-imgs { display:grid; grid-template-columns:1fr 1fr; gap:12px; position:relative; }
.ab-hero-img { border-radius:12px; overflow:hidden; aspect-ratio:3/4; }
.ab-hero-img:first-child { margin-top:36px; }
.ab-hero-img img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .4s; }
.ab-hero-img:hover img { transform:scale(1.05); }
.ab-hero-chip { position:absolute; bottom:18px; right:-6px; background:#fff; border-radius:10px; padding:12px 18px; box-shadow:0 8px 32px rgba(19,26,71,.22); text-align:center; }
.ab-hero-chip-num { font-family:'Playfair Display',serif; font-size:24px; font-weight:700; color:var(--navy); line-height:1; }
.ab-hero-chip-lbl { font-size:11px; color:var(--txt-lt); margin-top:3px; letter-spacing:.4px; }

/* STATS STRIP */
.ab-stats-strip { background:var(--navy-dk); display:flex; justify-content:center; flex-wrap:wrap; }
.ab-stat-item { flex:1; min-width:130px; max-width:220px; padding:28px 20px; text-align:center; border-right:1px solid rgba(255,255,255,.08); }
.ab-stat-item:last-child { border-right:none; }
.ab-stat-num { font-family:'Playfair Display',serif; font-size:28px; font-weight:700; color:var(--gold-lt); }
.ab-stat-lbl { font-size:12px; color:rgba(255,255,255,.45); margin-top:4px; letter-spacing:.5px; }

/* SECTION COMMON */
.ab-sec-label { font-size:11px; font-weight:600; letter-spacing:2.5px; text-transform:uppercase; color:var(--gold); display:block; margin-bottom:8px; }
.ab-sec-title { font-family:'Playfair Display',serif; font-size:clamp(1.7rem,2.8vw,2.3rem); font-weight:700; color:var(--navy); }
.ab-sec-head { text-align:center; margin-bottom:44px; }

/* FEATURES */
.ab-features { background:var(--cream); padding:72px 5vw; }
.ab-feat-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(210px,1fr)); gap:24px; max-width:1100px; margin:0 auto; }
.ab-feat-card { background:#fff; border-radius:14px; border:1px solid var(--border); padding:28px 24px; transition:transform .25s,box-shadow .25s; }
.ab-feat-card:hover { transform:translateY(-4px); box-shadow:0 12px 36px rgba(29,39,101,.09); }
.ab-feat-icon { width:48px; height:48px; border-radius:12px; background:rgba(29,39,101,.07); display:flex; align-items:center; justify-content:center; font-size:22px; margin-bottom:16px; }
.ab-feat-title { font-family:'Playfair Display',serif; font-size:17px; font-weight:600; color:var(--navy); margin-bottom:8px; }
.ab-feat-desc { font-size:13px; color:var(--txt-mid); line-height:1.65; }

/* CATALOG */
.ab-catalog { padding:72px 5vw 80px; background:var(--white); }
.ab-runner { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-bottom:48px; }
.ab-cat-btn { display:flex; align-items:center; gap:8px; padding:11px 22px; border-radius:50px; border:1.5px solid var(--border); background:#fff; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500; color:var(--txt-mid); transition:all .22s; white-space:nowrap; }
.ab-cat-btn:hover { border-color:var(--navy); color:var(--navy); background:rgba(29,39,101,.04); }
.ab-cat-btn.active { background:var(--navy); border-color:var(--navy); color:#fff; box-shadow:0 4px 18px rgba(29,39,101,.28); }
.ab-cat-count { background:var(--cream); color:var(--txt-lt); font-size:11px; font-weight:600; padding:2px 8px; border-radius:20px; transition:all .22s; }
.ab-cat-btn.active .ab-cat-count { background:rgba(255,255,255,.18); color:#fff; }
.ab-products-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(250px,1fr)); gap:26px; }
.ab-product-card { background:#fff; border-radius:14px; overflow:hidden; border:1px solid var(--border); transition:transform .3s,box-shadow .3s; cursor:pointer; animation:abRiseUp .38s ease both; }
@keyframes abRiseUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
.ab-product-card:hover { transform:translateY(-5px); box-shadow:0 16px 44px rgba(29,39,101,.13); }
.ab-p-img { position:relative; aspect-ratio:4/3; overflow:hidden; background:var(--cream); }
.ab-p-img img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .42s; }
.ab-product-card:hover .ab-p-img img { transform:scale(1.07); }
.ab-p-badge { position:absolute; top:11px; left:11px; font-size:10px; font-weight:600; letter-spacing:1px; text-transform:uppercase; padding:4px 10px; border-radius:4px; }
.ab-p-badge.navy { background:var(--navy); color:#fff; }
.ab-p-badge.gold { background:var(--gold); color:var(--navy-dk); }
.ab-p-body { padding:17px 18px 19px; }
.ab-p-tag { font-size:11px; font-weight:600; letter-spacing:1.4px; text-transform:uppercase; color:var(--gold); margin-bottom:5px; }
.ab-p-name { font-family:'Playfair Display',serif; font-size:17px; font-weight:600; color:var(--navy); margin-bottom:6px; line-height:1.3; }
.ab-p-desc { font-size:13px; color:var(--txt-mid); line-height:1.6; margin-bottom:14px; }


/* ABOUT */
.ab-about { background:var(--navy); padding:80px 5vw; display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:center; }
.ab-about-imgs { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.ab-about-img { border-radius:12px; overflow:hidden; }
.ab-about-img img { width:100%; height:100%; object-fit:cover; display:block; }
.ab-about-img.tall { aspect-ratio:2/3; }
.ab-about-img.sq   { aspect-ratio:1/1; }
.ab-about-img:nth-child(2) { margin-top:36px; }
.ab-about-text .ab-sec-title { color:#fff; margin-bottom:20px; }
.ab-about-text p { font-size:15px; color:rgba(255,255,255,.62); line-height:1.75; margin-bottom:14px; }
.ab-about-list { list-style:none; display:flex; flex-direction:column; gap:10px; margin:22px 0 30px; }
.ab-about-list li { display:flex; align-items:center; gap:10px; font-size:14px; color:rgba(255,255,255,.75); }
.ab-about-list li::before { content:''; display:block; width:6px; height:6px; border-radius:50%; background:var(--gold); flex-shrink:0; }

/* TESTIMONIALS */
.ab-testimonials { background:var(--cream); padding:72px 5vw; }
.ab-testi-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:22px; max-width:1100px; margin:0 auto; }
.ab-testi-card { background:#fff; border-radius:14px; border:1px solid var(--border); padding:26px 24px; transition:box-shadow .25s; }
.ab-testi-card:hover { box-shadow:0 8px 28px rgba(29,39,101,.09); }
.ab-testi-stars { color:var(--gold); font-size:15px; margin-bottom:12px; letter-spacing:2px; }
.ab-testi-text { font-size:14px; color:var(--txt-mid); line-height:1.7; margin-bottom:18px; font-style:italic; }
.ab-testi-author { display:flex; align-items:center; gap:10px; }
.ab-testi-avatar { width:36px; height:36px; border-radius:50%; background:var(--navy); color:#fff; font-size:13px; font-weight:600; display:flex; align-items:center; justify-content:center; }
.ab-testi-name { font-size:13px; font-weight:600; color:var(--navy); }
.ab-testi-loc  { font-size:12px; color:var(--txt-lt); }

/* CONTACT */
.ab-contact { background:var(--white); padding:80px 5vw; display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:start; }
.ab-contact-info .ab-sec-title { margin-bottom:18px; }
.ab-contact-info p { font-size:15px; color:var(--txt-mid); line-height:1.72; margin-bottom:28px; }
.ab-c-details { display:flex; flex-direction:column; gap:16px; }
.ab-c-detail { display:flex; align-items:flex-start; gap:14px; font-size:14px; color:var(--txt-mid); line-height:1.55; }
.ab-c-icon { width:38px; height:38px; border-radius:8px; flex-shrink:0; background:rgba(29,39,101,.07); display:flex; align-items:center; justify-content:center; font-size:18px; }
.ab-c-detail strong { display:block; color:var(--navy); font-size:13px; font-weight:600; margin-bottom:2px; }
.ab-contact-form { background:var(--cream); border-radius:16px; border:1px solid var(--border); padding:34px 30px; }
.ab-form-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.ab-form-group { display:flex; flex-direction:column; gap:7px; margin-bottom:15px; }
.ab-form-group label { font-size:12px; font-weight:600; color:var(--navy); letter-spacing:.5px; text-transform:uppercase; }
.ab-form-group input,
.ab-form-group select,
.ab-form-group textarea { padding:11px 14px; border:1.5px solid var(--border); border-radius:8px; font-family:'DM Sans',sans-serif; font-size:14px; color:var(--txt); background:#fff; transition:border-color .2s; outline:none; resize:none; width:100%; }
.ab-form-group input:focus, .ab-form-group select:focus, .ab-form-group textarea:focus { border-color:var(--navy); }
.ab-btn-submit { width:100%; padding:14px; background:var(--navy); color:#fff; font-family:'DM Sans',sans-serif; font-weight:600; font-size:15px; border:none; border-radius:8px; cursor:pointer; transition:background .2s,transform .15s; letter-spacing:.3px; }
.ab-btn-submit:hover { background:var(--navy-md); transform:translateY(-1px); }

/* FOOTER */
.ab-footer { background:var(--navy-dk); padding:48px 5vw 28px; }
.ab-footer-top { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:2rem; margin-bottom:40px; }
.ab-footer-tagline { font-size:13px; color:rgba(255,255,255,.45); margin-top:10px; line-height:1.65; max-width:240px; }
.ab-footer-col h4 { font-size:11px; font-weight:600; letter-spacing:2px; text-transform:uppercase; color:var(--gold-lt); margin-bottom:16px; }
.ab-footer-col ul { list-style:none; display:flex; flex-direction:column; gap:9px; }
.ab-footer-col ul a { font-size:13px; color:rgba(255,255,255,.5); text-decoration:none; transition:color .2s; cursor:pointer; }
.ab-footer-col ul a:hover { color:rgba(255,255,255,.85); }
.ab-footer-bottom { border-top:1px solid rgba(255,255,255,.08); padding-top:22px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; }
.ab-footer-copy { font-size:12px; color:rgba(255,255,255,.35); }
.ab-footer-copy span { color:var(--gold-lt); }

/* RESPONSIVE */
@media (max-width:900px) {
  .ab-hero, .ab-about, .ab-contact { grid-template-columns:1fr; }
  .ab-hero-imgs, .ab-about-imgs { display:none; }
  .ab-footer-top { grid-template-columns:1fr 1fr; }
}
@media (max-width:600px) {
  .ab-nav-links { display:none; }
  .ab-form-row { grid-template-columns:1fr; }
  .ab-footer-top { grid-template-columns:1fr; }
  .ab-runner { justify-content:flex-start; flex-wrap:nowrap; overflow-x:auto; padding-bottom:6px; scrollbar-width:none; }
  .ab-runner::-webkit-scrollbar { display:none; }
}
`;

/* ── Data ── */
const CATS = [
  { id: "handbags",  label: "Handbags",    icon: "👜", count: 6 },
  { id: "backpacks", label: "Backpacks",   icon: "🎒", count: 6 },
  { id: "luggage",   label: "Luggage",     icon: "🧳", count: 6 },
  { id: "wallets",   label: "Wallets",     icon: "👛", count: 6 },
  { id: "school",    label: "School Bags", icon: "📚", count: 6 },
];

const PRODUCTS = {
  handbags: [
    { name: "Elegance Tote",       desc: "Spacious structured tote in premium faux leather with magnetic snap closure.",       price: "₹1,299", badge: "Bestseller", bt: "gold", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=75" },
    { name: "Classic Satchel",     desc: "Timeless satchel with adjustable strap and multiple inner pockets.",                 price: "₹999",   badge: "",           bt: "",     img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=75" },
    { name: "Mini Crossbody",      desc: "Compact everyday crossbody with zip-around design. Available in 6 colours.",         price: "₹749",   badge: "New",        bt: "navy", img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500&q=75" },
    { name: "Office Shoulder Bag", desc: "Professional shoulder bag that fits a 13\" laptop with padded back panel.",          price: "₹1,499", badge: "",           bt: "",     img: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&q=75" },
    { name: "Woven Bucket Bag",    desc: "Chic woven-pattern bucket bag with drawstring and leather-look handle.",             price: "₹879",   badge: "",           bt: "",     img: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&q=75" },
    { name: "Chain Detail Clutch", desc: "Evening clutch with gold-tone chain strap and satin inner lining.",                  price: "₹599",   badge: "",           bt: "",     img: "https://images.unsplash.com/photo-1575032617751-6ddec2089882?w=500&q=75" },
  ],
  backpacks: [
    { name: "Urban Commuter",    desc: "Anti-theft backpack with USB charging port and waterproof reinforced base.",    price: "₹1,599", badge: "Bestseller", bt: "gold", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=75" },
    { name: "Canvas Day Pack",   desc: "Lightweight canvas pack with leather trims. Perfect for daily outings.",        price: "₹899",   badge: "",           bt: "",     img: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=75" },
    { name: 'Laptop Pro 15"',    desc: "Dedicated padded 15\" laptop sleeve, organiser panel, and raincover included.", price: "₹1,899", badge: "New",        bt: "navy", img: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=500&q=75" },
    { name: "Hiking Trail Pack", desc: "40L capacity with chest harness, hip belt, and ventilated back panel.",         price: "₹2,199", badge: "",           bt: "",     img: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=500&q=75" },
    { name: "Mini Backpack",     desc: "Trendy mini pack with zip pockets. Great as a casual carry-on.",                price: "₹699",   badge: "",           bt: "",     img: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=500&q=75" },
    { name: "Rolling Backpack",  desc: "Convertible backpack with built-in wheels for travel or daily commute.",        price: "₹2,499", badge: "",           bt: "",     img: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=500&q=75" },
  ],
  luggage: [
    { name: 'Hardshell Cabin 20"', desc: '20" polycarbonate hardshell spinner with TSA-approved combination lock.',         price: "₹3,499", badge: "Bestseller", bt: "gold", img: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=500&q=75" },
    { name: 'Check-In 28"',        desc: 'Large 28" hardshell with expandable zipper for extra packing capacity.',          price: "₹4,299", badge: "",           bt: "",     img: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=500&q=75" },
    { name: "Canvas Duffle",       desc: "Roomy duffle with shoe compartment. Folds flat when empty.",                     price: "₹1,299", badge: "",           bt: "",     img: "https://images.unsplash.com/photo-1553531384-411a247ccd73?w=500&q=75" },
    { name: 'Softside 24" Set',    desc: "Expandable softside with front pocket organiser. Comes as a set of 2.",          price: "₹3,799", badge: "New",        bt: "navy", img: "https://images.unsplash.com/photo-1527264935190-1401c51b5bbc?w=500&q=75" },
    { name: "Garment Carrier",     desc: "Folding garment bag with suit compartment and convenient carry handle.",         price: "₹1,799", badge: "",           bt: "",     img: "https://images.unsplash.com/photo-1473188588951-666fce8e7c68?w=500&q=75" },
    { name: 'Premium Trolley 26"', desc: 'Aluminium-frame trolley with silent 360° spinner wheels and TSA lock.',          price: "₹5,499", badge: "",           bt: "",     img: "https://images.unsplash.com/photo-1513682121497-80211f36a7d3?w=500&q=75" },
  ],
  wallets: [
    { name: "Bifold Slim Wallet", desc: "Ultra-thin bifold in genuine leather. Holds 8 cards comfortably.",               price: "₹499", badge: "Bestseller", bt: "gold", img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=75" },
    { name: "Zip-Around Purse",   desc: "Compact zip purse with coin pouch and clear ID window.",                         price: "₹649", badge: "",           bt: "",     img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&q=75" },
    { name: "RFID Card Holder",   desc: "Minimalist 6-slot card holder with RFID blocking technology built in.",          price: "₹349", badge: "New",        bt: "navy", img: "https://images.unsplash.com/photo-1601592992997-e2b80eb79ef5?w=500&q=75" },
    { name: "Long Fold Wallet",   desc: "Full-length wallet with cheque book slot and 12 card slots inside.",             price: "₹799", badge: "",           bt: "",     img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=75" },
    { name: "Men's Trifold",      desc: "Classic men's trifold in textured leather. Strong stitching throughout.",        price: "₹599", badge: "",           bt: "",     img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&q=75" },
    { name: "Wristlet Wallet",    desc: "Phone-sized wristlet wallet in vegan leather with detachable wrist strap.",      price: "₹549", badge: "",           bt: "",     img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=75" },
  ],
  school: [
    { name: "Junior Scholar 18L",  desc: "Colourful 18L bag with padded shoulder straps for kids up to class 6.",        price: "₹599",   badge: "Bestseller", bt: "gold", img: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&q=75" },
    { name: "Wheeled Trolley Bag", desc: "20L trolley school bag with retractable handle and stationery pocket.",         price: "₹899",   badge: "",           bt: "",     img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=75" },
    { name: "Senior Laptop Bag",   desc: "30L water-resistant backpack with separate 15\" laptop sleeve for teens.",     price: "₹1,199", badge: "New",        bt: "navy", img: "https://images.unsplash.com/photo-1576613109753-27804de2cebf?w=500&q=75" },
    { name: "Cartoon Print Bag",   desc: "Fun printed 15L toddler bag with bright colours and reflective safety strips.", price: "₹449",   badge: "",           bt: "",     img: "https://images.unsplash.com/photo-1597348989645-1fddc9e7c01e?w=500&q=75" },
    { name: "Sports Kit Bag",      desc: "Separate compartments for shoes, water bottle, and sports equipment.",          price: "₹749",   badge: "",           bt: "",     img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500&q=75" },
    { name: "Ergonomic Spine Safe",desc: "Orthopaedic back-support bag with advanced weight-distribution technology.",    price: "₹1,399", badge: "",           bt: "",     img: "https://images.unsplash.com/photo-1553531384-411a247ccd73?w=500&q=75" },
  ],
};

/* ── Sub-components ── */

function Nav({ activeSection }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <nav className="ab-nav">
      <a className="ab-logo" onClick={() => scrollTo("home")}>
        <div className="ab-logo-mark">A</div>
        <span className="ab-logo-name">Arvind <b>Bags</b></span>
      </a>
      <ul className="ab-nav-links">
        {[["features","Why Us"],["about","About"],["testimonials","Reviews"]].map(([id, label]) => (
          <li key={id}>
            <a className={activeSection === id ? "active-link" : ""} onClick={() => scrollTo(id)}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="home" className="ab-hero">
      <div>
        <div className="ab-hero-badge">Est. 1985 · Thoothukudi, Tamil Nadu</div>
        <h1>Bags Built for <em>Every Journey</em> You Take</h1>
        <p>From daily commutes to cross-country adventures — Arvind Bags delivers durable, stylish, and affordable bags trusted by thousands across India.</p>

      </div>
      <div className="ab-hero-imgs">
        <div className="ab-hero-img"><img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=420&q=80" alt="Handbag" /></div>
        <div className="ab-hero-img"><img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=420&q=80" alt="Backpack" /></div>
        <div className="ab-hero-chip">
          <div className="ab-hero-chip-num">500+</div>
          <div className="ab-hero-chip-lbl">Products</div>
        </div>
      </div>
    </section>
  );
}

function StatsStrip() {
  const stats = [
    { num: "38+",     lbl: "Years in Business" },
    { num: "500+",    lbl: "Product Varieties" },
    { num: "50K+",    lbl: "Happy Customers" },
    { num: "5",       lbl: "Categories" },
    { num: "PAN India", lbl: "Shipping" },
  ];
  return (
    <div className="ab-stats-strip">
      {stats.map((s) => (
        <div className="ab-stat-item" key={s.lbl}>
          <div className="ab-stat-num">{s.num}</div>
          <div className="ab-stat-lbl">{s.lbl}</div>
        </div>
      ))}
    </div>
  );
}

function Features() {
  const items = [
    { icon: "🏅", title: "Premium Materials", desc: "Every bag uses high-grade faux leather, canvas, and nylon for lasting durability in any condition." },
    { icon: "💰", title: "Wholesale Pricing",  desc: "Competitive bulk pricing for retailers and institutions across Tamil Nadu and beyond." },
    { icon: "🚚", title: "Fast Delivery",      desc: "Same-day dispatch for local orders. Pan-India shipping delivered within 3–5 business days." },
    { icon: "🔄", title: "Easy Returns",       desc: "Hassle-free 7-day return policy. We stand behind every single product we make and ship." },
  ];
  return (
    <section id="features" className="ab-features">
      <div className="ab-sec-head">
        <span className="ab-sec-label">Why Choose Us</span>
        <h2 className="ab-sec-title">Quality You Can Count On</h2>
      </div>
      <div className="ab-feat-grid">
        {items.map((f) => (
          <div className="ab-feat-card" key={f.title}>
            <div className="ab-feat-icon">{f.icon}</div>
            <div className="ab-feat-title">{f.title}</div>
            <div className="ab-feat-desc">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Catalog() {
  const [active, setActive] = useState("handbags");
  const cat = CATS.find((c) => c.id === active);

  return (
    <section id="catalog" className="ab-catalog">
      <div className="ab-sec-head">
        <span className="ab-sec-label">Our Collections</span>
        <h2 className="ab-sec-title">Browse by Category</h2>
      </div>

      {/* Category runner */}
      <div className="ab-runner">
        {CATS.map((c) => (
          <button
            key={c.id}
            className={`ab-cat-btn${active === c.id ? " active" : ""}`}
            onClick={() => setActive(c.id)}
          >
            <span>{c.icon}</span>
            {c.label}
            <span className="ab-cat-count">{c.count}</span>
          </button>
        ))}
      </div>

      {/* Products grid */}
      <div className="ab-products-grid">
        {(PRODUCTS[active] || []).map((p, i) => (
          <div
            className="ab-product-card"
            key={p.name}
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <div className="ab-p-img">
              <img src={p.img} alt={p.name} loading="lazy" />
              {p.badge && (
                <div className={`ab-p-badge ${p.bt}`}>{p.badge}</div>
              )}
            </div>
            <div className="ab-p-body">
              <div className="ab-p-tag">{cat.label}</div>
              <div className="ab-p-name">{p.name}</div>
              <div className="ab-p-desc">{p.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="about" className="ab-about">
      <div className="ab-about-imgs">
        <div className="ab-about-img tall"><img src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80" alt="Bags" /></div>
        <div className="ab-about-img sq"><img src="https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&q=80" alt="Bags display" /></div>
        <div></div>
        <div className="ab-about-img tall"><img src="https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400&q=80" alt="Luggage" /></div>
      </div>
      <div className="ab-about-text">
        <span className="ab-sec-label">Our Story</span>
        <h2 className="ab-sec-title">Four Decades of Craftsmanship</h2>
        <p>Founded in 1985 in the heart of Thoothukudi, we began as a small workshop stitching school bags for local students. Today, we are one of South India's most trusted bag manufacturers.</p>
        <p>Every product that leaves our facility reflects generations of skill, attention to detail, and a commitment to making bags that last for years.</p>
        <ul className="ab-about-list">
          {[
            "Manufactured in Thoothukudi, Tamil Nadu",
            "ISO-certified production facility",
            "Over 50 skilled artisans on our team",
            "Custom branding and bulk orders available",
            "Environmentally responsible materials used",
          ].map((item) => <li key={item}>{item}</li>)}
        </ul>
        <a className="ab-btn-gold" onClick={() => scrollTo("contact")} style={{ cursor: "pointer" }}>Partner With Us</a>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { stars: "★★★★★", text: "Bought a set of school bags for our entire school — excellent quality and very affordable bulk pricing. Delivery was on time. Highly recommended!", initials: "RK", name: "Ramesh Kumar", loc: "School Principal, Madurai" },
    { stars: "★★★★★", text: "The handbags I ordered were even better in person. Stitching is super strong and the designs are trendy. Will definitely order again for my boutique.", initials: "PS", name: "Priya Subramani", loc: "Retailer, Chennai" },
    { stars: "★★★★☆", text: "Ordered 200 branded backpacks for our corporate event. Custom logo printing was clean and neat. Great customer service throughout the whole process.", initials: "AJ", name: "Arun Jeyaraj", loc: "Corporate Client, Coimbatore" },
  ];
  return (
    <section id="testimonials" className="ab-testimonials">
      <div className="ab-sec-head">
        <span className="ab-sec-label">Customer Reviews</span>
        <h2 className="ab-sec-title">What Our Customers Say</h2>
      </div>
      <div className="ab-testi-grid">
        {items.map((t) => (
          <div className="ab-testi-card" key={t.name}>
            <div className="ab-testi-stars">{t.stars}</div>
            <div className="ab-testi-text">"{t.text}"</div>
            <div className="ab-testi-author">
              <div className="ab-testi-avatar">{t.initials}</div>
              <div>
                <div className="ab-testi-name">{t.name}</div>
                <div className="ab-testi-loc">{t.loc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", enquiry: "", message: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = () => {
    alert("Thank you! We'll get back to you within 24 hours.");
    setForm({ firstName: "", lastName: "", email: "", phone: "", enquiry: "", message: "" });
  };

  return (
    <section id="contact" className="ab-contact">
      <div className="ab-contact-info">
        <span className="ab-sec-label">Get in Touch</span>
        <h2 className="ab-sec-title">Let's Talk Bags</h2>
        <p>Whether you need retail orders, bulk quantities, or custom-branded bags for your business — we're ready to help. Fill in the form and we'll get back within 24 hours.</p>
        <div className="ab-c-details">
          {[
            { icon: "📍", label: "Address",        info: "45, Bag Market Street, Thoothukudi – 628 001, Tamil Nadu" },
            { icon: "📞", label: "Phone",           info: "+91 98765 43210  |  +91 98765 43211" },
            { icon: "✉️", label: "Email",           info: "orders@arvindbags.in" },
            { icon: "🕐", label: "Business Hours",  info: "Monday – Saturday, 9:00 AM – 7:00 PM IST" },
          ].map((d) => (
            <div className="ab-c-detail" key={d.label}>
              <div className="ab-c-icon">{d.icon}</div>
              <div><strong>{d.label}</strong>{d.info}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="ab-contact-form">
        <div className="ab-form-row">
          <div className="ab-form-group">
            <label>First Name</label>
            <input type="text" placeholder="Ravi" value={form.firstName} onChange={set("firstName")} />
          </div>
          <div className="ab-form-group">
            <label>Last Name</label>
            <input type="text" placeholder="Kumar" value={form.lastName} onChange={set("lastName")} />
          </div>
        </div>
        <div className="ab-form-group">
          <label>Email Address</label>
          <input type="email" placeholder="ravi@example.com" value={form.email} onChange={set("email")} />
        </div>
        <div className="ab-form-group">
          <label>Phone Number</label>
          <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} />
        </div>
        <div className="ab-form-group">
          <label>Enquiry Type</label>
          <select value={form.enquiry} onChange={set("enquiry")}>
            <option value="">Select an option</option>
            <option>Retail Order</option>
            <option>Wholesale / Bulk Order</option>
            <option>Custom Branding</option>
            <option>Product Information</option>
            <option>Other</option>
          </select>
        </div>
        <div className="ab-form-group">
          <label>Message</label>
          <textarea rows="4" placeholder="Tell us about your order requirements…" value={form.message} onChange={set("message")} />
        </div>
        <button className="ab-btn-submit" onClick={handleSubmit}>Send Enquiry →</button>
      </div>
    </section>
  );
}

function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer className="ab-footer">
      <div className="ab-footer-top">
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: "#fff" }}>
            Arvind <b style={{ color: "var(--gold-lt)" }}>Bags</b>
          </div>
          <p className="ab-footer-tagline">Crafting quality bags for every journey since 1985. Proudly made in Thoothukudi, Tamil Nadu.</p>
        </div>
        <div className="ab-footer-col">
          <h4>Products</h4>
          <ul>
            {["Handbags","Backpacks","Luggage","Wallets","School Bags"].map((p) => (
              <li key={p}><a onClick={() => scrollTo("catalog")}>{p}</a></li>
            ))}
          </ul>
        </div>
        <div className="ab-footer-col">
          <h4>Company</h4>
          <ul>
            {[["about","About Us"],["features","Why Us"],["testimonials","Reviews"],["contact","Contact"]].map(([id, label]) => (
              <li key={id}><a onClick={() => scrollTo(id)}>{label}</a></li>
            ))}
          </ul>
        </div>
        <div className="ab-footer-col">
          <h4>Policies</h4>
          <ul>
            {["Shipping Policy","Returns","Privacy Policy","Terms of Use"].map((p) => (
              <li key={p}><a href="#">{p}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="ab-footer-bottom">
        <p className="ab-footer-copy">© 2025 <span>Arvind Bags</span>. All rights reserved. Thoothukudi, Tamil Nadu.</p>
        <p className="ab-footer-copy">Made with ♥ in India</p>
      </div>
    </footer>
  );
}

/* ── Root App ── */
export default function ArvindBags() {
  const [activeSection, setActiveSection] = useState("home");

  // Inject styles once
  useEffect(() => {
    const id = "arvind-bags-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = STYLES;
      document.head.appendChild(el);
    }
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  // Active nav on scroll
  useEffect(() => {
    const ids = ["home","features","catalog","about","testimonials","contact"];
    const handler = () => {
      const y = window.scrollY + 100;
      let cur = "";
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
      });
      setActiveSection(cur);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <Nav activeSection={activeSection} />
      <Hero />
      <StatsStrip />
      <Features />
      <Catalog />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}