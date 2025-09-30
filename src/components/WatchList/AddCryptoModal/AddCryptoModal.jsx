import { useState } from "react"
import { X, Search, Plus } from "lucide-react"
import { POPULAR_CRYPTOS } from "../../../utils/cryptoList"
import styles from "./AddCryptoModal.module.css"

const AddCryptoModal = ({ isOpen, onClose, onAddCrypto, watchlist }) => {
  const [searchTerm, setSearchTerm] = useState("")

  if (!isOpen) return null

  const filteredCryptos = POPULAR_CRYPTOS.filter((crypto) => {
    const isNotInWatchlist = !watchlist.includes(crypto.symbol)
    const matchesSearch =
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    return isNotInWatchlist && matchesSearch
  })

  const handleAddCrypto = (symbol) => {
    onAddCrypto(symbol)
    setSearchTerm("")
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Add new crypto</h2>
          <button
            onClick={onClose}
            className={styles.closeButton}
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.searchContainer}>
          <div className={styles.searchBox}>
            <Search
              size={18}
              className={styles.searchIcon}
            />
            <input
              type='text'
              placeholder='Search ...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.cryptoList}>
          {filteredCryptos.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No data matched</p>
            </div>
          ) : (
            filteredCryptos.map((crypto) => (
              <div
                key={`${crypto.symbol}-${crypto.name}`}
                className={styles.cryptoItem}
              >
                <div className={styles.cryptoInfo}>
                  <span className={styles.cryptoIcon}>{crypto.icon}</span>
                  <div className={styles.cryptoText}>
                    <span className={styles.cryptoName}>{crypto.name}</span>
                    <span className={styles.cryptoSymbol}>{crypto.symbol}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleAddCrypto(crypto.symbol)}
                  className={styles.addButton}
                >
                  <Plus size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AddCryptoModal
