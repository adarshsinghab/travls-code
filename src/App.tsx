import { useState, useEffect } from 'react';
import type {
  NavTab,
  CardItem,
  CryptoAsset,
  FiatAccount,
  Beneficiary,
  Transaction,
  VerificationTier,
} from './types';
import {
  INITIAL_CARDS,
  INITIAL_CRYPTO_ASSETS,
  INITIAL_FIAT_ACCOUNTS,
  INITIAL_BENEFICIARIES,
  INITIAL_TRANSACTIONS,
  INITIAL_VERIFICATION_TIERS,
} from './data/mockData';

// Layout & Common Components
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { ToastContainer, type ToastMessage } from './components/common/Toast';

// Modals
import { IssueCardModal } from './components/cards/IssueCardModal';
import { DepositModal } from './components/accounts/DepositModal';
import { AddBeneficiaryModal } from './components/transfers/AddBeneficiaryModal';
import { TransactionDrawer } from './components/transactions/TransactionDrawer';

// Views
import { DashboardView } from './views/DashboardView';
import { CardsView } from './views/CardsView';
import { AccountsView } from './views/AccountsView';
import { TransfersView } from './views/TransfersView';
import { TransactionsView } from './views/TransactionsView';
import { VerificationView } from './views/VerificationView';
import { SettingsView } from './views/SettingsView';
import { HelpView } from './views/HelpView';

