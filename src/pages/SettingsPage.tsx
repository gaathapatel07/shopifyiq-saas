import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User, Bell, Palette, Shield, CreditCard,
  Store, Globe, Plug, Check, Moon, Sun, Leaf,
  ChevronRight, LogOut, Trash2, Eye, EyeOff,
} from 'lucide-react'
import { getTheme, toggleTheme } from '../lib/theme'
import { useNavigate } from 'react-router-dom'

const FV = { hidden: { opacity: 0, y: 10 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.35, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] } }) }

type Tab = 'profile' | 'store' | 'appearance' | 'notifications' | 'integrations' | 'billing' | 'security'

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: 'profile',       label: 'Profile',       icon: User       },
  { id: 'store',         label: 'Store',          icon: Store      },
  { id: 'appearance',    label: 'Appearance',     icon: Palette    },
  { id: 'notifications', label: 'Notifications',  icon: Bell       },
  { id: 'integrations',  label: 'Integrations',   icon: Plug       },
  { id: 'billing',       label: 'Billing',        icon: CreditCard },
  { id: 'security',      label: 'Security',       icon: Shield     },
]

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      onClick={() => onChange(!on)}
      style={{
        width: 40, height: 22, borderRadius: 99, cursor: 'pointer', flexShrink: 0,
        background: on ? 'var(--a)' : 'var(--s3)',
        transition: 'background 200ms ease',
        position: 'relative',
        border: '1px solid var(--b2)',
      }}
    >
      <div style={{
        position: 'absolute', top: 2, left: on ? 18 : 2,
        width: 16, height: 16, borderRadius: '50%',
        background: on ? 'var(--bg)' : 'var(--ink3)',
        transition: 'left 200ms ease, background 200ms ease',
        boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
      }} />
    </div>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, padding: '16px 0', borderBottom: '1px solid var(--b1)' }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--ink1)', marginBottom: hint ? 4 : 0 }}>{label}</p>
        {hint && <p style={{ fontSize: 12, color: 'var(--ink3)', lineHeight: 1.5 }}>{hint}</p>}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--ink3)', marginBottom: 4 }}>{title}</p>
      <div className="card" style={{ padding: '0 20px' }}>
        {children}
      </div>
    </div>
  )
}

// ── TAB PANELS ─────────────────────────────────────────────────

function ProfileTab() {
  const navigate  = useNavigate()
  const email     = localStorage.getItem('iq-email') || 'user@store.com'
  const [name, setName]   = useState(email.split('@')[0])
  const [mail, setMail]   = useState(email)
  const [saved, setSaved] = useState(false)

  const save = () => {
    localStorage.setItem('iq-email', mail)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <Section title="Personal information">
        <Field label="Display name" hint="Shown in the top bar and emails.">
          <input className="input-field" value={name} onChange={e => setName(e.target.value)} style={{ width: 220 }} />
        </Field>
        <Field label="Email address" hint="Used for login and notifications.">
          <input className="input-field" type="email" value={mail} onChange={e => setMail(e.target.value)} style={{ width: 220 }} />
        </Field>
        <Field label="Avatar" hint="Your initials are used if no image is set.">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--a3)', border: '1px solid var(--b2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'var(--a)' }}>
              {name.slice(0, 2).toUpperCase()}
            </div>
            <button className="btn-ghost" style={{ fontSize: 12, padding: '6px 12px' }}>Change</button>
          </div>
        </Field>
      </Section>

      <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
        <button className="btn-accent" style={{ fontSize: 13, padding: '9px 20px', display: 'flex', alignItems: 'center', gap: 7 }} onClick={save}>
          {saved ? <><Check style={{ width: 14, height: 14 }} />Saved!</> : 'Save changes'}
        </button>
      </div>

      <Section title="Danger zone">
        <Field label="Sign out" hint="Sign out of your account on this device.">
          <button className="btn-ghost" style={{ fontSize: 12.5, padding: '7px 14px', display: 'flex', alignItems: 'center', gap: 7, color: 'var(--dn)' }}
            onClick={() => { localStorage.removeItem('iq-email'); navigate('/') }}>
            <LogOut style={{ width: 13, height: 13 }} />Sign out
          </button>
        </Field>
        <Field label="Delete account" hint="Permanently delete your account and all data. This cannot be undone.">
          <button className="btn-ghost" style={{ fontSize: 12.5, padding: '7px 14px', display: 'flex', alignItems: 'center', gap: 7, color: 'var(--dn)', borderColor: 'var(--dn-bg)' }}>
            <Trash2 style={{ width: 13, height: 13 }} />Delete account
          </button>
        </Field>
      </Section>
    </div>
  )
}

