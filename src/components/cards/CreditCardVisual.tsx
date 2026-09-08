import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Copy, Check, Wifi } from 'lucide-react';
import type { CardItem } from '../../types';

interface CreditCardVisualProps {
  card: CardItem;
  onToggleFreeze?: (cardId: string) => void;
  onCopyNumber: (num: string) => void;
}

export const CreditCardVisual: React.FC<CreditCardVisualProps> = ({
  card,
  onToggleFreeze,
  onCopyNumber,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFullNumber, setShowFullNumber] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / rect.height) * 12,
      y: (x / rect.width) * 12,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(card.fullNumber.replace(/\s+/g, ''));
    setCopied(true);
    onCopyNumber(card.fullNumber);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ perspective: '1200px', width: '100%', maxWidth: '420px', margin: '0 auto' }}>
      {/* 3D Wrapper */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          width: '100%',
          aspectRatio: '1.586 / 1',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + (isFlipped ? 180 : 0)}deg)`,
          cursor: 'pointer',
          borderRadius: 'var(--radius-xl)',
          boxShadow: card.isFrozen
            ? '0 16px 36px rgba(0, 0, 0, 0.4)'
            : '0 20px 48px rgba(0, 0, 0, 0.6), 0 0 24px rgba(255, 185, 31, 0.12)',
        }}
      >
        {/* ==================== FRONT FACE ==================== */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            borderRadius: 'var(--radius-xl)',
            background: card.gradientTheme,
            border: `1px solid ${card.isFrozen ? 'rgba(56, 189, 248, 0.3)' : 'rgba(255, 255, 255, 0.18)'}`,
            padding: '24px 28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
            color: '#FFFFFF',
          }}
        >
          {/* Subtle Metallic Grain Sheen */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(115deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 40%, rgba(0, 0, 0, 0.2) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Frozen Frosting Overlay */}
          {card.isFrozen && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(3px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                zIndex: 20,
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'rgba(56, 189, 248, 0.2)',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#38BDF8',
                }}
              >
                <Lock size={20} />
              </div>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: '#38BDF8',
                  textTransform: 'uppercase',
                }}
              >
                Card Frozen
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFreeze?.(card.id);
                }}
                style={{
                  fontSize: '11px',
                  color: '#38BDF8',
                  background: 'rgba(56, 189, 248, 0.15)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Tap to Unfreeze
              </button>
            </div>
          )}

          {/* Card Top Row: TRAVLS Logo & Contactless Symbol */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img
                src="/travls-logo.png"
                alt="TRAVLS"
                style={{
                  height: '24px',
                  filter: 'brightness(1.1)',
                }}
              />
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  color: card.accentColor,
                  textTransform: 'uppercase',
                }}
              >
                {card.name.replace('TRAVLS ', '')}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Wifi size={18} style={{ transform: 'rotate(90deg)', opacity: 0.8 }} />
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '2px 7px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  letterSpacing: '0.06em',
                }}
              >
                {card.type === 'virtual_instant' ? 'VIRTUAL' : 'METAL'}
              </span>
            </div>
          </div>

          {/* EMV Microchip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              position: 'relative',
              zIndex: 2,
              margin: '8px 0',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '32px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #FFDF78 0%, #D4AF37 50%, #AA820A 100%)',
                boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(170, 130, 10, 0.8)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Chip Circuit Lines */}
              <div
                style={{
                  position: 'absolute',
                  inset: '5px',
                  border: '1px solid rgba(0, 0, 0, 0.25)',
                  borderRadius: '3px',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'rgba(0, 0, 0, 0.25)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  bottom: 0,
                  width: '1px',
                  background: 'rgba(0, 0, 0, 0.25)',
                }}
              />
            </div>
          </div>

          {/* Card Number */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '18px',
                letterSpacing: '0.18em',
                color: '#FFFFFF',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>
                {showFullNumber ? card.fullNumber : `•••• •••• •••• ${card.last4}`}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowFullNumber(!showFullNumber);
                  }}
                  title={showFullNumber ? 'Hide card digits' : 'Reveal card digits'}
                  aria-label="Toggle card number visibility"
                  style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {showFullNumber ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  title="Copy full card number"
                  aria-label="Copy card number"
                  style={{
                    color: copied ? 'var(--brand-primary)' : 'rgba(255, 255, 255, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Card Bottom Row: Cardholder Name, Expiry, Network Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '9px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: 'rgba(255, 255, 255, 0.5)',
                  textTransform: 'uppercase',
                }}
              >
                Cardholder
              </div>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  marginTop: '2px',
                }}
              >
                {card.cardholderName}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: '9px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: 'rgba(255, 255, 255, 0.5)',
                  textTransform: 'uppercase',
                  textAlign: 'right',
                }}
              >
                Expires
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginTop: '2px',
                }}
              >
                {card.expMonth}/{card.expYear}
              </div>
            </div>

            {/* Network Brand Hologram */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {card.network === 'Mastercard' ? (
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: '#EB001B',
                      opacity: 0.9,
                    }}
                  />
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: '#F79E1B',
                      marginLeft: '-12px',
                      opacity: 0.9,
                    }}
                  />
                </div>
              ) : (
                <span
                  style={{
                    fontFamily: 'var(--font-brand)',
                    fontSize: '18px',
                    fontWeight: 900,
                    fontStyle: 'italic',
                    letterSpacing: '0.04em',
                    color: '#FFFFFF',
                  }}
                >
                  VISA
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ==================== BACK FACE ==================== */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            borderRadius: 'var(--radius-xl)',
            background: card.gradientTheme,
            border: '1px solid rgba(255, 255, 255, 0.18)',
            transform: 'rotateY(180deg)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
            color: '#FFFFFF',
          }}
        >
          {/* Black Magnetic Stripe */}
          <div
            style={{
              width: '100%',
              height: '42px',
              background: '#0B0F17',
              marginTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          />

          {/* Signature Panel & CVV */}
          <div style={{ padding: '0 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  flex: 1,
                  height: '32px',
                  background: 'repeating-linear-gradient(45deg, #E2E8F0, #E2E8F0 6px, #CBD5E1 6px, #CBD5E1 12px)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: '10px',
                  color: '#0B0F17',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 600,
                }}
              >
                AUTHORIZED SIGNATURE
              </div>

              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '4px',
                  padding: '4px 10px',
                  color: '#0B0F17',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  fontWeight: 800,
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
                }}
              >
                {showFullNumber ? card.cvv : '•••'}
              </div>
            </div>
            <div
              style={{
                fontSize: '10px',
                color: 'rgba(255, 255, 255, 0.5)',
                marginTop: '4px',
                textAlign: 'right',
              }}
            >
              CVV / CVC
            </div>
          </div>

          {/* Back Legal Fine Print */}
          <div style={{ padding: '0 28px 20px 28px' }}>
            <p style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.45)', lineHeight: 1.3 }}>
              Issued by TRAVLS Financial Partners under license from {card.network} International.
              For 24/7 VIP concierge and emergency card replacement, contact concierge@travls.io.
            </p>
          </div>
        </div>
      </div>

      {/* Flip Prompt Helper */}
      <div
        style={{
          textAlign: 'center',
          marginTop: '12px',
          fontSize: '12px',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
        }}
      >
        <span>Click card to {isFlipped ? 'view front' : 'flip and view CVV'}</span>
      </div>
    </div>
  );
};
