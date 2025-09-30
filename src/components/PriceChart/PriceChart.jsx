import { useState, useMemo, useEffect } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { BarChart3, TrendingUp } from "lucide-react"
import { useKlineStream } from "../../hooks/useBinanceWebSocket"
import { getCryptoInfo } from "../../utils/cryptoList"
import { formatPrice, formatTime } from "../../utils/formatters"
import Loading from "../common/Loading/Loading"
import styles from "./PriceChart.module.css"

const PriceChart = ({ symbol }) => {
  const { klines, loading, error } = useKlineStream(symbol, "1m")
  const cryptoInfo = symbol ? getCryptoInfo(symbol) : null

  const chartData = useMemo(() => {
    if (!klines || klines.length === 0) return []

    return klines.map((kline) => ({
      time: kline.openTime,
      price: kline.close,
      open: kline.open,
      high: kline.high,
      low: kline.low,
      close: kline.close,
      volume: kline.volume,
    }))
  }, [klines])

  const currentPrice =
    chartData.length > 0 ? chartData[chartData.length - 1].price : 0
  const previousPrice =
    chartData.length > 1 ? chartData[chartData.length - 2].price : currentPrice
  const priceChange =
    ((currentPrice - previousPrice) / previousPrice) * 100 || 0
  const isPositive = priceChange >= 0

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length > 0) {
      return (
        <div className={styles.tooltip}>
          <p className={styles.tooltipTime}>{formatTime(label)}</p>
          <p className={styles.tooltipPrice}>
            <span className={styles.tooltipLabel}>Price:</span>
            <span className={styles.tooltipValue}>
              ${formatPrice(payload[0].value)}
            </span>
          </p>
        </div>
      )
    }
    return null
  }

  if (!symbol) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <BarChart3 size={20} />
            <h2 className={styles.title}>Price Chart</h2>
          </div>
        </div>
        <div className={styles.emptyState}>
          <TrendingUp
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
          <BarChart3 size={20} />
          <h2 className={styles.title}>Price Chart</h2>
          {cryptoInfo && (
            <div className={styles.symbolInfo}>
              <span className={styles.symbolIcon}>{cryptoInfo.icon}</span>
              <span className={styles.symbolName}>{cryptoInfo.name}</span>
            </div>
          )}
        </div>
        <div className={styles.priceInfo}>
          <div className={styles.currentPrice}>
            ${formatPrice(currentPrice)}
          </div>
          <div
            className={`${styles.priceChange} ${
              isPositive ? styles.positive : styles.negative
            }`}
          >
            {isPositive ? "+" : ""}
            {priceChange.toFixed(2)}%
          </div>
        </div>
      </div>

      {error && (
        <div className={styles.error}>
          <p>Error in data fetching: {error}</p>
        </div>
      )}

      <div className={styles.chartContainer}>
        {loading && chartData.length === 0 ? (
          <Loading text='Loading ...' />
        ) : chartData.length === 0 ? (
          <div className={styles.noData}>
            <p>There are no data to show</p>
          </div>
        ) : (
          <ResponsiveContainer
            width='100%'
            height='100%'
          >
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray='3 3'
                stroke='var(--color-border-primary)'
                opacity={0.3}
              />
              <XAxis
                dataKey='time'
                tickFormatter={formatTime}
                stroke='var(--color-text-secondary)'
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                domain={["dataMin - 1", "dataMax + 1"]}
                tickFormatter={(value) => `$${formatPrice(value)}`}
                stroke='var(--color-text-secondary)'
                fontSize={12}
                tickLine={false}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type='monotone'
                dataKey='price'
                stroke={
                  isPositive ? "var(--color-success)" : "var(--color-danger)"
                }
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  stroke: isPositive
                    ? "var(--color-success)"
                    : "var(--color-danger)",
                  strokeWidth: 2,
                  fill: "var(--color-bg-card)",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {chartData.length > 0 && (
        <div className={styles.footer}>
          <div className={styles.interval}>
            <span className={styles.intervalLabel}>Interval:</span>
            <span className={styles.intervalValue}>1m</span>
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

export default PriceChart
