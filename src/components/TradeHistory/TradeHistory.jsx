import { Clock, Activity } from "lucide-react"
import { useTradeStream } from "../../hooks/useBinanceWebSocket"
import { getCryptoInfo } from "../../utils/cryptoList"
import TradeItem from "./TradeItem/TradeItem"
import Loading from "../common/Loading/Loading"
import styles from "./TradeHistory.module.css"

const TradeHistory = ({ symbol }) => {
  const { trades, loading, error } = useTradeStream(symbol)
  const cryptoInfo = symbol ? getCryptoInfo(symbol) : null

  if (!symbol) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <Clock size={20} />
            <h2 className={styles.title}>Trade History</h2>
          </div>
        </div>
        <div className={styles.emptyState}>
          <Activity
            size={48}
            className={styles.emptyIcon}
          />
          <p>Please select a crypto from watch list</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Clock size={20} />
          <h2 className={styles.title}>Trade History</h2>
          {cryptoInfo && (
            <div className={styles.symbolInfo}>
              <span className={styles.symbolIcon}>{cryptoInfo.icon}</span>
              <span className={styles.symbolName}>{cryptoInfo.name}</span>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className={styles.error}>
          <p>Error in data fetching: {error}</p>
        </div>
      )}

      <div className={styles.tableHeader}>
        <div className={styles.headerCell}>Price / Type</div>
        <div className={styles.headerCell}>Amount</div>
        <div className={styles.headerCell}>Time</div>
      </div>

      <div className={styles.tradeList}>
        {loading && trades.length === 0 ? (
          <Loading text='Fetching recent trades...' />
        ) : trades.length === 0 ? (
          <div className={styles.emptyTrades}>
            <p>Nothing trades</p>
          </div>
        ) : (
          trades.map((trade) => (
            <TradeItem
              key={`${trade.id}-${Math.floor(100 + Math.random() * 9000)}`}
              trade={trade}
            />
          ))
        )}
      </div>

      {trades.length > 0 && (
        <div className={styles.footer}>
          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <div className={styles.buyIndicator}></div>
              <span>Buy Orders</span>
            </div>
            <div className={styles.legendItem}>
              <div className={styles.sellIndicator}></div>
              <span>Sell Orders</span>
            </div>
          </div>
          <div className={styles.liveIndicator}>
            <div className={styles.pulse}></div>
            <span>Live Updates</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default TradeHistory
