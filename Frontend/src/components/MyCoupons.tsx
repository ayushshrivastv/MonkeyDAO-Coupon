'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Wallet, Clock, Star, Gift, ExternalLink, QrCode } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Mock user coupons data
const userCoupons = [
  {
    id: '1',
    title: 'Premium Pizza Combo',
    merchant: 'Pizza Palace',
    originalPrice: 45,
    discountPrice: 22.50,
    discountPercentage: 50,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    category: 'Food & Beverage',
    expiryDate: '2024-11-15',
    status: 'active',
    redemptionsLeft: 1,
    maxRedemptions: 1,
    nftMint: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    purchaseDate: '2024-10-20',
    rating: 4.8
  },
  {
    id: '2',
    title: 'Coffee Subscription',
    merchant: 'Bean There Coffee',
    originalPrice: 60,
    discountPrice: 36,
    discountPercentage: 40,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
    category: 'Food & Beverage',
    expiryDate: '2024-11-25',
    status: 'active',
    redemptionsLeft: 3,
    maxRedemptions: 5,
    nftMint: '9zMYuh4EY09f09VZLUFrdF7lDjgfUsC05VBTwLqtiCuW',
    purchaseDate: '2024-10-18',
    rating: 4.7
  },
  {
    id: '3',
    title: 'Spa Day Package',
    merchant: 'Wellness Center',
    originalPrice: 120,
    discountPrice: 84,
    discountPercentage: 30,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
    category: 'Services',
    expiryDate: '2024-10-25',
    status: 'expired',
    redemptionsLeft: 0,
    maxRedemptions: 1,
    nftMint: '8yLXtg3DX98e98UYKTEqcE6kCifeTrB94UASvKpthBtV',
    purchaseDate: '2024-09-15',
    rating: 4.9
  },
  {
    id: '4',
    title: 'Gaming Bundle',
    merchant: 'GameZone',
    originalPrice: 199,
    discountPrice: 99.50,
    discountPercentage: 50,
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop',
    category: 'Gaming',
    expiryDate: '2024-11-30',
    status: 'redeemed',
    redemptionsLeft: 0,
    maxRedemptions: 1,
    nftMint: 'AaNZvi5FZ10g10WaMVGseG8mEkhhVtD16WCUxMsujDvX',
    purchaseDate: '2024-10-10',
    rating: 4.6
  }
];

export function MyCoupons() {
  const { connected, publicKey } = useWallet();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Wallet className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Connect Your Wallet
          </h2>
          <p className="text-gray-600 mb-6">
            Connect your Solana wallet to view your NFT coupons
          </p>
          {mounted ? (
            <WalletMultiButton className="!bg-primary-600 hover:!bg-primary-700" />
          ) : (
            <div className="h-10 w-32 bg-primary-600 rounded-lg animate-pulse"></div>
          )}
        </div>
      </div>
    );
  }

  const filteredCoupons = userCoupons.filter(coupon => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return coupon.status === 'active';
    if (activeTab === 'redeemed') return coupon.status === 'redeemed';
    if (activeTab === 'expired') return coupon.status === 'expired';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'redeemed': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeRemaining = (expiryDate: string) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diff = expiry.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} left`;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return `${hours} hour${hours > 1 ? 's' : ''} left`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
              <Gift className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My NFT Coupons</h1>
              <p className="text-gray-600">
                Wallet: {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-4)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{userCoupons.length}</div>
            <div className="text-gray-600">Total Coupons</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active</p>
              <p className="text-2xl font-bold text-green-600">
                {userCoupons.filter(c => c.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Gift className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Redeemed</p>
              <p className="text-2xl font-bold text-blue-600">
                {userCoupons.filter(c => c.status === 'redeemed').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <QrCode className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Expired</p>
              <p className="text-2xl font-bold text-red-600">
                {userCoupons.filter(c => c.status === 'expired').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <Clock className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Saved</p>
              <p className="text-2xl font-bold text-purple-600">
                ${userCoupons.reduce((sum, c) => sum + (c.originalPrice - c.discountPrice), 0).toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-purple-600 font-bold text-lg">$</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'all', label: 'All Coupons' },
              { id: 'active', label: 'Active' },
              { id: 'redeemed', label: 'Redeemed' },
              { id: 'expired', label: 'Expired' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Coupons Grid */}
        <div className="p-6">
          {filteredCoupons.length === 0 ? (
            <div className="text-center py-12">
              <Gift className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No coupons found
              </h3>
              <p className="text-gray-600 mb-6">
                {activeTab === 'all' 
                  ? "You don't have any NFT coupons yet."
                  : `No ${activeTab} coupons found.`
                }
              </p>
              <Link
                href="/deals"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
              >
                Browse Deals
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCoupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-48">
                    <Image
                      src={coupon.image}
                      alt={coupon.title}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(coupon.status)}`}>
                        {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
                      </span>
                    </div>

                    {/* Time Left */}
                    {coupon.status === 'active' && (
                      <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {getTimeRemaining(coupon.expiryDate)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{coupon.title}</h3>
                        <p className="text-gray-600 text-sm">{coupon.merchant}</p>
                      </div>
                      <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-lg">
                        {coupon.category}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700 ml-1">
                        {coupon.rating}
                      </span>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-gray-900">
                          ${coupon.discountPrice}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ${coupon.originalPrice}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Saved</div>
                        <div className="text-lg font-bold text-green-600">
                          ${(coupon.originalPrice - coupon.discountPrice).toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {/* Redemptions */}
                    {coupon.maxRedemptions > 1 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                          <span>Redemptions</span>
                          <span>{coupon.redemptionsLeft}/{coupon.maxRedemptions} left</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${(coupon.redemptionsLeft / coupon.maxRedemptions) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="space-y-2">
                      {coupon.status === 'active' && coupon.redemptionsLeft > 0 && (
                        <button className="w-full bg-primary-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-primary-700 transition-colors">
                          Redeem Coupon
                        </button>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <button className="flex items-center text-sm text-gray-600 hover:text-primary-600">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View on Explorer
                        </button>
                        <span className="text-xs text-gray-500">
                          {coupon.nftMint.slice(0, 8)}...{coupon.nftMint.slice(-4)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
