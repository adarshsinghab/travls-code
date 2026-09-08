import React, { useState, useEffect } from 'react';
import {
  Plus,
  Lock,
  Shield,
  Sparkles,
  CheckCircle2,
  Eye,
  EyeOff,
  Snowflake,
  Smartphone,
  CreditCard as CreditCardIcon,
  Clock,
} from 'lucide-react';
import type { CardItem, Transaction } from '../types';

interface CardsViewProps {
  cards: CardItem[];
  transactions: Transaction[];
  onToggleFreeze: (cardId: string) => void;
  onOpenIssueModal: () => void;
  onOpenTransactionReceipt: (tx: Transaction) => void;
  onNotify: (title: string, desc?: string, type?: 'success' | 'error' | 'info') => void;
}

export const CardsView: React.FC<CardsViewProps> = ({
  cards,
  transactions,
  onToggleFreeze,
  onOpenIssueModal,
  onOpenTransactionReceipt,
  onNotify,
}) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(0);
  const [spendingLimit, setSpendingLimit] = useState<number>(12500);
  const [cvvRevealed, setCvvRevealed] = useState<boolean>(false);
  const [cvvTimer, setCvvTimer] = useState<number>(30);
  const [cardTilt, setCardTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const activeCard = cards[selectedCardIndex] || cards[0];

  // CVV 30-second security burn timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (cvvRevealed && cvvTimer > 0) {
      interval = setInterval(() => {
        setCvvTimer((prev) => {
          if (prev <= 1) {
            setCvvRevealed(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cvvRevealed, cvvTimer]);

  const handleRevealCvv = () => {
    if (!cvvRevealed) {
      setCvvRevealed(true);
      setCvvTimer(30);
      onNotify('Security Token Generated', 'Dynamic CVV revealed. Auto-expires in 30 seconds.', 'info');
    } else {
      setCvvRevealed(false);
      setCvvTimer(30);
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSpendingLimit(val);
  };

  const handleFreezeToggle = () => {
    onToggleFreeze(activeCard.id);
    onNotify(
      activeCard.isFrozen ? 'Card Unfrozen' : 'Card Locked & Frozen',
      `Card •••• ${activeCard.last4} is ${activeCard.isFrozen ? 'unlocked and authorized for immediate spends.' : 'frozen. All merchant authorizations blocked.'}`,
      activeCard.isFrozen ? 'success' : 'info'
    );
  };

  const handleAddToAppleWallet = () => {
    onNotify(
      'Apple Wallet Sync Ready',
      `Digital card credential for •••• ${activeCard.last4} provisioned to Apple Pay Secure Enclave.`,
      'success'
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCardTilt({
      x: -(y / rect.height) * 10,
      y: (x / rect.width) * 10,
    });
  };

  const handleMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
  };

  // Card specific transactions
  const cardTransactions = transactions.filter(
    (tx) => tx.cardLast4 === activeCard?.last4
  );

  const sliderPercent = ((spendingLimit - 1000) / (30000 - 1000)) * 100;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Header Bar with Brand Architecture & CTAs */}
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
              CARD ARCHITECTURE & THEATRICAL STAGE
            </span>
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Card Management
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Interact with the 3D metal fleet, configure instant spend controls, and reveal high-security CVV tokens.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={handleAddToAppleWallet}
            className="btn-glass"
            style={{ fontSize: '13px', padding: '10px 18px', borderRadius: 'var(--radius-md)' }}
          >
            <Smartphone size={16} />
            <span>Apple Wallet</span>
          </button>

          <button
            onClick={onOpenIssueModal}
            className="btn-gold"
            style={{ fontSize: '13px', padding: '10px 20px', borderRadius: 'var(--radius-md)' }}
          >
            <Plus size={16} />
            <span>Issue New Card</span>
          </button>
        </div>
      </div>

      {/* 2. THE 3D CARD THEATRICAL STAGE (Matches concept-stage.jpg) */}
      <div
        className="card-theatrical-stage"
        style={{
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          padding: '40px 32px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-elevated)',
        }}
      >
        {/* Ambient Top Glow Orbs */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '450px',
            height: '250px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 185, 31, 0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
            filter: 'blur(30px)',
          }}
        />

        {/* 3-Column Theatrical Stage Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '300px 1fr 300px',
            gap: '24px',
            alignItems: 'center',
            minHeight: '380px',
          }}
          className="card-stage-grid"
        >
          {/* ================= LEFT COLUMN: LIMIT SLIDER & CVV REVEAL ================= */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Widget 1: Card Spending Limit */}
            <div
              className="glass-card"
              style={{
                padding: '22px 24px',
                background: 'var(--surface-card)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                CARD SPENDING LIMIT
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '10px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Current Limit</span>
                <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)' }}>
                  ${spendingLimit.toLocaleString()}
                </span>
              </div>

              {/* Glowing Range Slider */}
              <div style={{ marginTop: '12px', position: 'relative' }}>
                <input
                  type="range"
                  min="1000"
                  max="30000"
                  step="500"
                  value={spendingLimit}
                  onChange={handleLimitChange}
                  style={{
                    background: `linear-gradient(to right, var(--brand-primary) 0%, var(--brand-primary) ${sliderPercent}%, var(--surface-interactive) ${sliderPercent}%, var(--surface-interactive) 100%)`,
                    height: '6px',
                    borderRadius: '999px',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
                  <span>$1k</span>
                  <span>$30k</span>
                </div>
              </div>
            </div>

            {/* Widget 2: Digital CVV Reveal */}
            <div
              className="glass-card"
              style={{
                padding: '22px 24px',
                background: 'var(--surface-card)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                DIGITAL CVV REVEAL
              </div>

              <button
                onClick={handleRevealCvv}
                style={{
                  width: '100%',
                  padding: '12px 18px',
                  borderRadius: 'var(--radius-md)',
                  background: cvvRevealed ? 'var(--brand-soft)' : 'linear-gradient(135deg, rgba(255, 185, 31, 0.15) 0%, rgba(255, 185, 31, 0.05) 100%)',
                  border: `1px solid ${cvvRevealed ? 'var(--brand-primary)' : 'var(--brand-border)'}`,
                  color: 'var(--brand-primary)',
                  fontWeight: 700,
                  fontSize: '13px',
                  letterSpacing: '0.06em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: cvvRevealed ? 'var(--brand-glow)' : 'none',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {cvvRevealed ? <EyeOff size={16} /> : <Eye size={16} />}
                <span>{cvvRevealed ? `CVV: ${activeCard.cvv} (${cvvTimer}s)` : 'REVEAL CVV'}</span>
              </button>

              {cvvRevealed && (
                <div style={{ marginTop: '10px', fontSize: '11px', color: 'var(--text-muted)' }}>
                  Auto-locks in <span style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>{cvvTimer}s</span> for security
                </div>
              )}
            </div>
          </div>

          {/* ================= CENTER COLUMN: 3D ISOMETRIC CARD CASCADE ================= */}
          <div
            style={{
              position: 'relative',
              perspective: '1200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px 0',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* 3 Layered Cascade Cards */}
            <div
              style={{
                position: 'relative',
                width: '380px',
                height: '240px',
                transformStyle: 'preserve-3d',
                transform: `rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
                transition: 'transform 0.3s ease',
              }}
            >
              {cards.map((card, idx) => {
                const isSelected = idx === selectedCardIndex;
                // Calculate cascade positioning
                let zIndex = 20;
                let transform = '';
                let opacity = 1;

                if (isSelected) {
                  zIndex = 30;
                  transform = 'translateZ(40px) scale(1.03)';
                } else if (idx === (selectedCardIndex + 1) % cards.length) {
                  zIndex = 20;
                  transform = 'translateX(55px) translateY(-25px) rotateY(-12deg) scale(0.92)';
                  opacity = 0.88;
                } else {
                  zIndex = 10;
                  transform = 'translateX(105px) translateY(-50px) rotateY(-20deg) scale(0.84)';
                  opacity = 0.72;
                }

                // Determine styling based on card tier
                const isTitanium = card.id === 'card-1' || card.name.includes('Titanium');
                const isPlatinum = card.id === 'card-2' || card.name.includes('Platinum');

                return (
                  <div
                    key={card.id}
                    onClick={() => setSelectedCardIndex(idx)}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '20px',
                      zIndex,
                      transform,
                      opacity,
                      transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      // Background treatment
                      background: isTitanium
                        ? 'linear-gradient(135deg, #18191D 0%, #0C0D11 50%, #15161A 100%)'
                        : isPlatinum
                        ? 'linear-gradient(135deg, #A8B2C1 0%, #E2E8F0 45%, #7F8C9D 100%)'
                        : 'linear-gradient(135deg, #022C43 0%, #051923 60%, #00121E 100%)',
                      border: isTitanium
                        ? '2px solid #FFB91F'
                        : isPlatinum
                        ? '2px solid #CBD5E1'
                        : '2px solid #38BDF8',
                      boxShadow: isSelected
                        ? isTitanium
                          ? '0 25px 50px rgba(0,0,0,0.8), 0 0 30px rgba(255, 185, 31, 0.3)'
                          : isPlatinum
                          ? '0 25px 50px rgba(0,0,0,0.8), 0 0 30px rgba(203, 213, 225, 0.3)'
                          : '0 25px 50px rgba(0,0,0,0.8), 0 0 35px rgba(56, 189, 248, 0.45)'
                        : '0 15px 30px rgba(0,0,0,0.5)',
                      padding: '22px 26px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      color: isPlatinum ? '#0F172A' : '#FFFFFF',
                    }}
                  >
                    {/* Metallic Grain Reflection */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(115deg, rgba(255, 255, 255, 0.12) 0%, transparent 40%, rgba(0, 0, 0, 0.25) 100%)',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Frozen Ice Overlay */}
                    {card.isFrozen && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(15, 23, 42, 0.82)',
                          backdropFilter: 'blur(4px)',
                          zIndex: 40,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                        }}
                      >
                        <Snowflake size={32} color="#38BDF8" className="animate-spin-slow" />
                        <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.1em', color: '#38BDF8' }}>
                          CARD FROZEN
                        </span>
                      </div>
                    )}

                    {/* Card Top Row: Brand & Tier Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            fontSize: '16px',
                            fontWeight: 900,
                            letterSpacing: '0.08em',
                            color: isTitanium ? '#FFB91F' : isPlatinum ? '#0F172A' : '#38BDF8',
                          }}
                        >
                          TRAVLS
                        </span>
                      </div>

                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: isPlatinum ? 'rgba(15, 23, 42, 0.1)' : 'rgba(255, 255, 255, 0.12)',
                          border: `1px solid ${isPlatinum ? 'rgba(15, 23, 42, 0.2)' : 'rgba(255, 255, 255, 0.2)'}`,
                        }}
                      >
                        {isTitanium ? 'TITANIUM LUXURY' : isPlatinum ? 'PLATINUM' : 'VIRTUAL CYBER'}
                      </span>
                    </div>

                    {/* EMV Chip Visual */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', zIndex: 2, marginTop: '8px' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '28px',
                          borderRadius: '6px',
                          background: isTitanium
                            ? 'linear-gradient(135deg, #FFE27D 0%, #D49E24 100%)'
                            : isPlatinum
                            ? 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)'
                            : 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
                          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.3)',
                        }}
                      />
                      <CreditCardIcon size={20} opacity={0.6} />
                    </div>

                    {/* Card Digits */}
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '16px',
                        letterSpacing: '0.14em',
                        fontWeight: 700,
                        zIndex: 2,
                        textShadow: isPlatinum ? 'none' : '0 2px 4px rgba(0,0,0,0.6)',
                      }}
                    >
                      {card.fullNumber}
                    </div>

                    {/* Card Bottom Row: Name, Expiry, VISA */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', zIndex: 2 }}>
                      <div>
                        <div style={{ fontSize: '9px', opacity: 0.7, textTransform: 'uppercase' }}>Cardholder</div>
                        <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em' }}>
                          {card.cardholderName.toUpperCase()}
                        </div>
                      </div>

                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '9px', opacity: 0.7, textTransform: 'uppercase' }}>Valid Thru</div>
                        <div style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                          {card.expMonth}/{card.expYear.slice(-2)}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span
                          style={{
                            fontSize: '16px',
                            fontWeight: 900,
                            fontStyle: 'italic',
                            letterSpacing: '0.04em',
                            color: isTitanium ? '#FFB91F' : isPlatinum ? '#0F172A' : '#FFFFFF',
                          }}
                        >
                          VISA
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= RIGHT COLUMN: INSTANT FREEZE & CASHBACK ================= */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Widget 3: Instant Freeze */}
            <div
              className="glass-card"
              style={{
                padding: '22px 24px',
                background: 'var(--surface-card)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                INSTANT FREEZE
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '14px',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: activeCard.isFrozen ? 'rgba(56, 189, 248, 0.15)' : 'var(--success-soft)',
                    color: activeCard.isFrozen ? '#38BDF8' : 'var(--success)',
                    border: `1px solid ${activeCard.isFrozen ? 'rgba(56, 189, 248, 0.4)' : 'var(--success-border)'}`,
                  }}
                >
                  {activeCard.isFrozen ? 'FROZEN' : 'ACTIVE'}
                </span>

                {/* Tactile Toggle Switch with Snowflake */}
                <button
                  onClick={handleFreezeToggle}
                  title="Toggle Instant Freeze"
                  style={{
                    width: '64px',
                    height: '34px',
                    borderRadius: '999px',
                    background: activeCard.isFrozen
                      ? 'linear-gradient(90deg, #0284C7 0%, #38BDF8 100%)'
                      : 'var(--surface-interactive)',
                    border: '1px solid var(--border-default)',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    boxShadow: activeCard.isFrozen ? '0 0 16px rgba(56, 189, 248, 0.4)' : 'none',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '3px',
                      left: activeCard.isFrozen ? '33px' : '4px',
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: activeCard.isFrozen ? '#0284C7' : '#64748B',
                      transition: 'left var(--transition-fast)',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                    }}
                  >
                    {activeCard.isFrozen ? <Snowflake size={14} /> : <Lock size={13} />}
                  </div>
                </button>
              </div>

              <div style={{ marginTop: '10px', fontSize: '11px', color: 'var(--text-muted)' }}>
                {activeCard.isFrozen
                  ? 'Authorizations instantly blocked worldwide.'
                  : 'Tap switch to lock card in under 100ms.'}
              </div>
            </div>

            {/* Widget 4: Cash Back Breakdown */}
            <div
              className="glass-card"
              style={{
                padding: '22px 24px',
                background: 'var(--surface-card)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                  CASH BACK BREAKDOWN
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: 'var(--brand-primary)',
                    background: 'var(--brand-soft)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--brand-border)',
                  }}
                >
                  3.5%
                </span>
              </div>

              <div style={{ marginTop: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                Total Earned:{' '}
                <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                  $482.10
                </span>
              </div>

              {/* Category Breakdown Table */}
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Travel & Flights</span>
                  <span style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>5%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Dining & Hospitality</span>
                  <span style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>3%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Universal Spend</span>
                  <span style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>1.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Theatrical Stage Card Selector Bar */}
        <div
          style={{
            marginTop: '32px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          {cards.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => setSelectedCardIndex(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                background: idx === selectedCardIndex ? 'var(--brand-primary)' : 'var(--surface-subtle)',
                color: idx === selectedCardIndex ? '#070A0F' : 'var(--text-secondary)',
                border: `1px solid ${idx === selectedCardIndex ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
            >
              <span>{card.name}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', opacity: 0.8 }}>•••• {card.last4}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Lower Section: Live Controls & Recent Card Spend Activity */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Security Hardware Diagnostics */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Shield size={18} color="var(--brand-primary)" />
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Hardware Isolation & Safe Protocol
            </h3>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
            Protected by Thales PayShield HSM hardware security modules. Your physical card chip and digital virtual
            tokens never share cryptographic key material.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <CheckCircle2 size={14} color="var(--success)" />
              <span>Zero Foreign Exchange Markup (Interbank Wholesale Rate)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <CheckCircle2 size={14} color="var(--success)" />
              <span>Complimentary Priority Pass Worldwide Lounge Membership</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <CheckCircle2 size={14} color="var(--success)" />
              <span>Instant Cash Settlement in USDT, USDC, or Bitcoin</span>
            </div>
          </div>
        </div>

        {/* Card Specific Recent Transactions */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} color="var(--brand-primary)" />
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Recent Card Transactions
              </h3>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>•••• {activeCard.last4}</span>
          </div>

          {cardTransactions.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
              No transactions recorded for this card yet.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {cardTransactions.slice(0, 4).map((tx) => (
                <div
                  key={tx.id}
                  onClick={() => onOpenTransactionReceipt(tx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--surface-subtle)',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-default)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {tx.merchantOrParty}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {tx.category} • {tx.date}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                      -${tx.amount.toFixed(2)}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--success)' }}>
                      +${(tx.amount * 0.035).toFixed(2)} back
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
