import { X, TrendingUp, TrendingDown } from "lucide-react"
// import {
//   formatPrice,
//   formatPriceChange,
//   getPriceChangeColor,
// } from "../../../utils/formatters"
import { getCryptoInfo } from "../../../utils/cryptoList"
import styles from "./WatchListItem.module.css"

const WatchListItem = ({ symbol, ticker, onRemove, onClick }) => {
  const cryptoInfo = getCryptoInfo(symbol)
  // const priceChange = ticker?.priceChangePercent
  //   ? parseFloat(ticker.priceChangePercent)
  //   : 0
  // const isPositive = priceChange >= 0
  // const currentPrice = ticker ? parseFloat(ticker.lastPrice) : 0

  return (
    <div
      className={`${styles.item} ${onClick ? styles.clickable : ""}`}
      onClick={onClick}
    >
      <div className={styles.header}>
        <div className={styles.symbolInfo}>
          <span className={styles.icon}>{cryptoInfo.icon}</span>
          <div className={styles.symbolText}>
            <span className={styles.symbol}>{cryptoInfo.name}</span>
            <span className={styles.pair}>{symbol}</span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove(symbol)
          }}
          className={styles.removeButton}
          title='Remove from watch list'
        >
          <X size={16} />
        </button>
      </div>
      {/* 
      <div className={styles.priceInfo}>
        <div className={styles.price}>${formatPrice(currentPrice)}</div>
        <div
          className={`${styles.change} ${
            isPositive ? styles.positive : styles.negative
          }`}
          style={{ color: getPriceChangeColor(priceChange) }}
        >
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {formatPriceChange(priceChange)}
        </div>
      </div> */}

      {/* {ticker && (
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>24h High</span>
            <span className={styles.statValue}>
              ${formatPrice(ticker.highPrice)}
            </span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>24h Low</span>
            <span className={styles.statValue}>
              ${formatPrice(ticker.lowPrice)}
            </span>
          </div>
        </div>
      )} */}
    </div>
  )
}

export default WatchListItem
