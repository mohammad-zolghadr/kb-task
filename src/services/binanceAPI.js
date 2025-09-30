const BASE_URL =
  process.env.NEXT_PUBLIC_BINANCE_API_URL || "https://api.binance.com/api/v3"

class BinanceAPI {
  constructor() {
    this.baseURL = BASE_URL
  }

  async request(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Binance API request failed:", error)
      throw error
    }
  }

  async getSymbolPrice(symbol) {
    return this.request(`/ticker/price?symbol=${symbol}`)
  }

  async getTicker24hr(symbol) {
    return this.request(`/ticker/24hr?symbol=${symbol}`)
  }

  async getMultipleSymbolPrices(symbols) {
    if (!symbols || symbols.length === 0) return []

    const symbolsParam = symbols.map((s) => `"${s}"`).join(",")
    return this.request(`/ticker/price?symbols=[${symbolsParam}]`)
  }

  async getMultipleTickers24hr(symbols) {
    if (!symbols || symbols.length === 0) return []

    const symbolsParam = symbols.map((s) => `"${s}"`).join(",")
    return this.request(`/ticker/24hr?symbols=[${symbolsParam}]`)
  }

  async getRecentTrades(symbol, limit = 20) {
    return this.request(`/trades?symbol=${symbol}&limit=${limit}`)
  }

  async getKlines(symbol, interval = "1m", limit = 100) {
    return this.request(
      `/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
    )
  }

  async getExchangeInfo() {
    return this.request("/exchangeInfo")
  }

  async getServerTime() {
    return this.request("/time")
  }
}

export default new BinanceAPI()
