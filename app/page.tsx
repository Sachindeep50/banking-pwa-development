'use client'

import { useEffect, useState } from 'react'
import {
  ArrowDownLeft,
  ArrowLeft,
  Bell,
  ChevronDown,
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

const transactions = [
  { name: 'Swiggy', detail: 'UPI · Today, 12:42 PM', amount: '- ₹486.00', tone: 'spent' },
  { name: 'Salary credit', detail: 'NEFT · 01 Sep 2026', amount: '+ ₹84,500.00', tone: 'received' },
  { name: 'Netflix.com', detail: 'Card · 30 Aug 2026', amount: '- ₹649.00', tone: 'spent' },
  { name: 'Airtel recharge', detail: 'UPI · 29 Aug 2026', amount: '- ₹799.00', tone: 'spent' },
  { name: 'Rahul Mehta', detail: 'UPI · 28 Aug 2026', amount: '+ ₹2,000.00', tone: 'received' },
]

function IconButton({ label, children }: { label: string; children: React.ReactNode }) {
  return <button aria-label={label} className="icon-button">{children}</button>
}

function HomeScreen({ onStatement }: { onStatement: () => void }) {
  return (
    <main className="bank-shell">
      <div className="status-bar"><span>5:14</span><span className="status-icons">▮▮▮ &nbsp;4G&nbsp; ▰</span></div>
      <div className="notch" />
      <header className="topbar">
        <div className="profile-mark"><UserRound /><span className="profile-dot">≡</span></div>
        <div className="product-pill"><strong>digi<br />pass</strong><span>Net worth</span></div>
        <div className="top-actions"><IconButton label="Notifications"><Bell /></IconButton><IconButton label="Search"><Search /></IconButton><IconButton label="Power"><Power /></IconButton></div>
      </header>
      <section className="account-row"><span>Savings A/c: **** **** ****</span><ChevronDown /><a href="#manage">Manage A/c</a></section>
      <section className="balance-area">
        <h1>View Balance <EyeOff /></h1>
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
        <div className="payment-actions"><button><QrCode /><span>Scan &amp; Pay</span></button><button><Send /><span>One-time</span></button><button><ShieldCheck /><span>Self transfer</span></button></div>
      </section>
    </main>
  )
}

function TransactionsScreen({ onBack }: { onBack: () => void }) {
  return <main className="transactions-screen"><header className="transactions-header"><button className="back-button" onClick={onBack} aria-label="Back"><ArrowLeft /></button><div><p>HDFC Bank</p><h1>Statement</h1></div><IconButton label="Search transactions"><Search /></IconButton></header><section className="statement-card"><span>Available balance</span><strong>₹ 1,24,680.50</strong><small>Savings A/c: **** 4821</small></section><div className="filter-row"><button className="active-filter">All transactions</button><button>Filter <ChevronDown /></button></div><section className="transaction-list"><p className="month-label">SEPTEMBER 2026</p>{transactions.slice(0, 2).map((tx) => <Transaction key={tx.name} {...tx} />)}<p className="month-label">AUGUST 2026</p>{transactions.slice(2).map((tx) => <Transaction key={tx.name} {...tx} />)}</section></main>
}

function Transaction({ name, detail, amount, tone }: typeof transactions[number]) {
  return <article className="transaction"><div className={`transaction-icon ${tone}`}><ArrowDownLeft /></div><div className="transaction-copy"><strong>{name}</strong><span>{detail}</span></div><b className={tone}>{amount}</b></article>
}

export default function Page() {
  const [screen, setScreen] = useState<'home' | 'transactions'>('home')

  useEffect(() => {
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => undefined)
  }, [])
  return screen === 'home' ? <HomeScreen onStatement={() => setScreen('transactions')} /> : <TransactionsScreen onBack={() => setScreen('home')} />
}
