import React, { useState } from 'react';
import {
  User,
  Shield,
  Save,
} from 'lucide-react';

interface SettingsViewProps {
  onNotify: (title: string, desc?: string, type?: 'success' | 'error' | 'info') => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onNotify }) => {
  const [name, setName] = useState('Adarsh Singh Gaur');
  const [email, setEmail] = useState('adarsh@travls.io');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [twoFactor, setTwoFactor] = useState(true);
  const [biometrics, setBiometrics] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onNotify('Profile Settings Saved', 'Your legal contact information has been updated.', 'success');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>
          Security & Preferences
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Manage your identity credentials, multi-factor hardware keys, and notification triggers.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Profile Details */}
        <div
          style={{
            background: 'var(--surface-card)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <User size={20} color="var(--brand-primary)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Legal Profile
            </h3>
          </div>

          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Full Legal Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Registered Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Phone Number (OTP Verification)
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: '10px',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--brand-primary)',
                color: '#0B0F17',
                fontWeight: 700,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <Save size={16} />
              <span>Save Changes</span>
            </button>
          </form>
        </div>

        {/* Security & Authentication */}
        <div
          style={{
            background: 'var(--surface-card)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Shield size={20} color="var(--brand-primary)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Authentication & Keys
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* 2FA Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Two-Factor Authentication (TOTP)
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Google Authenticator or YubiKey required for transfers
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setTwoFactor(!twoFactor);
                  onNotify(twoFactor ? '2FA Disabled' : '2FA Enabled', 'Security layer updated.', 'info');
                }}
                style={{
                  width: '44px',
                  height: '24px',
                  borderRadius: 'var(--radius-full)',
                  background: twoFactor ? 'var(--brand-primary)' : 'var(--surface-interactive)',
                  position: 'relative',
                  transition: 'background var(--transition-fast)',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: twoFactor ? '22px' : '2px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#0B0F17',
                    transition: 'left var(--transition-fast)',
                  }}
                />
              </button>
            </div>

            {/* Passkeys */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Biometric Passkeys (TouchID / Windows Hello)
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Sign in instantly without passwords
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setBiometrics(!biometrics);
                  onNotify(biometrics ? 'Passkeys Disabled' : 'Passkeys Enabled', 'Biometrics updated.', 'info');
                }}
                style={{
                  width: '44px',
                  height: '24px',
                  borderRadius: 'var(--radius-full)',
                  background: biometrics ? 'var(--brand-primary)' : 'var(--surface-interactive)',
                  position: 'relative',
                  transition: 'background var(--transition-fast)',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: biometrics ? '22px' : '2px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#0B0F17',
                    transition: 'left var(--transition-fast)',
                  }}
                />
              </button>
            </div>

            {/* Notifications */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', marginTop: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                Alert Preferences
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={smsAlerts}
                    onChange={(e) => setSmsAlerts(e.target.checked)}
                    style={{ accentColor: 'var(--brand-primary)', width: '16px', height: '16px' }}
                  />
                  <span>Real-time SMS alerts on card purchases over $100</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={pushAlerts}
                    onChange={(e) => setPushAlerts(e.target.checked)}
                    style={{ accentColor: 'var(--brand-primary)', width: '16px', height: '16px' }}
                  />
                  <span>Instant push notifications on crypto vault deposit confirmations</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
