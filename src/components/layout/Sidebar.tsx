import React from 'react';
import {
  LayoutDashboard,
  CreditCard,
  Landmark,
  Send,
  RefreshCw,
  ShieldCheck,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
} from 'lucide-react';
import type { NavTab } from '../../types';

interface SidebarProps {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
  onCloseMobile,
}) => {
  const primaryNavItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={19} />,
    },
    {
      id: 'cards',
      label: 'Cards',
      icon: <CreditCard size={19} />,
      badge: '3 Active',
    },
    {
      id: 'accounts',
      label: 'Accounts',
      icon: <Landmark size={19} />,
    },
    {
      id: 'transfers',
      label: 'Transfers',
      icon: <Send size={19} />,
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: <RefreshCw size={19} />,
    },
    {
      id: 'verification',
      label: 'Verification',
      icon: <ShieldCheck size={19} />,
      badge: 'Tier 2',
    },
  ];

  const secondaryNavItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={18} />,
    },
    {
      id: 'help',
      label: 'Help & Concierge',
      icon: <HelpCircle size={18} />,
    },
  ];

  const handleItemClick = (id: NavTab) => {
    onNavigate(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside className={`app-sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      {/* Top Section: Brand & Nav */}
      <div>
        {/* Brand Header with Collapse Toggle */}
        <div
          style={{
            padding: isCollapsed ? '4px 0 20px 0' : '4px 8px 20px 8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'space-between',
            borderBottom: '1px solid var(--border-subtle)',
            marginBottom: '18px',
            gap: '8px',
          }}
        >
          {isCollapsed ? (
            <button
              onClick={onToggleCollapse}
              title="Expand Sidebar"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--brand-soft)',
                border: '1px solid var(--brand-border)',
                color: 'var(--brand-primary)',
                fontWeight: 900,
                fontSize: '18px',
                cursor: 'pointer',
                transition: 'transform var(--transition-fast)',
              }}
            >
              T
            </button>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src="/travls-logo.png"
                  alt="TRAVLS"
                  style={{
                    height: '28px',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 800,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--brand-primary)',
                    background: 'var(--brand-soft)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    border: '1px solid var(--brand-border)',
                  }}
                >
                  CARD
                </span>
              </div>

              {/* Dedicated Collapse Button */}
              <button
                onClick={onToggleCollapse}
                title="Collapse Sidebar"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: 'var(--radius-xs)',
                  background: 'var(--surface-interactive)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'color var(--transition-fast), background var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.borderColor = 'var(--border-default)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                }}
              >
                <ChevronLeft size={16} />
              </button>
            </>
          )}
        </div>

        {/* Section Label: MAIN MENU (Hidden when collapsed) */}
        {!isCollapsed && (
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              padding: '0 12px 10px 12px',
            }}
          >
            Menu
          </div>
        )}

        {/* Primary Navigation */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {primaryNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                title={isCollapsed ? item.label : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isCollapsed ? 'center' : 'space-between',
                  padding: isCollapsed ? '12px 0' : '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: isActive ? 'var(--surface-card)' : 'transparent',
                  color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '14px',
                  transition: 'all var(--transition-fast)',
                  border: isActive ? '1px solid var(--brand-border)' : '1px solid transparent',
                  position: 'relative',
                  width: '100%',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'var(--surface-subtle)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    style={{
                      color: isActive ? 'var(--brand-primary)' : 'inherit',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {item.icon}
                  </span>
                  {!isCollapsed && <span>{item.label}</span>}
                </div>

                {!isCollapsed && item.badge && (
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-full)',
                      background: isActive ? 'var(--brand-soft)' : 'var(--surface-interactive)',
                      color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
                      border: isActive ? '1px solid var(--brand-border)' : 'none',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'var(--border-subtle)',
            margin: isCollapsed ? '16px 4px' : '20px 8px 16px 8px',
          }}
        />

        {/* Secondary Navigation */}
        {!isCollapsed && (
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              padding: '0 12px 10px 12px',
            }}
          >
            General
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {secondaryNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                title={isCollapsed ? item.label : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  gap: '12px',
                  padding: isCollapsed ? '12px 0' : '9px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: isActive ? 'var(--surface-card)' : 'transparent',
                  color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '14px',
                  border: isActive ? '1px solid var(--brand-border)' : '1px solid transparent',
                  width: '100%',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'var(--surface-subtle)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                <span>{item.icon}</span>
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Clean Sign Out */}
      <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
        <button
          onClick={() => alert('Securely signing out of TRAVLS Banking session.')}
          title={isCollapsed ? 'Sign Out' : undefined}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            gap: '10px',
            padding: isCollapsed ? '10px 0' : '9px 12px',
            borderRadius: 'var(--radius-sm)',
            background: 'transparent',
            border: '1px solid transparent',
            color: 'var(--text-muted)',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
            width: '100%',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#EF4444';
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <LogOut size={16} />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};
