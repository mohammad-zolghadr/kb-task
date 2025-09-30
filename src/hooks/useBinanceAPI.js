import { useState, useEffect, useCallback } from "react"
import binanceAPI from "../services/binanceAPI"

export const useBinanceAPI = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const makeRequest = useCallback(async (requestFn) => {
    setLoading(true)
    setError(null)

    try {
      const result = await requestFn()
      return result
    } catch (err) {
      setError(err.message)
      console.error("Binance API error:", err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    error,
    makeRequest,
    clearError: () => setError(null),
  }
}

export const useSymbolPrice = (symbol) => {
  const [price, setPrice] = useState(null)
  const { loading, error, makeRequest } = useBinanceAPI()

  const fetchPrice = useCallback(async () => {
    if (!symbol) return

    const data = await makeRequest(() => binanceAPI.getSymbolPrice(symbol))
    setPrice(data)
  }, [symbol, makeRequest])

  useEffect(() => {
    fetchPrice()
  }, [fetchPrice])

  return { price, loading, error, refetch: fetchPrice }
}

export const useMultipleSymbolPrices = (symbols) => {
  const [prices, setPrices] = useState([])
  const { loading, error, makeRequest } = useBinanceAPI()

  const fetchPrices = useCallback(async () => {
    if (!symbols || symbols.length === 0) return

    const data = await makeRequest(() =>
      binanceAPI.getMultipleSymbolPrices(symbols)
    )
    setPrices(data)
  }, [symbols, makeRequest])

  useEffect(() => {
    fetchPrices()
  }, [fetchPrices])

  return { prices, loading, error, refetch: fetchPrices }
}

export const useMultipleTickers = (symbols) => {
  const [tickers, setTickers] = useState([])
  const { loading, error, makeRequest } = useBinanceAPI()

  const fetchTickers = useCallback(async () => {
    if (!symbols || symbols.length === 0) return

    const data = await makeRequest(() =>
      binanceAPI.getMultipleTickers24hr(symbols)
    )
    setTickers(data)
  }, [symbols, makeRequest])

  useEffect(() => {
    fetchTickers()
  }, [fetchTickers])

  return { tickers, loading, error, refetch: fetchTickers }
}

export const useRecentTrades = (symbol, limit = 20) => {
  const [trades, setTrades] = useState([])
  const { loading, error, makeRequest } = useBinanceAPI()

  const fetchTrades = useCallback(async () => {
    if (!symbol) return

    const data = await makeRequest(() =>
      binanceAPI.getRecentTrades(symbol, limit)
    )
    setTrades(data)
  }, [symbol, limit, makeRequest])

  useEffect(() => {
    fetchTrades()
  }, [fetchTrades])

  return { trades, loading, error, refetch: fetchTrades }
}

export const useKlines = (symbol, interval = "1m", limit = 100) => {
  const [klines, setKlines] = useState([])
  const { loading, error, makeRequest } = useBinanceAPI()

  const fetchKlines = useCallback(async () => {
    if (!symbol) return

    const data = await makeRequest(() =>
      binanceAPI.getKlines(symbol, interval, limit)
    )
    setKlines(data)
  }, [symbol, interval, limit, makeRequest])

  useEffect(() => {
    fetchKlines()
  }, [fetchKlines])

  return { klines, loading, error, refetch: fetchKlines }
}
