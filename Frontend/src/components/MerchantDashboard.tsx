'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Plus, Store, BarChart3, Settings, Eye, Edit, Trash2 } from 'lucide-react';
import { CreateDealModal } from '@/components/CreateDealModal';

// Mock merchant data
const merchantData = {
  businessName: 'Pizza Palace',
  totalDeals: 12,
  totalSales: 1250,
  totalRevenue: 45600,
  activeDeals: 8
};

const merchantDeals = [
  {
    id: '1',
    title: 'Premium Pizza Combo',
    discountPercentage: 50,
    originalPrice: 45,
    discountPrice: 22.50,
    soldCount: 89,
    totalSupply: 100,
    status: 'active',
    expiryDate: '2024-11-15',
    nftMint: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU'
  },
  {
    id: '2',
    title: 'Lunch Special Deal',
    discountPercentage: 30,
    originalPrice: 25,
    discountPrice: 17.50,
    soldCount: 156,
    totalSupply: 200,
    status: 'active',
    expiryDate: '2024-11-20',
    nftMint: '8yLXtg3DX98e98UYKTEqcE6kCifeTrB94UASvKpthBtV'
  },
  {
    id: '3',
    title: 'Weekend Brunch',
    discountPercentage: 25,
    originalPrice: 35,
    discountPrice: 26.25,
    soldCount: 45,
    totalSupply: 50,
    status: 'paused',
    expiryDate: '2024-11-25',
    nftMint: '9zMYuh4EY09f09VZLUFrdF7lDjgfUsC05VBTwLqtiCuW'
  }
];

export function MerchantDashboard() {
  const { connected, publicKey } = useWallet();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Store className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Connect Your Wallet
          </h2>
          <p className="text-gray-600 mb-6">
            Connect your Solana wallet to access the merchant dashboard
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
              <Store className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {merchantData.businessName}
              </h1>
              <p className="text-gray-600">
                Merchant ID: {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-4)}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Deal
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Deals</p>
              <p className="text-2xl font-bold text-gray-900">{merchantData.totalDeals}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Store className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">{merchantData.totalSales}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${merchantData.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-purple-600 font-bold text-lg">$</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Deals</p>
              <p className="text-2xl font-bold text-gray-900">{merchantData.activeDeals}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Eye className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'deals', label: 'My Deals' },
              { id: 'analytics', label: 'Analytics' },
              { id: 'settings', label: 'Settings' }
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

        <div className="p-6">
          {activeTab === 'deals' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">My Deals</h3>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Deal
                </button>
              </div>

              <div className="space-y-4">
                {merchantDeals.map((deal) => (
                  <div key={deal.id} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <h4 className="text-lg font-semibold text-gray-900">{deal.title}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            deal.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {deal.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-gray-600">Discount</p>
                            <p className="font-semibold">{deal.discountPercentage}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Price</p>
                            <p className="font-semibold">${deal.discountPrice}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Sold</p>
                            <p className="font-semibold">{deal.soldCount}/{deal.totalSupply}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Expires</p>
                            <p className="font-semibold">{new Date(deal.expiryDate).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-xs text-gray-500 mb-1">NFT Mint: {deal.nftMint}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary-600 h-2 rounded-full"
                              style={{ width: `${(deal.soldCount / deal.totalSupply) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-6">
                        <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                          <Eye className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'overview' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Dashboard Overview</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Recent Activity</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Premium Pizza Combo sold</span>
                      <span className="text-sm font-medium">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Lunch Special Deal created</span>
                      <span className="text-sm font-medium">1 day ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Weekend Brunch paused</span>
                      <span className="text-sm font-medium">2 days ago</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="w-full flex items-center justify-center px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Deal
                    </button>
                    <button className="w-full flex items-center justify-center px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics
                    </button>
                    <button className="w-full flex items-center justify-center px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Analytics</h3>
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Analytics Coming Soon</h4>
                <p className="text-gray-600">
                  Detailed analytics and insights for your deals will be available here.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Settings</h3>
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Settings Panel</h4>
                <p className="text-gray-600">
                  Merchant settings and configuration options will be available here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Deal Modal */}
      {showCreateModal && (
        <CreateDealModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
