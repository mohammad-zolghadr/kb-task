export const API_ENDPOINTS = {
  TICKER_PRICE: "/ticker/price",
  RECENT_TRADES: "/trades",
  KLINES: "/klines",
}

export const WS_STREAMS = {
  TICKER: "@ticker",
  TRADE: "@trade",
  KLINE: "@kline_1m",
}

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
}

export const LOCAL_STORAGE_KEYS = {
  THEME: "crypto-dashboard-theme",
  WATCHLIST: "crypto-dashboard-watchlist",
}

export const DEFAULT_WATCHLIST = ["BTCUSDT", "ETHUSDT", "SOLUSDT"]

export const REFRESH_INTERVALS = {
  PRICE_UPDATE: 1000, // 1s
  TRADE_UPDATE: 2000, // 2s
  CHART_UPDATE: 60000, // 1m
}
