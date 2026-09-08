import React, { useState } from 'react';
import {
  Bell,
  Check,
  Menu,
  ChevronDown,
  Lock,
  LogOut,
  Sparkles,
  ArrowUpRight,
  Sun,
  Moon,
  Zap,
  PanelLeft,
  TrendingUp,
} from 'lucide-react';
import type { NavTab } from '../../types';

interface HeaderProps {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  onOpenMobileMenu: () => void;
  onQuickDeposit: () => void;
  currentTheme: 'obsidian' | 'midnight' | 'executive';
  onSelectTheme: (theme: 'obsidian' | 'midnight' | 'executive') => void;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onNavigate,
  onOpenMobileMenu,
  onQuickDeposit,
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
        return { title: 'Dashboard', subtitle: "Welcome back, Adarsh. Here's your real-time financial telemetry." };
      case 'cards':
        return { title: 'TRAVLS Cards', subtitle: '3D interactive cascade stage, zero-FX spending, and instant cashback.' };
      case 'accounts':
        return { title: 'Custody & Balances', subtitle: 'Multi-currency fiat accounts and non-custodial crypto assets under one seal.' };
      case 'transfers':
        return { title: 'Global Transfers', subtitle: 'Direct cross-border settlements to India (IMPS) and Nigeria (NIP).' };
      case 'transactions':
        return { title: 'Transactions Ledger', subtitle: 'Track, filter, and export every debit, credit, swap, and card spend.' };
      case 'verification':
        return { title: 'Identity & Compliance', subtitle: 'Bank-grade KYC verification tiers and regulatory safeguards.' };
      case 'settings':
        return { title: 'Security & Preferences', subtitle: 'Hardware key isolation, multi-theme customization, and notification channels.' };
      case 'help':
        return { title: 'Support & Concierge', subtitle: '24/7 dedicated support, priority travel assistance, and knowledge base.' };
    }
  };

  const { title, subtitle } = getPageTitle(activeTab);

  const notificationsList = [
    {
      id: 'notif-1',
      title: 'Card Cashback Credited',
      desc: '+0.00142 BTC ($92.40) deposited from Emirates Airlines spend.',
      time: '12m ago',
      unread: true,
    },
    {
      id: 'notif-2',
      title: 'Virtual Card Auto-Funded',
      desc: '$500.00 converted from USDT for AWS Cloud Infrastructure bill.',
      time: '1h ago',
      unread: true,
    },
    {
      id: 'notif-3',
      title: 'Compliance Verification Passed',
      desc: 'Tier 2 Verification unlocked: $100,000 monthly limit approved.',
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
        {/* Left: Sidebar Toggle + Title */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1
                style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                {title}
              </h1>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--brand-soft)',
                  color: 'var(--brand-primary)',
                  border: '1px solid var(--brand-border)',
                }}
              >
                <Sparkles size={11} />
                Live Prod
              </span>
            </div>
            <p
              className="header-subtitle"
              style={{
                fontSize: '12px',
                color: 'var(--text-secondary)',
                marginTop: '2px',
              }}
            >
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right Section: Live FX Ticker + Theme Switcher + Deposit + Notifications + Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Live Market Ticker Pill */}
          <div
            className="desktop-only-badge"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--surface-subtle)',
              border: '1px solid var(--border-subtle)',
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-primary)' }}>
              <span style={{ color: '#F7931A' }}>BTC</span>
              <span>$64,820</span>
              <span style={{ color: 'var(--success)', display: 'inline-flex', alignItems: 'center' }}>
                <TrendingUp size={11} /> +2.4%
              </span>
            </div>
            <span style={{ color: 'var(--border-default)' }}>|</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-primary)' }}>
              <span style={{ color: '#627EEA' }}>ETH</span>
              <span>$3,420</span>
              <span style={{ color: 'var(--success)', display: 'inline-flex', alignItems: 'center' }}>
                <TrendingUp size={11} /> +1.8%
              </span>
            </div>
          </div>

          {/* Theme Switcher Segmented Control */}
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
              title="Obsidian Gold (Dark Luxury)"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px 9px',
                borderRadius: 'var(--radius-full)',
                background: currentTheme === 'obsidian' ? 'var(--brand-primary)' : 'transparent',
                color: currentTheme === 'obsidian' ? '#070A0F' : 'var(--text-secondary)',
                fontSize: '11px',
                fontWeight: currentTheme === 'obsidian' ? 700 : 500,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
            >
              <Moon size={12} />
              <span className="desktop-only-badge">Obsidian</span>
            </button>

            <button
              onClick={() => onSelectTheme('midnight')}
              title="Midnight Cyber (Deep Navy & Cyan)"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px 9px',
                borderRadius: 'var(--radius-full)',
                background: currentTheme === 'midnight' ? '#00F2FE' : 'transparent',
                color: currentTheme === 'midnight' ? '#050811' : 'var(--text-secondary)',
                fontSize: '11px',
                fontWeight: currentTheme === 'midnight' ? 700 : 500,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
            >
              <Zap size={12} />
              <span className="desktop-only-badge">Midnight</span>
            </button>

            <button
              onClick={() => onSelectTheme('executive')}
              title="Executive Light (Pristine Platinum White)"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px 9px',
                borderRadius: 'var(--radius-full)',
                background: currentTheme === 'executive' ? 'var(--brand-primary)' : 'transparent',
                color: currentTheme === 'executive' ? '#FFFFFF' : 'var(--text-secondary)',
                fontSize: '11px',
                fontWeight: currentTheme === 'executive' ? 700 : 500,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
            >
              <Sun size={12} />
              <span className="desktop-only-badge">Light</span>
            </button>
          </div>

          {/* Quick Deposit CTA Button */}
          <button
            onClick={onQuickDeposit}
            className="btn-gold desktop-only-badge"
            style={{
              padding: '8px 16px',
              fontSize: '12px',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
            }}
          >
            <span>Top Up</span>
            <ArrowUpRight size={14} />
          </button>

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
                transition: 'border-color var(--transition-fast)',
              }}
            >
              <Bell size={17} />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '7px',
                    right: '8px',
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: 'var(--brand-primary)',
                    boxShadow: '0 0 8px var(--brand-primary)',
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
                  top: '48px',
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
                    Activity Notifications
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
                      }}
                    >
                      <Check size={12} />
                      Mark all read
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
                padding: '4px 10px 4px 5px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--surface-subtle)',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FFB91F 0%, #D97706 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '12px',
                  color: '#070A0F',
                }}
              >
                AG
              </div>
              <div className="user-name-wrapper" style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                  Adarsh S. Gaur
                </div>
                <div style={{ fontSize: '10px', color: 'var(--brand-primary)' }}>
                  VIP Black Tier
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
                  top: '48px',
                  width: '240px',
                  background: 'var(--surface-card-solid)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-elevated)',
                  zIndex: 100,
                  padding: '8px',
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
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-interactive)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <Lock size={15} color="var(--brand-primary)" />
                  <span>KYC Level 2 (Verified)</span>
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
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-interactive)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <Sparkles size={15} color="var(--brand-primary)" />
                  <span>Card Preferences</span>
                </button>

                <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '6px 0' }} />

                <button
                  onClick={() => {
                    alert('Signing out securely.');
                    setShowProfileMenu(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    color: '#EF4444',
                    fontSize: '13px',
                    textAlign: 'left',
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
