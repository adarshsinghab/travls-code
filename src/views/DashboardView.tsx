import React, { useState } from 'react';
import {
  CreditCard,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Percent,
  RefreshCw,
  Sliders,
  Wallet,
  ArrowRightLeft,
  Plus,
} from 'lucide-react';
import type { CardItem, CryptoAsset, Transaction, NavTab } from '../types';

interface DashboardViewProps {
  cards: CardItem[];
  cryptoAssets: CryptoAsset[];
  transactions: Transaction[];
  onNavigate: (tab: NavTab) => void;
  onOpenDeposit: () => void;
  onOpenIssueCard: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  cards,
  cryptoAssets,
  transactions,
  onNavigate,
  onOpenDeposit,
  onOpenIssueCard,
}) => {
  const [activeTimeframe, setActiveTimeframe] = useState<'24h' | '7d' | '1m' | '1y'>('1m');

  const dataPoints = [
    { month: 'Apr', x: 90, y: 140, val: '$1,420.00', date: 'Apr 2026' },
    { month: 'May', x: 200, y: 110, val: '$2,180.00', date: 'May 2026' },
    { month: 'Jun', x: 320, y: 140, val: '$1,850.00', date: 'Jun 2026' },
    { month: 'Jul', x: 370, y: 120, val: '$3,100.00', date: 'Jul 2026' },
    { month: 'Aug', x: 520, y: 95, val: '$2,450.00', date: 'Aug 2026' },
    { month: 'Sep', x: 420, y: 65, val: '$3,420.00', date: 'Sep 2026 (Peak)' },
  ];

  const [hoveredPoint, setHoveredPoint] = useState<{ month: string; x: number; y: number; val: string; date: string } | null>(dataPoints[5]);

  // Calculate live portfolio telemetry
  const cryptoTotalUsd = cryptoAssets.reduce((acc, curr) => acc + curr.usdValue, 0);
  const totalBalance = cryptoTotalUsd + 12450.00; // Crypto + Settled Fiat

  const activeCard = cards[0];

  // SVG Curved Spline Path Data for Spend Insights
  const splinePath = "M 20,160 C 90,140 140,170 200,110 C 260,60 320,140 370,120 C 400,105 415,70 420,65 C 440,70 470,120 520,95 C 570,75 600,110 660,85";
  const areaPath = "M 20,160 C 90,140 140,170 200,110 C 260,60 320,140 370,120 C 400,105 415,70 420,65 C 440,70 470,120 520,95 C 570,75 600,110 660,85 L 660,220 L 20,220 Z";

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Header Telemetry Overview Banner */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--brand-primary)',
                background: 'var(--brand-soft)',
                padding: '3px 9px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--brand-border)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Sparkles size={12} />
              EXECUTIVE PORTFOLIO TELEMETRY
            </span>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Institutional Liquidity & Spend Portal
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Multi-currency treasury accounts, instant metal card authorizations, and real-time interbank settlement.
          </p>
        </div>

        {/* Live Net Balance Hero Pill */}
        <div
          className="glass-card"
          style={{
            padding: '16px 24px',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            border: '1px solid var(--border-default)',
            background: 'var(--surface-card)',
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              Total Liquid Portfolio
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
              ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: 'var(--success)',
              background: 'var(--success-soft)',
              padding: '6px 10px',
              borderRadius: 'var(--radius-md)',
              fontSize: '12px',
              fontWeight: 700,
            }}
          >
            <TrendingUp size={14} />
            <span>+$1,420.30 (+3.04%)</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN SHOWCASE: 3D Black Titanium Card + Spend Spline Wave + Crypto Assets (Concept-Dashboard Layout) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(340px, 420px) 1fr minmax(280px, 320px)',
          gap: '24px',
          alignItems: 'start',
        }}
        className="dashboard-hero-grid"
      >
        {/* Left: 3D Brushed Black Titanium Card Display */}
        <div
          className="glass-card"
          style={{
            padding: '24px',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--surface-card)',
            border: '1px solid var(--border-default)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              PRIMARY SPENDING CARD
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'var(--brand-primary)',
                  background: 'var(--brand-soft)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--brand-border)',
                }}
              >
                BRUSHED TITANIUM
              </span>
              <button
                onClick={onOpenIssueCard}
                title="Issue Another Card"
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'var(--brand-soft)',
                  border: '1px solid var(--brand-border)',
                  color: 'var(--brand-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          {/* Isometric Perspective Card Visual */}
          <div
            onClick={() => onNavigate('cards')}
            style={{
              width: '100%',
              aspectRatio: '1.586 / 1',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #181A20 0%, #0F1014 60%, #15161C 100%)',
              border: '2px solid #FFB91F',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(255, 185, 31, 0.25)',
              padding: '22px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.8), 0 0 35px rgba(255, 185, 31, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(255, 185, 31, 0.25)';
            }}
          >
            {/* Top row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '15px', fontWeight: 900, letterSpacing: '0.08em', color: '#FFB91F' }}>
                TRAVLS
              </span>
              <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 700 }}>
                TRAVLS Luxury Fleet
              </span>
            </div>

            {/* Chip & Digits */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '26px',
                  borderRadius: '5px',
                  background: 'linear-gradient(135deg, #FFE27D 0%, #D49E24 100%)',
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4)',
                }}
              />
              <span style={{ fontSize: '11px', color: '#FFB91F', letterSpacing: '0.05em' }}>NFC READY</span>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '15px',
                letterSpacing: '0.12em',
                color: '#FFFFFF',
                fontWeight: 700,
                marginTop: '12px',
              }}
            >
              {activeCard ? activeCard.fullNumber : '4012 3456 7890 1234'}
            </div>

            {/* Bottom info */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '12px' }}>
              <div>
                <div style={{ fontSize: '8px', color: '#94A3B8', textTransform: 'uppercase' }}>Cardholder</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF' }}>ADARSH S. GAUR</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '8px', color: '#94A3B8', textTransform: 'uppercase' }}>Expires</div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
                  08/29
                </div>
              </div>

              <span style={{ fontSize: '16px', fontWeight: 900, fontStyle: 'italic', color: '#FFB91F' }}>
                VISA
              </span>
            </div>
          </div>

          {/* Zero Foreign Exchange Guarantee Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--surface-subtle)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'var(--brand-soft)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--brand-primary)',
              }}
            >
              <Percent size={16} />
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Zero Foreign Exchange Rate
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Wholesale Interbank conversion on every cross-border spend.
              </div>
            </div>
          </div>
        </div>

        {/* Center: Glowing Spline Spend Insights Chart + Account Standing */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Spend Insights Spline Chart */}
          <div
            className="glass-card"
            style={{
              padding: '24px',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--surface-card)',
              border: '1px solid var(--border-default)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  Spend Insights
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                  Spending Trajectory & Volume
                </h3>
              </div>

              {/* Timeframe selector */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'var(--surface-subtle)',
                  borderRadius: 'var(--radius-full)',
                  padding: '3px',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {(['24h', '7d', '1m', '1y'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTimeframe(t)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      background: activeTimeframe === t ? 'var(--brand-primary)' : 'transparent',
                      color: activeTimeframe === t ? '#070A0F' : 'var(--text-secondary)',
                      fontSize: '11px',
                      fontWeight: activeTimeframe === t ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Glowing Spline Wave SVG */}
            <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden' }}>
              <svg
                viewBox="0 0 680 230"
                style={{ width: '100%', height: '100%', overflow: 'visible' }}
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Glowing gold gradient under the spline */}
                  <linearGradient id="spendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFB91F" stopOpacity="0.38" />
                    <stop offset="65%" stopColor="#FFB91F" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#FFB91F" stopOpacity="0.0" />
                  </linearGradient>
                  <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Horizontal Grid lines */}
                <line x1="20" y1="50" x2="660" y2="50" stroke="var(--border-default)" strokeDasharray="4 4" opacity="0.6" />
                <line x1="20" y1="110" x2="660" y2="110" stroke="var(--border-default)" strokeDasharray="4 4" opacity="0.6" />
                <line x1="20" y1="170" x2="660" y2="170" stroke="var(--border-default)" strokeDasharray="4 4" opacity="0.6" />

                {/* Gradient Fill Under Spline */}
                <path d={areaPath} fill="url(#spendGradient)" />

                {/* The Main Curved Spline Stroke */}
                <path
                  d={splinePath}
                  fill="none"
                  stroke="#FFB91F"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#goldGlow)"
                />

                {/* Active Hover Data Node */}
                {hoveredPoint && (
                  <g>
                    <line
                      x1={hoveredPoint.x}
                      y1="20"
                      x2={hoveredPoint.x}
                      y2="210"
                      stroke="#FFB91F"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      opacity="0.6"
                    />
                    <circle
                      cx={hoveredPoint.x}
                      cy={hoveredPoint.y}
                      r="7"
                      fill="#FFB91F"
                      stroke="#070A0F"
                      strokeWidth="3"
                      filter="drop-shadow(0 0 8px #FFB91F)"
                    />
                  </g>
                )}
              </svg>

              {/* Hover Telemetry Card */}
              {hoveredPoint && (
                <div
                  style={{
                    position: 'absolute',
                    top: '25px',
                    left: `${(hoveredPoint.x / 680) * 100}%`,
                    transform: 'translateX(-50%)',
                    background: 'var(--surface-card-solid)',
                    border: '1px solid var(--brand-border)',
                    boxShadow: 'var(--brand-glow)',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-md)',
                    pointerEvents: 'none',
                    textAlign: 'center',
                    zIndex: 10,
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)' }}>
                    {hoveredPoint.val}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{hoveredPoint.date}</div>
                </div>
              )}
            </div>

            {/* Bottom time markers */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginTop: '10px' }}>
              {dataPoints.map((dp) => (
                <button
                  key={dp.month}
                  onClick={() => setHoveredPoint(dp)}
                  onMouseEnter={() => setHoveredPoint(dp)}
                  style={{
                    color: hoveredPoint?.month === dp.month ? 'var(--brand-primary)' : 'var(--text-muted)',
                    fontWeight: hoveredPoint?.month === dp.month ? 700 : 500,
                    cursor: 'pointer',
                    background: 'transparent',
                    border: 'none',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  {dp.month}
                </button>
              ))}
            </div>
          </div>

          {/* Account Standing Quick Widget */}
          <div
            className="glass-card"
            style={{
              padding: '20px 24px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--surface-card)',
              border: '1px solid var(--border-default)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Account Standing
              </div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                $732.33 <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>Settled</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Recent Expenses</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-secondary)' }}>$732.38</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Pending Clearing</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--brand-primary)' }}>$2,473.00</div>
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'var(--success)',
                  background: 'var(--success-soft)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--success-border)',
                }}
              >
                Clear Standing
              </div>
            </div>
          </div>
        </div>

        {/* Right: Crypto Assets Panel (USDT, BTC, ETH, SOL) */}
        <div
          className="glass-card"
          style={{
            padding: '24px',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--surface-card)',
            border: '1px solid var(--border-default)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              CRYPTO ASSETS
            </span>
            <button
              onClick={onOpenDeposit}
              style={{
                fontSize: '11px',
                color: 'var(--brand-primary)',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
              }}
            >
              <span>+ Top Up</span>
            </button>
          </div>

          {/* Asset Rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {cryptoAssets.map((asset) => (
              <div
                key={asset.id}
                onClick={onOpenDeposit}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--brand-soft)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 800,
                      color: 'var(--brand-primary)',
                    }}
                  >
                    {asset.symbol.slice(0, 3)}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {asset.symbol}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{asset.name}</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    ${asset.usdValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div style={{ fontSize: '10px', color: asset.change24h >= 0 ? 'var(--success)' : 'var(--error)' }}>
                    {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Swap CTA */}
          <button
            onClick={() => onNavigate('accounts')}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--surface-subtle)',
              border: '1px solid var(--border-default)',
              color: 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              marginTop: '6px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.borderColor = 'var(--brand-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'var(--border-default)';
            }}
          >
            <RefreshCw size={13} />
            <span>Manage All Wallets</span>
          </button>
        </div>
      </div>

      {/* 3. FLOATING ACTION PILL BAR (Directly from concept-dashboard.jpg) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          padding: '12px 20px',
          background: 'var(--surface-card)',
          backdropFilter: 'blur(20px)',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-default)',
          width: 'fit-content',
          margin: '0 auto',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <button
          onClick={() => onNavigate('transfers')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 22px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--surface-interactive)',
            border: '1px solid var(--border-default)',
            color: 'var(--text-primary)',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--brand-primary)';
            e.currentTarget.style.boxShadow = 'var(--brand-glow)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-default)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <ArrowRightLeft size={16} color="var(--brand-primary)" />
          <span>Transfer</span>
        </button>

        <button
          onClick={onOpenDeposit}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 22px',
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(135deg, #FFB91F 0%, #D97706 100%)',
            border: 'none',
            color: '#070A0F',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 4px 18px rgba(255, 185, 31, 0.4)',
            transition: 'transform var(--transition-fast)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
        >
          <Wallet size={16} />
          <span>Top Up / Swap</span>
        </button>

        <button
          onClick={() => onNavigate('cards')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 22px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--surface-interactive)',
            border: '1px solid var(--border-default)',
            color: 'var(--text-primary)',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--brand-primary)';
            e.currentTarget.style.boxShadow = 'var(--brand-glow)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-default)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Sliders size={16} color="var(--brand-primary)" />
          <span>Card Settings</span>
        </button>
      </div>

      {/* 4. Recent Transactions Table */}
      <div
        className="glass-card"
        style={{
          padding: '24px',
          borderRadius: 'var(--radius-xl)',
          background: 'var(--surface-card)',
          border: '1px solid var(--border-default)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Live Ledger Feed
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Real-time multi-currency settlement authorizations
            </p>
          </div>

          <button
            onClick={() => onNavigate('transactions')}
            style={{
              fontSize: '12px',
              color: 'var(--brand-primary)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
            }}
          >
            <span>View All Ledger</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {transactions.slice(0, 5).map((tx) => (
            <div
              key={tx.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--surface-subtle)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: 'var(--radius-md)',
                    background: tx.type === 'crypto_deposit' ? 'var(--success-soft)' : 'var(--brand-soft)',
                    color: tx.type === 'crypto_deposit' ? 'var(--success)' : 'var(--brand-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CreditCard size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {tx.merchantOrParty}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {tx.category} • {tx.date} • Card •••• {tx.cardLast4}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: tx.type === 'crypto_deposit' ? 'var(--success)' : 'var(--text-primary)',
                  }}
                >
                  {tx.type === 'crypto_deposit' ? '+' : '-'}${tx.amount.toFixed(2)}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Cashback: +${(tx.amount * 0.035).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
