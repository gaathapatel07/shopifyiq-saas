import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

import {
  ArrowRight,
  Leaf,
  Check,
  TrendingUp,
  Users,
  Bot,
  BarChart3,
  Package,
  Globe,
  Moon,
  Sun,
  Zap,
} from 'lucide-react'

import { RevenueSparkline } from '../charts'
import { getTheme } from '../../lib/theme'

const FV = {
  hidden: {
    opacity: 0,
    y: 16,
  },

  visible: (i = 0) => ({
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.5,
      delay: i * 0.07,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)

  const inView = useInView(ref, {
    once: true,
    margin: '-60px',
  })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={
        inView
          ? 'visible'
          : 'hidden'
      }
      custom={delay}
      variants={FV}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const tickerItems = [
  'Revenue +31% — Marble Store',
  'Churn reduced from 12% to 4% — Glow Labs',
  'Recovered $48K from at-risk customers — NovaBrew',
  'AI predicted stockout 6 days early — Drift Supply',
  '3.2× ad spend ROI using customer segments — Aurelia',
  'Localized checkout recovered €6.4K/month — Nova EU',
]

export default function LandingPage() {
  const navigate = useNavigate()

  const [dark, setDark] =
    useState(
      getTheme() === 'dark'
    )

  useEffect(() => {
    applyThemeLocally(
      dark
        ? 'dark'
        : 'light'
    )
  }, [])

  function applyThemeLocally(
    t: 'dark' | 'light'
  ) {
    document.documentElement.classList.toggle(
      'dark',
      t === 'dark'
    )

    document.documentElement.classList.toggle(
      'light',
      t === 'light'
    )

    localStorage.setItem(
      'iq-theme',
      t
    )
  }

  const onToggle = () => {
    const next = dark
      ? 'light'
      : 'dark'

    setDark(!dark)

    applyThemeLocally(next)
  }

  return (
    <div
      style={{
        background: 'var(--bg)',
        color: 'var(--ink1)',
        overflowX: 'hidden',
      }}
      className="min-h-screen"
    >
      <nav
        className="
          sticky
          top-0
          z-50
          backdrop-blur-xl
          border-b
          border-[var(--b1)]
          bg-[color:rgba(255,255,255,0.72)]
          dark:bg-[color:rgba(10,10,10,0.72)]
        "
      >
        <div
          className="
            max-w-[1440px]
            mx-auto
            h-[64px]
            px-5
            flex
            items-center
            justify-between
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background:
                  'var(--a)',

                display: 'flex',
                alignItems:
                  'center',

                justifyContent:
                  'center',

                boxShadow:
                  '0 0 18px var(--a-glow)',
              }}
            >
              <Leaf
                style={{
                  width: 15,
                  height: 15,
                  color:
                    'var(--bg)',
                }}
              />
            </div>

            <span
              style={{
                fontSize: 15,
                fontWeight: 700,
                letterSpacing:
                  '-0.03em',
              }}
            >
              ShopifyIQ
            </span>
          </div>

          <div
            className="
              hidden
              md:flex
              items-center
              gap-1
            "
          >
            {[
              'Features',
              'Dashboard',
              'Pricing',
            ].map((item) => (
              <button
                key={item}
                className="nav-item"
              >
                {item}
              </button>
            ))}
          </div>

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <button
              onClick={onToggle}
              className="
                w-9
                h-9
                rounded-xl
                border
                border-[var(--b1)]
                bg-[var(--s1)]
                flex
                items-center
                justify-center
              "
            >
              {dark ? (
                <Sun
                  style={{
                    width: 15,
                    height: 15,
                  }}
                />
              ) : (
                <Moon
                  style={{
                    width: 15,
                    height: 15,
                  }}
                />
              )}
            </button>

            <button
              className="btn-ghost"
              onClick={() =>
                navigate('/login')
              }
            >
              Sign in
            </button>

            <button
              className="btn-accent"
              onClick={() =>
                navigate('/signup')
              }
            >
              Start free
            </button>
          </div>
        </div>
      </nav>
            {/* ───────────────── HERO ───────────────── */}

      <section
        style={{
          padding:
            '84px 24px 72px',
        }}
      >
        <div
          className="
            max-w-[1440px]
            mx-auto
          "
        >
          <Reveal>
            <div
              style={{
                maxWidth: 760,
              }}
            >
              {/* BADGE */}

              <div
                style={{
                  display: 'inline-flex',
                  alignItems:
                    'center',

                  gap: 9,

                  padding:
                    '9px 18px',

                  borderRadius: 999,

                  background:
                    'var(--a3)',

                  border:
                    '1px solid rgba(126,200,122,0.22)',

                  marginBottom: 26,

                  boxShadow:
                    '0 0 18px rgba(126,200,122,0.08)',
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,

                    borderRadius:
                      '50%',

                    background:
                      'var(--a)',

                    boxShadow:
                      '0 0 12px var(--a-glow)',
                  }}
                />

                <span
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,

                    textTransform:
                      'uppercase',

                    letterSpacing:
                      '0.11em',

                    color:
                      'var(--a)',
                  }}
                >
                  AI Commerce Intelligence
                </span>
              </div>

              {/* TITLE */}

              <h1
                style={{
                  fontSize:
                    'clamp(54px,7vw,92px)',

                  fontWeight: 800,

                  letterSpacing:
                    '-0.075em',

                  lineHeight: 0.92,

                  color:
                    'var(--ink1)',

                  marginBottom: 26,

                  maxWidth: 760,

                  paddingRight: 12,
                }}
              >
                Make smarter
                <br />

                ecommerce
                <span
                  style={{
                    background:
                      'linear-gradient(135deg,var(--a),var(--a2))',

                    WebkitBackgroundClip:
                      'text',

                    WebkitTextFillColor:
                      'transparent',
                  }}
                >
                  {' '}
                  decisions
                </span>
              </h1>

              {/* DESCRIPTION */}

              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.9,

                  color:
                    'var(--ink2)',

                  maxWidth: 620,

                  marginBottom: 38,

                  letterSpacing:
                    '-0.015em',
                }}
              >
                ShopifyIQ transforms
                your store data into
                AI-powered insights,
                forecasting, customer
                intelligence, and
                growth opportunities —
                all in one elegant
                analytics platform.
              </p>

              {/* BUTTONS */}

              <div
                className="
                  flex
                  items-center
                  flex-wrap
                  gap-4
                "
              >
                <button
                  className="
                    btn-accent
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                  "
                  style={{
                    minHeight: 50,

                    padding:
                      '14px 20px',

                    borderRadius: 14,

                    fontSize: 14,

                    fontWeight: 600,

                    boxShadow:
                      '0 0 18px var(--a-glow)',
                  }}
                  onClick={() =>
                    navigate('/signup')
                  }
                >
                  Start free

                  <ArrowRight
                    style={{
                      width: 15,
                      height: 15,
                    }}
                  />
                </button>

                <button
                  className="
                    btn-ghost
                    inline-flex
                    items-center
                    justify-center
                  "
                  style={{
                    minHeight: 50,

                    padding:
                      '14px 20px',

                    borderRadius: 14,

                    fontSize: 14,

                    fontWeight: 600,
                  }}
                  onClick={() =>
                    navigate('/login')
                  }
                >
                  Book demo
                </button>
              </div>

              {/* TRUST */}

              <div
                className="
                  flex
                  items-center
                  flex-wrap
                  gap-x-7
                  gap-y-4
                "
                style={{
                  marginTop: 36,
                }}
              >
                {[
                  '14-day free trial',
                  'No credit card',
                  'Setup in 2 minutes',
                ].map((t) => (
                  <div
                    key={t}
                    style={{
                      display: 'flex',
                      alignItems:
                        'center',

                      gap: 9,

                      fontSize: 13.5,

                      fontWeight: 500,

                      color:
                        'var(--ink3)',
                    }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,

                        borderRadius:
                          '50%',

                        background:
                          'var(--up-bg)',

                        display: 'flex',
                        alignItems:
                          'center',

                        justifyContent:
                          'center',
                      }}
                    >
                      <Check
                        style={{
                          width: 11,
                          height: 11,

                          color:
                            'var(--up)',
                        }}
                      />
                    </div>

                    {t}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────── TICKER ───────────────── */}

      <div
        style={{
          background:
            'linear-gradient(180deg,var(--s1),var(--s0))',

          borderBottom:
            '1px solid var(--b1)',

          overflow: 'hidden',

          padding: '14px 0',

          position: 'relative',
        }}
      >
        <div className="ticker-track">
          {[...Array(2)].map(
            (_, o) => (
              <div
                key={o}
                style={{
                  display: 'flex',
                  flexShrink: 0,
                }}
              >
                {tickerItems.map(
                  (t, i) => (
                    <span
                      key={i}
                      style={{
                        display:
                          'inline-flex',

                        alignItems:
                          'center',

                        gap: 9,

                        padding:
                          '0 40px',

                        fontSize:
                          13.5,

                        fontWeight:
                          500,

                        color:
                          'var(--ink3)',

                        whiteSpace:
                          'nowrap',
                      }}
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            )
          )}
        </div>
      </div>
            {/* ───────────────── DASHBOARD ───────────────── */}

      <section
        id="dashboard"
        style={{
          padding:
            '96px 24px 48px',
        }}
      >
        <div
          className="
            max-w-[1440px]
            mx-auto
          "
        >
          {/* HEADER */}

          <Reveal>
            <div
              style={{
                maxWidth: 760,
                marginBottom: 42,
              }}
            >
              <p
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,

                  textTransform:
                    'uppercase',

                  letterSpacing:
                    '0.11em',

                  color:
                    'var(--a)',

                  marginBottom: 12,
                }}
              >
                Dashboard
              </p>

              <h2
                style={{
                  fontSize:
                    'clamp(38px,4.5vw,56px)',

                  fontWeight: 800,

                  letterSpacing:
                    '-0.06em',

                  lineHeight: 1.02,

                  color:
                    'var(--ink1)',

                  marginBottom: 16,
                }}
              >
                Intelligence,
                beautifully composed
              </h2>

              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.8,

                  color:
                    'var(--ink2)',

                  maxWidth: 560,
                }}
              >
                Every important signal
                from your store surfaced
                at the right moment with
                AI-powered analytics.
              </p>
            </div>
          </Reveal>

          {/* BENTO */}

          <div className="bento">
            {/* REVENUE CARD */}

            <Reveal
              className="b4"
              delay={0}
            >
              <div
                className="
                  card
                  glow-card
                  lift
                "
                style={{
                  borderRadius: 30,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    padding:
                      '24px 24px 14px',

                    display: 'flex',

                    justifyContent:
                      'space-between',

                    alignItems:
                      'flex-start',
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 700,

                        textTransform:
                          'uppercase',

                        letterSpacing:
                          '0.09em',

                        color:
                          'var(--ink3)',

                        marginBottom: 10,
                      }}
                    >
                      Revenue MTD
                    </p>

                    <p
                      style={{
                        fontSize: 42,
                        fontWeight: 800,

                        letterSpacing:
                          '-0.06em',

                        lineHeight: 1,

                        color:
                          'var(--ink1)',

                        marginBottom: 12,
                      }}
                    >
                      $148.2K
                    </p>

                    <span
                      className="badge"
                      style={{
                        background:
                          'var(--up-bg)',

                        color:
                          'var(--up)',

                        padding:
                          '6px 12px',

                        fontSize: 12,
                      }}
                    >
                      ↑ 18.2% vs last month
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      gap: 4,

                      background:
                        'var(--s2)',

                      border:
                        '1px solid var(--b1)',

                      borderRadius: 12,

                      padding: 4,
                    }}
                  >
                    {[
                      '1M',
                      '3M',
                      '6M',
                    ].map((t, i) => (
                      <div
                        key={t}
                        style={{
                          fontSize: 11.5,

                          fontWeight: 600,

                          padding:
                            '5px 10px',

                          borderRadius: 9,

                          ...(i === 2
                            ? {
                                background:
                                  'var(--s0)',

                                color:
                                  'var(--ink1)',
                              }
                            : {
                                color:
                                  'var(--ink3)',
                              }),
                        }}
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    padding:
                      '0 10px 18px',
                  }}
                >
                  <RevenueSparkline
                    data={[
                      {
                        month: 'Jan',
                        revenue: 12400,
                      },
                      {
                        month: 'Feb',
                        revenue: 19200,
                      },
                      {
                        month: 'Mar',
                        revenue: 24800,
                      },
                      {
                        month: 'Apr',
                        revenue: 31600,
                      },
                      {
                        month: 'May',
                        revenue: 44200,
                      },
                      {
                        month: 'Jun',
                        revenue: 58100,
                      },
                    ]}
                    height={220}
                  />
                </div>
              </div>
            </Reveal>

            {/* AI COPILOT */}

            <Reveal
              className="b2"
              delay={0.12}
            >
              <div
                className="
                  glass
                  lift
                "
                style={{
                  padding: 24,
                  borderRadius: 28,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems:
                      'center',

                    gap: 10,

                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,

                      borderRadius: 10,

                      background:
                        'var(--a)',

                      display: 'flex',
                      alignItems:
                        'center',

                      justifyContent:
                        'center',

                      boxShadow:
                        '0 0 16px var(--a-glow)',
                    }}
                  >
                    <Bot
                      style={{
                        width: 14,
                        height: 14,

                        color:
                          'var(--bg)',
                      }}
                    />
                  </div>

                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,

                      color:
                        'var(--ink1)',
                    }}
                  >
                    AI Copilot
                  </span>
                </div>

                <div
                  className="bubble-ai"
                  style={{
                    marginBottom: 14,
                    fontSize: 13,
                    lineHeight: 1.7,
                  }}
                >
                  Revenue is up 18%
                  this month. Biggest
                  risk: 391 at-risk
                  customers worth
                  approximately $64K
                  in future revenue.
                </div>

                <div
                  className="bubble-user"
                  style={{
                    marginLeft: 'auto',
                    marginBottom: 14,
                    fontSize: 13,
                  }}
                >
                  Which market should
                  we focus on next?
                </div>

                <div
                  className="bubble-ai"
                  style={{
                    fontSize: 13,
                    lineHeight: 1.7,
                  }}
                >
                  Germany shows strong
                  traffic growth but
                  conversion is still
                  12% below average.
                </div>

                <button
                  className="
                    btn-ghost
                    inline-flex
                    items-center
                    justify-center
                  "
                  style={{
                    width: '100%',

                    marginTop: 18,

                    minHeight: 46,

                    borderRadius: 14,

                    fontWeight: 600,
                  }}
                >
                  Try AI Copilot free
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
            {/* ───────────────── PRICING ───────────────── */}

      <section
        id="pricing"
        style={{
          padding:
            '104px 24px 48px',
        }}
      >
        <div
          className="
            max-w-[1440px]
            mx-auto
          "
        >
          {/* HEADER */}

          <Reveal>
            <div
              style={{
                maxWidth: 760,
                marginBottom: 48,
              }}
            >
              <p
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,

                  textTransform:
                    'uppercase',

                  letterSpacing:
                    '0.12em',

                  color:
                    'var(--a)',

                  marginBottom: 14,
                }}
              >
                Pricing
              </p>

              <h2
                style={{
                  fontSize:
                    'clamp(38px,4.5vw,56px)',

                  fontWeight: 800,

                  letterSpacing:
                    '-0.06em',

                  lineHeight: 1,

                  color:
                    'var(--ink1)',

                  marginBottom: 18,
                }}
              >
                Simple, honest pricing
              </h2>

              <p
                style={{
                  fontSize: 16.5,
                  lineHeight: 1.85,

                  color:
                    'var(--ink2)',

                  maxWidth: 580,
                }}
              >
                Start free, scale as
                you grow, and unlock
                advanced intelligence
                only when your business
                actually needs it.
              </p>
            </div>
          </Reveal>

          {/* CARDS */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-6
            "
          >
            {[
              {
                tier: 'Starter',
                price: '$0',
                period: '/month',
                featured: false,
                desc:
                  'Perfect for testing ShopifyIQ with your first store.',

                features: [
                  'Basic analytics',
                  'Revenue tracking',
                  'Customer insights',
                  'Email support',
                ],

                cta: 'Start free',
              },

              {
                tier: 'Growth',
                price: '$49',
                period: '/month',
                featured: true,
                desc:
                  'Advanced AI intelligence for growing ecommerce brands.',

                features: [
                  'AI Copilot',
                  'Forecasting',
                  'Retention analytics',
                  'Inventory signals',
                ],

                cta: 'Start growth',
              },

              {
                tier: 'Enterprise',
                price: 'Custom',
                period: '',
                featured: false,
                desc:
                  'Custom infrastructure and support for large teams.',

                features: [
                  'Unlimited stores',
                  'Priority support',
                  'Custom onboarding',
                  'Dedicated manager',
                ],

                cta: 'Contact sales',
              },
            ].map((p, i) => (
              <Reveal
                key={p.tier}
                delay={i * 0.06}
              >
                <div
                  className={`
                    price-card
                    ${
                      p.featured
                        ? 'price-featured'
                        : ''
                    }
                  `}
                  style={{
                    padding: 30,

                    borderRadius: 30,

                    minHeight: '100%',

                    display: 'flex',

                    flexDirection:
                      'column',

                    justifyContent:
                      'space-between',

                    position:
                      'relative',

                    overflow:
                      'hidden',

                    transition:
                      'transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      'translateY(-4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      'translateY(0px)'
                  }}
                >
                  <div>
                    {p.featured && (
                      <div
                        style={{
                          display:
                            'inline-flex',

                          alignItems:
                            'center',

                          gap: 7,

                          borderRadius:
                            999,

                          padding:
                            '5px 14px',

                          marginBottom:
                            18,

                          fontSize:
                            10.5,

                          fontWeight:
                            700,

                          textTransform:
                            'uppercase',

                          letterSpacing:
                            '0.08em',

                          background:
                            'var(--a3)',

                          border:
                            '1px solid rgba(126,200,122,0.26)',

                          color:
                            'var(--a)',
                        }}
                      >
                        Most popular
                      </div>
                    )}

                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 700,

                        textTransform:
                          'uppercase',

                        letterSpacing:
                          '0.1em',

                        color:
                          'var(--ink3)',

                        marginBottom:
                          14,
                      }}
                    >
                      {p.tier}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        alignItems:
                          'baseline',

                        gap: 6,

                        marginBottom:
                          10,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 42,
                          fontWeight: 800,

                          letterSpacing:
                            '-0.06em',

                          color:
                            'var(--ink1)',
                        }}
                      >
                        {p.price}
                      </span>

                      <span
                        style={{
                          fontSize: 14,

                          color:
                            'var(--ink3)',
                        }}
                      >
                        {p.period}
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: 14,
                        lineHeight: 1.75,

                        color:
                          'var(--ink3)',

                        marginBottom:
                          26,
                      }}
                    >
                      {p.desc}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection:
                          'column',

                        gap: 12,

                        marginBottom:
                          30,
                      }}
                    >
                      {p.features.map(
                        (f) => (
                          <div
                            key={f}
                            style={{
                              display:
                                'flex',

                              alignItems:
                                'center',

                              gap: 10,
                            }}
                          >
                            <div
                              style={{
                                width: 18,
                                height: 18,

                                borderRadius:
                                  6,

                                background:
                                  'var(--up-bg)',

                                display:
                                  'flex',

                                alignItems:
                                  'center',

                                justifyContent:
                                  'center',
                              }}
                            >
                              <Check
                                style={{
                                  width: 10,
                                  height: 10,

                                  color:
                                    'var(--up)',
                                }}
                              />
                            </div>

                            <span
                              style={{
                                fontSize:
                                  13.5,

                                color:
                                  'var(--ink2)',
                              }}
                            >
                              {f}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <button
                    className={
                      p.featured
                        ? 'btn-accent'
                        : 'btn-ghost'
                    }
                    style={{
                      width: '100%',

                      justifyContent:
                        'center',

                      minHeight: 48,

                      borderRadius: 14,

                      fontWeight: 600,
                    }}
                  >
                    {p.cta}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── CTA ───────────────── */}

      <section
        style={{
          padding: '96px 24px',
        }}
      >
        <Reveal>
          <div
            className="
              cta-section
              relative
              overflow-hidden
            "
            style={{
              padding:
                '80px clamp(24px,4vw,48px)',

              textAlign: 'center',

              borderRadius: 36,

              border:
                '1px solid var(--b1)',

              background:
                'linear-gradient(180deg,var(--s0),var(--s1))',
            }}
          >
            <div
              style={{
                position: 'relative',
                zIndex: 1,

                maxWidth: 780,

                margin: '0 auto',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems:
                    'center',

                  gap: 9,

                  padding:
                    '9px 18px',

                  borderRadius: 999,

                  background:
                    'var(--a3)',

                  border:
                    '1px solid rgba(126,200,122,0.22)',

                  marginBottom: 26,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,

                    borderRadius:
                      '50%',

                    background:
                      'var(--a)',
                  }}
                />

                <span
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,

                    textTransform:
                      'uppercase',

                    letterSpacing:
                      '0.11em',

                    color:
                      'var(--a)',
                  }}
                >
                  Get started today
                </span>
              </div>

              <h2
                style={{
                  fontSize:
                    'clamp(40px,5.5vw,60px)',

                  fontWeight: 800,

                  letterSpacing:
                    '-0.065em',

                  lineHeight: 0.98,

                  color:
                    'var(--ink1)',

                  marginBottom: 24,
                }}
              >
                Your store data is
                <br />

                trying to tell you

                <span
                  style={{
                    background:
                      'linear-gradient(135deg,var(--a),var(--a2))',

                    WebkitBackgroundClip:
                      'text',

                    WebkitTextFillColor:
                      'transparent',

                    paddingLeft: 8,
                  }}
                >
                  something
                </span>
              </h2>

              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.85,

                  color:
                    'var(--ink2)',

                  maxWidth: 620,

                  margin:
                    '0 auto 42px',
                }}
              >
                More than 2,400
                merchants already use
                ShopifyIQ to predict
                churn and uncover
                hidden growth
                opportunities.
              </p>

              <div
                className="
                  flex
                  items-center
                  justify-center
                  flex-wrap
                  gap-4
                "
              >
                <button
                  className="
                    btn-accent
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                  "
                  style={{
                    minHeight: 48,

                    padding:
                      '13px 20px',

                    borderRadius: 14,

                    fontWeight: 600,
                  }}
                >
                  Start free

                  <ArrowRight
                    style={{
                      width: 15,
                      height: 15,
                    }}
                  />
                </button>

                <button
                  className="
                    btn-ghost
                    inline-flex
                    items-center
                    justify-center
                  "
                  style={{
                    minHeight: 48,

                    padding:
                      '13px 20px',

                    borderRadius: 14,

                    fontWeight: 600,
                  }}
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
            {/* ───────────────── PRICING ───────────────── */}

      <section
        id="pricing"
        style={{
          padding:
            '104px 24px 48px',
        }}
      >
        <div
          className="
            max-w-[1440px]
            mx-auto
          "
        >
          {/* HEADER */}

          <Reveal>
            <div
              style={{
                maxWidth: 760,
                marginBottom: 48,
              }}
            >
              <p
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,

                  textTransform:
                    'uppercase',

                  letterSpacing:
                    '0.12em',

                  color:
                    'var(--a)',

                  marginBottom: 14,
                }}
              >
                Pricing
              </p>

              <h2
                style={{
                  fontSize:
                    'clamp(38px,4.5vw,56px)',

                  fontWeight: 800,

                  letterSpacing:
                    '-0.06em',

                  lineHeight: 1,

                  color:
                    'var(--ink1)',

                  marginBottom: 18,
                }}
              >
                Simple, honest pricing
              </h2>

              <p
                style={{
                  fontSize: 16.5,
                  lineHeight: 1.85,

                  color:
                    'var(--ink2)',

                  maxWidth: 580,
                }}
              >
                Start free, scale as
                you grow, and unlock
                advanced intelligence
                only when your business
                actually needs it.
              </p>
            </div>
          </Reveal>

          {/* CARDS */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-6
            "
          >
            {[
              {
                tier: 'Starter',
                price: '$0',
                period: '/month',
                featured: false,
                desc:
                  'Perfect for testing ShopifyIQ with your first store.',

                features: [
                  'Basic analytics',
                  'Revenue tracking',
                  'Customer insights',
                  'Email support',
                ],

                cta: 'Start free',
              },

              {
                tier: 'Growth',
                price: '$49',
                period: '/month',
                featured: true,
                desc:
                  'Advanced AI intelligence for growing ecommerce brands.',

                features: [
                  'AI Copilot',
                  'Forecasting',
                  'Retention analytics',
                  'Inventory signals',
                ],

                cta: 'Start growth',
              },

              {
                tier: 'Enterprise',
                price: 'Custom',
                period: '',
                featured: false,
                desc:
                  'Custom infrastructure and support for large teams.',

                features: [
                  'Unlimited stores',
                  'Priority support',
                  'Custom onboarding',
                  'Dedicated manager',
                ],

                cta: 'Contact sales',
              },
            ].map((p, i) => (
              <Reveal
                key={p.tier}
                delay={i * 0.06}
              >
                <div
                  className={`
                    price-card
                    ${
                      p.featured
                        ? 'price-featured'
                        : ''
                    }
                  `}
                  style={{
                    padding: 30,

                    borderRadius: 30,

                    minHeight: '100%',

                    display: 'flex',

                    flexDirection:
                      'column',

                    justifyContent:
                      'space-between',

                    position:
                      'relative',

                    overflow:
                      'hidden',

                    transition:
                      'transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      'translateY(-4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      'translateY(0px)'
                  }}
                >
                  <div>
                    {p.featured && (
                      <div
                        style={{
                          display:
                            'inline-flex',

                          alignItems:
                            'center',

                          gap: 7,

                          borderRadius:
                            999,

                          padding:
                            '5px 14px',

                          marginBottom:
                            18,

                          fontSize:
                            10.5,

                          fontWeight:
                            700,

                          textTransform:
                            'uppercase',

                          letterSpacing:
                            '0.08em',

                          background:
                            'var(--a3)',

                          border:
                            '1px solid rgba(126,200,122,0.26)',

                          color:
                            'var(--a)',
                        }}
                      >
                        Most popular
                      </div>
                    )}

                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 700,

                        textTransform:
                          'uppercase',

                        letterSpacing:
                          '0.1em',

                        color:
                          'var(--ink3)',

                        marginBottom:
                          14,
                      }}
                    >
                      {p.tier}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        alignItems:
                          'baseline',

                        gap: 6,

                        marginBottom:
                          10,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 42,
                          fontWeight: 800,

                          letterSpacing:
                            '-0.06em',

                          color:
                            'var(--ink1)',
                        }}
                      >
                        {p.price}
                      </span>

                      <span
                        style={{
                          fontSize: 14,

                          color:
                            'var(--ink3)',
                        }}
                      >
                        {p.period}
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: 14,
                        lineHeight: 1.75,

                        color:
                          'var(--ink3)',

                        marginBottom:
                          26,
                      }}
                    >
                      {p.desc}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection:
                          'column',

                        gap: 12,

                        marginBottom:
                          30,
                      }}
                    >
                      {p.features.map(
                        (f) => (
                          <div
                            key={f}
                            style={{
                              display:
                                'flex',

                              alignItems:
                                'center',

                              gap: 10,
                            }}
                          >
                            <div
                              style={{
                                width: 18,
                                height: 18,

                                borderRadius:
                                  6,

                                background:
                                  'var(--up-bg)',

                                display:
                                  'flex',

                                alignItems:
                                  'center',

                                justifyContent:
                                  'center',
                              }}
                            >
                              <Check
                                style={{
                                  width: 10,
                                  height: 10,

                                  color:
                                    'var(--up)',
                                }}
                              />
                            </div>

                            <span
                              style={{
                                fontSize:
                                  13.5,

                                color:
                                  'var(--ink2)',
                              }}
                            >
                              {f}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <button
                    className={
                      p.featured
                        ? 'btn-accent'
                        : 'btn-ghost'
                    }
                    style={{
                      width: '100%',

                      justifyContent:
                        'center',

                      minHeight: 48,

                      borderRadius: 14,

                      fontWeight: 600,
                    }}
                  >
                    {p.cta}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── CTA ───────────────── */}

      <section
        style={{
          padding: '96px 24px',
        }}
      >
        <Reveal>
          <div
            className="
              cta-section
              relative
              overflow-hidden
            "
            style={{
              padding:
                '80px clamp(24px,4vw,48px)',

              textAlign: 'center',

              borderRadius: 36,

              border:
                '1px solid var(--b1)',

              background:
                'linear-gradient(180deg,var(--s0),var(--s1))',
            }}
          >
            <div
              style={{
                position: 'relative',
                zIndex: 1,

                maxWidth: 780,

                margin: '0 auto',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems:
                    'center',

                  gap: 9,

                  padding:
                    '9px 18px',

                  borderRadius: 999,

                  background:
                    'var(--a3)',

                  border:
                    '1px solid rgba(126,200,122,0.22)',

                  marginBottom: 26,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,

                    borderRadius:
                      '50%',

                    background:
                      'var(--a)',
                  }}
                />

                <span
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,

                    textTransform:
                      'uppercase',

                    letterSpacing:
                      '0.11em',

                    color:
                      'var(--a)',
                  }}
                >
                  Get started today
                </span>
              </div>

              <h2
                style={{
                  fontSize:
                    'clamp(40px,5.5vw,60px)',

                  fontWeight: 800,

                  letterSpacing:
                    '-0.065em',

                  lineHeight: 0.98,

                  color:
                    'var(--ink1)',

                  marginBottom: 24,
                }}
              >
                Your store data is
                <br />

                trying to tell you

                <span
                  style={{
                    background:
                      'linear-gradient(135deg,var(--a),var(--a2))',

                    WebkitBackgroundClip:
                      'text',

                    WebkitTextFillColor:
                      'transparent',

                    paddingLeft: 8,
                  }}
                >
                  something
                </span>
              </h2>

              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.85,

                  color:
                    'var(--ink2)',

                  maxWidth: 620,

                  margin:
                    '0 auto 42px',
                }}
              >
                More than 2,400
                merchants already use
                ShopifyIQ to predict
                churn and uncover
                hidden growth
                opportunities.
              </p>

              <div
                className="
                  flex
                  items-center
                  justify-center
                  flex-wrap
                  gap-4
                "
              >
                <button
                  className="
                    btn-accent
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                  "
                  style={{
                    minHeight: 48,

                    padding:
                      '13px 20px',

                    borderRadius: 14,

                    fontWeight: 600,
                  }}
                >
                  Start free

                  <ArrowRight
                    style={{
                      width: 15,
                      height: 15,
                    }}
                  />
                </button>

                <button
                  className="
                    btn-ghost
                    inline-flex
                    items-center
                    justify-center
                  "
                  style={{
                    minHeight: 48,

                    padding:
                      '13px 20px',

                    borderRadius: 14,

                    fontWeight: 600,
                  }}
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
      {/* ───────────────── FOOTER ───────────────── */}

