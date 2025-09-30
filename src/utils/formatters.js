export const formatPrice = (price, decimals = 2) => {
  if (!price) return "0.00"
  const num = parseFloat(price)
  return num.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export const formatPriceChange = (change) => {
  const num = parseFloat(change)
  return num >= 0 ? `+${num.toFixed(2)}%` : `${num.toFixed(2)}%`
}

export const formatVolume = (volume) => {
  const num = parseFloat(volume)
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(2)}B`
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(2)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(2)}K`
  }
  return num.toFixed(2)
}

export const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
}

export const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString("en-US")
}

export const getPriceChangeColor = (change) => {
  const num = parseFloat(change)
  if (num > 0) return "var(--color-success)"
  if (num < 0) return "var(--color-danger)"
  return "var(--color-text-secondary)"
}
