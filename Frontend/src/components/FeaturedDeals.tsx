'use client';

import { Clock, Users, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Mock data - in real app this would come from your smart contract
const featuredDeals = [
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
    nftMint: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU'
  },
  {
    id: '2',
    title: 'Spa Day Package',
    merchant: 'Wellness Center',
    originalPrice: 120,
    discountPrice: 84,
    discountPercentage: 30,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
    category: 'Services',
    timeLeft: '5 days',
    soldCount: 34,
    totalSupply: 50,
    rating: 4.9,
    isHot: false,
    nftMint: '8yLXtg3DX98e98UYKTEqcE6kCifeTrB94UASvKpthBtV'
  },
  {
    id: '3',
    title: 'Coffee Subscription',
    merchant: 'Bean There Coffee',
    originalPrice: 60,
    discountPrice: 36,
    discountPercentage: 40,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
    category: 'Food & Beverage',
    timeLeft: '1 day',
    soldCount: 156,
    totalSupply: 200,
    rating: 4.7,
    isHot: true,
    nftMint: '9zMYuh4EY09f09VZLUFrdF7lDjgfUsC05VBTwLqtiCuW'
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
    timeLeft: '3 days',
    soldCount: 67,
    totalSupply: 75,
    rating: 4.6,
    isHot: false,
    nftMint: 'AaNZvi5FZ10g10WaMVGseG8mEkhhVtD16WCUxMsujDvX'
  },
  {
    id: '5',
    title: 'Fashion Week Pass',
    merchant: 'Style Studio',
    originalPrice: 80,
    discountPrice: 48,
    discountPercentage: 40,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    category: 'Retail',
    timeLeft: '4 days',
    soldCount: 23,
    totalSupply: 30,
    rating: 4.8,
    isHot: false,
    nftMint: 'BbOawj6GaA1h11XbNWHtfH9nFliiWuE27XDVyNtukEvY'
  },
  {
    id: '6',
    title: 'Concert Tickets',
    merchant: 'Music Hall',
    originalPrice: 150,
    discountPrice: 105,
    discountPercentage: 30,
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop',
    category: 'Entertainment',
    timeLeft: '6 days',
    soldCount: 145,
    totalSupply: 200,
    rating: 4.9,
    isHot: true,
    nftMint: 'CcPbxk7HbB2i22YcOXIugI0oGmjjXvF38YEWzOuvkFwZ'
  }
];

export function FeaturedDeals() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              🔥 Featured Deals
            </h2>
            <p className="text-xl text-gray-600">
              Limited-time NFT coupons with the best discounts
            </p>
          </div>
          <Link
            href="/deals"
            className="hidden md:flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
          >
            View All Deals
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDeals.map((deal) => (
            <Link
              key={deal.id}
              href={`/deals/${deal.id}`}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden deal-card"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={deal.image}
                  alt={deal.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {deal.isHot && (
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                      🔥 HOT
                    </span>
                  )}
                  <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                    -{deal.discountPercentage}%
                  </span>
                </div>

                {/* Time Left */}
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {deal.timeLeft}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 transition-colors">
                      {deal.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{deal.merchant}</p>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                    {deal.category}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700 ml-1">
                    {deal.rating}
                  </span>
                  <span className="text-gray-400 text-sm ml-2">
                    ({deal.soldCount} reviews)
                  </span>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ${deal.discountPrice}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${deal.originalPrice}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Save</div>
                    <div className="text-lg font-bold text-green-600">
                      ${(deal.originalPrice - deal.discountPrice).toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {deal.soldCount} sold
                    </span>
                    <span>{deal.totalSupply - deal.soldCount} remaining</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(deal.soldCount / deal.totalSupply) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* NFT Info */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">NFT Mint:</span>
                    <span className="text-xs font-mono text-gray-700">
                      {deal.nftMint.slice(0, 8)}...{deal.nftMint.slice(-4)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="text-center mt-12 md:hidden">
          <Link
            href="/deals"
            className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
          >
            View All Deals
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