function StoreTab() {
  const [storeName, setStoreName] = useState('My Shopify Store')
  const [currency, setCurrency]   = useState('USD')
  const [timezone, setTimezone]   = useState('UTC')
  const [saved, setSaved]         = useState(false)

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div>
      <Section title="Store details">
        <Field label="Store name" hint="Used in reports and dashboard headers.">
          <input className="input-field" value={storeName} onChange={e => setStoreName(e.target.value)} style={{ width: 220 }} />
        </Field>
        <Field label="Default currency" hint="Currency used for revenue calculations.">
          <select className="input-field" value={currency} onChange={e => setCurrency(e.target.value)} style={{ width: 120 }}>
            {['USD', 'EUR', 'GBP', 'CAD', 'AUD'].map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Timezone" hint="Used for date-based analytics.">
          <select className="input-field" value={timezone} onChange={e => setTimezone(e.target.value)} style={{ width: 200 }}>
            {['UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Europe/Berlin', 'Asia/Tokyo'].map(t => <option key={t}>{t}</option>)}
          </select>
        </Field>
      </Section>
      <Section title="Data">
        <Field label="Fiscal year start" hint="Used for annual revenue comparisons.">
          <select className="input-field" style={{ width: 130 }}>
            {['January', 'April', 'July', 'October'].map(m => <option key={m}>{m}</option>)}
          </select>
        </Field>
        <Field label="Attribution window" hint="Days to attribute a sale to a customer action.">
          <select className="input-field" style={{ width: 120 }}>
            {['7 days', '14 days', '30 days', '90 days'].map(w => <option key={w}>{w}</option>)}
          </select>
        </Field>
      </Section>
      <button className="btn-accent" style={{ fontSize: 13, padding: '9px 20px', display: 'flex', alignItems: 'center', gap: 7 }} onClick={save}>
        {saved ? <><Check style={{ width: 14, height: 14 }} />Saved!</> : 'Save changes'}
      </button>
    </div>
  )
}

