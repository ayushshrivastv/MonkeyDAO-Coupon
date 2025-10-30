import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { AnchorProvider, Program, Idl } from '@coral-xyz/anchor';
import { WalletContextState } from '@solana/wallet-adapter-react';

// NFT Coupon Program ID (from your smart contract)
export const NFT_COUPON_PROGRAM_ID = new PublicKey('55aFX7zaqURizkrxJc2HdtKrdpqLo5Vin6Qpo2gFXzMF');

// Connection to Solana devnet
export const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Coupon categories enum matching the smart contract
export enum CouponCategory {
  FoodAndBeverage = 0,
  Retail = 1,
  Services = 2,
  Travel = 3,
  Entertainment = 4,
  Other = 5,
}

// Helper function to get category from string
export function getCategoryFromString(category: string): CouponCategory {
  switch (category) {
    case 'Food & Beverage':
    case 'Coffee & Drinks':
      return CouponCategory.FoodAndBeverage;
    case 'Retail & Shopping':
      return CouponCategory.Retail;
    case 'Services':
      return CouponCategory.Services;
    case 'Travel & Hotels':
      return CouponCategory.Travel;
    case 'Entertainment':
    case 'Gaming':
      return CouponCategory.Entertainment;
    default:
      return CouponCategory.Other;
  }
}

// Helper function to get Anchor provider
export function getProvider(wallet: WalletContextState): AnchorProvider | null {
  if (!wallet.publicKey || !wallet.signTransaction || !wallet.signAllTransactions) {
    return null;
  }

  return new AnchorProvider(
    connection,
    {
      publicKey: wallet.publicKey,
      signTransaction: wallet.signTransaction,
      signAllTransactions: wallet.signAllTransactions,
    },
    { commitment: 'confirmed' }
  );
}

// Helper function to get merchant PDA
export function getMerchantPDA(authority: PublicKey): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('merchant'), authority.toBuffer()],
    NFT_COUPON_PROGRAM_ID
  );
}

// Helper function to get coupon data PDA
export function getCouponDataPDA(mint: PublicKey): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('coupon'), mint.toBuffer()],
    NFT_COUPON_PROGRAM_ID
  );
}

// Interface for deal creation
export interface CreateDealParams {
  title: string;
  description: string;
  discountPercentage: number;
  expiryDate: Date;
  category: CouponCategory;
  maxRedemptions: number;
  metadataUri: string;
}

// Interface for deal data
export interface DealData {
  id: string;
  title: string;
  merchant: string;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  image: string;
  category: string;
  timeLeft: string;
  soldCount: number;
  totalSupply: number;
  rating: number;
  isHot: boolean;
  nftMint: string;
  expiryDate: Date;
  isActive: boolean;
}

// Mock function to simulate fetching deals from the blockchain
export async function fetchDeals(): Promise<DealData[]> {
  // In a real implementation, this would:
  // 1. Fetch all coupon accounts from the program
  // 2. Parse the account data
  // 3. Fetch metadata from IPFS/Arweave
  // 4. Return formatted deal data
  
  // For now, return mock data
  return [
    {
      id: '1',
      title: 'Premium Pizza Combo',
      merchant: 'Pizza Palace',
      originalPrice: 45,
      discountPrice: 22.50,
      discountPercentage: 50,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      category: 'Food & Beverage',
      timeLeft: '2 days',
      soldCount: 89,
      totalSupply: 100,
      rating: 4.8,
      isHot: true,
      nftMint: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
      expiryDate: new Date('2024-11-15'),
      isActive: true
    }
    // ... more deals
  ];
}

// Mock function to simulate creating a deal
export async function createDeal(
  wallet: WalletContextState,
  params: CreateDealParams
): Promise<string> {
  const provider = getProvider(wallet);
  if (!provider) {
    throw new Error('Wallet not connected');
  }

  // In a real implementation, this would:
  // 1. Create the NFT mint
  // 2. Call the create_coupon instruction
  // 3. Upload metadata to IPFS/Arweave
  // 4. Return the transaction signature

  // For now, simulate the process
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log('Creating deal with params:', params);
  return 'mock_transaction_signature';
}

// Mock function to simulate initializing merchant
export async function initializeMerchant(
  wallet: WalletContextState,
  businessName: string
): Promise<string> {
  const provider = getProvider(wallet);
  if (!provider) {
    throw new Error('Wallet not connected');
  }

  // In a real implementation, this would call the initialize_merchant instruction
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('Initializing merchant:', businessName);
  return 'mock_transaction_signature';
}

// Mock function to simulate redeeming a coupon
export async function redeemCoupon(
  wallet: WalletContextState,
  nftMint: string
): Promise<string> {
  const provider = getProvider(wallet);
  if (!provider) {
    throw new Error('Wallet not connected');
  }

  // In a real implementation, this would call the redeem_coupon instruction
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  console.log('Redeeming coupon:', nftMint);
  return 'mock_transaction_signature';
}

// Utility function to format Solana addresses
export function formatAddress(address: string, length: number = 8): string {
  if (address.length <= length * 2) return address;
  return `${address.slice(0, length)}...${address.slice(-length)}`;
}

// Utility function to calculate time remaining
export function getTimeRemaining(expiryDate: Date): string {
  const now = new Date();
  const diff = expiryDate.getTime() - now.getTime();
  
  if (diff <= 0) return 'Expired';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${minutes} minute${minutes > 1 ? 's' : ''}`;
}
