[README.md](https://github.com/user-attachments/files/22061497/README.md)
# Bybit Logger + Proxy (Public Repo Ready)

This repo gives you a simple **Node.js proxy** to bypass Bybit's 403 country block and a **Google Apps Script** logger that fetches data **via the proxy** and (optionally) appends it to Google Sheets.

---

## Folder Structure
```
bybit-logger-proxy/
├─ proxy-server/
│  ├─ server.js        # Node.js proxy (Express)
│  ├─ package.json     # Dependencies
├─ apps-script/
│  ├─ Code.gs          # Google Apps Script (paste into Apps Script editor)
└─ .gitignore
```

---

## Quick Start (Proxy)

1. **Install Node.js 18+** on your machine.
2. Open a terminal and run:
   ```bash
   cd proxy-server
   npm install
   npm start
   ```
3. The proxy runs on `http://localhost:3000`.

### Deploy (one of many ways)
- Any Node host works (Render, Fly.io, Railway, VPS, etc.).
- Make sure port is open and the service URL is public (e.g. `https://yourapp.onrender.com`).

**Optional env:**  
- `BYBIT_BASE` (default `api.bybit.com`). If needed, set to `api.bybitglobal.com`.

**Endpoints you call from Apps Script:**  
- `GET /health` → quick check  
- `GET /bybit/<ANY_BYBIT_PATH>?<query>` → forwards to `https://api.bybit.com/<ANY_BYBIT_PATH>?<query>`

Example:
```
GET https://YOUR_PROXY_URL/bybit/v5/market/recent-trade?category=linear&symbol=BTCUSDT&limit=5
```

---

## Google Apps Script (Logger)

1. In Google Sheets, go to **Extensions → Apps Script**.
2. Create a new script file and paste **apps-script/Code.gs** contents.
3. Replace `PROXY_BASE_URL` with your deployed proxy URL.
4. Run `fetchBybitTrades()` to test. (Authorize when prompted.)

If you want to write to your sheet, set `SHEET_NAME` (defaults to `"BybitTrades"`). The script creates the sheet if it doesn't exist.

---

## Notes
- This setup calls **public market endpoints**. If you later add **private endpoints**, never store secrets in client-side places; keep them on the proxy and add auth server-side.
- If `api.bybit.com` doesn’t work for your region from the proxy location, set `BYBIT_BASE=api.bybitglobal.com` in hosting env.
