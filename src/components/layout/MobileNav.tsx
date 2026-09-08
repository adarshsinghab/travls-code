import React from 'react';
import { X, LayoutDashboard, CreditCard, Landmark, Send, RefreshCw, ShieldCheck, Settings, HelpCircle } from 'lucide-react';
import type { NavTab } from '../../types';

interface MobileNavProps {
  isOpen: boolean;
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  activeTab,
  onNavigate,
  onClose,
}) => {
  if (!isOpen) return null;

  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'cards', label: 'TRAVLS Cards', icon: <CreditCard size={20} /> },
    { id: 'accounts', label: 'Custody & Balances', icon: <Landmark size={20} /> },
    { id: 'transfers', label: 'Transfers & Payouts', icon: <Send size={20} /> },
    { id: 'transactions', label: 'Transactions Ledger', icon: <RefreshCw size={20} /> },
    { id: 'verification', label: 'Identity Verification', icon: <ShieldCheck size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
    { id: 'help', label: 'Help & Concierge', icon: <HelpCircle size={20} /> },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(9, 13, 20, 0.8)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Drawer */}
      <div
        className="animate-fade-in"
        style={{
          position: 'relative',
          width: '300px',
          maxWidth: '85vw',
          background: 'var(--surface-canvas)',
          borderRight: '1px solid var(--border-default)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 20px',
          boxShadow: 'var(--shadow-elevated)',
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
          }}
        >
          <img src="/travls-logo.png" alt="TRAVLS" style={{ height: '26px' }} />
          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--surface-card)',
              border: '1px solid var(--border-default)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: isActive ? 'var(--surface-card)' : 'transparent',
                  color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '15px',
                  border: isActive ? '1px solid var(--brand-border)' : '1px solid transparent',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div
          style={{
            paddingTop: '16px',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '12px',
            color: 'var(--text-muted)',
          }}
        >
          <div>TRAVLS Banking System v2.6.4</div>
          <div style={{ color: 'var(--success)', marginTop: '2px' }}>● All systems encrypted & live</div>
        </div>
      </div>
    </div>
  );
};
