import { motion } from 'framer-motion'
import {
  Download,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  BadgeDollarSign,
  RotateCcw,
} from 'lucide-react'

import {
  DualAreaChart,
  SlimBar,
} from '../components/charts'

const FV = {
  hidden: {
    opacity: 0,
    y: 10,
  },

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

const monthly = [
  {
    month: 'Jan',
    revenue: 12400,
    gross: 9800,
    orders: 94,
  },

  {
    month: 'Feb',
    revenue: 19200,
    gross: 15400,
    orders: 128,
  },

  {
    month: 'Mar',
    revenue: 24800,
    gross: 19600,
    orders: 176,
  },

  {
    month: 'Apr',
    revenue: 31600,
    gross: 25200,
    orders: 241,
  },

  {
    month: 'May',
    revenue: 44200,
    gross: 35600,
    orders: 298,
  },

  {
    month: 'Jun',
    revenue: 58100,
    gross: 47200,
    orders: 402,
  },
]

const categories = [
  {
    name: 'Electronics',
    revenue: 24800,
    share: 42.4,
    c: 'var(--a)',
  },

  {
    name: 'Wearables',
    revenue: 18200,
    share: 31.1,
    c: 'var(--up)',
  },

  {
    name: 'Audio',
    revenue: 8600,
    share: 14.7,
    c: 'var(--warn)',
  },

  {
    name: 'Accessories',
    revenue: 6900,
    share: 11.8,
    c: 'var(--info)',
  },
]

const regions = [
  {
    c: 'United States',
    rev: 42800,
    orders: 402,
    g: '+18%',
    up: true,
  },

  {
    c: 'United Kingdom',
    rev: 31400,
    orders: 298,
    g: '+12%',
    up: true,
  },

  {
    c: 'Germany',
    rev: 24200,
    orders: 186,
    g: '+9%',
    up: true,
  },

  {
    c: 'Canada',
    rev: 18100,
    orders: 148,
    g: '+6%',
    up: true,
  },

  {
    c: 'Australia',
    rev: 12700,
    orders: 94,
    g: '+4%',
    up: true,
  },

  {
    c: 'France',
    rev: 8900,
    orders: 72,
    g: '−3%',
    up: false,
  },
]

const kpis = [
  {
    label: 'Total Revenue',
    value: '$148.2K',
    delta: '+18.2%',
    up: true,
    icon: DollarSign,
    color: 'var(--a)',
  },

  {
    label: 'Gross Profit',
    value: '$52.8K',
    delta: '+9.4%',
    up: true,
    icon: BadgeDollarSign,
    color: 'var(--up)',
  },

  {
    label: 'Avg Order Value',
    value: '$324',
    delta: '+7.1%',
    up: true,
    icon: ShoppingCart,
    color: 'var(--warn)',
  },

  {
    label: 'Refund Rate',
    value: '2.3%',
    delta: '−0.8%',
    up: false,
    icon: RotateCcw,
    color: 'var(--dn)',
  },
]

const maxRev = Math.max(
  ...categories.map((c) => c.revenue)
)

const totalRegRev = regions.reduce(
  (s, r) => s + r.rev,
  0
)

export default function RevenuePage() {
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
            Revenue Analytics
          </h1>

          <p
            className="
              text-sm
              leading-relaxed
              text-[var(--ink3)]
              max-w-[620px]
            "
          >
            Analyze revenue growth,
            profitability, order trends,
            and regional performance across
            your store.
          </p>

          <p
            className="
              text-[12px]
              text-[var(--ink4)]
            "
          >
            June 2024 · 6-month performance
            overview
          </p>
        </div>

        <button
          className="btn-ghost"
          style={{
            width: 'fit-content',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '9px 14px',
          }}
        >
          <Download
            style={{
              width: 14,
              height: 14,
            }}
          />

          Export Report
        </button>
      </div>

      {/* KPI GRID */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-5
        "
      >
        {kpis.map((k, i) => {
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
              <div className="flex items-start justify-between">
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
                        text-[36px]
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
                        background: k.up
                          ? 'var(--up-bg)'
                          : 'var(--dn-bg)',

                        color: k.up
                          ? 'var(--up)'
                          : 'var(--dn)',

                        width: 'fit-content',
                      }}
                    >
                      {k.up ? '↑' : '↓'}{' '}
                      {k.delta}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,

                    background:
                      'var(--a3)',

                    border:
                      '1px solid var(--b1)',

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:
                      'center',

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

              <div
                style={{
                  height: 4,
                  borderRadius: 999,
                  background:
                    'var(--s2)',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: `${55 + i * 10}%`,
                  }}
                  transition={{
                    delay: 0.3 + i * 0.08,
                    duration: 0.7,
                  }}
                  style={{
                    height: '100%',
                    background: k.color,
                    borderRadius: 999,
                  }}
                />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* MAIN CHART */}

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
            flex-col
            lg:flex-row
            lg:items-start
            lg:justify-between
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
              Revenue vs Gross Profit
            </p>

            <p
              className="
                text-xs
                text-[var(--ink3)]
                mt-1
              "
            >
              Financial performance over
              the last 6 months
            </p>
          </div>

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-5
              text-xs
              text-[var(--ink3)]
            "
          >
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: 18,
                  height: 3,
                  borderRadius: 999,
                  background: 'var(--a)',
                }}
              />

              Revenue
            </div>

            <div className="flex items-center gap-2">
              <div
                style={{
                  width: 18,
                  height: 3,
                  borderRadius: 999,
                  background:
                    'var(--up)',
                }}
              />

              Gross Profit
            </div>
          </div>
        </div>

        <div className="px-2 pb-4">
          <DualAreaChart
            data={monthly}
            height={260}
          />
        </div>
      </motion.div>

      {/* CATEGORY + ORDERS */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-5
        "
      >
        {/* CATEGORY */}

        <motion.div
          custom={0.25}
          variants={FV}
          initial="hidden"
          animate="visible"
          className="
            card
            lift
            p-5
          "
        >
          <p
            className="
              text-sm
              font-semibold
              text-[var(--ink1)]
              mb-1
            "
          >
            Revenue by Category
          </p>

          <p
            className="
              text-xs
              text-[var(--ink3)]
              mb-6
            "
          >
            Contribution by product type
          </p>

          <div className="flex flex-col gap-5">
            {categories.map((c, i) => (
              <div key={c.name}>
                <div
                  className="
                    flex
                    justify-between
                    gap-4
                    mb-2
                  "
                >
                  <span
                    className="
                      text-sm
                      text-[var(--ink2)]
                    "
                  >
                    {c.name}
                  </span>

                  <div className="flex items-center gap-3">
                    <span
                      className="
                        text-xs
                        text-[var(--ink3)]
                      "
                    >
                      {c.share}%
                    </span>

                    <span
                      className="
                        text-sm
                        font-semibold
                        text-[var(--ink1)]
                      "
                      style={{
                        fontVariantNumeric:
                          'tabular-nums',
                      }}
                    >
                      $
                      {(
                        c.revenue / 1000
                      ).toFixed(1)}
                      K
                    </span>
                  </div>
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
                      width: `${
                        (c.revenue /
                          maxRev) *
                        100
                      }%`,
                    }}
                    transition={{
                      delay:
                        0.35 + i * 0.08,

                      duration: 0.7,
                    }}
                    style={{
                      height: '100%',
                      background: c.c,
                      borderRadius: 999,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ORDERS */}

        <motion.div
          custom={0.3}
          variants={FV}
          initial="hidden"
          animate="visible"
          className="
            card
            lift
            p-5
          "
        >
          <p
            className="
              text-sm
              font-semibold
              text-[var(--ink1)]
              mb-1
            "
          >
            Order Volume
          </p>

          <p
            className="
              text-xs
              text-[var(--ink3)]
              mb-5
            "
          >
            Monthly order growth
          </p>

          <SlimBar
            data={monthly}
            dataKey="orders"
            height={220}
          />
        </motion.div>
      </div>

      {/* REGIONS */}

      <motion.div
        custom={0.35}
        variants={FV}
        initial="hidden"
        animate="visible"
        className="card overflow-hidden"
      >
        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-start
            lg:justify-between
            gap-4
            p-5
            border-b
            border-[var(--b1)]
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
              Revenue by Region
            </p>

            <p
              className="
                text-xs
                text-[var(--ink3)]
                mt-1
              "
            >
              Top-performing markets this
              period
            </p>
          </div>

          <div
            className="
              flex
              items-center
              gap-2
              text-sm
              text-[var(--up)]
            "
          >
            <TrendingUp
              style={{
                width: 14,
                height: 14,
              }}
            />

            Overall growth +14.2%
          </div>
        </div>

        <div className="overflow-x-auto">
          <div
            className="
              min-w-[760px]
            "
          >
            {/* HEADER */}

            <div
              className="
                grid
                grid-cols-[50px_1.5fr_1fr_1fr_1fr_1.4fr]
                gap-4
                px-5
                py-3
                border-b
                border-[var(--b1)]
                bg-[var(--s1)]
              "
            >
              {[
                '#',
                'Market',
                'Revenue',
                'Orders',
                'Growth',
                'Share',
              ].map((h) => (
                <span
                  key={h}
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.08em]
                    text-[var(--ink3)]
                  "
                >
                  {h}
                </span>
              ))}
            </div>

            {/* ROWS */}

            {regions.map((r, i) => (
              <motion.div
                key={r.c}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay:
                    0.4 + i * 0.05,
                }}
                className="
                  grid
                  grid-cols-[50px_1.5fr_1fr_1fr_1fr_1.4fr]
                  gap-4
                  items-center
                  px-5
                  py-4
                  border-b
                  border-[var(--b1)]
                "
              >
                <span
                  className="
                    text-xs
                    text-[var(--ink4)]
                  "
                >
                  {i + 1}
                </span>

                <span
                  className="
                    text-sm
                    font-medium
                    text-[var(--ink1)]
                  "
                >
                  {r.c}
                </span>

                <span
                  className="
                    text-sm
                    font-semibold
                    text-[var(--ink1)]
                  "
                >
                  $
                  {(
                    r.rev / 1000
                  ).toFixed(1)}
                  K
                </span>

                <span
                  className="
                    text-sm
                    text-[var(--ink2)]
                  "
                >
                  {r.orders}
                </span>

                <span
                  className="badge"
                  style={{
                    width: 'fit-content',

                    background: r.up
                      ? 'var(--up-bg)'
                      : 'var(--dn-bg)',

                    color: r.up
                      ? 'var(--up)'
                      : 'var(--dn)',
                  }}
                >
                  {r.up ? '↑' : '↓'}{' '}
                  {r.g}
                </span>

                <div className="flex items-center gap-3">
                  <div
                    style={{
                      flex: 1,
                      height: 4,
                      borderRadius: 999,
                      background:
                        'var(--s2)',
                      overflow: 'hidden',
                      minWidth: 50,
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        borderRadius: 999,
                        background:
                          'var(--a)',

                        width: `${
                          (r.rev /
                            regions[0]
                              .rev) *
                          100
                        }%`,
                      }}
                    />
                  </div>

                  <span
                    className="
                      text-xs
                      text-[var(--ink4)]
                      w-[32px]
                      text-right
                    "
                  >
                    {(
                      (r.rev /
                        totalRegRev) *
                      100
                    ).toFixed(0)}
                    %
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}