function AppearanceTab() {
  const [dark, setDark]         = useState(getTheme() === 'dark')
  const [density, setDensity]   = useState<'compact' | 'default' | 'spacious'>('default')
  const [accent, setAccent]     = useState<'sage' | 'indigo' | 'ocean' | 'rose'>('sage')

  const handleTheme = (isDark: boolean) => {
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.classList.toggle('light', !isDark)
    localStorage.setItem('iq-theme', isDark ? 'dark' : 'light')
  }

  const accents = [
    { id: 'sage',   label: 'Sage green', dark: '#7EC87A', light: '#4A8C46' },
    { id: 'indigo', label: 'Indigo',     dark: '#818CF8', light: '#4F46E5' },
    { id: 'ocean',  label: 'Ocean',      dark: '#38BDF8', light: '#0284C7' },
    { id: 'rose',   label: 'Rose',       dark: '#FB7185', light: '#E11D48' },
  ]

  return (
    <div>
      <Section title="Theme">
        <Field label="Color mode" hint="Switch between the sage dark and beige light theme.">
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { label: 'Dark', icon: Moon,  val: true  },
              { label: 'Light', icon: Sun,  val: false },
            ].map(opt => {
              const Icon = opt.icon
              return (
                <button key={opt.label} onClick={() => handleTheme(opt.val)}
                  style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 14px', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font)', border: dark === opt.val ? '2px solid var(--a)' : '1px solid var(--b2)', background: dark === opt.val ? 'var(--a3)' : 'var(--s1)', color: dark === opt.val ? 'var(--a)' : 'var(--ink2)' }}>
                  <Icon style={{ width: 14, height: 14 }} />{opt.label}
                </button>
              )
            })}
          </div>
        </Field>

        <Field label="Accent color" hint="Primary color used across the interface.">
          <div style={{ display: 'flex', gap: 10 }}>
            {accents.map(a => (
              <div key={a.id} onClick={() => setAccent(a.id as any)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: dark ? a.dark : a.light, border: accent === a.id ? '3px solid var(--ink1)' : '2px solid var(--b2)', transition: 'border 150ms' }} />
                <span style={{ fontSize: 10, color: accent === a.id ? 'var(--ink1)' : 'var(--ink3)' }}>{a.label.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </Field>

        <Field label="Density" hint="Controls how compact the dashboard feels.">
          <div style={{ display: 'flex', gap: 6 }}>
            {(['compact', 'default', 'spacious'] as const).map(d => (
              <button key={d} onClick={() => setDensity(d)}
                style={{ padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font)', border: density === d ? '2px solid var(--a)' : '1px solid var(--b2)', background: density === d ? 'var(--a3)' : 'var(--s1)', color: density === d ? 'var(--a)' : 'var(--ink2)', textTransform: 'capitalize' }}>
                {d}
              </button>
            ))}
          </div>
        </Field>
      </Section>
    </div>
  )
}

function NotificationsTab() {
  const [prefs, setPrefs] = useState({
    revenue_alerts:   true,
    churn_alerts:     true,
    stock_alerts:     true,
    weekly_report:    true,
    monthly_report:   false,
    ai_insights:      true,
    email_digest:     false,
    browser_push:     true,
  })

  const set = (k: keyof typeof prefs, v: boolean) => setPrefs(p => ({ ...p, [k]: v }))

  return (
    <div>
      <Section title="Alerts">
        <Field label="Revenue anomalies" hint="Notify when revenue spikes or drops unexpectedly.">
          <Toggle on={prefs.revenue_alerts} onChange={v => set('revenue_alerts', v)} />
        </Field>
        <Field label="Churn risk alerts" hint="Notify when at-risk customer count increases.">
          <Toggle on={prefs.churn_alerts} onChange={v => set('churn_alerts', v)} />
        </Field>
        <Field label="Inventory warnings" hint="Notify when product stock falls below 7 days.">
          <Toggle on={prefs.stock_alerts} onChange={v => set('stock_alerts', v)} />
        </Field>
        <Field label="AI insights" hint="Notify when new AI signals are detected.">
          <Toggle on={prefs.ai_insights} onChange={v => set('ai_insights', v)} />
        </Field>
      </Section>

      <Section title="Reports">
        <Field label="Weekly summary" hint="Receive a weekly performance digest every Monday.">
          <Toggle on={prefs.weekly_report} onChange={v => set('weekly_report', v)} />
        </Field>
        <Field label="Monthly report" hint="Detailed monthly analytics report on the 1st.">
          <Toggle on={prefs.monthly_report} onChange={v => set('monthly_report', v)} />
        </Field>
        <Field label="Email digest" hint="All notifications bundled into a daily email.">
          <Toggle on={prefs.email_digest} onChange={v => set('email_digest', v)} />
        </Field>
        <Field label="Browser push" hint="Real-time browser notifications for critical alerts.">
          <Toggle on={prefs.browser_push} onChange={v => set('browser_push', v)} />
        </Field>
      </Section>
    </div>
  )
}

function IntegrationsTab() {
  const integrations = [
    { name: 'Shopify',    desc: 'Sync store data, products, and orders.',       connected: true,  icon: '🛍️' },
    { name: 'Klaviyo',    desc: 'Connect email campaigns and segment data.',     connected: false, icon: '📧' },
    { name: 'Meta Ads',   desc: 'Import ad spend and ROAS from Meta.',           connected: false, icon: '📘' },
    { name: 'Google Ads', desc: 'Import ad spend and conversion data.',          connected: false, icon: '🎯' },
    { name: 'Recharge',   desc: 'Sync subscription revenue and churn data.',     connected: false, icon: '🔄' },
    { name: 'Gorgias',    desc: 'Connect support tickets to customer segments.', connected: false, icon: '💬' },
  ]

  return (
    <div>
      <Section title="Connected apps">
        {integrations.map(intg => (
          <Field key={intg.name} label={`${intg.icon}  ${intg.name}`} hint={intg.desc}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {intg.connected && (
                <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 6, background: 'var(--up-bg)', color: 'var(--up)' }}>Connected</span>
              )}
              <button className={intg.connected ? 'btn-ghost' : 'btn-accent'}
                style={{ fontSize: 12, padding: '6px 14px', ...(intg.connected ? { color: 'var(--dn)', borderColor: 'var(--dn-bg)' } : {}) }}>
                {intg.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </Field>
        ))}
      </Section>
    </div>
  )
}

function BillingTab() {
  return (
    <div>
      <Section title="Current plan">
        <Field label="Plan" hint="You are currently on the Pro plan.">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 7, background: 'var(--a3)', border: '1px solid rgba(126,200,122,0.3)', color: 'var(--a)' }}>✦ Pro</span>
            <button className="btn-ghost" style={{ fontSize: 12, padding: '6px 12px' }}>Upgrade</button>
          </div>
        </Field>
        <Field label="Billing cycle" hint="Your plan renews monthly.">
          <span style={{ fontSize: 13, color: 'var(--ink2)' }}>$79 / month · Renews Jun 1</span>
        </Field>
        <Field label="Payment method" hint="Visa ending in 4242.">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13, color: 'var(--ink2)' }}>•••• 4242</span>
            <button className="btn-ghost" style={{ fontSize: 12, padding: '6px 12px' }}>Update</button>
          </div>
        </Field>
      </Section>

      <Section title="Invoices">
        {[
          { date: 'May 1, 2024',   amount: '$79.00', status: 'Paid' },
          { date: 'Apr 1, 2024',   amount: '$79.00', status: 'Paid' },
          { date: 'Mar 1, 2024',   amount: '$79.00', status: 'Paid' },
        ].map(inv => (
          <Field key={inv.date} label={inv.date} hint="">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 13, fontFamily: 'var(--mono)', color: 'var(--ink1)', fontVariantNumeric: 'tabular-nums' }}>{inv.amount}</span>
              <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 6, background: 'var(--up-bg)', color: 'var(--up)' }}>{inv.status}</span>
              <button className="btn-ghost" style={{ fontSize: 11, padding: '4px 10px' }}>PDF</button>
            </div>
          </Field>
        ))}
      </Section>
    </div>
  )
}

