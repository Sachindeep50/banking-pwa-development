"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import statementData from "@/data/account-statement.json";
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
} from "lucide-react";

const transactions = [...statementData.transactions].sort((a, b) => {
  const dateDifference =
    new Date(b.date).getTime() - new Date(a.date).getTime();
  return dateDifference || Number(b.reference) - Number(a.reference);
});

const latestTransaction = transactions[0];

type Transaction = (typeof transactions)[number];

const formatCurrency = (amount: number) =>
  `₹ ${amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

function IconButton({
  label,
  children,
  onClick,
}: {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button aria-label={label} className="icon-button" onClick={onClick}>
      {children}
    </button>
  );
}

function HomeScreen({
  onStatement,
  onLogout,
}: {
  onStatement: () => void;
  onLogout: () => void;
}) {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isLogoutSheetOpen, setIsLogoutSheetOpen] = useState(false);
  const accountLabel = `Savings A/c: ${statementData.statement.maskedAccountNumber}`;
  const availableBalance = latestTransaction.balance;

  return (
    <main className="bank-shell">
      <header className="topbar">
        <div className="profile-mark">
          <UserRound />
          <span className="profile-dot">≡</span>
        </div>
        <div className="product-pill">
          <strong>
            digi
            <br />
            pass
          </strong>
          <span>Net worth</span>
        </div>
        <div className="top-actions">
          <IconButton label="Notifications">
            <Bell />
          </IconButton>
          <IconButton label="Search">
            <Search />
          </IconButton>
          <IconButton label="Power" onClick={() => setIsLogoutSheetOpen(true)}>
            <Power />
          </IconButton>
        </div>
      </header>
      <section className="account-row">
        <span>{accountLabel}</span>
        <ChevronDown />
        <a href="#manage">Manage A/c</a>
      </section>
      <section className="balance-area">
        <button
          className="balance-toggle"
          onClick={() => setIsBalanceVisible((visible) => !visible)}
          aria-label={isBalanceVisible ? "Hide balance" : "View balance"}
          aria-pressed={isBalanceVisible}
        >
          <h1>
            {isBalanceVisible
              ? formatCurrency(availableBalance)
              : "View Balance"}{" "}
            <img
              className="balance-eye-asset"
              src={
                isBalanceVisible
                  ? "/assets/hide-icon.svg"
                  : "/assets/hide-icon.svg"
              }
              alt={isBalanceVisible ? "Hide balance" : "Show balance"}
            />
          </h1>
        </button>
        <button className="statement-link" onClick={onStatement}>
          View statement
        </button>
      </section>
      <nav className="quick-products" aria-label="Products">
        <button>
          <WalletCards />
          <span>Cards</span>
        </button>
        <button>
          <Landmark />
          <span>Deposits</span>
        </button>
        <button className="has-dot">
          <FileText />
          <span>Loans</span>
        </button>
        <button>
          <Percent />
          <span>Invest</span>
        </button>
      </nav>
      <div className="swipe-hint">
        Swipe down to view summary <ChevronDown />
      </div>
      <section className="card-summary" aria-label="Cards and offers">
        <div className="summary-card">
          <div>
            <span>HDFC Bank</span>
            <strong>Millennia Debit Card</strong>
            <small>5260&nbsp; •••• &nbsp;••••&nbsp; 2444</small>
          </div>
          <div className="mastercard-mark">
            <i />
            <i />
          </div>
          <div className="summary-card-footer">
            <span>Interest rate</span>
            <b>0.83% p.m.</b>
            <button>Manage Limit</button>
          </div>
        </div>
        <div className="offer-banner">
          <div>
            <p>Your HDFC Bank Credit Card is just a tap away.</p>
            <strong>Check Offer.</strong>
          </div>
          <img src="/assets/sending-money.svg" alt="" />
        </div>
      </section>
      <section className="payment-panel">
        <div className="drag-handle" />
        <div className="payment-heading">
          <h2>Payment Centre</h2>
          <span>
            UPI: <b>******@okhdfcbank</b>
          </span>
        </div>
        <div className="send-card">
          <div>
            <h3>Send Money</h3>
            <p>
              via NEFT, IMPS, RTGS, UPI, &amp;
              <br />
              within HDFC Bank
            </p>
          </div>
          <button className="payee-button">+ New payee</button>
          <input
            className="search-payee"
            type="text"
            inputMode="text"
            placeholder="Enter UPI ID / Mobile no. / Account no. / Name"
            aria-label="Enter UPI ID, mobile number, account number, or name"
          />
        </div>
        <div className="payment-actions payment-actions-expanded">
          <button onClick={() => setIsScannerOpen(true)} aria-haspopup="dialog">
            <QrCode />
            <span>Scan &amp; Pay</span>
          </button>
          <button>
            <img src="/assets/send-amount-icon.svg" alt="" />
            <span>One-time transfer</span>
          </button>
          <button>
            <img src="/assets/sending-money.svg" alt="" />
            <span>Self transfer</span>
          </button>
          <button>
            <img src="/assets/send-amount-icon.svg" alt="" />
            <span>Send money abroad</span>
          </button>
          <button>
            <img src="/assets/view-icon.svg" alt="" />
            <span>UPI collect request</span>
          </button>
          <button>
            <img src="/assets/copy-icon.svg" alt="" />
            <span>Manage payee</span>
          </button>
        </div>
        <section className="scheduled-transfers">
          <div>
            <span>Scheduled Transfers</span>
            <small>Manage your upcoming payments</small>
          </div>
          <button aria-label="Schedule new transfer">
            <strong>+</strong>
            <span>Schedule new transfer</span>
          </button>
        </section>
        {isScannerOpen && (
          <div
            className="scanner-backdrop"
            role="presentation"
            onClick={() => setIsScannerOpen(false)}
          >
            <section
              className="scanner-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="scanner-title"
              onClick={(event) => event.stopPropagation()}
            >
              <header>
                <div>
                  <p>Payment Centre</p>
                  <h2 id="scanner-title">Scan &amp; Pay</h2>
                </div>
                <button
                  className="scanner-close"
                  onClick={() => setIsScannerOpen(false)}
                  aria-label="Close scanner"
                >
                  <X />
                </button>
              </header>
              <div className="scanner-frame">
                <div className="scanner-corner top-left" />
                <div className="scanner-corner top-right" />
                <div className="scanner-corner bottom-left" />
                <div className="scanner-corner bottom-right" />
                <QrCode />
              </div>
              <p className="scanner-help">
                Align the QR code inside the frame to scan
              </p>
              <button className="scanner-gallery">Choose from gallery</button>
            </section>
          </div>
        )}
      </section>
      {isLogoutSheetOpen && (
        <div
          className="logout-backdrop"
          role="presentation"
          onClick={() => setIsLogoutSheetOpen(false)}
        >
          <section
            className="logout-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="logout-sheet-handle" />
            <div className="logout-power-icon">
              <Power />
            </div>
            <h2 id="logout-title">Are you sure you want to logout?</h2>
            <div className="logout-actions">
              <button
                className="logout-cancel"
                onClick={() => setIsLogoutSheetOpen(false)}
              >
                Cancel
              </button>
              <button className="logout-confirm" onClick={onLogout}>
                Log Out
              </button>
            </div>
          </section>
        </div>
      )}
      <nav className="dashboard-nav" aria-label="Primary navigation">
        <button className="active">
          <WalletCards />
          <span>Home</span>
        </button>
        <button>
          <FileText />
          <span>Bills</span>
        </button>
        <button>
          <Landmark />
          <span>Deposits</span>
        </button>
        <button>
          <WalletCards />
          <span>Cards</span>
        </button>
        <button>
          <UserRound />
          <span>Reach Us</span>
        </button>
      </nav>
    </main>
  );
}

function TransactionsScreen({ onBack }: { onBack: () => void }) {
  const [query, setQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(
    () => transactions[0]?.date.slice(0, 7) ?? "",
  );
  const months = Array.from(
    new Set(transactions.map((transaction) => transaction.date.slice(0, 7))),
  );
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesMonth = transaction.date.startsWith(selectedMonth);
    const searchable =
      `${transaction.merchant} ${transaction.category} ${transaction.method} ${transaction.reference}`.toLowerCase();
    return matchesMonth && searchable.includes(query.toLowerCase());
  });

  return (
    <main className="transactions-screen">
      <header className="transactions-header">
        <button className="back-button" onClick={onBack} aria-label="Back">
          <ArrowLeft />
        </button>
        <h1>Transactions</h1>
      </header>
      <section className="statement-account">
        <div>
          <span>Saving account</span>
          <strong>{statementData.statement.maskedAccountNumber}</strong>
        </div>
        <div className="statement-balance">
          <span>Available balance</span>
          <strong>{formatCurrency(latestTransaction.balance)}</strong>
        </div>
      </section>
      <section
        className="transactions-drawer"
        aria-label="Monthly transaction statements"
      >
        {/* <div className="drawer-handle" /> */}
        <div className="transaction-tools month-tools">
          <label htmlFor="statement-month">Statement month</label>
          <select
            id="statement-month"
            value={selectedMonth}
            style={{
              padding: "10px",
              height: "50px",
              fontSize: "10px",
              borderRadius: "14px",
              background: "#222",
              border: '1px solid #8a8d92',
            }}
            onChange={(event) => setSelectedMonth(event.target.value)}
            aria-label="Select statement month"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {new Intl.DateTimeFormat("en-US", {
                  month: "long",
                  year: "numeric",
                }).format(new Date(`${month}-01`))}
              </option>
            ))}
          </select>
        </div>
        <div className="transaction-search">
          <Search />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search transactions"
            aria-label="Search transactions"
          />
        </div>
        <section className="transaction-list">
          {filteredTransactions.length ? (
            filteredTransactions.map((tx, index) => (
              <Transaction
                key={`${tx.date}-${tx.reference}-${index}`}
                {...tx}
              />
            ))
          ) : (
            <p className="empty-state">No transactions match these filters.</p>
          )}
        </section>
      </section>
    </main>
  );
}

function Transaction({
  merchant,
  category,
  method,
  date,
  amount,
  type,
  reference,
  balance,
}: Transaction) {
  const tone = type === "credit" ? "received" : "spent";
  return (
    <article className="transaction">
      <div className="transaction-copy">
        <time>
          {/* <img src="/assets/calendar-icon.svg" alt="" /> */}
          {formatDate(date)}
        </time>
        <strong>
          {method} - {merchant}
        </strong>
        <span>
          {category} · {method} transaction
        </span>
        <span className="transaction-reference">
          Ref no. {reference}{" "}
          <img
            className="copy-reference-icon"
            src="/assets/copy-icon.svg"
            alt="Copy reference number"
          />
        </span>
      </div>
      <div className="transaction-amount">
        <b className={tone}>
          {type === "credit" ? "+" : "-"}
          {formatCurrency(amount)}
        </b>
        <small>{formatCurrency(balance)}</small>
      </div>
    </article>
  );
}

function SplashScreen() {
  return (
    <main className="splash-screen" aria-label="HDFC Bank">
      <div className="splash-logo" aria-hidden="true">
        <span>HDFC</span>
        <small>BANK</small>
      </div>
      <h1>HDFC Bank</h1>
      <div className="splash-loader" role="progressbar" aria-label="Loading" />
    </main>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isMpinOpen, setIsMpinOpen] = useState(false);
  const [mpin, setMpin] = useState(["", "", "", ""]);
  const [revealingIndex, setRevealingIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const mpinRefs = useRef<Array<HTMLInputElement | null>>([]);
  const revealTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(revealTimer.current), []);

  const openMpin = () => {
    setAuthError("");
    setMpin(["", "", "", ""]);
    setRevealingIndex(null);
    setFocusedIndex(0);
    setIsMpinOpen(true);
    window.setTimeout(() => mpinRefs.current[0]?.focus(), 0);
  };

  const handleMpinChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    if (!digit) return;
    const next = [...mpin];
    next[index] = digit;
    setMpin(next);
    setRevealingIndex(index);
    window.clearTimeout(revealTimer.current);
    revealTimer.current = window.setTimeout(() => setRevealingIndex(null), 500);
    if (index < 3) {
      setFocusedIndex(index + 1);
      mpinRefs.current[index + 1]?.focus();
    } else if (next.every(Boolean)) {
      window.setTimeout(onLogin, 500);
    }
  };

  const handleMpinKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !mpin[index] && index > 0) {
      setFocusedIndex(index - 1);
      setRevealingIndex(null);
      mpinRefs.current[index - 1]?.focus();
    }
  };

  const getMpinClass = (index: number, digit: string) =>
    `${index === focusedIndex ? "focused " : ""}${digit ? "filled" : ""}`;

  const handleFaceIdLogin = async () => {
    setAuthError("");
    setIsAuthenticating(true);
    try {
      if (!window.PublicKeyCredential || !navigator.credentials) {
        throw new Error("Face ID is not available on this device.");
      }

      const credentialId = "hdfc-face-id-login";
      const storedCredential = window.localStorage.getItem(credentialId);
      let credential: Credential | null = null;

      if (!storedCredential) {
        const created = await navigator.credentials.create({
          publicKey: {
            challenge: crypto.getRandomValues(new Uint8Array(32)),
            rp: { name: "HDFC Bank" },
            user: {
              id: crypto.getRandomValues(new Uint8Array(16)),
              name: "sachindeep.singh",
              displayName: "SACHINDEEP SINGH",
            },
            pubKeyCredParams: [
              { type: "public-key", alg: -7 },
              { type: "public-key", alg: -257 },
            ],
            authenticatorSelection: {
              authenticatorAttachment: "platform",
              userVerification: "required",
            },
            timeout: 60000,
            attestation: "none",
          },
        });
        if (!created) throw new Error("Face ID setup was cancelled.");
        window.localStorage.setItem(credentialId, "registered");
        credential = created;
      } else {
        credential = await navigator.credentials.get({
          publicKey: {
            challenge: crypto.getRandomValues(new Uint8Array(32)),
            rpId: window.location.hostname,
            allowCredentials: [],
            userVerification: "required",
            timeout: 60000,
          },
        });
      }

      if (!credential) throw new Error("Face ID verification was cancelled.");
      onLogin();
    } catch (error) {
      setAuthError(
        error instanceof Error
          ? error.message
          : "Face ID verification failed. Try again.",
      );
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <main className="login-screen">
      <header className="login-topbar">
        <div className="login-brand">
          <img
            className="login-logo login-logo-wide"
            src="/assets/hdfc-logo-with-border.svg"
            alt="HDFC Bank"
          />
        </div>
        <button className="login-notification" aria-label="Notifications">
          <Bell />
        </button>
      </header>
      <section className="login-intro">
        <p>Hello,</p>
        <h1>SACHINDEEP SINGH</h1>
        <span>Cust ID *****0090</span>
      </section>
      <button className="scan-qr-button" aria-label="Scan QR to login">
        <ScanLine />
        <span>Scan QR</span>
      </button>
      <p className="login-caption">
        Frequently used features &amp; special offers at your fingertips
      </p>
      <section className="login-features">
        <div>
          <span>₹</span>
          <p>Send Money</p>
        </div>
        <div>
          <span>▤</span>
          <p>Pay Bills</p>
        </div>
        <div>
          <span>▰</span>
          <p>Products &amp; Services</p>
        </div>
      </section>
      <section className="login-card">
        <button
          className="face-login"
          onClick={handleFaceIdLogin}
          disabled={isAuthenticating}
        >
          <UserRound />
          <span>
            {isAuthenticating ? "Waiting for Face ID…" : "Login with Face ID"}
          </span>
        </button>
        {authError && (
          <p className="login-error" role="alert">
            {authError}
          </p>
        )}
        <p>Or, login with mPIN</p>
        {!isMpinOpen && (
          <button type="button" className="mpin-login" onClick={openMpin}>
            <Fingerprint />
            <span>Login with mPIN</span>
          </button>
        )}
        <div
          className={isMpinOpen ? "mpin-entry open" : "mpin-entry"}
          aria-label="Enter four digit mPIN"
        >
          <div className="mpin-boxes">
            {mpin.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  mpinRefs.current[index] = element;
                }}
                className={getMpinClass(index, digit)}
                value={index === revealingIndex ? digit : ""}
                inputMode="numeric"
                maxLength={1}
                aria-label={`mPIN digit ${index + 1}`}
                onChange={(event) =>
                  handleMpinChange(index, event.target.value)
                }
                onFocus={() => {
                  setFocusedIndex(index);
                  setRevealingIndex(null);
                }}
                onKeyDown={(event) => handleMpinKeyDown(index, event)}
              />
            ))}
          </div>
          <button className="mpin-cancel" onClick={() => setIsMpinOpen(false)}>
            Cancel
          </button>
        </div>
        <button className="forgot-mpin">Forgot mPIN?</button>
      </section>
      <nav className="login-bottom-nav">
        <span>Maintenance</span>
        <span>Reach Us</span>
        <span>More</span>
      </nav>
    </main>
  );
}

export default function Page() {
  const [screen, setScreen] = useState<"home" | "transactions">("home");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    void (async () => {
      try {
        if ("serviceWorker" in navigator) {
          const registrations =
            await navigator.serviceWorker.getRegistrations();
          await Promise.all(
            registrations.map((registration) => registration.unregister()),
          );
        }
        if ("caches" in window) {
          const cacheNames = await caches.keys();
          await Promise.all(
            cacheNames.map((cacheName) => caches.delete(cacheName)),
          );
        }
      } catch {
        // Cache cleanup is best-effort and must not block rendering.
      }
    })();
  }, []);

  if (isLoading) return <SplashScreen />;
  if (!isLoggedIn) return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  return screen === "home" ? (
    <HomeScreen
      onStatement={() => setScreen("transactions")}
      onLogout={() => {
        setIsLoggedIn(false);
        setScreen("home");
      }}
    />
  ) : (
    <TransactionsScreen onBack={() => setScreen("home")} />
  );
}