<footer
  className="
    border-t
    border-[var(--b1)]
  "
  style={{
    padding: '28px 24px',
  }}
>
  <div
    className="
      max-w-[1440px]
      mx-auto
      flex
      flex-col
      md:flex-row
      md:items-center
      md:justify-between
      gap-5
    "
  >
    <div
      className="
        flex
        items-center
        flex-wrap
        gap-3
      "
    >
      <div
        style={{
          width: 28,
          height: 28,

          borderRadius: 9,

          background:
            'var(--a)',

          display: 'flex',

          alignItems:
            'center',

          justifyContent:
            'center',

          boxShadow:
            '0 0 14px var(--a-glow)',
        }}
      >
        <Leaf
          style={{
            width: 13,
            height: 13,

            color:
              'var(--bg)',
          }}
        />
      </div>

      <span
        style={{
          fontSize: 14,
          fontWeight: 700,

          letterSpacing:
            '-0.03em',

          color:
            'var(--ink1)',
        }}
      >
        ShopifyIQ
      </span>

      <span
        style={{
          fontSize: 12.5,

          color:
            'var(--ink4)',
        }}
      >
        © 2024 · AI Commerce Intelligence
      </span>
    </div>

    <div
      className="
        flex
        items-center
        flex-wrap
        gap-6
      "
    >
      {[
        'Privacy',
        'Terms',
        'Docs',
        'Status',
        'Blog',
      ].map((l) => (
        <span
          key={l}
          style={{
            fontSize: 13,

            fontWeight: 500,

            color:
              'var(--ink3)',

            cursor: 'pointer',

            transition:
              'color 140ms ease',
          }}
        >
          {l}
        </span>
      ))}
    </div>
  </div>
</footer>
    </div>
  )
}