import React, { useState } from 'react';
import {
  Send,
  Plus,
  Zap,
} from 'lucide-react';
import type { Beneficiary, CryptoAsset, Transaction } from '../types';

interface TransfersViewProps {
  beneficiaries: Beneficiary[];
  cryptoAssets?: CryptoAsset[];
  transactions: Transaction[];
  onOpenAddBeneficiary: () => void;
  onSendTransfer: (tx: Transaction) => void;
  onNotify: (title: string, desc?: string, type?: 'success' | 'error' | 'info') => void;
}

export const TransfersView: React.FC<TransfersViewProps> = ({
  beneficiaries,
  transactions,
  onOpenAddBeneficiary,
  onSendTransfer,
  onNotify,
}) => {
  const [destination, setDestination] = useState<'India' | 'Nigeria'>('India');
  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState('USDT');
  const [amountType, setAmountType] = useState<'CRYPTO' | 'FIAT'>('FIAT');
  const [inputAmount, setInputAmount] = useState('500');
  const [selectedBeneficiaryId, setSelectedBeneficiaryId] = useState<string>(
    beneficiaries.find((b) => b.country === 'India')?.id || ''
  );
  const [transferMethod, setTransferMethod] = useState<'IMPS' | 'NEFT' | 'RTGS'>('IMPS');
  const [purpose, setPurpose] = useState('Hotel booking and travel expenses');
  const [isProcessing, setIsProcessing] = useState(false);

  const fxRate = destination === 'India' ? 86.50 : 1580.00; // 1 USD in INR or NGN
  const currencySymbol = destination === 'India' ? '₹' : '₦';
  const currencyCode = destination === 'India' ? 'INR' : 'NGN';

  // Calculations
  const numericInput = parseFloat(inputAmount) || 0;
  const fiatEquivalent =
    amountType === 'FIAT' ? numericInput : numericInput * (selectedAssetSymbol === 'BTC' ? 68000 : 1.0);
  const cryptoEquivalent =
    amountType === 'CRYPTO'
      ? numericInput
      : numericInput / (selectedAssetSymbol === 'BTC' ? 68000 : 1.0);

  const localPayout = (fiatEquivalent * fxRate).toLocaleString('en-US', { maximumFractionDigits: 2 });

  const relevantBeneficiaries = beneficiaries.filter((b) => b.country === destination);

  const transferHistory = transactions.filter((t) => t.type === 'bank_transfer');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (numericInput <= 0) {
      onNotify('Invalid Amount', 'Please enter a valid amount greater than zero.', 'error');
      return;
    }
    if (!selectedBeneficiaryId) {
      onNotify('Beneficiary Required', 'Please select or add a verified recipient bank account.', 'error');
      return;
    }

    const selectedBen = beneficiaries.find((b) => b.id === selectedBeneficiaryId);

    setIsProcessing(true);
    setTimeout(() => {
      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        type: 'bank_transfer',
        title: `Payout to ${destination} (${transferMethod})`,
        merchantOrParty: `${selectedBen?.name || 'Beneficiary'} • ${selectedBen?.bankName || 'Bank'}`,
        category: 'Transfer',
        amount: -fiatEquivalent,
        currency: 'USD',
        fee: 0.00,
        status: 'completed',
        date: 'Just now',
        timestamp: Date.now(),
        referenceNumber: `TRV-${destination.slice(0, 3).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`,
      };

      onSendTransfer(newTx);
      setIsProcessing(false);
      setInputAmount('');
      onNotify(
        'Payout Initiated Successfully',
        `Dispatched ${currencySymbol}${localPayout} to ${selectedBen?.name} via ${transferMethod}.`,
        'success'
      );
    }, 800);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #131B2B 0%, #0F1622 60%, #0A0F17 100%)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px 28px',
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
              ZERO-FX GLOBAL SETTLEMENT
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Cross-Border Payouts & Transfers
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Cash out crypto balances directly into Indian and Nigerian bank accounts in under 60 seconds.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '12px',
              color: 'var(--success)',
              background: 'var(--success-soft)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--success-border)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Zap size={14} />
            <span>Instant IMPS / NIP Settlement</span>
          </span>
        </div>
      </div>

      {/* Main Form & Sidebar Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Send Money Form */}
        <div
          style={{
            background: 'var(--surface-card)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-xl)',
            padding: '28px',
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
            Send Money & Cash Out
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Cash out crypto to a saved beneficiary bank account with zero hidden fees.
          </p>

          <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Destination Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                DESTINATION CORRIDOR
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setDestination('India');
                    const indBen = beneficiaries.find((b) => b.country === 'India');
                    if (indBen) setSelectedBeneficiaryId(indBen.id);
                  }}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    background: destination === 'India' ? 'var(--surface-interactive)' : 'var(--surface-subtle)',
                    border: `2px solid ${destination === 'India' ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                    color: destination === 'India' ? 'var(--brand-primary)' : 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{ fontSize: '18px' }}>🇮🇳</span>
                  <span>India (INR)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDestination('Nigeria');
                    const nigBen = beneficiaries.find((b) => b.country === 'Nigeria');
                    if (nigBen) setSelectedBeneficiaryId(nigBen.id);
                  }}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    background: destination === 'Nigeria' ? 'var(--surface-interactive)' : 'var(--surface-subtle)',
                    border: `2px solid ${destination === 'Nigeria' ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                    color: destination === 'Nigeria' ? 'var(--brand-primary)' : 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{ fontSize: '18px' }}>🇳🇬</span>
                  <span>Nigeria (NGN)</span>
                </button>
              </div>
            </div>

            {/* From Asset */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                SOURCE ASSET (PAY FROM)
              </label>
              <select
                value={selectedAssetSymbol}
                onChange={(e) => setSelectedAssetSymbol(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--surface-subtle)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-default)',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                <option value="USDT">USDT • Tether USD ($1.00)</option>
                <option value="BTC">BTC • Bitcoin (~$68,000.00)</option>
                <option value="ETH">ETH • Ethereum (~$3,500.00)</option>
                <option value="SOL">SOL • Solana (~$150.00)</option>
              </select>
            </div>

            {/* Cash Out Amount */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  TRANSFER AMOUNT
                </label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    type="button"
                    onClick={() => setAmountType('FIAT')}
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-xs)',
                      background: amountType === 'FIAT' ? 'var(--brand-primary)' : 'var(--surface-subtle)',
                      color: amountType === 'FIAT' ? '#0B0F17' : 'var(--text-muted)',
                    }}
                  >
                    USD
                  </button>
                  <button
                    type="button"
                    onClick={() => setAmountType('CRYPTO')}
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-xs)',
                      background: amountType === 'CRYPTO' ? 'var(--brand-primary)' : 'var(--surface-subtle)',
                      color: amountType === 'CRYPTO' ? '#0B0F17' : 'var(--text-muted)',
                    }}
                  >
                    {selectedAssetSymbol}
                  </button>
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <input
                  type="number"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                  placeholder="0.00"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    fontSize: '18px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                  }}
                >
                  {amountType === 'FIAT' ? 'USD' : selectedAssetSymbol}
                </span>
              </div>

              {/* Conversion Preview Box */}
              <div
                style={{
                  marginTop: '8px',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--surface-subtle)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                }}
              >
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Recipient will receive:</span>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Debiting ≈ {cryptoEquivalent.toFixed(4)} {selectedAssetSymbol}
                  </div>
                </div>
                <span style={{ fontWeight: 800, color: 'var(--brand-primary)', fontSize: '15px' }}>
                  {currencySymbol}{localPayout} {currencyCode}
                </span>
              </div>
            </div>

            {/* To Bank Account */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  BENEFICIARY BANK ACCOUNT
                </label>
                <button
                  type="button"
                  onClick={onOpenAddBeneficiary}
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--brand-primary)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Plus size={13} />
                  <span>Add New</span>
                </button>
              </div>

              {relevantBeneficiaries.length === 0 ? (
                <div
                  onClick={onOpenAddBeneficiary}
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px dashed var(--border-strong)',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  No {destination} beneficiaries saved yet. Click here to add one.
                </div>
              ) : (
                <select
                  value={selectedBeneficiaryId}
                  onChange={(e) => setSelectedBeneficiaryId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--surface-subtle)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-default)',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  {relevantBeneficiaries.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} — {b.bankName} (•••• {b.accountNumber.slice(-4)})
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Rail / Method */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                CLEARING RAIL
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: destination === 'India' ? '1fr 1fr 1fr' : '1fr', gap: '8px' }}>
                {destination === 'India' ? (
                  (['IMPS', 'NEFT', 'RTGS'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setTransferMethod(m)}
                      style={{
                        padding: '10px',
                        borderRadius: 'var(--radius-sm)',
                        background: transferMethod === m ? 'var(--surface-interactive)' : 'var(--surface-subtle)',
                        border: `1px solid ${transferMethod === m ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                        color: transferMethod === m ? 'var(--brand-primary)' : 'var(--text-secondary)',
                        fontWeight: 700,
                        fontSize: '12px',
                      }}
                    >
                      {m} {m === 'IMPS' && '⚡'}
                    </button>
                  ))
                ) : (
                  <button
                    type="button"
                    style={{
                      padding: '10px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--surface-interactive)',
                      border: '1px solid var(--brand-primary)',
                      color: 'var(--brand-primary)',
                      fontWeight: 700,
                      fontSize: '12px',
                    }}
                  >
                    NIP (Nigeria Instant Payout) ⚡
                  </button>
                )}
              </div>
            </div>

            {/* Purpose */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                PAYMENT PURPOSE
              </label>
              <input
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="What's this transfer for?"
                style={{ width: '100%', fontSize: '13px' }}
              />
            </div>

            {/* Fee summary & guarantee */}
            <div
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--brand-soft)',
                border: '1px solid var(--brand-border)',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
              }}
            >
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Transfer Fee:</span>
              <span style={{ color: 'var(--success)', fontWeight: 800 }}>$0.00 (Zero Fee Guarantee)</span>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isProcessing}
              style={{
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--brand-primary)',
                color: '#0B0F17',
                fontWeight: 800,
                fontSize: '15px',
                boxShadow: '0 4px 14px rgba(255, 185, 31, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                opacity: isProcessing ? 0.7 : 1,
              }}
            >
              {isProcessing ? (
                <span>Broadcasting to Clearing Engine...</span>
              ) : (
                <>
                  <Send size={16} />
                  <span>Send Transfer Now</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Beneficiaries & Transfer History */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Beneficiaries Card */}
          <div
            style={{
              background: 'var(--surface-card)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-xl)',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Saved Beneficiaries
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Instant-clearing whitelist
                </span>
              </div>

              <button
                onClick={onOpenAddBeneficiary}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--surface-interactive)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--brand-primary)',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                <Plus size={14} />
                <span>Add</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {beneficiaries.map((b) => (
                <div
                  key={b.id}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--surface-subtle)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'var(--surface-interactive)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                      }}
                    >
                      {b.country === 'India' ? '🇮🇳' : '🇳🇬'}
                    </div>

                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {b.name}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {b.bankName} •••• {b.accountNumber.slice(-4)}
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      color: 'var(--success)',
                      background: 'var(--success-soft)',
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-xs)',
                    }}
                  >
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transfers Activity */}
          <div
            style={{
              background: 'var(--surface-card)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-xl)',
              padding: '24px',
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>
              Recent Bank Payouts
            </h3>

            {transferHistory.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                No transfers executed yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {transferHistory.map((tx) => (
                  <div
                    key={tx.id}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--surface-subtle)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {tx.merchantOrParty}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {tx.date} • {tx.referenceNumber}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        -${Math.abs(tx.amount).toFixed(2)}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--success)', fontWeight: 600 }}>
                        Completed
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
