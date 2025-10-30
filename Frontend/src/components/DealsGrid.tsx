'use client';

import { useState } from 'react';
import { Clock, Users, Star, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Extended mock data for the deals grid
const allDeals = [
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
  },
  {
    id: '7',
    title: 'Fitness Membership',
    merchant: 'PowerGym',
    originalPrice: 200,
    discountPrice: 120,
    discountPercentage: 40,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    category: 'Services',
    timeLeft: '7 days',
    soldCount: 78,
    totalSupply: 100,
    rating: 4.5,
    isHot: false,
    nftMint: 'DdQcyl8IcC3j33ZdPYJvhJ1pHnkkYwG49ZFXzPvvlGxA'
  },
  {
    id: '8',
    title: 'Sushi Dinner Set',
    merchant: 'Tokyo Sushi',
    originalPrice: 85,
    discountPrice: 51,
    discountPercentage: 40,
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
    category: 'Food & Beverage',
    timeLeft: '2 days',
    soldCount: 92,
    totalSupply: 120,
    rating: 4.7,
    isHot: true,
    nftMint: 'EeRdzm9JdD4k44AePZKwkK2qIollZxH5AaGYzQwwmHyB'
  }
];

export function DealsGrid() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (dealId: string) => {
    setFavorites(prev => 
      prev.includes(dealId) 
        ? prev.filter(id => id !== dealId)
        : [...prev, dealId]
    );
  };

  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {allDeals.length} Deals Found
          </h2>
          <p className="text-gray-600 text-sm">
            Showing all available NFT deals
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option>Grid View</option>
            <option>List View</option>
          </select>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {allDeals.map((deal) => (
          <div
            key={deal.id}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 deal-card"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <Link href={`/deals/${deal.id}`}>
                <Image
                  src={deal.image}
                  alt={deal.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              
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

              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(deal.id)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <Heart 
                  className={`h-4 w-4 ${
                    favorites.includes(deal.id) 
                      ? 'text-red-500 fill-current' 
                      : 'text-gray-600'
                  }`} 
                />
              </button>

              {/* Time Left */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {deal.timeLeft}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <Link href={`/deals/${deal.id}`}>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {deal.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm">{deal.merchant}</p>
                </div>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg ml-2 flex-shrink-0">
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

              {/* Buy Button */}
              <Link
                href={`/deals/${deal.id}`}
                className="w-full bg-primary-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-primary-700 transition-colors text-center block"
              >
                Buy NFT Deal
              </Link>

              {/* NFT Info */}
              <div className="pt-4 border-t border-gray-100 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">NFT Mint:</span>
                  <span className="text-xs font-mono text-gray-700">
                    {deal.nftMint.slice(0, 8)}...{deal.nftMint.slice(-4)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-12">
        <button className="px-8 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
          Load More Deals
        </button>
      </div>
    </div>
  );
}
