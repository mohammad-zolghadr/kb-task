const WS_BASE_URL =
  process.env.NEXT_PUBLIC_BINANCE_WS_URL || "wss://stream.binance.com:9443/ws"

class WebSocketService {
  constructor() {
    this.connections = new Map()
    this.subscriptions = new Map()
    this.reconnectAttempts = new Map()
    this.maxReconnectAttempts = 5
    this.reconnectDelay = 1000
  }

  // Create a WebSocket connection for specific streams
  connect(streamName, onMessage, onError = null, onClose = null) {
    if (this.connections.has(streamName)) {
      this.disconnect(streamName)
    }

    const ws = new WebSocket(`${WS_BASE_URL}/${streamName}`)

    ws.onopen = () => {
      // console.log(`Connected: ${streamName}`)
      this.reconnectAttempts.set(streamName, 0)
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        onMessage(data)
      } catch (error) {
        // console.error("Failed to parse WebSocket message:", error)
        if (onError) onError(error)
      }
    }

    ws.onclose = (event) => {
      // console.log(`Closed: ${streamName}`, event.code, event.reason)
      this.connections.delete(streamName)

      if (onClose) onClose(event)

      // Auto-reconnect logic
      if (event.code !== 1000 && this.shouldReconnect(streamName)) {
        this.scheduleReconnect(streamName, onMessage, onError, onClose)
      }
    }

    ws.onerror = (error) => {
      // console.error(`WebSocket error: ${streamName}`, error)
      if (onError) onError(error)
    }

    this.connections.set(streamName, ws)
    return ws
  }

  // Disconnect a specific WebSocket
  disconnect(streamName) {
    const ws = this.connections.get(streamName)
    if (ws) {
      ws.close(1000, "Manual disconnect")
      this.connections.delete(streamName)
      this.subscriptions.delete(streamName)
      this.reconnectAttempts.delete(streamName)
    }
  }

  // Disconnect all WebSockets
  disconnectAll() {
    for (const [streamName] of this.connections) {
      this.disconnect(streamName)
    }
  }

  // Subscribe to ticker updates for multiple symbols
  subscribeTickers(symbols, onUpdate, onError) {
    if (!symbols || symbols.length === 0) return

    const streams = symbols.map((symbol) => `${symbol.toLowerCase()}@ticker`)
    const streamName = streams.join("/")

    return this.connect(streamName, onUpdate, onError)
  }

  // Subscribe to trade updates for a symbol
  subscribeTrades(symbol, onUpdate, onError) {
    const streamName = `${symbol.toLowerCase()}@trade`
    return this.connect(streamName, onUpdate, onError)
  }

  // Subscribe to kline updates for a symbol
  subscribeKlines(symbol, interval = "1m", onUpdate, onError) {
    const streamName = `${symbol.toLowerCase()}@kline_${interval}`
    return this.connect(streamName, onUpdate, onError)
  }

  // Check if should attempt reconnection
  shouldReconnect(streamName) {
    const attempts = this.reconnectAttempts.get(streamName) || 0
    return attempts < this.maxReconnectAttempts
  }

  // Schedule a reconnection attempt
  scheduleReconnect(streamName, onMessage, onError, onClose) {
    const attempts = this.reconnectAttempts.get(streamName) || 0
    const delay = this.reconnectDelay * Math.pow(2, attempts) // Exponential backoff

    // console.log(
    //   `Reconnect for ${streamName} in ${delay}ms (attempt ${
    //     attempts + 1
    //   })`
    // )

    setTimeout(() => {
      this.reconnectAttempts.set(streamName, attempts + 1)
      this.connect(streamName, onMessage, onError, onClose)
    }, delay)
  }

  // Get connection status
  getConnectionStatus(streamName) {
    const ws = this.connections.get(streamName)
    return ws ? ws.readyState : WebSocket.CLOSED
  }

  // Check if connected
  isConnected(streamName) {
    return this.getConnectionStatus(streamName) === WebSocket.OPEN
  }
}

export default new WebSocketService()
