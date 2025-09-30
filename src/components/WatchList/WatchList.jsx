import { useState } from "react"
import { Plus, Eye } from "lucide-react"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { useTickerStream } from "../../hooks/useBinanceWebSocket"
import { LOCAL_STORAGE_KEYS, DEFAULT_WATCHLIST } from "../../utils/constants"
import WatchListItem from "./WatchListItem/WatchListItem"
import AddCryptoModal from "./AddCryptoModal/AddCryptoModal"
import Loading from "../common/Loading/Loading"
import styles from "./WatchList.module.css"

const WatchList = ({ onSymbolSelect, selectedSymbol }) => {
  const [watchlist, setWatchlist] = useLocalStorage(
    LOCAL_STORAGE_KEYS.WATCHLIST,
    DEFAULT_WATCHLIST
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { tickers, loading, error } = useTickerStream(watchlist)

  const handleAddCrypto = (symbol) => {
    if (!watchlist.includes(symbol)) {
      setWatchlist((prev) => [...prev, symbol])
    }
    setIsModalOpen(false)
  }

  const handleRemoveCrypto = (symbol) => {
    setWatchlist((prev) => prev.filter((s) => s !== symbol))
    if (selectedSymbol === symbol && onSymbolSelect) {
      // Select first remaining symbol or null
      const remaining = watchlist.filter((s) => s !== symbol)
      onSymbolSelect(remaining.length > 0 ? remaining[0] : null)
    }
  }

  if (loading && Object.keys(tickers).length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <Eye size={20} />
            <h2 className={styles.title}>Watch List</h2>
          </div>
        </div>
        <Loading text='Loading ...' />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Eye size={20} />
          <h2 className={styles.title}>Watch List</h2>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.addButton}
          title='Add new currency'
        >
          <Plus size={18} />
        </button>
      </div>

      {error && (
        <div className={styles.error}>
          <p>Error in data fetching: {error}</p>
        </div>
      )}

      <div className={styles.list}>
        {watchlist.length === 0 ? (
          <div className={styles.emptyState}>
            <p>There are no crypto in watch list</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className={styles.emptyStateButton}
            >
              <Plus size={16} />
              Add new crypto
            </button>
          </div>
        ) : (
          watchlist.map((symbol) => (
            <WatchListItem
              key={`${symbol}`}
              symbol={symbol}
              ticker={tickers[symbol]}
              onRemove={handleRemoveCrypto}
              onClick={onSymbolSelect ? () => onSymbolSelect(symbol) : null}
            />
          ))
        )}
      </div>

      <AddCryptoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCrypto={handleAddCrypto}
        watchlist={watchlist}
      />
    </div>
  )
}

export default WatchList
