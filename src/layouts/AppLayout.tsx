import { useState, useEffect, useRef } from 'react'
import {
  Outlet,
  NavLink,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import {
  AnimatePresence,
  motion,
} from 'framer-motion'

import {
  LayoutDashboard,
  TrendingUp,
  Users,
  Bot,
  Settings,
  Bell,
  Moon,
  Sun,
  LogOut,
  Search,
  X,
  Menu,
  Leaf,
  ArrowRight,
  ChevronRight,
} from 'lucide-react'

import {
  getTheme,
  toggleTheme,
} from '../lib/theme'

const NAV = [
  {
    path: '/dashboard',
    label: 'Overview',
    icon: LayoutDashboard,
    exact: true,
  },

  {
    path: '/dashboard/revenue',
    label: 'Revenue',
    icon: TrendingUp,
  },

  {
    path: '/dashboard/customers',
    label: 'Customers',
    icon: Users,
  },

  {
    path: '/dashboard/copilot',
    label: 'AI Copilot',
    icon: Bot,
    badge: true,
  },
]

function CmdPalette({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [q, setQ] = useState('')

  const ref =
    useRef<HTMLInputElement>(null)

  const navigate = useNavigate()

  const all = [
    ...NAV,

    {
      path: '/dashboard/settings',
      label: 'Settings',
      icon: Settings,
      exact: false,
    },
  ]

  const items = all.filter(
    (n) =>
      !q ||
      n.label
        .toLowerCase()
        .includes(q.toLowerCase())
  )

  useEffect(() => {
    if (open) {
      setQ('')

      setTimeout(
        () => ref.current?.focus(),
        30
      )
    }
  }, [open])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape')
        onClose()
    }

    window.addEventListener(
      'keydown',
      h
    )

    return () =>
      window.removeEventListener(
        'keydown',
        h
      )
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="cmd-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: -8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
            }}
            transition={{
              duration: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="cmd-box"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div
              className="
                flex
                items-center
                gap-3
                px-4
                py-3
                border-b
                border-[var(--b1)]
              "
            >
              <Search
                className="w-4 h-4"
                style={{
                  color: 'var(--ink3)',
                }}
              />

              <input
                ref={ref}
                value={q}
                onChange={(e) =>
                  setQ(e.target.value)
                }
                placeholder="Search pages, actions..."
                className="input-field"
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: 0,
                  fontSize: 13,
                }}
              />

              <kbd
                style={{
                  fontSize: 10,
                  padding: '2px 6px',
                  borderRadius: 4,
                  background: 'var(--s2)',
                  color: 'var(--ink3)',
                  fontFamily:
                    'var(--mono)',
                }}
              >
                ESC
              </kbd>
            </div>

            <div className="py-2">
              <p
                className="
                  px-4
                  pb-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.08em]
                  text-[var(--ink3)]
                "
              >
                Pages
              </p>

              {items.map((item) => {
                const Icon = item.icon

                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path)
                      onClose()
                    }}
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-4
                      py-2.5
                      transition-colors
                      hover:bg-[var(--s2)]
                    "
                  >
                    <div
                      className="
                        w-7
                        h-7
                        rounded-lg
                        flex
                        items-center
                        justify-center
                        bg-[var(--s2)]
                        border
                        border-[var(--b1)]
                      "
                    >
                      <Icon
                        className="w-3.5 h-3.5"
                        style={{
                          color:
                            'var(--ink3)',
                        }}
                      />
                    </div>

                    <span
                      className="
                        text-sm
                        text-[var(--ink1)]
                      "
                    >
                      {item.label}
                    </span>

                    <ArrowRight
                      className="
                        w-3
                        h-3
                        ml-auto
                      "
                      style={{
                        color:
                          'var(--ink4)',
                      }}
                    />
                  </button>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function NotifPanel({
  onClose,
}: {
  onClose: () => void
}) {
  const items = [
    {
      c: 'var(--a)',
      t: 'Revenue milestone hit',
      b: 'June exceeded $58K target.',
    },

    {
      c: 'var(--warn)',
      t: 'Inventory alert',
      b: 'Earbuds Pro — 5 days stock.',
    },

    {
      c: 'var(--up)',
      t: 'New AI insight ready',
      b: 'Churn analysis updated.',
    },
  ]

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 6,
        scale: 0.97,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 4,
      }}
      transition={{
        duration: 0.15,
      }}
      className="
        absolute
        right-0
        top-[calc(100%+8px)]
        w-[300px]
        rounded-2xl
        overflow-hidden
        border
        border-[var(--b2)]
        bg-[var(--s0)]
        shadow-2xl
        z-50
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          px-4
          py-3
          border-b
          border-[var(--b1)]
        "
      >
        <span
          className="
            text-sm
            font-semibold
            text-[var(--ink1)]
          "
        >
          Notifications
        </span>

        <button
          onClick={onClose}
          className="
            bg-transparent
            border-none
            cursor-pointer
          "
        >
          <X
            className="w-4 h-4"
            style={{
              color: 'var(--ink3)',
            }}
          />
        </button>
      </div>

      {items.map((n, i) => (
        <div
          key={i}
          className="
            flex
            items-start
            gap-3
            px-4
            py-3
            border-b
            border-[var(--b1)]
          "
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: n.c,
              marginTop: 6,
            }}
          />

          <div>
            <p
              className="
                text-sm
                font-medium
                text-[var(--ink1)]
              "
            >
              {n.t}
            </p>

            <p
              className="
                text-xs
                mt-1
                text-[var(--ink3)]
              "
            >
              {n.b}
            </p>
          </div>
        </div>
      ))}
    </motion.div>
  )
}

