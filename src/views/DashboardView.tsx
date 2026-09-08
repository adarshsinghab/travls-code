import React, { useState } from 'react';
import {
  CreditCard,
  ChevronRight,
  TrendingUp,
  Wallet,
  ArrowRightLeft,
  Lock,
  Smartphone,
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
  const [activeTimeframe, setActiveTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const dataPoints = [
    { label: 'Apr', x: 70, y: 135, val: '$1,420.00', date: 'Apr 2026' },
    { label: 'May', x: 190, y: 110, val: '$2,180.00', date: 'May 2026' },
    { label: 'Jun', x: 310, y: 140, val: '$1,850.00', date: 'Jun 2026' },
    { label: 'Jul', x: 420, y: 105, val: '$3,100.00', date: 'Jul 2026' },
    { label: 'Aug', x: 530, y: 95, val: '$2,450.00', date: 'Aug 2026' },
    { label: 'Sep', x: 630, y: 55, val: '$3,420.00', date: 'Sep 2026 (Current)' },
  ];

  const [hoveredPoint, setHoveredPoint] = useState<{ label: string; x: number; y: number; val: string; date: string } | null>(dataPoints[5]);

  // Telemetry Calculations
  const cryptoTotalUsd = cryptoAssets.reduce((acc, curr) => acc + curr.usdValue, 0);
  const settledFiat = 12450.00;
  const totalTreasury = cryptoTotalUsd + settledFiat;
  const monthlySpend = 3420.00;
  const spendingLimit = 12500.00;
  const limitUsagePercent = Math.round((monthlySpend / spendingLimit) * 100);

  const activeCard = cards[0];

  // SVG Spline Wave paths
  const splinePath = "M 30,150 C 110,130 150,150 190,110 C 250,60 270,160 310,140 C 370,110 390,130 420,105 C 470,75 490,110 530,95 C 570,80 590,70 630,55";
  const areaPath = "M 30,150 C 110,130 150,150 190,110 C 250,60 270,160 310,140 C 370,110 390,130 420,105 C 470,75 490,110 530,95 C 570,80 590,70 630,55 L 630,210 L 30,210 Z";

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* 1. Top Section: Header & Primary Actions */}
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
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Treasury & Spend Overview
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Corporate liquidity, multi-currency balances, and institutional metal card fleet.
          </p>
        </div>

        {/* Executive Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => onNavigate('transfers')}
            className="btn-glass"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 18px',
              fontSize: '13px',
              fontWeight: 600,
              borderRadius: 'var(--radius-md)',
            }}
          >
            <ArrowRightLeft size={15} color="var(--brand-primary)" />
            <span>Send Wire / Transfer</span>
          </button>

          <button
            onClick={onOpenDeposit}
            className="btn-gold"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 18px',
              fontSize: '13px',
              fontWeight: 700,
              borderRadius: 'var(--radius-md)',
            }}
          >
            <Wallet size={15} />
            <span>Deposit Funds</span>
          </button>
        </div>
      </div>

      {/* 2. Executive KPI Cards Bar (4 Metrics) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
        }}
      >
        {/* Metric 1: Total Liquid Treasury */}
        <div
          className="glass-card"
          style={{
            padding: '20px 22px',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--surface-card)',
            border: '1px solid var(--border-default)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Total Treasury Balance
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--success)',
                background: 'var(--success-soft)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
              }}
            >
              <TrendingUp size={11} /> +3.04%
            </span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
            ${totalTreasury.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Fiat ($12.45k) • Crypto (${(cryptoTotalUsd / 1000).toFixed(1)}k)
          </div>
        </div>

        {/* Metric 2: 30-Day Card Spend */}
        <div
          className="glass-card"
          style={{
            padding: '20px 22px',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--surface-card)',
            border: '1px solid var(--border-default)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              30-Day Card Spend
            </span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>
              {limitUsagePercent}% of Limit
            </span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
            ${monthlySpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                flex: 1,
                height: '5px',
                borderRadius: '999px',
                background: 'var(--surface-subtle)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${limitUsagePercent}%`,
                  height: '100%',
                  background: 'var(--brand-primary)',
                  borderRadius: '999px',
                }}
              />
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
              Limit: ${(spendingLimit / 1000).toFixed(1)}k
            </span>
          </div>
        </div>

        {/* Metric 3: Cashback & Rewards Yield */}
        <div
          className="glass-card"
          style={{
            padding: '20px 22px',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--surface-card)',
            border: '1px solid var(--border-default)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Cashback Earned
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--brand-primary)',
                background: 'var(--brand-soft)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
              }}
            >
              3.5% Rate
            </span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
            $482.10
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Auto-compounding into USDT daily
          </div>
        </div>

        {/* Metric 4: Settled Available Fiat */}
        <div
          className="glass-card"
          style={{
            padding: '20px 22px',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--surface-card)',
            border: '1px solid var(--border-default)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Settled Liquid Fiat
            </span>
            <span style={{ fontSize: '11px', color: 'var(--success)', fontWeight: 600 }}>
              FDIC Insured
            </span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
            ${settledFiat.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            USD • EUR • GBP accounts ready
          </div>
        </div>
      </div>

      {/* 3. Core 2-Column Section: Left (Spend Analytics & Ledger) vs Right (Card & Treasury) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.8fr) minmax(320px, 1.1fr)',
          gap: '24px',
          alignItems: 'start',
        }}
        className="dashboard-two-column-grid"
      >
        {/* ================= LEFT COLUMN: ANALYTICS + LEDGER ================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Spend Analytics Spline Card */}
          <div
            className="glass-card"
            style={{
              padding: '24px',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--surface-card)',
              border: '1px solid var(--border-default)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Spend Volume & Trajectory
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Rolling authorizations across all issued cards
                </p>
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
                {(['7d', '30d', '90d', '1y'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTimeframe(t)}
                    style={{
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)',
                      background: activeTimeframe === t ? 'var(--brand-primary)' : 'transparent',
                      color: activeTimeframe === t ? '#070A0F' : 'var(--text-secondary)',
                      fontSize: '11px',
                      fontWeight: activeTimeframe === t ? 700 : 500,
                      cursor: 'pointer',
                      border: 'none',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Spline Wave SVG */}
            <div style={{ position: 'relative', width: '100%', height: '210px', overflow: 'hidden' }}>
              <svg
                viewBox="0 0 660 220"
                style={{ width: '100%', height: '100%', overflow: 'visible' }}
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="spendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFB91F" stopOpacity="0.32" />
                    <stop offset="60%" stopColor="#FFB91F" stopOpacity="0.06" />
                    <stop offset="100%" stopColor="#FFB91F" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                <line x1="20" y1="50" x2="640" y2="50" stroke="var(--border-subtle)" strokeDasharray="4 4" />
                <line x1="20" y1="110" x2="640" y2="110" stroke="var(--border-subtle)" strokeDasharray="4 4" />
                <line x1="20" y1="170" x2="640" y2="170" stroke="var(--border-subtle)" strokeDasharray="4 4" />

                {/* Gradient Fill Under Spline */}
                <path d={areaPath} fill="url(#spendGradient)" />

                {/* Main Curved Spline Stroke */}
                <path
                  d={splinePath}
                  fill="none"
                  stroke="#FFB91F"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Hover Data Indicator */}
                {hoveredPoint && (
                  <g>
                    <line
                      x1={hoveredPoint.x}
                      y1="20"
                      x2={hoveredPoint.x}
                      y2="200"
                      stroke="#FFB91F"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      opacity="0.6"
                    />
                    <circle
                      cx={hoveredPoint.x}
                      cy={hoveredPoint.y}
                      r="6"
                      fill="#FFB91F"
                      stroke="var(--surface-base)"
                      strokeWidth="2.5"
                    />
                  </g>
                )}
              </svg>

              {/* Hover Telemetry Bubble */}
              {hoveredPoint && (
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: `${(hoveredPoint.x / 660) * 100}%`,
                    transform: 'translateX(-50%)',
                    background: 'var(--surface-card-solid)',
                    border: '1px solid var(--border-default)',
                    boxShadow: 'var(--shadow-md)',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
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

            {/* Bottom Month Toggles */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
              {dataPoints.map((dp) => (
                <button
                  key={dp.label}
                  onClick={() => setHoveredPoint(dp)}
                  onMouseEnter={() => setHoveredPoint(dp)}
                  style={{
                    color: hoveredPoint?.label === dp.label ? 'var(--brand-primary)' : 'var(--text-muted)',
                    fontWeight: hoveredPoint?.label === dp.label ? 700 : 500,
                    cursor: 'pointer',
                    background: 'transparent',
                    border: 'none',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  {dp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Settlement Feed / Ledger Card */}
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
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Recent Authorizations & Settlements
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Card spending, wire settlements, and auto-cashback
                </p>
              </div>

              <button
                onClick={() => onNavigate('transactions')}
                style={{
                  fontSize: '12px',
                  color: 'var(--brand-primary)',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <span>View All</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {transactions.slice(0, 5).map((tx) => (
                <div
                  key={tx.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--surface-subtle)',
                    border: '1px solid var(--border-subtle)',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: 'var(--radius-sm)',
                        background: tx.type === 'crypto_deposit' ? 'var(--success-soft)' : 'var(--brand-soft)',
                        color: tx.type === 'crypto_deposit' ? 'var(--success)' : 'var(--brand-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CreditCard size={17} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
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
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      Cashback: +${(tx.amount * 0.035).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: CARD SHOWCASE + TREASURY ASSETS ================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Primary Card Showcase Card */}
          <div
            className="glass-card"
            style={{
              padding: '24px',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--surface-card)',
              border: '1px solid var(--border-default)',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Primary Card
                </h3>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Brushed Black Titanium
                </span>
              </div>

              <button
                onClick={onOpenIssueCard}
                title="Issue Additional Card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--brand-soft)',
                  border: '1px solid var(--brand-border)',
                  color: 'var(--brand-primary)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <Plus size={12} />
                <span>New Card</span>
              </button>
            </div>

            {/* 3D Brushed Titanium Card Visual */}
            <div
              onClick={() => onNavigate('cards')}
              style={{
                width: '100%',
                aspectRatio: '1.586 / 1',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #181A20 0%, #0F1014 60%, #15161C 100%)',
                border: '1.5px solid #D4AF37',
                boxShadow: '0 16px 32px rgba(0, 0, 0, 0.5), 0 0 15px rgba(212, 175, 55, 0.15)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
            >
              {/* Card Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '15px', fontWeight: 900, letterSpacing: '0.08em', color: '#FFB91F' }}>
                  TRAVLS
                </span>
                <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600 }}>
                  TITANIUM FLEET
                </span>
              </div>

              {/* EMV Chip & NFC */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                <div
                  style={{
                    width: '34px',
                    height: '24px',
                    borderRadius: '4px',
                    background: 'linear-gradient(135deg, #FFE27D 0%, #D49E24 100%)',
                  }}
                />
                <span style={{ fontSize: '10px', color: '#94A3B8', letterSpacing: '0.04em' }}>CONTACTLESS</span>
              </div>

              {/* Card Number */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '15px',
                  letterSpacing: '0.12em',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  marginTop: '10px',
                }}
              >
                {activeCard ? activeCard.fullNumber : '4012 3456 7890 1234'}
              </div>

              {/* Cardholder & Visa */}
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '10px' }}>
                <div>
                  <div style={{ fontSize: '8px', color: '#94A3B8', textTransform: 'uppercase' }}>Cardholder</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF' }}>ADARSH S. GAUR</div>
                </div>

                <div>
                  <div style={{ fontSize: '8px', color: '#94A3B8', textTransform: 'uppercase' }}>Expires</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>08/29</div>
                </div>

                <span style={{ fontSize: '15px', fontWeight: 900, fontStyle: 'italic', color: '#FFB91F' }}>
                  VISA
                </span>
              </div>
            </div>

            {/* Quick Card Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                onClick={() => onNavigate('cards')}
                className="btn-glass"
                style={{
                  padding: '9px',
                  fontSize: '12px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <Lock size={13} />
                <span>Card Controls</span>
              </button>

              <button
                onClick={() => alert('Card credential provisioned to Apple Pay Secure Enclave.')}
                className="btn-glass"
                style={{
                  padding: '9px',
                  fontSize: '12px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <Smartphone size={13} />
                <span>Apple Pay</span>
              </button>
            </div>
          </div>

          {/* Treasury Crypto Assets Card */}
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
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Crypto Treasury Assets
                </h3>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Non-custodial collateral & liquidity
                </span>
              </div>

              <button
                onClick={onOpenDeposit}
                style={{
                  fontSize: '12px',
                  color: 'var(--brand-primary)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                }}
              >
                + Deposit
              </button>
            </div>

            {/* Assets List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-default)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'var(--brand-soft)',
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
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
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

            <button
              onClick={() => onNavigate('accounts')}
              className="btn-glass"
              style={{
                width: '100%',
                padding: '9px',
                borderRadius: 'var(--radius-md)',
                fontSize: '12px',
                fontWeight: 600,
                marginTop: '4px',
              }}
            >
              Manage Treasury Accounts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
