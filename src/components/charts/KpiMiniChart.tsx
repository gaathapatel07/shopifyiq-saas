/**
 * KPI Mini Charts — Premium SaaS Analytics Style
 * Improved for:
 * - Better readability
 * - Stronger hierarchy
 * - Larger visual presence
 * - More premium dashboard feel
 */

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  Tooltip,
} from 'recharts'

interface Props {
  data: number[]
  type?: 'bar' | 'line' | 'area'
  color?: string
  height?: number
}

function Tip({ active, payload }: any) {
  if (!active || !payload?.length) return null

  return (
    <div
      style={{
        background: 'var(--s0)',
        border: '1px solid var(--b2)',
        borderRadius: 10,
        padding: '8px 12px',
        fontSize: 12,
        fontWeight: 600,
        fontFamily: 'var(--font)',
        color: 'var(--ink1)',
        boxShadow: 'var(--shadow-lg)',
        fontVariantNumeric: 'tabular-nums',
        backdropFilter: 'blur(10px)',
      }}
    >
      {payload[0].value.toLocaleString()}
    </div>
  )
}

export default function KpiMiniChart({
  data,
  type = 'bar',
  color = 'var(--a)',
  height = 120,
}: Props) {
  const pts = data.map((v, i) => ({ i, v }))

  /* ─────────────────────────────
     BAR CHART
  ───────────────────────────── */

  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={pts}
          margin={{
            top: 8,
            right: 0,
            bottom: 0,
            left: 0,
          }}
          barSize={12}
          barCategoryGap="18%"
        >
          <Tooltip
            content={<Tip />}
            cursor={{
              fill: 'var(--b1)',
              radius: 6,
            }}
          />

          <Bar
            dataKey="v"
            fill={color}
            radius={[6, 6, 0, 0]}
            opacity={0.9}
          />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  /* ─────────────────────────────
     LINE CHART
  ───────────────────────────── */

  if (type === 'line') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={pts}
          margin={{
            top: 8,
            right: 4,
            bottom: 4,
            left: 4,
          }}
        >
          <Tooltip
            content={<Tip />}
            cursor={{
              stroke: 'var(--b2)',
              strokeDasharray: '4 4',
            }}
          />

          <Line
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={2.5}
            dot={{
              r: 4,
              fill: color,
              stroke: 'var(--s0)',
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
              fill: color,
              stroke: 'var(--s0)',
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  /* ─────────────────────────────
     AREA CHART
  ───────────────────────────── */

  const gradId = `kg-${color.replace(
    /[^a-z0-9]/gi,
    ''
  )}-${Math.random().toString(36).slice(2, 6)}`

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart
        data={pts}
        margin={{
          top: 8,
          right: 4,
          bottom: 4,
          left: 4,
        }}
      >
        <defs>
          <linearGradient
            id={gradId}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor={color}
              stopOpacity={0.24}
            />

            <stop
              offset="100%"
              stopColor={color}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <Tooltip
          content={<Tip />}
          cursor={{
            stroke: 'var(--b2)',
            strokeDasharray: '4 4',
          }}
        />

        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={2.5}
          fill={`url(#${gradId})`}
          dot={false}
          activeDot={{
            r: 6,
            fill: color,
            stroke: 'var(--s0)',
            strokeWidth: 2,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}