// Icons for Trust Strip
import { ShieldCheck, Percent, HelpCircle, CheckCircle } from 'lucide-react';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');

  // Dual Executive Theme State (Obsidian Dark | Executive Light)
  const [theme, setTheme] = useState<'obsidian' | 'executive'>(() => {
    const saved = localStorage.getItem('travls-theme');
    return saved === 'executive' ? 'executive' : 'obsidian';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('travls-theme', theme);
  }, [theme]);

  const handleSelectTheme = (newTheme: 'obsidian' | 'executive') => {
    setTheme(newTheme);
  };

  // Collapsible Sidebar State (Desktop & Mobile)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('travls-sidebar-collapsed') === 'true';
  });

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('travls-sidebar-collapsed', String(next));
      return next;
    });
  };

  // Application Data State
  const [cards, setCards] = useState<CardItem[]>(INITIAL_CARDS);
  const [cryptoAssets, setCryptoAssets] = useState<CryptoAsset[]>(INITIAL_CRYPTO_ASSETS);
  const [fiatAccounts] = useState<FiatAccount[]>(INITIAL_FIAT_ACCOUNTS);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(INITIAL_BENEFICIARIES);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [verificationTiers] = useState<VerificationTier[]>(INITIAL_VERIFICATION_TIERS);

  // Modal States
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isIssueCardModalOpen, setIsIssueCardModalOpen] = useState(false);
  const [isAddBeneficiaryModalOpen, setIsAddBeneficiaryModalOpen] = useState(false);
  const [selectedTransactionReceipt, setSelectedTransactionReceipt] = useState<Transaction | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, description?: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Card Handlers
  const handleToggleFreeze = (cardId: string) => {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === cardId) {
          return {
            ...c,
            isFrozen: !c.isFrozen,
            status: !c.isFrozen ? 'frozen' : 'active',
          };
        }
        return c;
      })
    );
  };

  const handleIssueCard = (newCard: CardItem) => {
    setCards((prev) => [newCard, ...prev]);
    setActiveTab('cards');
    addToast(
      'TRAVLS Card Issued',
      `${newCard.name} (•••• ${newCard.last4}) is now ready for instant spending.`,
      'success'
    );
  };

  // Deposit Simulation
  const handleSimulateDeposit = (assetId: string, amount: number) => {
    setCryptoAssets((prev) =>
      prev.map((a) => {
        if (a.id === assetId) {
          const newBalance = a.balance + amount / a.priceUsd;
          const newUsd = a.usdValue + amount;
          return { ...a, balance: parseFloat(newBalance.toFixed(4)), usdValue: newUsd };
        }
        return a;
      })
    );

    const asset = cryptoAssets.find((a) => a.id === assetId);
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'crypto_deposit',
      title: `Deposit ${asset?.symbol || 'Crypto'}`,
      merchantOrParty: `Vault Inbound • ${asset?.network}`,
      category: 'Crypto',
      amount: amount,
      currency: 'USD',
      fee: 0.00,
      status: 'completed',
      date: 'Just now',
      timestamp: Date.now(),
      hash: '0x' + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      referenceNumber: `TRV-DEP-${Math.floor(10000 + Math.random() * 90000)}`,
    };

    setTransactions((prev) => [newTx, ...prev]);
    addToast(
      'Deposit Confirmed',
      `+$${amount.toFixed(2)} credited to your ${asset?.symbol} vault balance.`,
      'success'
    );
  };

  // Beneficiary & Transfer Handlers
  const handleAddBeneficiary = (ben: Beneficiary) => {
    setBeneficiaries((prev) => [...prev, ben]);
    addToast('Beneficiary Saved', `${ben.name} added to your verified transfer list.`, 'success');
  };

  const handleSendTransfer = (tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev]);
  };

  return (
    <div className="app-container">
      {/* 1. Desktop Sidebar (Sticky & Stay in Place, Collapsible) */}
      <Sidebar
        activeTab={activeTab}
        onNavigate={(tab) => setActiveTab(tab)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
      />

      {/* 2. Responsive Mobile Drawer */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        activeTab={activeTab}
        onNavigate={(tab) => setActiveTab(tab)}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* 3. Main Body */}
      <div className="main-content-wrapper">
        <Header
          activeTab={activeTab}
          onNavigate={(tab) => setActiveTab(tab)}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onQuickDeposit={() => setIsDepositModalOpen(true)}
          currentTheme={theme}
          onSelectTheme={handleSelectTheme}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={handleToggleSidebar}
        />

        <main className="view-content-container">
          {activeTab === 'dashboard' && (
            <DashboardView
              cards={cards}
              cryptoAssets={cryptoAssets}
              transactions={transactions}
              onNavigate={(tab) => setActiveTab(tab)}
              onOpenDeposit={() => setIsDepositModalOpen(true)}
              onOpenIssueCard={() => setIsIssueCardModalOpen(true)}
            />
          )}

          {activeTab === 'cards' && (
            <CardsView
              cards={cards}
              transactions={transactions}
              onToggleFreeze={handleToggleFreeze}
              onOpenIssueModal={() => setIsIssueCardModalOpen(true)}
              onOpenTransactionReceipt={(tx) => setSelectedTransactionReceipt(tx)}
              onNotify={addToast}
            />
          )}

          {activeTab === 'accounts' && (
            <AccountsView
              cryptoAssets={cryptoAssets}
              fiatAccounts={fiatAccounts}
              onOpenDeposit={() => setIsDepositModalOpen(true)}
              onNotify={addToast}
            />
          )}

          {activeTab === 'transfers' && (
            <TransfersView
              beneficiaries={beneficiaries}
              cryptoAssets={cryptoAssets}
              transactions={transactions}
              onOpenAddBeneficiary={() => setIsAddBeneficiaryModalOpen(true)}
              onSendTransfer={handleSendTransfer}
              onNotify={addToast}
            />
          )}

          {activeTab === 'transactions' && (
            <TransactionsView
              transactions={transactions}
              onSelectTransaction={(tx) => setSelectedTransactionReceipt(tx)}
              onNotify={addToast}
            />
          )}

          {activeTab === 'verification' && (
            <VerificationView
              tiers={verificationTiers}
              onNotify={addToast}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView onNotify={addToast} />
          )}

          {activeTab === 'help' && (
            <HelpView onNotify={addToast} />
          )}

          {/* 4. Persistent Trust Strip from design ref/design.md */}
          <section className="trust-strip-container" aria-label="Security and Trust Safeguards">
            <div className="trust-strip-item">
              <div className="trust-strip-icon">
                <Percent size={18} />
              </div>
              <div>
                <div className="trust-strip-title">Zero FX Markup</div>
                <div className="trust-strip-desc">Interbank wholesale rates with 0% hidden bank fees.</div>
              </div>
            </div>

            <div className="trust-strip-item">
              <div className="trust-strip-icon">
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className="trust-strip-title">Bank-Grade Custody</div>
                <div className="trust-strip-desc">Segregated MPC cold vaults & FDIC depository partners.</div>
              </div>
            </div>

            <div className="trust-strip-item">
              <div className="trust-strip-icon">
                <CheckCircle size={18} />
              </div>
              <div>
                <div className="trust-strip-title">Instant Settlement</div>
                <div className="trust-strip-desc">Fast payout clearing via direct IMPS, NEFT & NIP rails.</div>
              </div>
            </div>

            <div className="trust-strip-item">
              <div className="trust-strip-icon">
                <HelpCircle size={18} />
              </div>
              <div>
                <div className="trust-strip-title">24/7 VIP Concierge</div>
                <div className="trust-strip-desc">Dedicated human support whenever you travel globally.</div>
              </div>
            </div>
          </section>

          {/* 5. Persistent Footer */}
          <footer className="app-footer">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="/travls-logo.png" alt="TRAVLS" style={{ height: '18px' }} />
              <span>© 2026 TRAVLS.io Financial Technology Inc. All rights reserved.</span>
            </div>

            <div className="app-footer-links">
              <a href="#privacy" onClick={(e) => { e.preventDefault(); setActiveTab('verification'); }}>
                Privacy & GDPR
              </a>
              <a href="#terms" onClick={(e) => { e.preventDefault(); setActiveTab('help'); }}>
                Terms of Service
              </a>
              <a href="#licensing" onClick={(e) => { e.preventDefault(); setActiveTab('verification'); }}>
                Regulatory Licensing
              </a>
              <a href="#concierge" onClick={(e) => { e.preventDefault(); setActiveTab('help'); }}>
                VIP Concierge
              </a>
            </div>
          </footer>
        </main>
      </div>

      {/* 6. Global Modals & Drawers */}
      <IssueCardModal
        isOpen={isIssueCardModalOpen}
        onClose={() => setIsIssueCardModalOpen(false)}
        onIssueCard={handleIssueCard}
      />

      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        cryptoAssets={cryptoAssets}
        onSimulateDeposit={handleSimulateDeposit}
      />

      <AddBeneficiaryModal
        isOpen={isAddBeneficiaryModalOpen}
        onClose={() => setIsAddBeneficiaryModalOpen(false)}
        onAddBeneficiary={handleAddBeneficiary}
      />

      <TransactionDrawer
        transaction={selectedTransactionReceipt}
        onClose={() => setSelectedTransactionReceipt(null)}
      />

      {/* 7. Global Accessible Toast Notifications */}
      <ToastContainer
        toasts={toasts}
        onDismiss={dismissToast}
      />
    </div>
  );
}
