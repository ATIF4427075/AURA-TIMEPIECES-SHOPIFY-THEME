# 👑 AURA TIMEPIECES — Luxury Watches Shopify Online Store 2.0 & Storefront

Official e-commerce storefront and production-ready Shopify Online Store 2.0 Theme for **PAGANI DESIGN**, **BENYAR**, and **NAVIFORCE** luxury timepieces.

---

## 🌟 Key Highlights & Architecture

- **Shopify Online Store 2.0 Compliant:** Strict Liquid 2.0 template architecture (`layout/`, `templates/*.json`, `sections/`, `snippets/`, `config/`, `locales/`, `assets/`).
- **Zero-Dependency Web Audio API Sound Engine:** Realistic mechanical escapement ticking, bezel clicks, crown winding, and purchase sound effects.
- **High-Conversion CRO Features:**
  - Slide-out interactive Cart Drawer with animated Free Insured Express Courier progress bar.
  - 1-Click Buy Now & Express Cash on Delivery (COD) Checkout Simulator.
  - Complimentary Caseback Laser Engraving preview.
  - Multi-Currency Live Converter (PKR ₨, USD $, EUR €, GBP £, AED د.إ, JPY ¥).
  - Quick-View product modal & interactive macro dial inspection.
  - Verified customer reviews & technical horological specification tables.
- **Universal Image Resilience:** High-reliability fallback engine (`images-data.js`) ensuring 100% asset uptime across all CDNs, local servers, and preview environments.

---

## 📂 Project Structure

```text
SHOPIFY STORE WATCHES/
├── assets/                    # Theme stylesheets, JavaScript engines & watch photography
│   ├── main.css              # Master Luxury Dark & 18K Gold Stylesheet
│   ├── theme.js              # State manager, Cart, Currency & Checkout engine
│   ├── audio.js              # Horological sound synthesis engine
│   ├── products.js           # Full catalog dataset (Pagani, Benyar, Naviforce)
│   └── images-data.js        # Universal offline-safe asset resilience engine
├── config/
│   ├── settings_schema.json  # Shopify Theme Customizer configuration
│   └── settings_data.json    # Default theme customizer settings
├── layout/
│   └── theme.liquid          # Master Shopify layout wrapper
├── locales/
│   └── en.default.json       # Translation dictionary
├── sections/                 # 26 Shopify 2.0 Liquid Section Modules
├── snippets/                 # Reusable Liquid Snippets (Product cards, Cart drawer, etc.)
├── templates/                # JSON Templates (Index, Product, Collection, Cart, 404, Pages)
├── demo-data/
│   └── products.csv          # Standard Shopify 1-Click Importable CSV
├── pages/                    # Supplementary static pages (About, Contact, Policies)
├── index.html                # Standalone full-featured local web application
├── build_shopify_zip.py      # Automated POSIX-normalized theme packager
└── AURA-TIMEPIECES-SHOPIFY-THEME.zip # Ready-to-upload Shopify Theme Package
```

---

## 🚀 Installation & Usage

### 1. Upload to Shopify:
1. Open your **Shopify Admin Dashboard**.
2. Navigate to **Online Store > Themes**.
3. Under *Theme library*, click **Add theme > Upload zip file**.
4. Select `AURA-TIMEPIECES-SHOPIFY-THEME.zip` and click **Upload**.
5. Once uploaded, click **Publish** or **Customize**.

### 2. Import Products:
1. Go to **Products > Import** in Shopify Admin.
2. Select `demo-data/products.csv` and click **Upload and continue**.

### 3. Run Locally:
Open `index.html` directly in any web browser, or serve using Python:
```bash
python -m http.server 8080
```
Then visit: `http://localhost:8080/index.html`

---

## 🛡️ License & Copyright
© 2026 Aura Timepieces & Chrono Luxury Horology. All rights reserved.
