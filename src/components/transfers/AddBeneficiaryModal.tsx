import React, { useState } from 'react';
import { X, UserCheck, ShieldCheck } from 'lucide-react';
import type { Beneficiary } from '../../types';

interface AddBeneficiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBeneficiary: (ben: Beneficiary) => void;
}

export const AddBeneficiaryModal: React.FC<AddBeneficiaryModalProps> = ({
  isOpen,
  onClose,
  onAddBeneficiary,
}) => {
  const [country, setCountry] = useState<'India' | 'Nigeria'>('India');
  const [name, setName] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [codeValue, setCodeValue] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !bankName.trim() || !accountNumber.trim() || !codeValue.trim()) {
      setError('Please fill in all beneficiary details.');
      return;
    }

    const newBen: Beneficiary = {
      id: `ben-${Date.now()}`,
      name: name.trim(),
      bankName: bankName.trim(),
      accountNumber: accountNumber.trim(),
      codeType: country === 'India' ? 'IFSC' : 'NIP',
      codeValue: codeValue.toUpperCase().trim(),
      country,
      currency: country === 'India' ? 'INR' : 'NGN',
    };

    onAddBeneficiary(newBen);
    onClose();
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

      {/* Dialog */}
      <div
        className="animate-fade-in"
        style={{
          position: 'relative',
          width: '480px',
          maxWidth: '100%',
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px',
          boxShadow: 'var(--shadow-elevated)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '18px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
              <UserCheck size={18} />
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Add Transfer Beneficiary
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

        {error && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--error-soft)',
              border: '1px solid var(--error-border)',
              color: 'var(--error)',
              fontSize: '13px',
              marginBottom: '16px',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Country Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Destination Country & Currency
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setCountry('India')}
                style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-md)',
                  background: country === 'India' ? 'var(--surface-interactive)' : 'var(--surface-subtle)',
                  border: `1px solid ${country === 'India' ? 'var(--brand-primary)' : 'var(--border-default)'}`,
                  color: country === 'India' ? 'var(--brand-primary)' : 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '13px',
                }}
              >
                🇮🇳 India (INR)
              </button>

              <button
                type="button"
                onClick={() => setCountry('Nigeria')}
                style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-md)',
                  background: country === 'Nigeria' ? 'var(--surface-interactive)' : 'var(--surface-subtle)',
                  border: `1px solid ${country === 'Nigeria' ? 'var(--brand-primary)' : 'var(--border-default)'}`,
                  color: country === 'Nigeria' ? 'var(--brand-primary)' : 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '13px',
                }}
              >
                🇳🇬 Nigeria (NGN)
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Beneficiary Account Holder Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              placeholder="e.g. Adarsh Singh Gaur"
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Bank Name
            </label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => { setBankName(e.target.value); setError(''); }}
              placeholder={country === 'India' ? 'e.g. HDFC Bank Ltd' : 'e.g. Access Bank PLC'}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Bank Account Number
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => { setAccountNumber(e.target.value); setError(''); }}
              placeholder="e.g. 50100492817291"
              style={{ width: '100%', fontFamily: 'var(--font-mono)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              {country === 'India' ? 'IFSC Code (11 alphanumeric)' : 'NIP Bank Code / Routing'}
            </label>
            <input
              type="text"
              value={codeValue}
              onChange={(e) => { setCodeValue(e.target.value); setError(''); }}
              placeholder={country === 'India' ? 'HDFC0000240' : '044'}
              style={{ width: '100%', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '11px',
              color: 'var(--text-muted)',
              padding: '8px 0',
            }}
          >
            <ShieldCheck size={14} color="var(--success)" />
            <span>Beneficiary account verified in real-time before initiating payout.</span>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px',
                background: 'var(--surface-subtle)',
                color: 'var(--text-secondary)',
                fontWeight: 600,
                borderRadius: 'var(--radius-md)',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                flex: 2,
                padding: '12px',
                background: 'var(--brand-primary)',
                color: '#0B0F17',
                fontWeight: 700,
                borderRadius: 'var(--radius-md)',
                fontSize: '14px',
              }}
            >
              Save Beneficiary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
