import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Zap,
  ArrowUpRight,
  Upload,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  ShoppingCart,
  Users,
  BarChart3,
} from 'lucide-react'

import { RevenueSparkline } from '../components/charts'
import KpiMiniChart from '../components/charts/KpiMiniChart'

import Papa from 'papaparse'
import useRetailData from '../hooks/useRetailData'
import { calculateKPIs } from '../utils/analytics'

const FV = {
  hidden: { opacity: 0, y: 10 },

  visible: (i = 0) => ({
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.38,
      delay: i * 0.06,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const rev6m = [
  { month: 'Jan', revenue: 12400 },
  { month: 'Feb', revenue: 19200 },
  { month: 'Mar', revenue: 24800 },
  { month: 'Apr', revenue: 31600 },
  { month: 'May', revenue: 44200 },
  { month: 'Jun', revenue: 58100 },
]

const signals = [
  {
    type: 'up',
    icon: TrendingUp,
    c: 'var(--up)',
    bg: 'var(--up-bg)',
    border: 'rgba(91,191,138,0.25)',

    title: 'Electronics +31% WoW',

    body: 'Strongest category — consider increasing ad spend.',
  },

  {
    type: 'warn',
    icon: AlertTriangle,
    c: 'var(--warn)',
    bg: 'var(--warn-bg)',
    border: 'rgba(212,168,85,0.25)',

    title: 'Earbuds Pro — 5 days stock',

    body: 'Urgent restock at current sell rate.',
  },

  {
    type: 'up',
    icon: CheckCircle2,
    c: 'var(--up)',
    bg: 'var(--up-bg)',
    border: 'rgba(91,191,138,0.25)',

    title: 'Retention improved +12%',

    body: 'Email automation at day 7 is working.',
  },
]

const products = [
  {
    rank: 1,
    name: 'Wireless Earbuds Pro',
    rev: '$24.8K',
    delta: '+18.4%',
    up: true,
    spark: [42, 51, 58, 62, 69, 74],
  },

  {
    rank: 2,
    name: 'Smart Watch Series X',
    rev: '$18.2K',
    delta: '+11.2%',
    up: true,
    spark: [28, 29, 31, 34, 36, 38],
  },

  {
    rank: 3,
    name: 'Bluetooth Speaker Max',
    rev: '$15.4K',
    delta: '−2.1%',
    up: false,
    spark: [31, 29, 28, 27, 26, 25],
  },

  {
    rank: 4,
    name: 'USB-C Charging Hub',
    rev: '$9.6K',
    delta: '+6.7%',
    up: true,
    spark: [14, 15, 16, 17, 18, 19],
  },

  {
    rank: 5,
    name: 'LED Desk Lamp Pro',
    rev: '$7.1K',
    delta: '−0.4%',
    up: false,
    spark: [15, 14, 14, 14, 13, 13],
  },
]

const activity = [
  {
    c: 'var(--a)',
    t: '12 new orders',
    s: '3m ago',
  },

  {
    c: 'var(--dn)',
    t: 'Customer #4821 at risk',
    s: '14m ago',
  },

  {
    c: 'var(--warn)',
    t: 'Earbuds Pro low stock',
    s: '1h ago',
  },

  {
    c: 'var(--up)',
    t: 'Revenue target 78%',
    s: '2h ago',
  },

  {
    c: 'var(--a)',
    t: '$1,240 order placed',
    s: '3h ago',
  },
]

const goals = [
  {
    label: 'Revenue',
    val: 78,
    c: 'var(--a)',
  },

  {
    label: 'Customers',
    val: 64,
    c: 'var(--up)',
  },

  {
    label: 'Retention',
    val: 82,
    c: 'var(--a)',
  },

  {
    label: 'Conversion',
    val: 52,
    c: 'var(--warn)',
  },
]

const kpiCards = [
  {
    label: 'Revenue',

    icon: DollarSign,

    spark: [12400, 19200, 24800, 31600, 44200, 58100],

    chartType: 'bar' as const,

    color: 'var(--a)',

    xLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  },

  {
    label: 'Orders',

    icon: ShoppingCart,

    spark: [94, 128, 176, 241, 298, 402],

    chartType: 'bar' as const,

    color: 'var(--up)',

    xLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  },

  {
    label: 'Customers',

    icon: Users,

    spark: [880, 1040, 1280, 1620, 1900, 2341],

    chartType: 'line' as const,

    color: 'var(--info)',

    xLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  },

  {
    label: 'Avg Order Value',

    icon: BarChart3,

    spark: [280, 290, 304, 310, 316, 324],

    chartType: 'line' as const,

    color: 'var(--warn)',

    xLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  },
]

function delta(data: number[]): {
  str: string
  up: boolean
} {
  const prev = data[data.length - 2]
  const curr = data[data.length - 1]

  const pct = ((curr - prev) / prev) * 100

  return {
    str: `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`,
    up: pct >= 0,
  }
}

function fmt(label: string, v: number): string {
  if (label === 'Revenue')
    return `$${(v / 1000).toFixed(1)}K`

  if (label === 'Avg Order Value')
    return `$${v}`

  return v.toLocaleString()
}

export default function OverviewPage() {
  const { data, setData } = useRetailData()

  const kpis = calculateKPIs(data)

  const loaded = data.length > 0

  const [tab, setTab] = useState('6M')

  const handleCSV = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      complete: (r: any) =>
        setData(r.data as any),
    })
  }

  const liveCards = kpiCards.map((k) => {
    let value = fmt(
      k.label,
      k.spark[k.spark.length - 1]
    )

    if (loaded) {
      if (k.label === 'Revenue')
        value = `$${(
          kpis.totalRevenue / 1000
        ).toFixed(1)}K`

      if (k.label === 'Orders')
        value = kpis.totalOrders.toLocaleString()

      if (k.label === 'Customers')
        value =
          kpis.totalCustomers.toLocaleString()
    }

    const d = delta(k.spark)

    return {
      ...k,
      value,
      d,
    }
  })

  return (
    <div
      className="
        flex
        flex-col
        gap-5
        w-full
        min-w-0
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-start
          lg:justify-between
          gap-4
        "
      >
        <div className="space-y-2">
          <h1
            className="
              text-[32px]
              leading-none
              tracking-[-0.04em]
              font-semibold
              text-[var(--ink1)]
            "
          >
            Good morning
          </h1>

          <p
            className="
              text-sm
              leading-relaxed
              text-[var(--ink3)]
              max-w-[620px]
            "
          >
            Here’s a live snapshot of your
            store performance, customer
            activity, and revenue trends.
          </p>

          <p
            className="
              text-[12px]
              text-[var(--ink4)]
            "
          >
            June 2024 · Updated just now
          </p>
        </div>

        <label
          className="btn-ghost"
          style={{
            width: 'fit-content',
            cursor: 'pointer',
          }}
        >
          <Upload
            style={{
              width: 14,
              height: 14,
            }}
          />

          Import CSV

          <input
            type="file"
            accept=".csv"
            style={{ display: 'none' }}
            onChange={(e) =>
              e.target.files?.[0] &&
              handleCSV(e.target.files[0])
            }
          />
        </label>
      </div>

      {/* KPI GRID */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-5
        "
      >
        {liveCards.map((k, i) => {
          const Icon = k.icon

          return (
            <motion.div
              key={k.label}
              custom={i}
              variants={FV}
              initial="hidden"
              animate="visible"
              className="
                card
                lift
                flex
                flex-col
                justify-between
                gap-5
                min-h-[220px]
                p-5
              "
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <p
                    className="
                      text-sm
                      font-medium
                      text-[var(--ink3)]
                    "
                  >
                    {k.label}
                  </p>

                  <div className="space-y-2">
                    <p
                      className="
                        text-[30px]
                        leading-none
                        tracking-[-0.05em]
                        font-semibold
                        text-[var(--ink1)]
                      "
                      style={{
                        fontVariantNumeric:
                          'tabular-nums',
                      }}
                    >
                      {k.value}
                    </p>

                    <span
                      className="badge"
                      style={{
                        background: k.d.up
                          ? 'var(--up-bg)'
                          : 'var(--dn-bg)',

                        color: k.d.up
                          ? 'var(--up)'
                          : 'var(--dn)',

                        width: 'fit-content',

                        padding: '4px 10px',

                        borderRadius: 999,
                      }}
                    >
                      {k.d.up ? '↑' : '↓'}{' '}
                      {k.d.str}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,

                    background: 'var(--a3)',

                    border:
                      '1px solid var(--b1)',

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    flexShrink: 0,
                  }}
                >
                  <Icon
                    style={{
                      width: 18,
                      height: 18,
                      color: k.color,
                    }}
                  />
                </div>
              </div>

              <div className="flex-1 pt-2 min-h-[130px]">
                <KpiMiniChart
                  data={k.spark}
                  type={k.chartType}
                  color={k.color}
                  height={120}
                />

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mt-3
                    px-1
                  "
                >
                  {k.xLabels
                    .filter(
                      (_, idx) =>
                        idx === 0 ||
                        idx ===
                          k.xLabels.length -
                            1
                    )
                    .map((l) => (
                      <span
                        key={l}
                        className="
                          text-[11px]
                          text-[var(--ink4)]
                        "
                      >
                        {l}
                      </span>
                    ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* MAIN GRID */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-[2fr_1fr]
          gap-5
          items-start
        "
      >
        {/* LEFT */}

        <div
          className="
            flex
            flex-col
            gap-5
            min-w-0
          "
        >
          {/* REVENUE */}

          <motion.div
            custom={0.2}
            variants={FV}
            initial="hidden"
            animate="visible"
            className="card lift"
          >
            <div
              className="
                flex
                items-start
                justify-between
                gap-4
                p-5
              "
            >
              <div>
                <p
                  className="
                    text-sm
                    font-semibold
                    text-[var(--ink1)]
                  "
                >
                  Revenue Trend
                </p>

                <p
                  className="
                    text-xs
                    text-[var(--ink3)]
                    mt-1
                  "
                >
                  Monthly performance
                </p>
              </div>

              <div className="time-tabs">
                {[
                  '1M',
                  '3M',
                  '6M',
                  '1Y',
                ].map((t) => (
                  <div
                    key={t}
                    className={`time-tab ${
                      tab === t
                        ? 'active'
                        : ''
                    }`}
                    onClick={() =>
                      setTab(t)
                    }
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>

            <div className="px-2 pb-4">
              <RevenueSparkline
                data={rev6m}
                height={320}
              />
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDEBAR */}

        <div
          className="
            flex
            flex-col
            gap-5
          "
        >
          {/* MONTHLY GOALS */}

          <motion.div
            custom={0.2}
            variants={FV}
            initial="hidden"
            animate="visible"
            className="card lift p-5"
          >
            <p
              className="
                text-sm
                font-semibold
                text-[var(--ink1)]
                mb-1
              "
            >
              Monthly Goals
            </p>

            <p
              className="
                text-xs
                text-[var(--ink3)]
                mb-5
              "
            >
              vs targets
            </p>

            <div className="flex flex-col gap-4">
              {goals.map((g, i) => (
                <div key={g.label}>
                  <div
                    className="
                      flex
                      justify-between
                      mb-2
                    "
                  >
                    <span
                      className="
                        text-sm
                        text-[var(--ink2)]
                      "
                    >
                      {g.label}
                    </span>

                    <span
                      className="
                        text-xs
                        font-semibold
                        text-[var(--ink1)]
                      "
                    >
                      {g.val}%
                    </span>
                  </div>

                  <div
                    style={{
                      height: 6,
                      background:
                        'var(--s2)',

                      borderRadius: 999,

                      overflow: 'hidden',
                    }}
                  >
                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: `${g.val}%`,
                      }}
                      transition={{
                        delay:
                          0.4 + i * 0.08,

                        duration: 0.6,
                        ease: 'easeOut',
                      }}
                      style={{
                        height: '100%',
                        background: g.c,
                        borderRadius: 999,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}