export default function AppLayout() {
  const [dark, setDark] =
    useState(
      getTheme() === 'dark'
    )

  const [cmd, setCmd] =
    useState(false)

  const [notif, setNotif] =
    useState(false)

  const [mobile, setMobile] =
    useState(false)

  const location = useLocation()

  const navigate = useNavigate()

  useEffect(() => {
    const h = (
      e: KeyboardEvent
    ) => {
      if (
        (e.metaKey || e.ctrlKey) &&
        e.key === 'k'
      ) {
        e.preventDefault()
        setCmd(true)
      }
    }

    window.addEventListener(
      'keydown',
      h
    )

    return () =>
      window.removeEventListener(
        'keydown',
        h
      )
  }, [])

  const onToggleTheme = () => {
    const next = toggleTheme()

    setDark(next === 'dark')
  }

  const email =
    localStorage.getItem(
      'iq-email'
    ) || 'user@store.com'

  const initials = email
    .slice(0, 2)
    .toUpperCase()

  const signOut = () => {
    localStorage.removeItem(
      'iq-email'
    )

    navigate('/')
  }

  const allPages = [
    ...NAV,

    {
      path: '/dashboard/settings',
      label: 'Settings',
      icon: Settings,
      exact: false,
    },
  ]

  const pageLabel =
    allPages.find((n) =>
      n.exact
        ? location.pathname ===
          n.path
        : location.pathname.startsWith(
            n.path
          )
    )?.label ?? 'Overview'

  return (
    <div
      className="
        flex
        min-h-screen
        overflow-hidden
        bg-[var(--bg)]
      "
    >
      <CmdPalette
        open={cmd}
        onClose={() => setCmd(false)}
      />

      {/* MOBILE OVERLAY */}

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-40
              bg-black/50
              backdrop-blur-sm
              lg:hidden
            "
            onClick={() =>
              setMobile(false)
            }
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          min-h-screen
          w-[250px]
          border-r
          border-[var(--b1)]
          bg-[var(--s1)]
          flex
          flex-col
          transition-transform
          duration-300
          ease-out

          ${
            mobile
              ? 'translate-x-0'
              : '-translate-x-full'
          }

          lg:translate-x-0
        `}
      >
        {/* LOGO */}

        <div
          className="
            flex
            items-center
            justify-between
            h-[60px]
            px-5
            border-b
            border-[var(--b1)]
            shrink-0
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                w-8
                h-8
                rounded-xl
                flex
                items-center
                justify-center
              "
              style={{
                background: 'var(--a)',
                boxShadow:
                  '0 0 16px var(--a-glow)',
              }}
            >
              <Leaf
                className="w-4 h-4"
                style={{
                  color: 'var(--bg)',
                }}
              />
            </div>

            <span
              className="
                text-[15px]
                font-bold
                tracking-[-0.03em]
                text-[var(--ink1)]
              "
            >
              ShopifyIQ
            </span>
          </div>

          <button
            className="lg:hidden"
            onClick={() =>
              setMobile(false)
            }
          >
            <X
              className="w-4 h-4"
              style={{
                color: 'var(--ink3)',
              }}
            />
          </button>
        </div>

        {/* NAVIGATION */}

        <nav
          className="
            flex-1
            overflow-y-auto
            px-3
            py-4
            flex
            flex-col
            gap-1
          "
        >
          {NAV.map((item) => {
            const Icon = item.icon

            const active = item.exact
              ? location.pathname ===
                item.path
              : location.pathname.startsWith(
                  item.path
                )

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                onClick={() =>
                  setMobile(false)
                }
                className={`
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-2.5
                  text-sm
                  font-medium
                  transition-all

                  ${
                    active
                      ? 'bg-[var(--a3)] text-[var(--a)]'
                      : 'text-[var(--ink3)] hover:bg-[var(--s2)] hover:text-[var(--ink1)]'
                  }
                `}
              >
                <Icon className="w-4 h-4 shrink-0" />

                {item.label}

                {item.badge && (
                  <span
                    className="
                      ml-auto
                      text-[9px]
                      font-bold
                      px-2
                      py-1
                      rounded-full
                    "
                    style={{
                      background:
                        'var(--a)',
                      color:
                        'var(--bg)',
                    }}
                  >
                    AI
                  </span>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* BOTTOM */}

        <div
          className="
            border-t
            border-[var(--b1)]
            p-3
            flex
            flex-col
            gap-2
          "
        >
          <button
            onClick={() => {
              navigate(
                '/dashboard/settings'
              )

              setMobile(false)
            }}
            className="
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-xl
              text-sm
              font-medium
              text-[var(--ink3)]
              hover:bg-[var(--s2)]
              hover:text-[var(--ink1)]
              transition-all
            "
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>

          <button
            onClick={signOut}
            className="
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-xl
              text-sm
              font-medium
              text-[var(--ink3)]
              hover:bg-[var(--dn-bg)]
              hover:text-[var(--dn)]
              transition-all
            "
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>

          <div
            className="
              flex
              items-center
              gap-3
              rounded-xl
              bg-[var(--s1)]
              px-3
              py-3
              mt-1
            "
          >
            <div
              className="
                w-8
                h-8
                rounded-lg
                flex
                items-center
                justify-center
                text-[11px]
                font-bold
              "
              style={{
                background: 'var(--a3)',
                color: 'var(--a)',
              }}
            >
              {initials}
            </div>

            <span
              className="
                text-sm
                font-medium
                text-[var(--ink2)]
                truncate
              "
            >
              {email}
            </span>
          </div>
        </div>
      </aside>

      {/* MAIN */}

      <div
        className="
          flex-1
          flex
          flex-col
          overflow-hidden
          lg:ml-[250px]
        "
      >
        {/* TOPBAR */}

        <header
          className="
            h-[60px]
            border-b
            border-[var(--b1)]
            bg-[var(--s0)]
            px-5
            flex
            items-center
            justify-between
            shrink-0
          "
        >
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden"
              onClick={() =>
                setMobile(true)
              }
            >
              <Menu
                className="w-5 h-5"
                style={{
                  color: 'var(--ink3)',
                }}
              />
            </button>

            <span
              className="
                text-sm
                font-medium
                text-[var(--ink3)]
              "
            >
              {pageLabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCmd(true)}
              className="
                hidden
                md:flex
                items-center
                gap-2
                min-w-[190px]
                rounded-xl
                border
                border-[var(--b1)]
                bg-[var(--s1)]
                px-3
                py-2
                text-sm
                text-[var(--ink3)]
              "
            >
              <Search className="w-4 h-4" />

              <span>Search...</span>

              <kbd
                className="
                  ml-auto
                  rounded
                  bg-[var(--s2)]
                  px-1.5
                  py-0.5
                  text-[10px]
                "
              >
                ⌘K
              </kbd>
            </button>

            <button
              onClick={onToggleTheme}
              className="
                w-9
                h-9
                rounded-xl
                flex
                items-center
                justify-center
                hover:bg-[var(--s2)]
                transition-colors
              "
            >
              {dark ? (
                <Sun
                  className="w-4 h-4"
                  style={{
                    color:
                      'var(--ink3)',
                  }}
                />
              ) : (
                <Moon
                  className="w-4 h-4"
                  style={{
                    color:
                      'var(--ink3)',
                  }}
                />
              )}
            </button>

            <div className="relative">
              <button
                onClick={() =>
                  setNotif((n) => !n)
                }
                className="
                  relative
                  w-9
                  h-9
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  hover:bg-[var(--s2)]
                  transition-colors
                "
              >
                <Bell
                  className="w-4 h-4"
                  style={{
                    color:
                      'var(--ink3)',
                  }}
                />

                <span
                  className="
                    absolute
                    top-2
                    right-2
                    w-1.5
                    h-1.5
                    rounded-full
                  "
                  style={{
                    background:
                      'var(--a)',
                  }}
                />
              </button>

              <AnimatePresence>
                {notif && (
                  <NotifPanel
                    onClose={() =>
                      setNotif(false)
                    }
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* PAGE */}

        <main
          className="
            flex-1
            overflow-y-auto
          "
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{
                opacity: 0,
                y: 6,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                max-w-[1280px]
                mx-auto
                p-6
                md:p-8
              "
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
