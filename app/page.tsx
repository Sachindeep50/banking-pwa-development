'use client'

import { useEffect, useState } from 'react'
import statementData from '@/data/account-statement.json'
import {
  ArrowDownLeft,
  ArrowLeft,
  Bell,
  ChevronDown,
  Eye,
  Fingerprint,
  ScanLine,
  X,
  EyeOff,
  FileText,
  Landmark,
  Percent,
  Power,
  QrCode,
  Search,
  Send,
  ShieldCheck,
  UserRound,
  WalletCards,
} from 'lucide-react'

const transactions = [...statementData.transactions].sort((a, b) => {
  const dateDifference = new Date(b.date).getTime() - new Date(a.date).getTime()
  return dateDifference || Number(b.reference) - Number(a.reference)
})

const latestTransaction = transactions[0]

type Transaction = (typeof transactions)[number]

const formatCurrency = (amount: number) => `₹ ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
const formatDate = (date: string) => new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

function IconButton({ label, children }: { label: string; children: React.ReactNode }) {
  return <button aria-label={label} className="icon-button">{children}</button>
}

function HomeScreen({ onStatement }: { onStatement: () => void }) {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false)
  const [isScannerOpen, setIsScannerOpen] = useState(false)
  const accountLabel = `Savings A/c: ${statementData.statement.maskedAccountNumber}`
  const availableBalance = latestTransaction.balance

  return (
    <main className="bank-shell">
      <div className="status-bar"><span>5:14</span><span className="status-icons">▮▮▮ &nbsp;4G&nbsp; ▰</span></div>
      <div className="notch" />
      <header className="topbar">
        <div className="profile-mark"><UserRound /><span className="profile-dot">≡</span></div>
        <div className="product-pill"><strong>digi<br />pass</strong><span>Net worth</span></div>
        <div className="top-actions"><IconButton label="Notifications"><Bell /></IconButton><IconButton label="Search"><Search /></IconButton><IconButton label="Power"><Power /></IconButton></div>
      </header>
      <section className="account-row"><span>{accountLabel}</span><ChevronDown /><a href="#manage">Manage A/c</a></section>
      <section className="balance-area">
        <button className="balance-toggle" onClick={() => setIsBalanceVisible((visible) => !visible)} aria-label={isBalanceVisible ? 'Hide balance' : 'View balance'} aria-pressed={isBalanceVisible}>
          <h1>{isBalanceVisible ? formatCurrency(availableBalance) : 'View Balance'} <img className="balance-eye-asset" src={isBalanceVisible ? '/assets/hide-icon.svg' : '/assets/hide-icon.svg'} alt={isBalanceVisible ? 'Hide balance' : 'Show balance'} /></h1>
        </button>
        <button className="statement-link" onClick={onStatement}>View statement</button>
      </section>
      <nav className="quick-products" aria-label="Products">
        <button><WalletCards /><span>Cards</span></button><button><Landmark /><span>Deposits</span></button><button className="has-dot"><FileText /><span>Loans</span></button><button><Percent /><span>Invest</span></button>
      </nav>
      <div className="swipe-hint">Swipe down to view summary <ChevronDown /></div>
      <section className="payment-panel">
        <div className="drag-handle" />
        <div className="payment-heading"><h2>Payment Centre</h2><span>UPI: <b>******@okhdfcbank</b></span></div>
        <div className="send-card"><div><h3>Send Money</h3><p>via NEFT, IMPS, RTGS, UPI, &amp;<br />within HDFC Bank</p></div><button className="payee-button">+ New payee</button><div className="search-payee">Enter UPI ID / Mobile no. / Account no. / Name</div></div>
        <div className="payment-actions"><button onClick={() => setIsScannerOpen(true)} aria-haspopup="dialog"><QrCode /><span>Scan &amp; Pay</span></button><button><img src="/assets/send-amount-icon.svg" alt="" /><span>One-time</span></button><button><img src="/assets/sending-money.svg" alt="" /><span>Self transfer</span></button></div>{isScannerOpen && <div className="scanner-backdrop" role="presentation" onClick={() => setIsScannerOpen(false)}><section className="scanner-modal" role="dialog" aria-modal="true" aria-labelledby="scanner-title" onClick={(event) => event.stopPropagation()}><header><div><p>Payment Centre</p><h2 id="scanner-title">Scan &amp; Pay</h2></div><button className="scanner-close" onClick={() => setIsScannerOpen(false)} aria-label="Close scanner"><X /></button></header><div className="scanner-frame"><div className="scanner-corner top-left" /><div className="scanner-corner top-right" /><div className="scanner-corner bottom-left" /><div className="scanner-corner bottom-right" /><QrCode /></div><p className="scanner-help">Align the QR code inside the frame to scan</p><button className="scanner-gallery">Choose from gallery</button></section></div>}</section>
    </main>
  )
}

function TransactionsScreen({ onBack }: { onBack: () => void }) {
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState<'all' | 'credit' | 'debit'>('all')
  const [category, setCategory] = useState('all')
  const categories = Array.from(new Set(transactions.map((transaction) => transaction.category)))
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesKind = kind === 'all' || transaction.type === kind
    const matchesCategory = category === 'all' || transaction.category === category
    const searchable = `${transaction.merchant} ${transaction.category} ${transaction.method} ${transaction.reference}`.toLowerCase()
    return matchesKind && matchesCategory && searchable.includes(query.toLowerCase())
  })

  return <main className="transactions-screen"><header className="transactions-header"><button className="back-button" onClick={onBack} aria-label="Back"><ArrowLeft /></button><div><p>HDFC Bank</p><h1>Statement</h1></div><IconButton label="Search transactions"><Search /></IconButton></header><section className="statement-account"><div><span>Savings Account</span><strong>{statementData.statement.maskedAccountNumber} <EyeOff /></strong></div><div className="statement-balance"><span>Available Balance</span><strong>{formatCurrency(latestTransaction.balance)} <span className="info-mark">i</span></strong></div></section><nav className="statement-tabs" aria-label="Statement navigation"><button className="active-tab">Statement</button><button>Get Statement</button></nav><div className="transaction-tools"><select aria-label="Select period"><option>{formatDate(statementData.statement.period.from)} – {formatDate(statementData.statement.period.to)}</option></select><select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category"><option value="all">All transactions</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select><button className="sort-button" aria-label="Sorted newest first"><img src="/assets/down-arrow-icon.svg" alt="" /><span>≡</span></button></div><label className="transaction-search"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search transactions" aria-label="Search transactions" /></label><div className="filter-row" role="group" aria-label="Filter by transaction type"><button className={kind === 'all' ? 'active-filter' : ''} onClick={() => setKind('all')}>All</button><button className={kind === 'credit' ? 'active-filter' : ''} onClick={() => setKind('credit')}>Credits</button><button className={kind === 'debit' ? 'active-filter' : ''} onClick={() => setKind('debit')}>Debits</button><span className="result-count">{filteredTransactions.length} results</span></div><section className="transaction-list">{filteredTransactions.length ? filteredTransactions.map((tx, index) => <Transaction key={`${tx.date}-${tx.reference}-${index}`} {...tx} />) : <p className="empty-state">No transactions match these filters.</p>}</section></main>
}

function Transaction({ merchant, category, method, date, amount, type, reference, balance }: Transaction) {
  const tone = type === 'credit' ? 'received' : 'spent'
  const statusAsset = type === 'credit' ? '/assets/success-icon-white.svg' : category.toLowerCase().includes('failed') ? '/assets/payment-failed-icon.svg' : '/assets/view-icon.svg'
  return <article className="transaction"><div className="transaction-status-icon"><img src={statusAsset} alt="" /></div><div className="transaction-copy"><time><img src="/assets/calendar-icon.svg" alt="" />{formatDate(date)}</time><strong>{method} - {merchant}</strong><span>{category} · {method} transaction</span><span className="transaction-reference">Ref no. {reference} <img className="copy-reference-icon" src="/assets/copy-icon.svg" alt="Copy reference number" /></span></div><div className="transaction-amount"><b className={tone}>{type === 'credit' ? '+' : '-'}{formatCurrency(amount)}</b><small>{formatCurrency(balance)}</small></div></article>
}

function SplashScreen() {
  return <main className="splash-screen" aria-label="Loading HDFC Bank"><div className="splash-logo" aria-hidden="true"><span>HDFC</span><small>BANK</small></div><h1>HDFC Bank</h1><div className="splash-loader" role="progressbar" aria-label="Loading" /></main>
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  return <main className="login-screen"><header className="login-topbar"><div className="login-brand"><img className="login-logo login-logo-wide" src="/assets/hdfc-logo-with-border.svg" alt="HDFC Bank" /></div><button className="login-notification" aria-label="Notifications"><Bell /></button></header><section className="login-intro"><p>Hello,</p><h1>SACHINDEEP SINGH</h1><span>Cust ID *****0090</span></section><button className="scan-qr-button" aria-label="Scan QR to login"><ScanLine /><span>Scan QR</span></button><p className="login-caption">Frequently used features &amp; special offers at your fingertips</p><section className="login-features"><div><span>₹</span><p>Send Money</p></div><div><span>▤</span><p>Pay Bills</p></div><div><span>▰</span><p>Products &amp; Services</p></div></section><section className="login-card"><button className="face-login" onClick={onLogin}><UserRound /><span>Login with Face ID</span></button><p>Or, login with mPIN</p><button className="mpin-login" onClick={onLogin}><Fingerprint /><span>Login with mPIN</span></button><button className="forgot-mpin">Forgot mPIN?</button></section><nav className="login-bottom-nav"><span>Maintenance</span><span>Reach Us</span><span>More</span></nav></main>
}

export default function Page() {
  const [screen, setScreen] = useState<'home' | 'transactions'>('home')
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1500)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' }).then((registration) => registration.update()).catch(() => undefined)
    }
  }, [])
  if (isLoading) return <SplashScreen />
  if (!isLoggedIn) return <LoginScreen onLogin={() => setIsLoggedIn(true)} />
  return screen === 'home' ? <HomeScreen onStatement={() => setScreen('transactions')} /> : <TransactionsScreen onBack={() => setScreen('home')} />
}
