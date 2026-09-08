import React, { useState } from 'react';
import {
  Bell,
  Check,
  Menu,
  ChevronDown,
  Lock,
  LogOut,
  Sun,
  Moon,
  PanelLeft,
  Settings,
} from 'lucide-react';
import type { NavTab } from '../../types';

interface HeaderProps {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  onOpenMobileMenu: () => void;
  onQuickDeposit: () => void;
  currentTheme: 'obsidian' | 'executive';
  onSelectTheme: (theme: 'obsidian' | 'executive') => void;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onNavigate,
  onOpenMobileMenu,
  currentTheme,
  onSelectTheme,
  isSidebarCollapsed,
  onToggleSidebar,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  const getPageTitle = (tab: NavTab) => {
    switch (tab) {
      case 'dashboard':
        return { title: 'Dashboard', subtitle: 'Real-time liquidity, spend velocity, and treasury analytics.' };
      case 'cards':
        return { title: 'Cards', subtitle: 'Manage corporate & personal metal fleet with zero FX markup.' };
      case 'accounts':
        return { title: 'Accounts & Custody', subtitle: 'Multi-currency fiat balances and crypto treasury assets.' };
      case 'transfers':
        return { title: 'Transfers', subtitle: 'Cross-border settlement via instant local rails.' };
      case 'transactions':
        return { title: 'Ledger', subtitle: 'Authorizations, settlements, and card spend activity.' };
      case 'verification':
        return { title: 'Compliance & Identity', subtitle: 'Institutional KYC standards and regulatory verifications.' };
      case 'settings':
        return { title: 'Settings', subtitle: 'Hardware key isolation, preferences, and security controls.' };
      case 'help':
        return { title: 'Support & Concierge', subtitle: 'Priority private banking concierge and technical assistance.' };
    }
  };

  const { title, subtitle } = getPageTitle(activeTab);

  const notificationsList = [
    {
      id: 'notif-1',
      title: 'Card Cashback Credited',
      desc: '+$92.40 deposited from Emirates Airlines spend.',
      time: '12m ago',
      unread: true,
    },
    {
      id: 'notif-2',
      title: 'Virtual Card Auto-Funded',
      desc: '$500.00 allocated for AWS Cloud Services bill.',
      time: '1h ago',
      unread: true,
    },
    {
      id: 'notif-3',
      title: 'Compliance Verification Approved',
      desc: 'Tier 2 limits ($100,000 / month) now active.',
      time: '1d ago',
      unread: false,
    },
  ];

  return (
    <header className="app-header">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 28px',
          width: '100%',
        }}
      >
        {/* Left Section: Sidebar Toggle + Clean Page Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Mobile Menu Button */}
          <button
            onClick={onOpenMobileMenu}
            className="mobile-only-btn"
            aria-label="Open mobile navigation menu"
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--surface-card)',
              border: '1px solid var(--border-default)',
              color: 'var(--text-primary)',
            }}
          >
            <Menu size={18} />
          </button>

          {/* Desktop Sidebar Toggle Button */}
          <button
            onClick={onToggleSidebar}
            title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--surface-subtle)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.borderColor = 'var(--border-default)';
              e.currentTarget.style.background = 'var(--surface-interactive)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.background = 'var(--surface-subtle)';
            }}
          >
            <PanelLeft size={18} />
          </button>

          <div>
            <h1
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              {title}
            </h1>
            <p
              className="header-subtitle"
              style={{
                fontSize: '12px',
                color: 'var(--text-secondary)',
                marginTop: '2px',
                fontWeight: 400,
              }}
            >
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right Section: Minimal Theme Toggle + Notifications + User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Executive Theme Toggle: Dark (Obsidian) vs Light (Executive) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--surface-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '3px',
              gap: '2px',
            }}
          >
            <button
              onClick={() => onSelectTheme('obsidian')}
              title="Dark Theme (Obsidian)"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                background: currentTheme === 'obsidian' ? 'var(--brand-primary)' : 'transparent',
                color: currentTheme === 'obsidian' ? '#070A0F' : 'var(--text-secondary)',
                fontSize: '12px',
                fontWeight: currentTheme === 'obsidian' ? 700 : 500,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                border: 'none',
              }}
            >
              <Moon size={13} />
              <span className="desktop-only-badge">Dark</span>
            </button>

            <button
              onClick={() => onSelectTheme('executive')}
              title="Light Theme (Executive)"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                background: currentTheme === 'executive' ? 'var(--brand-primary)' : 'transparent',
                color: currentTheme === 'executive' ? '#FFFFFF' : 'var(--text-secondary)',
                fontSize: '12px',
                fontWeight: currentTheme === 'executive' ? 700 : 500,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                border: 'none',
              }}
            >
              <Sun size={13} />
              <span className="desktop-only-badge">Light</span>
            </button>
          </div>

          {/* Notification Center */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
              style={{
                position: 'relative',
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--surface-subtle)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-default)';
                e.currentTarget.style.background = 'var(--surface-interactive)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.background = 'var(--surface-subtle)';
              }}
            >
              <Bell size={16} />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '9px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--brand-primary)',
                  }}
                />
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '46px',
                  width: '340px',
                  background: 'var(--surface-card-solid)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-elevated)',
                  zIndex: 100,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    padding: '14px 18px',
                    borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Activity
                  </span>
                  {unreadCount > 0 && (
                    <button
                      onClick={() => setUnreadCount(0)}
                      style={{
                        fontSize: '11px',
                        color: 'var(--brand-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      <Check size={12} />
                      Mark read
                    </button>
                  )}
                </div>

                <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                  {notificationsList.map((n) => (
                    <div
                      key={n.id}
                      style={{
                        padding: '12px 18px',
                        borderBottom: '1px solid var(--border-subtle)',
                        background: n.unread ? 'var(--brand-soft)' : 'transparent',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {n.title}
                        </span>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{n.time}</span>
                      </div>
                      <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        {n.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill Menu */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '4px 12px 4px 6px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--surface-subtle)',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-default)';
                e.currentTarget.style.background = 'var(--surface-interactive)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.background = 'var(--surface-subtle)';
              }}
            >
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'var(--brand-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '12px',
                  color: currentTheme === 'executive' ? '#FFFFFF' : '#070A0F',
                }}
              >
                AG
              </div>
              <div className="user-name-wrapper" style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                  Adarsh S. Gaur
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                  Institutional Account
                </div>
              </div>
              <ChevronDown size={14} color="var(--text-muted)" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '46px',
                  width: '220px',
                  background: 'var(--surface-card-solid)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-elevated)',
                  zIndex: 100,
                  padding: '6px',
                }}
              >
                <button
                  onClick={() => {
                    onNavigate('verification');
                    setShowProfileMenu(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-interactive)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <Lock size={15} color="var(--brand-primary)" />
                  <span>KYC Tier 2 (Verified)</span>
                </button>

                <button
                  onClick={() => {
                    onNavigate('settings');
                    setShowProfileMenu(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-interactive)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <Settings size={15} color="var(--brand-primary)" />
                  <span>Security & Preferences</span>
                </button>

                <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '4px 0' }} />

                <button
                  onClick={() => {
                    alert('Session securely closed.');
                    setShowProfileMenu(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    color: '#EF4444',
                    fontSize: '13px',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <LogOut size={15} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
