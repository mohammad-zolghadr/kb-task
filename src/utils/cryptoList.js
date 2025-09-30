export const POPULAR_CRYPTOS = [
  { symbol: "BTCUSDT", name: "Bitcoin", icon: "₿" },
  { symbol: "ETHUSDT", name: "Ethereum", icon: "Ξ" },
  { symbol: "SOLUSDT", name: "Solana", icon: "◎" },
  { symbol: "ADAUSDT", name: "Cardano", icon: "₳" },
  { symbol: "XRPUSDT", name: "Ripple", icon: "✕" },
  { symbol: "DOTUSDT", name: "Polkadot", icon: "●" },
  { symbol: "LINKUSDT", name: "Chainlink", icon: "⬡" },
  { symbol: "LTCUSDT", name: "Litecoin", icon: "Ł" },
  { symbol: "BCHUSDT", name: "Bitcoin Cash", icon: "₿" },
  { symbol: "UNIUSDT", name: "Uniswap", icon: "🦄" },
  { symbol: "MATICUSDT", name: "Polygon", icon: "⬟" },
  { symbol: "AVAXUSDT", name: "Avalanche", icon: "🔺" },
  { symbol: "ATOMUSDT", name: "Cosmos", icon: "⚛" },
  { symbol: "ALGOUSDT", name: "Algorand", icon: "△" },
  { symbol: "VETUSDT", name: "VeChain", icon: "V" },
]

export const getCryptoInfo = (symbol) => {
  return (
    POPULAR_CRYPTOS.find((crypto) => crypto.symbol === symbol) || {
      symbol,
      name: symbol.replace("USDT", ""),
      icon: "○",
    }
  )
}
