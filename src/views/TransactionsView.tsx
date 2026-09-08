import React, { useState } from 'react';
import {
  Search,
  Download,
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  RefreshCw,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import type { Transaction } from '../types';

interface TransactionsViewProps {
  transactions: Transaction[];
  onSelectTransaction: (tx: Transaction) => void;
  onNotify: (title: string, desc?: string, type?: 'success' | 'error' | 'info') => void;
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({
  transactions,
  onSelectTransaction,
  onNotify,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const totalSpent = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const totalReceived = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.merchantOrParty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || t.status === selectedStatus;
    const matchesType = selectedType === 'all' || t.type === selectedType;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleExportCSV = () => {
    const headers = 'ID,Title,Merchant,Category,Amount,Currency,Status,Date,Reference\n';
    const rows = filteredTransactions
      .map(
        (t) =>
          `"${t.id}","${t.title}","${t.merchantOrParty}","${t.category}",${t.amount},"${t.currency}","${t.status}","${t.date}","${t.referenceNumber}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `travls-transactions-${Date.now()}.csv`;
    a.click();
    onNotify('Statement Exported', 'CSV statement downloaded successfully.', 'success');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header & Export */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Transactions & Ledger
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Real-time auditable cryptographic ledger across all card programs, vaults, and bank rails.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--surface-interactive)',
            border: '1px solid var(--border-default)',
            color: 'var(--text-primary)',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          <Download size={16} />
          <span>Export CSV Statement</span>
        </button>
      </div>

      {/* Top 3 Metric Tiles */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
        }}
      >
        <div
          style={{
            background: 'var(--surface-card)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.06em' }}>
              TOTAL SPENT
            </span>
            <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              ${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>All debit settlements</span>
          </div>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(239, 68, 68, 0.1)',
              color: 'var(--error)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArrowUpRight size={20} />
          </div>
        </div>

        <div
          style={{
            background: 'var(--surface-card)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.06em' }}>
              TOTAL RECEIVED
            </span>
            <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--success)', marginTop: '2px' }}>
              ${totalReceived.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Deposits & cashback credits</span>
          </div>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--success-soft)',
              color: 'var(--success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArrowDownLeft size={20} />
          </div>
        </div>

        <div
          style={{
            background: 'var(--surface-card)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.06em' }}>
              TOTAL TRANSACTIONS
            </span>
            <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              {transactions.length}
            </div>
            <span style={{ fontSize: '11px', color: 'var(--brand-primary)' }}>100% matched to vault ledger</span>
          </div>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--surface-interactive)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RefreshCw size={18} />
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div
        style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '12px',
          justifyContent: 'space-between',
        }}
      >
        {/* Search */}
        <div
          style={{
            flex: '1 0 260px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--surface-subtle)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)',
            padding: '8px 14px',
          }}
        >
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by merchant, status, reference ID..."
            style={{
              background: 'transparent',
              border: 'none',
              padding: 0,
              fontSize: '13px',
              outline: 'none',
              width: '100%',
            }}
          />
        </div>

        {/* Dropdowns */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--surface-subtle)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-default)',
              fontSize: '13px',
              fontWeight: 500,
            }}
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--surface-subtle)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-default)',
              fontSize: '13px',
              fontWeight: 500,
            }}
          >
            <option value="all">All Transaction Types</option>
            <option value="card_spend">Card Purchases</option>
            <option value="bank_transfer">Bank Transfers</option>
            <option value="crypto_deposit">Crypto Deposits</option>
            <option value="crypto_swap">Crypto Swaps</option>
            <option value="cashback">Cashback Rewards</option>
          </select>
        </div>
      </div>

      {/* Transactions List */}
      <div
        style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}
      >
        {filteredTransactions.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--surface-interactive)',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px auto',
              }}
            >
              <Search size={22} />
            </div>
            <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
              No transactions match your filters
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Try searching with different keywords or clearing your active filters.
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filteredTransactions.map((tx, index) => {
              const isPositive = tx.amount > 0;
              return (
                <div
                  key={tx.id}
                  onClick={() => onSelectTransaction(tx)}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 24px',
                    borderBottom:
                      index !== filteredTransactions.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                    cursor: 'pointer',
                    transition: 'background var(--transition-fast)',
                    gap: '12px',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-subtle)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  {/* Left: Icon & Description */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '220px' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: 'var(--radius-sm)',
                        background: isPositive ? 'var(--success-soft)' : 'var(--surface-interactive)',
                        color: isPositive ? 'var(--success)' : 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {tx.type === 'card_spend' && <CreditCard size={18} color="var(--brand-primary)" />}
                      {tx.type === 'cashback' && <Sparkles size={18} color="var(--brand-primary)" />}
                      {tx.type === 'crypto_deposit' && <ArrowDownLeft size={18} />}
                      {tx.type === 'bank_transfer' && <ArrowUpRight size={18} />}
                      {tx.type === 'crypto_swap' && <RefreshCw size={18} color="var(--brand-primary)" />}
                    </div>

                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {tx.title}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {tx.merchantOrParty} • {tx.category}
                      </div>
                    </div>
                  </div>

                  {/* Middle: Date & Method */}
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    <div>{tx.date}</div>
                    {tx.cardLast4 && (
                      <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>
                        Card •••• {tx.cardLast4}
                      </div>
                    )}
                  </div>

                  {/* Right: Amount & Status */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div
                        style={{
                          fontSize: '15px',
                          fontWeight: 800,
                          fontFamily: 'var(--font-primary)',
                          color: isPositive ? 'var(--success)' : 'var(--text-primary)',
                        }}
                      >
                        {isPositive ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                      </div>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          color: 'var(--success)',
                        }}
                      >
                        {tx.status.toUpperCase()}
                      </span>
                    </div>

                    <ChevronRight size={16} color="var(--text-muted)" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