function SecurityTab() {
  const [showPass, setShowPass] = useState(false)
  const [current, setCurrent]   = useState('')
  const [newPass, setNewPass]   = useState('')
  const [confirm, setConfirm]   = useState('')
  const [saved, setSaved]       = useState(false)
  const [twofa, setTwofa]       = useState(false)
  const [sessions] = useState([
    { device: 'Chrome · Windows 11',   location: 'New Delhi, IN',   last: 'Active now',     current: true  },
    { device: 'Safari · iPhone 15',     location: 'New Delhi, IN',   last: '2 hours ago',    current: false },
    { device: 'Chrome · MacBook Pro',   location: 'Mumbai, IN',      last: 'Yesterday',      current: false },
  ])

  const save = () => {
    if (newPass && newPass === confirm) {
      setSaved(true); setTimeout(() => setSaved(false), 2000)
      setCurrent(''); setNewPass(''); setConfirm('')
    }
  }

  return (
    <div>
      <Section title="Change password">
        <Field label="Current password" hint="">
          <div style={{ position: 'relative' }}>
            <input className="input-field" type={showPass ? 'text' : 'password'} value={current} onChange={e => setCurrent(e.target.value)} style={{ width: 220, paddingRight: 36 }} />
            <button type="button" onClick={() => setShowPass(s => !s)}
              style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink3)' }}>
              {showPass ? <EyeOff style={{ width: 14, height: 14 }} /> : <Eye style={{ width: 14, height: 14 }} />}
            </button>
          </div>
        </Field>
        <Field label="New password" hint="Minimum 8 characters.">
          <input className="input-field" type="password" value={newPass} onChange={e => setNewPass(e.target.value)} style={{ width: 220 }} />
        </Field>
        <Field label="Confirm password" hint="">
          <input className="input-field" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} style={{ width: 220 }} />
        </Field>
      </Section>

      <button className="btn-accent" style={{ fontSize: 13, padding: '9px 20px', display: 'flex', alignItems: 'center', gap: 7, marginBottom: 32 }} onClick={save}>
        {saved ? <><Check style={{ width: 14, height: 14 }} />Saved!</> : 'Update password'}
      </button>

      <Section title="Two-factor authentication">
        <Field label="Authenticator app" hint="Use an app like Google Authenticator to generate codes.">
          <Toggle on={twofa} onChange={setTwofa} />
        </Field>
      </Section>

      <Section title="Active sessions">
        {sessions.map((s, i) => (
          <Field key={i} label={s.device} hint={`${s.location} · ${s.last}`}>
            {s.current
              ? <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 6, background: 'var(--up-bg)', color: 'var(--up)' }}>This device</span>
              : <button className="btn-ghost" style={{ fontSize: 12, padding: '5px 12px', color: 'var(--dn)' }}>Revoke</button>
            }
          </Field>
        ))}
      </Section>
    </div>
  )
}

