import { formatPrice, formatTime } from "../../../utils/formatters"
import styles from "./TradeItem.module.css"

const TradeItem = ({ trade }) => {
  const isBuy = !trade.isBuyerMaker
  const time = formatTime(trade.time)
  const price = formatPrice(trade.price)
  const quantity = parseFloat(trade.quantity).toFixed(4)

  return (
    <div className={`${styles.item} ${isBuy ? styles.buy : styles.sell}`}>
      <div className={styles.priceSection}>
        <span
          className={`${styles.price} ${
            isBuy ? styles.buyPrice : styles.sellPrice
          }`}
        >
          ${price}
        </span>
        <span className={styles.type}>{isBuy ? "Buy" : "Sell"}</span>
      </div>

      <div className={styles.quantitySection}>
        <span className={styles.quantity}>{quantity}</span>
      </div>

      <div className={styles.timeSection}>
        <span className={styles.time}>{time}</span>
      </div>
    </div>
  )
}

export default TradeItem
