import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import type { VerificationTier } from '../types';

interface VerificationViewProps {
  tiers: VerificationTier[];
  onNotify: (title: string, desc?: string, type?: 'success' | 'error' | 'info') => void;
}

export const VerificationView: React.FC<VerificationViewProps> = ({
  tiers,
  onNotify,
}) => {

  const handleStartVerification = (level: number) => {
    onNotify(
      'Document Submission Portal Opened',
      `Secure identity upload session initialized for Level ${level}.`,
      'info'
    );
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Header & Verification Status Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #131B2B 0%, #0F1622 60%, #0A0F17 100%)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          padding: '28px 32px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--brand-primary)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: 'var(--brand-soft)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--brand-border)',
              }}
            >
              BANKING COMPLIANCE & KYC
            </span>
            <span
              style={{
                fontSize: '11px',
                color: 'var(--success)',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <CheckCircle2 size={13} />
              Tier 2 Active
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Identity Verification & Limits
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Your account is verified for high-volume transactions, metal titanium card issuance, and global fiat rails.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => handleStartVerification(3)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--brand-primary)',
              color: '#0B0F17',
              fontWeight: 700,
              fontSize: '14px',
              boxShadow: '0 4px 14px rgba(255, 185, 31, 0.28)',
            }}
          >
            <Sparkles size={16} />
            <span>Apply for Tier 3 Institutional</span>
          </button>
        </div>
      </div>

      {/* 2. Tier Progression Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
        }}
      >
        {tiers.map((tier) => {
          const isVerified = tier.status === 'verified';
          const isCurrent = tier.status === 'current';
          return (
            <div
              key={tier.id}
              style={{
                background: 'var(--surface-card)',
                border: `1px solid ${isVerified ? 'var(--brand-border)' : 'var(--border-default)'}`,
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: isVerified ? '0 4px 20px rgba(255, 185, 31, 0.08)' : 'none',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: isVerified ? 'var(--brand-primary)' : 'var(--text-muted)',
                      textTransform: 'uppercase',
                    }}
                  >
                    LEVEL {tier.level}
                  </span>

                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      background: isVerified
                        ? 'var(--success-soft)'
                        : isCurrent
                        ? 'var(--brand-soft)'
                        : 'var(--surface-subtle)',
                      color: isVerified
                        ? 'var(--success)'
                        : isCurrent
                        ? 'var(--brand-primary)'
                        : 'var(--text-muted)',
                      border: isVerified ? '1px solid var(--success-border)' : 'none',
                    }}
                  >
                    {tier.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {tier.name}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.4 }}>
                  {tier.description}
                </p>

                {/* Limits */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--surface-subtle)',
                    margin: '16px 0',
                    fontSize: '12px',
                  }}
                >
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Daily Cap:</span>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                      {tier.dailyLimit}
                    </div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Monthly Cap:</span>
                    <div style={{ fontWeight: 700, color: 'var(--brand-primary)', marginTop: '2px' }}>
                      {tier.monthlyLimit}
                    </div>
                  </div>
                </div>

                {/* Requirements Checklist */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    Verification Checklist
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {tier.requirements.map((req, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '12px',
                          color: req.completed ? 'var(--text-primary)' : 'var(--text-muted)',
                        }}
                      >
                        {req.completed ? (
                          <CheckCircle2 size={14} color="var(--success)" />
                        ) : (
                          <span
                            style={{
                              width: '14px',
                              height: '14px',
                              borderRadius: '50%',
                              border: '1px solid var(--border-strong)',
                              display: 'inline-block',
                            }}
                          />
                        )}
                        <span>{req.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Perks unlocked */}
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand-primary)', marginBottom: '8px' }}>
                    Privileges & Capabilities
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {tier.perks.map((perk, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '12px',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        <Zap size={12} color="var(--brand-primary)" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                {isVerified ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      color: 'var(--success)',
                      fontSize: '13px',
                      fontWeight: 600,
                      padding: '10px',
                      background: 'var(--success-soft)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    <CheckCircle2 size={16} />
                    <span>Active & Approved</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleStartVerification(tier.level)}
                    style={{
                      width: '100%',
                      padding: '11px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--surface-interactive)',
                      border: '1px solid var(--border-default)',
                      color: 'var(--text-primary)',
                      fontWeight: 600,
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>Upgrade to Tier {tier.level}</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Regulatory Security & Privacy Standards Strip */}
      <div
        style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px 28px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <ShieldCheck size={20} color="var(--brand-primary)" />
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Your Data is Safe, Segregated & Encrypted
          </h3>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: '800px', marginBottom: '20px' }}>
          All customer identity submissions are encrypted end-to-end with 256-bit AES cryptographic keys in transit and at rest.
          TRAVLS does not store plain text government identification documents on public servers.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
          }}
        >
          <div
            style={{
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--surface-subtle)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '14px' }}>
              ✓ 256-Bit TLS & AES
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Military-grade cryptographic encryption in flight and resting vaults.
            </div>
          </div>

          <div
            style={{
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--surface-subtle)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '14px' }}>
              ✓ GDPR Compliant
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Full European Union data sovereignty, privacy rights, and right to be forgotten.
            </div>
          </div>

          <div
            style={{
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--surface-subtle)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '14px' }}>
              ✓ ISO 27001 Certified
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Audited information security management system and operational rigor.
            </div>
          </div>

          <div
            style={{
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--surface-subtle)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '14px' }}>
              ✓ PCI-DSS Level 1
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Highest international standard for payment card industry data security.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
