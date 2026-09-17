'use client'

import { useEffect, useState } from 'react'
import statementData from '@/data/account-statement.json'
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

const transactions = statementData.transactions

type Transaction = (typeof transactions)[number]

const formatCurrency = (amount: number) => `₹ ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
const formatDate = (date: string) => new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

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
      <section className="account-row"><span>{statementData.statement.accountType}: {statementData.statement.maskedAccountNumber}</span><ChevronDown /><a href="#manage">Manage A/c</a></section>
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
  return <main className="transactions-screen"><header className="transactions-header"><button className="back-button" onClick={onBack} aria-label="Back"><ArrowLeft /></button><div><p>HDFC Bank</p><h1>Statement</h1></div><IconButton label="Search transactions"><Search /></IconButton></header><section className="statement-card"><span>Available balance</span><strong>{formatCurrency(transactions[transactions.length - 1].balance)}</strong><small>{statementData.statement.accountType}: {statementData.statement.maskedAccountNumber}</small></section><div className="filter-row"><button className="active-filter">All transactions</button><button>Filter <ChevronDown /></button></div><section className="transaction-list"><p className="month-label">APRIL 2025</p>{transactions.map((tx) => <Transaction key={tx.reference} {...tx} />)}</section></main>
}

function Transaction({ merchant, category, method, date, amount, type }: Transaction) {
  const tone = type === 'credit' ? 'received' : 'spent'
  return <article className="transaction"><div className={`transaction-icon ${tone}`}><ArrowDownLeft /></div><div className="transaction-copy"><strong>{merchant}</strong><span>{method} · {formatDate(date)} · {category}</span></div><b className={tone}>{type === 'credit' ? '+' : '-'} {formatCurrency(amount)}</b></article>
}

export default function Page() {
  const [screen, setScreen] = useState<'home' | 'transactions'>('home')

  useEffect(() => {
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => undefined)
  }, [])
  return screen === 'home' ? <HomeScreen onStatement={() => setScreen('transactions')} /> : <TransactionsScreen onBack={() => setScreen('home')} />
}
