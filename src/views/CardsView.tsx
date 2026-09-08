import React, { useState, useEffect } from 'react';
import {
  Plus,
  Lock,
  Shield,
  CheckCircle2,
  Eye,
  EyeOff,
  Snowflake,
  Smartphone,
  CreditCard as CreditCardIcon,
  Sliders,
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

  // 30-second security burn timer for CVV
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
    setSpendingLimit(Number(e.target.value));
  };

  const handleFreezeToggle = () => {
    onToggleFreeze(activeCard.id);
    onNotify(
      activeCard.isFrozen ? 'Card Unfrozen' : 'Card Locked & Frozen',
      `Card •••• ${activeCard.last4} is ${activeCard.isFrozen ? 'unlocked and authorized for immediate spends.' : 'frozen. Merchant authorizations blocked.'}`,
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
      x: -(y / rect.height) * 8,
      y: (x / rect.width) * 8,
    });
  };

  const handleMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
  };

  const cardTransactions = transactions.filter(
    (tx) => tx.cardLast4 === activeCard?.last4
  );

  const sliderPercent = ((spendingLimit - 1000) / (30000 - 1000)) * 100;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* 1. Header Bar */}
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
            Card Portfolio & Controls
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Manage physical brushed metal cards, virtual cards, spending limits, and security tokens.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={handleAddToAppleWallet}
            className="btn-glass"
            style={{ fontSize: '13px', padding: '9px 16px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Smartphone size={15} />
            <span>Apple Wallet</span>
          </button>

          <button
            onClick={onOpenIssueModal}
            className="btn-gold"
            style={{ fontSize: '13px', padding: '9px 18px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Plus size={15} />
            <span>Issue New Card</span>
          </button>
        </div>
      </div>

      {/* 2. THE 3D CARD SHOWCASE HERO STAGE */}
      <div
        className="glass-card"
        style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          padding: '36px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 3D Cascade Container */}
        <div
          style={{
            position: 'relative',
            perspective: '1200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 0',
            width: '100%',
            maxWidth: '520px',
            minHeight: '260px',
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            style={{
              position: 'relative',
              width: '380px',
              height: '240px',
              transformStyle: 'preserve-3d',
              transform: `rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
              transition: 'transform 0.25s ease',
            }}
          >
            {cards.map((card, idx) => {
              const isSelected = idx === selectedCardIndex;
              let zIndex = 20;
              let transform = '';
              let opacity = 1;

              if (isSelected) {
                zIndex = 30;
                transform = 'translateZ(30px) scale(1.02)';
              } else if (idx === (selectedCardIndex + 1) % cards.length) {
                zIndex = 20;
                transform = 'translateX(45px) translateY(-20px) rotateY(-10deg) scale(0.92)';
                opacity = 0.85;
              } else {
                zIndex = 10;
                transform = 'translateX(90px) translateY(-40px) rotateY(-18deg) scale(0.85)';
                opacity = 0.7;
              }

              const isTitanium = card.id === 'card-1' || card.name.includes('Titanium');
              const isPlatinum = card.id === 'card-2' || card.name.includes('Platinum');

              return (
                <div
                  key={card.id}
                  onClick={() => setSelectedCardIndex(idx)}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '18px',
                    zIndex,
                    transform,
                    opacity,
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    cursor: 'pointer',
                    overflow: 'hidden',
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
                      ? '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 185, 31, 0.2)'
                      : '0 10px 20px rgba(0, 0, 0, 0.4)',
                    padding: '22px 26px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    color: isPlatinum ? '#0F172A' : '#FFFFFF',
                  }}
                >
                  {/* Subtle Metallic Sheen */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(115deg, rgba(255, 255, 255, 0.1) 0%, transparent 40%, rgba(0, 0, 0, 0.2) 100%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Frozen Overlay */}
                  {card.isFrozen && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(15, 23, 42, 0.85)',
                        backdropFilter: 'blur(3px)',
                        zIndex: 40,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                      }}
                    >
                      <Snowflake size={30} color="#38BDF8" />
                      <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', color: '#38BDF8' }}>
                        CARD FROZEN
                      </span>
                    </div>
                  )}

                  {/* Top Row: Brand & Tier */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
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

                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: isPlatinum ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.12)',
                      }}
                    >
                      {isTitanium ? 'TITANIUM' : isPlatinum ? 'PLATINUM' : 'VIRTUAL'}
                    </span>
                  </div>

                  {/* Chip Visual */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 2 }}>
                    <div
                      style={{
                        width: '36px',
                        height: '26px',
                        borderRadius: '4px',
                        background: isTitanium
                          ? 'linear-gradient(135deg, #FFE27D 0%, #D49E24 100%)'
                          : isPlatinum
                          ? 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)'
                          : 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
                      }}
                    />
                    <CreditCardIcon size={18} opacity={0.6} />
                  </div>

                  {/* Card Digits */}
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '16px',
                      letterSpacing: '0.12em',
                      fontWeight: 700,
                      zIndex: 2,
                    }}
                  >
                    {card.fullNumber}
                  </div>

                  {/* Bottom Row */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', zIndex: 2 }}>
                    <div>
                      <div style={{ fontSize: '8px', opacity: 0.7, textTransform: 'uppercase' }}>Cardholder</div>
                      <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.02em' }}>
                        {card.cardholderName.toUpperCase()}
                      </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '8px', opacity: 0.7, textTransform: 'uppercase' }}>Expires</div>
                      <div style={{ fontSize: '11px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                        {card.expMonth}/{card.expYear.slice(-2)}
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: 900,
                        fontStyle: 'italic',
                        color: isTitanium ? '#FFB91F' : isPlatinum ? '#0F172A' : '#FFFFFF',
                      }}
                    >
                      VISA
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card Selector Pills */}
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
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
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                background: idx === selectedCardIndex ? 'var(--brand-primary)' : 'var(--surface-subtle)',
                color: idx === selectedCardIndex ? '#070A0F' : 'var(--text-secondary)',
                border: `1px solid ${idx === selectedCardIndex ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                fontWeight: 600,
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
            >
              <span>{card.name}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', opacity: 0.75 }}>•••• {card.last4}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Executive Card Controls & Benefits (2-Column Grid) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Left Column: Limits & Instant Security Controls */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={18} color="var(--brand-primary)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Card Limits & Instant Security
            </h3>
          </div>

          {/* Spending Limit Slider */}
          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--surface-subtle)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Monthly Spending Limit
              </span>
              <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)' }}>
                ${spendingLimit.toLocaleString()}
              </span>
            </div>

            <input
              type="range"
              min="1000"
              max="30000"
              step="500"
              value={spendingLimit}
              onChange={handleLimitChange}
              style={{
                width: '100%',
                background: `linear-gradient(to right, var(--brand-primary) 0%, var(--brand-primary) ${sliderPercent}%, var(--surface-interactive) ${sliderPercent}%, var(--surface-interactive) 100%)`,
                height: '6px',
                borderRadius: '999px',
                cursor: 'pointer',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
              <span>$1,000</span>
              <span>$30,000</span>
            </div>
          </div>

          {/* Instant Freeze & CVV Reveal Controls */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {/* Instant Freeze */}
            <div
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--surface-subtle)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Instant Freeze</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {activeCard.isFrozen ? 'Authorizations blocked' : 'Card is active'}
                </div>
              </div>

              <button
                onClick={handleFreezeToggle}
                style={{
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: activeCard.isFrozen ? 'rgba(56, 189, 248, 0.15)' : 'var(--surface-interactive)',
                  border: `1px solid ${activeCard.isFrozen ? '#38BDF8' : 'var(--border-default)'}`,
                  color: activeCard.isFrozen ? '#38BDF8' : 'var(--text-primary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                {activeCard.isFrozen ? <Snowflake size={14} /> : <Lock size={14} />}
                <span>{activeCard.isFrozen ? 'Unfreeze Card' : 'Freeze Card'}</span>
              </button>
            </div>

            {/* Dynamic CVV Reveal */}
            <div
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--surface-subtle)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Security CVV</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {cvvRevealed ? `Expires in ${cvvTimer}s` : 'Masked token'}
                </div>
              </div>

              <button
                onClick={handleRevealCvv}
                style={{
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: cvvRevealed ? 'var(--brand-soft)' : 'var(--surface-interactive)',
                  border: `1px solid ${cvvRevealed ? 'var(--brand-primary)' : 'var(--border-default)'}`,
                  color: cvvRevealed ? 'var(--brand-primary)' : 'var(--text-primary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                {cvvRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>{cvvRevealed ? `CVV: ${activeCard.cvv}` : 'Reveal CVV'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Cashback Breakdown & Card Activity */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={18} color="var(--brand-primary)" />
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Cashback & Tier Benefits
              </h3>
            </div>
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
              3.5% Overall
            </span>
          </div>

          {/* Benefits List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--surface-subtle)',
                fontSize: '13px',
              }}
            >
              <span style={{ color: 'var(--text-secondary)' }}>Flights & Luxury Travel</span>
              <span style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>5.0% Back</span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--surface-subtle)',
                fontSize: '13px',
              }}
            >
              <span style={{ color: 'var(--text-secondary)' }}>Fine Dining & Private Clubs</span>
              <span style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>3.0% Back</span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--surface-subtle)',
                fontSize: '13px',
              }}
            >
              <span style={{ color: 'var(--text-secondary)' }}>All Other Universal Spend</span>
              <span style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>1.5% Back</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={14} color="var(--success)" />
              <span>Zero Foreign Exchange markup on international transactions</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={14} color="var(--success)" />
              <span>Priority Pass VIP airport lounge access worldwide</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Recent Transactions for Active Card */}
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
              Recent Authorizations for •••• {activeCard.last4}
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Transactions billed to this specific card
            </p>
          </div>
        </div>

        {cardTransactions.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
            No recent transactions recorded for this card.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {cardTransactions.slice(0, 4).map((tx) => (
              <div
                key={tx.id}
                onClick={() => onOpenTransactionReceipt(tx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
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
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {tx.merchantOrParty}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {tx.category} • {tx.date}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
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
  );
};
