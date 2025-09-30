import { useState } from "react"
import WatchList from "../WatchList/WatchList"
import PriceChart from "../PriceChart/PriceChart"
import TradeHistory from "../TradeHistory/TradeHistory"
import styles from "./Dashboard.module.css"

const Dashboard = () => {
  const [selectedSymbol, setSelectedSymbol] = useState("BTCUSDT")

  return (
    <div className={styles.dashboard}>
      <div className={styles.sidebar}>
        <WatchList
          onSymbolSelect={setSelectedSymbol}
          selectedSymbol={selectedSymbol}
        />
      </div>

      <div className={styles.mainContent}>
        <div className={styles.chartSection}>
          <PriceChart symbol={selectedSymbol} />
        </div>

        <div className={styles.tradeSection}>
          <TradeHistory symbol={selectedSymbol} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
