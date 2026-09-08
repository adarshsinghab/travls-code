import React, { useState } from 'react';
import { X, Check, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import type { CardItem, CardType } from '../../types';

interface IssueCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onIssueCard: (newCard: CardItem) => void;
}

export const IssueCardModal: React.FC<IssueCardModalProps> = ({
  isOpen,
  onClose,
  onIssueCard,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedType, setSelectedType] = useState<CardType>('metal_elite');
  const [cardholderName, setCardholderName] = useState('ADARSH SINGH GAUR');
  const [network, setNetwork] = useState<'Mastercard' | 'Visa'>('Mastercard');
  const [pin, setPin] = useState('4829');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const cardPrograms = [
    {
      type: 'metal_elite' as CardType,
      title: 'TRAVLS Black Elite Metal',
      badge: 'Most Popular for High Rollers',
      material: '18g Brushed Obsidian Titanium',
      cashback: '3.5% Crypto Cashback',
      dailyLimit: 25000,
      issuanceFee: '$0 (Waived for Tier 2 KYC)',
      gradient: 'linear-gradient(135deg, #11141B 0%, #1A2234 50%, #0C101A 100%)',
    },
    {
      type: 'platinum_travel' as CardType,
      title: 'TRAVLS Platinum Travel Card',
      badge: 'Zero FX Foreign Exchange',
      material: 'Satin Silver Steel',
      cashback: '2.0% Hotel & Flight Rewards',
      dailyLimit: 15000,
      issuanceFee: '$0 Free',
      gradient: 'linear-gradient(135deg, #2A364E 0%, #1E293B 60%, #0F172A 100%)',
    },
    {
      type: 'virtual_instant' as CardType,
      title: 'TRAVLS Virtual Instant Card',
      badge: 'Ready in 10 Seconds',
      material: 'Digital Tokenized Mastercard',
      cashback: '1.5% Web Cashback',
      dailyLimit: 5000,
      issuanceFee: '$0 Free',
      gradient: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
    },
  ];

  const handleFinishIssuance = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const randomLast4 = Math.floor(1000 + Math.random() * 9000).toString();
      const newCard: CardItem = {
        id: `card-${Date.now()}`,
        name: selectedType === 'metal_elite'
          ? 'TRAVLS Black Elite Metal'
          : selectedType === 'platinum_travel'
          ? 'TRAVLS Platinum Travel Card'
          : 'TRAVLS Virtual Instant Card',
        cardholderName: cardholderName.toUpperCase().trim() || 'ADARSH SINGH GAUR',
        type: selectedType,
        network,
        last4: randomLast4,
        fullNumber: `5412 8820 ${Math.floor(1000 + Math.random() * 9000)} ${randomLast4}`,
        expMonth: '09',
        expYear: '31',
        cvv: Math.floor(100 + Math.random() * 900).toString(),
        isFrozen: false,
        status: 'active',
        dailyLimit: selectedType === 'metal_elite' ? 25000 : selectedType === 'platinum_travel' ? 15000 : 5000,
        dailySpent: 0,
        monthlyLimit: selectedType === 'metal_elite' ? 100000 : selectedType === 'platinum_travel' ? 50000 : 20000,
        monthlySpent: 0,
        cashbackRate: selectedType === 'metal_elite' ? '3.5% Crypto Cashback' : '2.0% Travel Rewards',
        material: selectedType === 'virtual_instant' ? 'Digital Token' : 'Physical Metal',
        gradientTheme:
          selectedType === 'metal_elite'
            ? 'linear-gradient(135deg, #11141B 0%, #1A2234 50%, #0C101A 100%)'
            : selectedType === 'platinum_travel'
            ? 'linear-gradient(135deg, #2A364E 0%, #1E293B 60%, #0F172A 100%)'
            : 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
        accentColor: selectedType === 'metal_elite' ? '#FFB91F' : '#E2E8F0',
        onlineEnabled: true,
        contactlessEnabled: true,
        atmEnabled: selectedType !== 'virtual_instant',
        internationalEnabled: true,
      };

      onIssueCard(newCard);
      setIsSubmitting(false);
      onClose();
    }, 900);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(9, 13, 20, 0.85)',
          backdropFilter: 'blur(5px)',
        }}
      />

      {/* Modal Card */}
      <div
        className="animate-fade-in"
        style={{
          position: 'relative',
          width: '560px',
          maxWidth: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          padding: '28px',
          boxShadow: 'var(--shadow-elevated)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '16px',
          }}
        >
          <div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--brand-primary)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Step {step} of 3
            </span>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
              {step === 1 && 'Select Your Card Program'}
              {step === 2 && 'Personalize Your Card'}
              {step === 3 && 'Confirm & Instant Issue'}
            </h2>
          </div>

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

        {/* STEP 1: Program Selection */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {cardPrograms.map((program) => {
              const isSelected = selectedType === program.type;
              return (
                <div
                  key={program.type}
                  onClick={() => setSelectedType(program.type)}
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? 'var(--surface-interactive)' : 'var(--surface-subtle)',
                    border: `2px solid ${isSelected ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {program.title}
                      </span>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: 'var(--radius-full)',
                          background: 'var(--brand-soft)',
                          color: 'var(--brand-primary)',
                        }}
                      >
                        {program.badge}
                      </span>
                    </div>

                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      {program.material} • Daily limit: ${program.dailyLimit.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--success)', marginTop: '2px', fontWeight: 600 }}>
                      ✓ {program.cashback}
                    </div>
                  </div>

                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      border: `2px solid ${isSelected ? 'var(--brand-primary)' : 'var(--border-default)'}`,
                      background: isSelected ? 'var(--brand-primary)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#0B0F17',
                    }}
                  >
                    {isSelected && <Check size={14} strokeWidth={3} />}
                  </div>
                </div>
              );
            })}

            <button
              onClick={() => setStep(2)}
              style={{
                marginTop: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px',
                background: 'var(--brand-primary)',
                color: '#0B0F17',
                fontWeight: 700,
                fontSize: '14px',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <span>Continue to Personalization</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 2: Customization */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: '6px',
                }}
              >
                Cardholder Name (Laser Engraved)
              </label>
              <input
                type="text"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value.toUpperCase())}
                style={{ width: '100%', textTransform: 'uppercase' }}
                placeholder="YOUR LEGAL NAME"
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: '6px',
                }}
              >
                Card Payment Network
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {(['Mastercard', 'Visa'] as const).map((net) => (
                  <button
                    key={net}
                    type="button"
                    onClick={() => setNetwork(net)}
                    style={{
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      background: network === net ? 'var(--surface-interactive)' : 'var(--surface-subtle)',
                      border: `1px solid ${network === net ? 'var(--brand-primary)' : 'var(--border-default)'}`,
                      color: network === net ? 'var(--brand-primary)' : 'var(--text-primary)',
                      fontWeight: 700,
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <span>{net}</span>
                    {network === net && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: '6px',
                }}
              >
                Set 4-Digit Security PIN
              </label>
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                style={{ width: '100%', fontFamily: 'var(--font-mono)', letterSpacing: '0.3em', fontSize: '18px' }}
                placeholder="••••"
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button
                type="button"
                onClick={() => setStep(1)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'var(--surface-subtle)',
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-md)',
                }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                style={{
                  flex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                  background: 'var(--brand-primary)',
                  color: '#0B0F17',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <span>Review Card Details</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Summary & Confirmation */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--surface-subtle)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Program</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '13px' }}>
                  {cardPrograms.find((p) => p.type === selectedType)?.title}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Cardholder Name</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '13px' }}>
                  {cardholderName}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Network</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '13px' }}>
                  {network}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Issuance Fee</span>
                <span style={{ fontWeight: 700, color: 'var(--success)', fontSize: '13px' }}>
                  $0.00 (Waived)
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Monthly Maintenance</span>
                <span style={{ fontWeight: 700, color: 'var(--success)', fontSize: '13px' }}>
                  $0.00 Free
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--brand-soft)',
                border: '1px solid var(--brand-border)',
                color: 'var(--text-primary)',
                fontSize: '12px',
              }}
            >
              <ShieldCheck size={16} color="var(--brand-primary)" />
              <span>Instant virtual issuance upon clicking confirm. Physical card dispatched within 24h.</span>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={isSubmitting}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'var(--surface-subtle)',
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-md)',
                }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleFinishIssuance}
                disabled={isSubmitting}
                style={{
                  flex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                  background: 'var(--brand-primary)',
                  color: '#0B0F17',
                  fontWeight: 700,
                  fontSize: '14px',
                  borderRadius: 'var(--radius-md)',
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting ? (
                  <span>Generating Secure Keys...</span>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Issue Card Now</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
