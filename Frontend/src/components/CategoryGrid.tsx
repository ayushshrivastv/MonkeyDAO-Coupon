'use client';

import { Coffee, ShoppingBag, Plane, Music, Utensils, Car, Heart, Gamepad2 } from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    id: 'food-beverage',
    name: 'Food & Beverage',
    icon: Utensils,
    color: 'from-orange-400 to-red-500',
    dealCount: 245,
    description: 'Restaurants, cafes, and food delivery'
  },
  {
    id: 'retail',
    name: 'Retail & Shopping',
    icon: ShoppingBag,
    color: 'from-purple-400 to-pink-500',
    dealCount: 189,
    description: 'Fashion, electronics, and lifestyle'
  },
  {
    id: 'travel',
    name: 'Travel & Hotels',
    icon: Plane,
    color: 'from-blue-400 to-cyan-500',
    dealCount: 156,
    description: 'Hotels, flights, and experiences'
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: Music,
    color: 'from-green-400 to-teal-500',
    dealCount: 134,
    description: 'Movies, concerts, and events'
  },
  {
    id: 'services',
    name: 'Services',
    icon: Heart,
    color: 'from-pink-400 to-rose-500',
    dealCount: 98,
    description: 'Beauty, wellness, and professional services'
  },
  {
    id: 'automotive',
    name: 'Automotive',
    icon: Car,
    color: 'from-gray-400 to-gray-600',
    dealCount: 67,
    description: 'Car services, rentals, and accessories'
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: Gamepad2,
    color: 'from-indigo-400 to-purple-500',
    dealCount: 89,
    description: 'Games, consoles, and digital content'
  },
  {
    id: 'coffee',
    name: 'Coffee & Drinks',
    icon: Coffee,
    color: 'from-amber-400 to-orange-500',
    dealCount: 123,
    description: 'Coffee shops, bars, and beverages'
  }
];

export function CategoryGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Explore Deal Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing NFT deals across all your favorite categories. 
            Each coupon is a unique digital asset you can own and trade.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 deal-card"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm font-medium text-primary-600">
                        {category.dealCount} deals
                      </span>
                      <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                        <svg className="w-3 h-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-flex items-center px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors duration-200"
          >
            View All Categories
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
