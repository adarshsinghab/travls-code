export type NavTab =
  | 'dashboard'
  | 'cards'
  | 'accounts'
  | 'transfers'
  | 'transactions'
  | 'verification'
  | 'settings'
  | 'help';

export type CardType = 'metal_elite' | 'platinum_travel' | 'virtual_instant' | 'gold_rewards';

export interface CardItem {
  id: string;
  name: string;
  cardholderName: string;
  type: CardType;
  network: 'Mastercard' | 'Visa';
  last4: string;
  fullNumber: string;
  expMonth: string;
  expYear: string;
  cvv: string;
  isFrozen: boolean;
  status: 'active' | 'frozen' | 'pending';
  dailyLimit: number;
  dailySpent: number;
  monthlyLimit: number;
  monthlySpent: number;
  cashbackRate: string;
  material: string;
  gradientTheme: string;
  accentColor: string;
  onlineEnabled: boolean;
  contactlessEnabled: boolean;
  atmEnabled: boolean;
  internationalEnabled: boolean;
}

export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  network: string;
  balance: number;
  usdValue: number;
  priceUsd: number;
  change24h: number;
  address: string;
  qrPayload: string;
  isPopular?: boolean;
}

export interface FiatAccount {
  id: string;
  currency: string;
  symbol: string;
  balance: number;
  accountNumber: string;
  ibanOrRouting: string;
  bankName: string;
  countryCode: string;
}

export interface Beneficiary {
  id: string;
  name: string;
  bankName: string;
  accountNumber: string;
  codeType: 'IFSC' | 'NIP' | 'SWIFT';
  codeValue: string;
  country: 'India' | 'Nigeria';
  currency: 'INR' | 'NGN';
}

export type TransactionType = 'card_spend' | 'crypto_deposit' | 'crypto_swap' | 'bank_transfer' | 'cashback';
export type TransactionStatus = 'completed' | 'pending' | 'failed';

export interface Transaction {
  id: string;
  type: TransactionType;
  title: string;
  merchantOrParty: string;
  category: 'Travel' | 'Hotel' | 'Dining' | 'Crypto' | 'Transfer' | 'Rewards' | 'Shopping';
  amount: number;
  currency: string;
  fee: number;
  status: TransactionStatus;
  date: string;
  timestamp: number;
  cardLast4?: string;
  hash?: string;
  referenceNumber: string;
}

export interface VerificationTier {
  id: string;
  level: number;
  name: string;
  badge: string;
  status: 'verified' | 'current' | 'locked';
  dailyLimit: string;
  monthlyLimit: string;
  description: string;
  perks: string[];
  requirements: {
    title: string;
    completed: boolean;
  }[];
}
