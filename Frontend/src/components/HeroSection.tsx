'use client';

import { ArrowRight, Zap, Shield, Coins } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10">
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Own Your Deals as
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  NFT Coupons
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                Buy, trade, and redeem exclusive discounts on the Solana blockchain. 
                Turn savings into digital assets.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Zap className="h-4 w-4 text-yellow-300" />
                <span className="text-sm font-medium">Instant Redemption</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Shield className="h-4 w-4 text-green-300" />
                <span className="text-sm font-medium">Blockchain Secured</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Coins className="h-4 w-4 text-orange-300" />
                <span className="text-sm font-medium">Tradeable Assets</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/deals"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                Browse Deals
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/merchant"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary-600 transition-all duration-200"
              >
                Create Deals
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold">1,000+</div>
                <div className="text-blue-200 text-sm">Active Deals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold">50+</div>
                <div className="text-blue-200 text-sm">Merchants</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold">$2M+</div>
                <div className="text-blue-200 text-sm">Saved</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Animation */}
          <div className="relative">
            <div className="relative z-10">
              {/* Floating Deal Cards */}
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">🍕</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">Pizza Palace</div>
                      <div className="text-green-300 font-bold">50% OFF</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-300 ml-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">☕</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">Coffee Corner</div>
                      <div className="text-green-300 font-bold">Buy 2 Get 1</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">🛍️</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">Fashion Hub</div>
                      <div className="text-green-300 font-bold">30% OFF</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
