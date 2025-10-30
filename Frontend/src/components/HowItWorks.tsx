'use client';

import { Wallet, ShoppingCart, Gift, Repeat } from 'lucide-react';

const steps = [
  {
    icon: Wallet,
    title: 'Connect Wallet',
    description: 'Connect your Solana wallet to start browsing and purchasing NFT deals',
    color: 'from-blue-400 to-blue-600'
  },
  {
    icon: ShoppingCart,
    title: 'Buy NFT Deals',
    description: 'Purchase exclusive discount coupons as NFTs from your favorite merchants',
    color: 'from-green-400 to-green-600'
  },
  {
    icon: Gift,
    title: 'Redeem & Save',
    description: 'Use your NFT coupons to get amazing discounts at participating businesses',
    color: 'from-purple-400 to-purple-600'
  },
  {
    icon: Repeat,
    title: 'Trade & Collect',
    description: 'Trade your NFT coupons with others or collect rare deals as digital assets',
    color: 'from-orange-400 to-orange-600'
  }
];

export function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How DealCoin Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of deals with blockchain technology. 
            Own, trade, and redeem discounts like never before.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative text-center group">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 transform translate-x-1/2 z-0"></div>
                )}

                {/* Step Content */}
                <div className="relative z-10 bg-white">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-primary-100 text-primary-600 rounded-full text-sm font-bold mb-4">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="mt-20 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Why Choose NFT Deals?
            </h3>
            <p className="text-lg text-gray-600">
              Revolutionary benefits that traditional coupons can't offer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Secure & Verified</h4>
              <p className="text-gray-600">Blockchain technology ensures authenticity and prevents fraud</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Tradeable Assets</h4>
              <p className="text-gray-600">Buy, sell, and trade your deals like any other digital asset</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Collectible Value</h4>
              <p className="text-gray-600">Rare deals can appreciate in value and become collectibles</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
