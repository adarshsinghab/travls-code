import React, { useState } from 'react';
import { X, Copy, Check, AlertTriangle, ShieldCheck, ArrowDownLeft } from 'lucide-react';
import type { CryptoAsset } from '../../types';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  cryptoAssets: CryptoAsset[];
  onSimulateDeposit?: (assetId: string, amount: number) => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({
  isOpen,
  onClose,
  cryptoAssets,
  onSimulateDeposit,
}) => {
  const [selectedAssetId, setSelectedAssetId] = useState(cryptoAssets[0]?.id || 'crypto-usdt-bsc');
  const [copied, setCopied] = useState(false);
  const [simulated, setSimulated] = useState(false);

  if (!isOpen) return null;

  const currentAsset = cryptoAssets.find((a) => a.id === selectedAssetId) || cryptoAssets[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentAsset.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulate = () => {
    if (onSimulateDeposit) {
      onSimulateDeposit(currentAsset.id, 500);
      setSimulated(true);
      setTimeout(() => {
        setSimulated(false);
        onClose();
      }, 1200);
    }
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

      {/* Modal Dialog */}
      <div
        className="animate-fade-in"
        style={{
          position: 'relative',
          width: '500px',
          maxWidth: '100%',
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px',
          boxShadow: 'var(--shadow-elevated)',
        }}
      >
        {/* Header */}
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
              <ArrowDownLeft size={18} />
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Deposit Crypto to Vault
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

        {/* Asset Picker */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Select Asset & Network
          </label>
          <select
            value={selectedAssetId}
            onChange={(e) => setSelectedAssetId(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              background: 'var(--surface-subtle)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            {cryptoAssets.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.name} ({asset.symbol}) — {asset.network}
              </option>
            ))}
          </select>
        </div>

        {/* QR Code Card */}
        <div
          style={{
            background: 'var(--surface-subtle)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          {/* Stylized QR Code Box */}
          <div
            style={{
              width: '180px',
              height: '180px',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {/* SVG Representation of QR with corners and matrix patterns */}
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
              {/* Corner 1 */}
              <rect x="5" y="5" width="24" height="24" rx="2" fill="#0B0F17" />
              <rect x="9" y="9" width="16" height="16" fill="#FFFFFF" />
              <rect x="13" y="13" width="8" height="8" fill="#0B0F17" />
              {/* Corner 2 */}
              <rect x="71" y="5" width="24" height="24" rx="2" fill="#0B0F17" />
              <rect x="75" y="9" width="16" height="16" fill="#FFFFFF" />
              <rect x="79" y="13" width="8" height="8" fill="#0B0F17" />
              {/* Corner 3 */}
              <rect x="5" y="71" width="24" height="24" rx="2" fill="#0B0F17" />
              <rect x="9" y="75" width="16" height="16" fill="#FFFFFF" />
              <rect x="13" y="79" width="8" height="8" fill="#0B0F17" />
              {/* Data Blocks */}
              <rect x="36" y="8" width="6" height="6" fill="#0B0F17" />
              <rect x="46" y="12" width="6" height="12" fill="#0B0F17" />
              <rect x="56" y="8" width="6" height="6" fill="#0B0F17" />
              <rect x="36" y="22" width="12" height="6" fill="#0B0F17" />
              <rect x="8" y="38" width="6" height="6" fill="#0B0F17" />
              <rect x="18" y="44" width="8" height="8" fill="#0B0F17" />
              <rect x="32" y="38" width="12" height="12" fill="#0B0F17" />
              <rect x="58" y="38" width="10" height="6" fill="#0B0F17" />
              <rect x="74" y="44" width="8" height="10" fill="#0B0F17" />
              <rect x="88" y="36" width="6" height="12" fill="#0B0F17" />
              <rect x="36" y="58" width="6" height="14" fill="#0B0F17" />
              <rect x="50" y="52" width="12" height="12" fill="#0B0F17" />
              <rect x="70" y="62" width="16" height="8" fill="#0B0F17" />
              <rect x="42" y="78" width="10" height="12" fill="#0B0F17" />
              <rect x="62" y="78" width="14" height="6" fill="#0B0F17" />
              <rect x="82" y="80" width="10" height="10" fill="#0B0F17" />
              {/* Center TRAVLS Gold Badge */}
              <circle cx="50" cy="50" r="11" fill="#FFB91F" />
              <text x="50" y="54" fontSize="10" fontWeight="900" textAnchor="middle" fill="#0B0F17">T</text>
            </svg>
          </div>

          {/* Network Badge */}
          <span
            style={{
              marginTop: '12px',
              fontSize: '11px',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--brand-soft)',
              color: 'var(--brand-primary)',
              border: '1px solid var(--brand-border)',
            }}
          >
            Network: {currentAsset.network}
          </span>
        </div>

        {/* Deposit Address Box */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Your Unique Custody Deposit Address
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--surface-subtle)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
            }}
          >
            <span
              style={{
                flex: 1,
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--text-primary)',
                wordBreak: 'break-all',
              }}
            >
              {currentAsset.address}
            </span>

            <button
              onClick={handleCopy}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                background: copied ? 'var(--success-soft)' : 'var(--surface-interactive)',
                color: copied ? 'var(--success)' : 'var(--text-primary)',
                fontSize: '12px',
                fontWeight: 600,
                flexShrink: 0,
                border: copied ? '1px solid var(--success-border)' : '1px solid var(--border-default)',
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Warning Callout */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            padding: '12px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--warning-soft)',
            border: '1px solid var(--warning-border)',
            marginBottom: '16px',
            fontSize: '12px',
            color: 'var(--text-primary)',
            lineHeight: 1.4,
          }}
        >
          <AlertTriangle size={16} color="var(--warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            Only send <strong>{currentAsset.symbol}</strong> via <strong>{currentAsset.network}</strong>. Sending
            unsupported tokens or using the wrong chain cannot be recovered.
          </div>
        </div>

        {/* Simulation Action for Demo & Testing */}
        {onSimulateDeposit && (
          <button
            onClick={handleSimulate}
            disabled={simulated}
            style={{
              width: '100%',
              padding: '11px',
              borderRadius: 'var(--radius-md)',
              background: simulated ? 'var(--success)' : 'var(--surface-interactive)',
              color: simulated ? '#FFFFFF' : 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '13px',
              border: '1px solid var(--border-default)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all var(--transition-fast)',
            }}
          >
            {simulated ? (
              <>
                <Check size={16} />
                <span>$500 Deposit Credited to Vault!</span>
              </>
            ) : (
              <>
                <ShieldCheck size={16} color="var(--brand-primary)" />
                <span>Simulate Immediate $500 Deposit</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
