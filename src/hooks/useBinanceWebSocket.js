import { useState, useEffect, useCallback, useRef } from "react"
import websocketService from "../services/websocketService"

export const useBinanceWebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState("disconnected")
  const [error, setError] = useState(null)

  const handleError = useCallback((error) => {
    setError(error.message)
    setConnectionStatus("error")
  }, [])

  const handleClose = useCallback(() => {
    setConnectionStatus("disconnected")
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    connectionStatus,
    error,
    clearError,
    handleError,
    handleClose,
  }
}

export const useTickerStream = (symbols) => {
  const [tickers, setTickers] = useState(new Map())
  const [loading, setLoading] = useState(true)
  const { connectionStatus, error, handleError, handleClose } =
    useBinanceWebSocket()
  const wsRef = useRef(null)

  const handleTickerUpdate = useCallback((data) => {
    if (data.stream && data.data) {
      // Handle multiple ticker updates
      const symbol = data.data.s
      setTickers((prev) => new Map(prev).set(symbol, data.data))
    } else if (data.s) {
      // Handle single ticker update
      setTickers((prev) => new Map(prev).set(data.s, data))
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!symbols || symbols.length === 0) {
      setLoading(false)
      return
    }

    setLoading(true)
    let isCancelled = false

    const streams = symbols.map((symbol) => `${symbol.toLowerCase()}@ticker`)
    const streamKey = streams.join("/")

    const localHandleTickerUpdate = (data) => {
      if (isCancelled) return
      handleTickerUpdate(data)
    }

    wsRef.current = websocketService.subscribeTickers(
      symbols,
      localHandleTickerUpdate,
      handleError
    )

    return () => {
      isCancelled = true
      websocketService.disconnect(streamKey)
    }
  }, [symbols, handleTickerUpdate, handleError])

  return {
    tickers: Object.fromEntries(tickers),
    loading,
    connectionStatus,
    error,
  }
}

export const useTradeStream = (symbol) => {
  const [trades, setTrades] = useState([])
  const [loading, setLoading] = useState(true)
  const { connectionStatus, error, handleError } = useBinanceWebSocket()
  const wsRef = useRef(null)
  const maxTrades = 20

  const handleTradeUpdate = useCallback((data) => {
    const trade = {
      id: data.t,
      price: data.p,
      quantity: data.q,
      time: data.T,
      isBuyerMaker: data.m,
      symbol: data.s,
    }

    setTrades((prev) => {
      const newTrades = [trade, ...prev.slice(0, maxTrades - 1)]
      return newTrades
    })
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!symbol) {
      setLoading(false)
      return
    }

    setLoading(true)
    setTrades([])

    let isCancelled = false
    const socketId = `${symbol.toLowerCase()}@trade`

    const localHandleTradeUpdate = (data) => {
      if (isCancelled) return
      handleTradeUpdate(data)
    }

    wsRef.current = websocketService.subscribeTrades(
      symbol,
      localHandleTradeUpdate,
      handleError
    )

    return () => {
      isCancelled = true
      websocketService.disconnect(socketId)
    }
  }, [symbol, handleTradeUpdate, handleError])

  return {
    trades,
    loading,
    connectionStatus,
    error,
  }
}

export const useKlineStream = (symbol, interval = "1m") => {
  const [klines, setKlines] = useState([])
  const [loading, setLoading] = useState(true)
  const { connectionStatus, error, handleError } = useBinanceWebSocket()
  const wsRef = useRef(null)

  const handleKlineUpdate = useCallback((data) => {
    if (data.k) {
      const kline = {
        openTime: data.k.t,
        closeTime: data.k.T,
        symbol: data.k.s,
        interval: data.k.i,
        open: parseFloat(data.k.o),
        high: parseFloat(data.k.h),
        low: parseFloat(data.k.l),
        close: parseFloat(data.k.c),
        volume: parseFloat(data.k.v),
        isClosed: data.k.x,
      }

      setKlines((prev) => {
        const newKlines = [...prev]
        const existingIndex = newKlines.findIndex(
          (k) => k.openTime === kline.openTime
        )

        if (existingIndex >= 0) {
          newKlines[existingIndex] = kline
        } else {
          newKlines.push(kline)
        }

        return newKlines.sort((a, b) => a.openTime - b.openTime).slice(-100)
      })
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!symbol) {
      setLoading(false)
      return
    }

    setLoading(true)
    setKlines([])

    let isCancelled = false

    const socketId = `${symbol.toLowerCase()}@kline_${interval}`

    const localHandleUpdate = (data) => {
      if (isCancelled) return
      handleKlineUpdate(data)
    }

    wsRef.current = websocketService.subscribeKlines(
      symbol,
      interval,
      localHandleUpdate,
      handleError
    )

    return () => {
      isCancelled = true
      websocketService.disconnect(socketId)
    }
  }, [symbol, interval, handleKlineUpdate, handleError])

  return {
    klines,
    loading,
    connectionStatus,
    error,
  }
}
