import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
const BYBIT_BASE = process.env.BYBIT_BASE || "api.bybit.com"; // or "api.bybitglobal.com"

app.use(cors());
app.use(express.json());

// Simple health check
app.get("/health", (req, res) => {
  res.json({ ok: true, message: "bybit proxy running" });
});

// Generic passthrough for any GET path under /bybit/*
app.get("/bybit/*", async (req, res) => {
  try {
    const targetPath = req.params[0] || "";
    const query = req.url.split("?")[1] || "";
    const url = `https://${BYBIT_BASE}/${targetPath}${query ? "?" + query : ""}`;

    const upstream = await fetch(url, {
      method: "GET",
      headers: { "Accept": "application/json" },
    });

    const text = await upstream.text();
    res.status(upstream.status);
    // Try to pass JSON when possible
    try {
      const data = JSON.parse(text);
      res.json(data);
    } catch {
      res.send(text);
    }
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