// ── MAIN SETTINGS PAGE ──────────────────────────────────────────
export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>('profile')

  const panels: Record<Tab, React.ReactNode> = {
    profile:       <ProfileTab />,
    store:         <StoreTab />,
    appearance:    <AppearanceTab />,
    notifications: <NotificationsTab />,
    integrations:  <IntegrationsTab />,
    billing:       <BillingTab />,
    security:      <SecurityTab />,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h1 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--ink1)' }}>Settings</h1>
        <p style={{ fontSize: 12.5, color: 'var(--ink3)', marginTop: 3 }}>Manage your account, store, and preferences</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 20, alignItems: 'start' }}>

        {/* Sidebar nav */}
        <motion.div variants={FV} initial="hidden" animate="visible" className="card" style={{ padding: '8px' }}>
          {TABS.map(t => {
            const Icon = t.icon
            const active = tab === t.id
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px', borderRadius: 9, fontSize: 13, fontWeight: active ? 600 : 400, background: active ? 'var(--a3)' : 'transparent', color: active ? 'var(--a)' : 'var(--ink2)', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font)', marginBottom: 2, transition: 'all 130ms ease' }}
                onMouseEnter={e => { if (!active) { (e.currentTarget).style.background = 'var(--s2)'; (e.currentTarget).style.color = 'var(--ink1)' } }}
                onMouseLeave={e => { if (!active) { (e.currentTarget).style.background = 'transparent'; (e.currentTarget).style.color = 'var(--ink2)' } }}>
                <Icon style={{ width: 15, height: 15, flexShrink: 0 }} />
                {t.label}
                <ChevronRight style={{ width: 12, height: 12, marginLeft: 'auto', opacity: active ? 1 : 0.3 }} />
              </button>
            )
          })}
        </motion.div>

        {/* Content panel */}
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
          {panels[tab]}
        </motion.div>
      </div>
    </div>
  )
}
