import React, { useState } from 'react';
import {
  Search,
  ArrowDownLeft,
  Copy,
  Check,
  QrCode,
  Building,
} from 'lucide-react';
import type { CryptoAsset, FiatAccount } from '../types';

interface AccountsViewProps {
  cryptoAssets: CryptoAsset[];
  fiatAccounts: FiatAccount[];
  onOpenDeposit: () => void;
  onNotify: (title: string, desc?: string, type?: 'success' | 'error' | 'info') => void;
}

export const AccountsView: React.FC<AccountsViewProps> = ({
  cryptoAssets,
  fiatAccounts,
  onOpenDeposit,
  onNotify,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [networkFilter, setNetworkFilter] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const networks = ['All', 'BSC', 'TRON', 'Bitcoin Native', 'ERC-20', 'Polygon PoS', 'Solana Mainnet'];

  const filteredAssets = cryptoAssets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.network.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNetwork = networkFilter === 'All' || asset.network.includes(networkFilter);
    return matchesSearch && matchesNetwork;
  });

  const totalCryptoValue = cryptoAssets.reduce((acc, curr) => acc + curr.usdValue, 0);
  const totalFiatValue = fiatAccounts.reduce((acc, curr) => acc + curr.balance, 0);
  const combinedTotal = totalCryptoValue + totalFiatValue;

  const handleCopy = (address: string, id: string, name: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    onNotify('Custody Address Copied', `${name} deposit address copied to clipboard.`, 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Header & Custody Status */}
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
              PRIVATE INSTITUTIONAL CUSTODY
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
              ● Vault Live & Encrypted
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Custody & Multi-Currency Accounts
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Every balance you hold is protected by non-custodial MPC key shards and bank-grade depository insurance.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onOpenDeposit}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 22px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--brand-primary)',
            color: '#0B0F17',
            fontWeight: 700,
            fontSize: '14px',
            boxShadow: '0 4px 14px rgba(255, 185, 31, 0.28)',
          }}
        >
          <ArrowDownLeft size={18} strokeWidth={2.5} />
          <span>Deposit Crypto / Fiat</span>
        </button>
      </div>

      {/* 2. Total Holdings Overview Card */}
      <div
        style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px 28px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}
      >
        <div>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            TOTAL COMBINED HOLDINGS
          </span>
          <div
            style={{
              fontSize: '36px',
              fontWeight: 800,
              fontFamily: 'var(--font-primary)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginTop: '4px',
            }}
          >
            ${combinedTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Audited real-time with segregated cryptographic reserve attestations.
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div
            style={{
              flex: 1,
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--surface-subtle)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>CRYPTO CUSTODY</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
              ${totalCryptoValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--brand-primary)', marginTop: '2px' }}>
              {cryptoAssets.length} Active Assets
            </div>
          </div>

          <div
            style={{
              flex: 1,
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--surface-subtle)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>FIAT TREASURY</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
              ${totalFiatValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--success)', marginTop: '2px' }}>
              FDIC & Bundesbank Backed
            </div>
          </div>
        </div>
      </div>

      {/* 3. Fiat Accounts Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Fiat Bank Accounts
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Direct local clearing</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px',
          }}
        >
          {fiatAccounts.map((fiat) => (
            <div
              key={fiat.id}
              style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '20px' }}>
                      {fiat.countryCode === 'US' ? '🇺🇸' : fiat.countryCode === 'EU' ? '🇪🇺' : '🇬🇧'}
                    </span>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {fiat.currency} Treasury Vault
                    </span>
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
                    Active
                  </span>
                </div>

                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 800,
                    fontFamily: 'var(--font-primary)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {fiat.symbol}{fiat.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>

                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Account: {fiat.accountNumber}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                  {fiat.ibanOrRouting}
                </div>
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '12px',
                  marginTop: '16px',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Building size={14} color="var(--brand-primary)" />
                <span>{fiat.bankName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Crypto Custody Assets Section */}
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Crypto Vault Addresses & Balances
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Tap any asset to inspect address QR, copy string, or verify explorer confirmations.
            </p>
          </div>

          {/* Search & Network Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--surface-subtle)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                padding: '6px 12px',
              }}
            >
              <Search size={16} color="var(--text-muted)" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search token, symbol..."
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  fontSize: '13px',
                  outline: 'none',
                  width: '150px',
                }}
              />
            </div>
          </div>
        </div>

        {/* Network Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '12px' }}>
          {networks.map((net) => (
            <button
              key={net}
              onClick={() => setNetworkFilter(net)}
              style={{
                fontSize: '12px',
                fontWeight: 600,
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                background: networkFilter === net ? 'var(--brand-primary)' : 'var(--surface-subtle)',
                color: networkFilter === net ? '#0B0F17' : 'var(--text-secondary)',
                border: `1px solid ${networkFilter === net ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                whiteSpace: 'nowrap',
              }}
            >
              {net}
            </button>
          ))}
        </div>

        {/* Asset Cards / Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filteredAssets.map((asset) => {
            const isCopied = copiedId === asset.id;
            return (
              <div
                key={asset.id}
                style={{
                  background: 'var(--surface-card)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px 20px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  transition: 'background var(--transition-fast)',
                }}
              >
                {/* Asset info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '200px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'var(--surface-subtle)',
                      border: '1px solid var(--border-default)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '13px',
                      color: 'var(--brand-primary)',
                    }}
                  >
                    {asset.symbol}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {asset.name}
                      </span>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: 'var(--radius-xs)',
                          background: 'var(--brand-soft)',
                          color: 'var(--brand-primary)',
                          border: '1px solid var(--brand-border)',
                        }}
                      >
                        {asset.network}
                      </span>
                    </div>

                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {asset.balance} {asset.symbol}
                    </div>
                  </div>
                </div>

                {/* Address snippet & copy */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'var(--surface-subtle)',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {asset.address.slice(0, 8)}...{asset.address.slice(-8)}
                  </span>

                  <button
                    onClick={() => handleCopy(asset.address, asset.id, asset.name)}
                    style={{
                      color: isCopied ? 'var(--success)' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    title="Copy Address"
                  >
                    {isCopied ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>

                {/* USD Value & Deposit trigger */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      ${asset.usdValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      1 {asset.symbol} = ${asset.priceUsd.toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={onOpenDeposit}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--surface-interactive)',
                      border: '1px solid var(--border-default)',
                      color: 'var(--text-primary)',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    <QrCode size={14} color="var(--brand-primary)" />
                    <span>QR Deposit</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
