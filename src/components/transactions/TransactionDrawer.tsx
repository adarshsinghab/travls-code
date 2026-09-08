import React from 'react';
import { X, CheckCircle2, ExternalLink, Download, CreditCard, ShieldCheck } from 'lucide-react';
import type { Transaction } from '../../types';

interface TransactionDrawerProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export const TransactionDrawer: React.FC<TransactionDrawerProps> = ({
  transaction,
  onClose,
}) => {
  if (!transaction) return null;

  const isPositive = transaction.amount > 0;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(9, 13, 20, 0.75)',
          backdropFilter: 'blur(3px)',
        }}
      />

      {/* Drawer Body */}
      <div
        className="animate-fade-in"
        style={{
          position: 'relative',
          width: '440px',
          maxWidth: '100%',
          height: '100%',
          background: 'var(--surface-elevated)',
          borderLeft: '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-elevated)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '28px',
          overflowY: 'auto',
        }}
      >
        <div>
          {/* Top Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
            }}
          >
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--brand-primary)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Transaction Receipt
            </span>
            <button
              onClick={onClose}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--surface-subtle)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Amount Display */}
          <div
            style={{
              textAlign: 'center',
              padding: '24px 0',
              borderBottom: '1px solid var(--border-subtle)',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                fontSize: '36px',
                fontWeight: 800,
                fontFamily: 'var(--font-primary)',
                color: isPositive ? 'var(--success)' : 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              {isPositive ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '8px',
                fontSize: '12px',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--success-soft)',
                color: 'var(--success)',
              }}
            >
              <CheckCircle2 size={13} />
              <span>Settled & Confirmed</span>
            </div>
          </div>

          {/* Details List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Merchant / Counterparty</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)', textAlign: 'right' }}>
                {transaction.merchantOrParty}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Category</span>
              <span
                style={{
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-xs)',
                  background: 'var(--surface-interactive)',
                  color: 'var(--text-primary)',
                  fontSize: '11px',
                }}
              >
                {transaction.category}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Date & Time</span>
              <span style={{ color: 'var(--text-secondary)' }}>{transaction.date}</span>
            </div>

            {transaction.cardLast4 && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Payment Method</span>
                <span
                  style={{
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <CreditCard size={14} color="var(--brand-primary)" />
                  <span>TRAVLS Card (•••• {transaction.cardLast4})</span>
                </span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Processing Fee</span>
              <span style={{ color: 'var(--success)', fontWeight: 600 }}>
                {transaction.fee === 0 ? '$0.00 (Zero Fee Guarantee)' : `$${transaction.fee.toFixed(2)}`}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Reference ID</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: '12px' }}>
                {transaction.referenceNumber}
              </span>
            </div>

            {transaction.hash && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)' }}>Blockchain Hash</span>
                <a
                  href={`https://etherscan.io/tx/${transaction.hash}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--brand-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                  }}
                >
                  <span>{transaction.hash}</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px', marginTop: '24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              color: 'var(--text-muted)',
              marginBottom: '14px',
            }}
          >
            <ShieldCheck size={14} color="var(--success)" />
            <span>Cryptographically signed by TRAVLS Settlement Network.</span>
          </div>

          <button
            onClick={() => alert(`Official VAT / Tax receipt for ${transaction.referenceNumber} downloaded.`)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--surface-interactive)',
              border: '1px solid var(--border-default)',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <Download size={16} />
            <span>Download Official PDF Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
