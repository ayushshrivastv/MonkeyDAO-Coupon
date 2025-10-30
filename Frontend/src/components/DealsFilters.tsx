'use client';

import { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';

const categories = [
  'All Categories',
  'Food & Beverage',
  'Retail & Shopping',
  'Travel & Hotels',
  'Entertainment',
  'Services',
  'Automotive',
  'Gaming',
  'Coffee & Drinks'
];

const priceRanges = [
  'All Prices',
  'Under $25',
  '$25 - $50',
  '$50 - $100',
  '$100 - $200',
  'Over $200'
];

const discountRanges = [
  'All Discounts',
  '10% - 25%',
  '25% - 50%',
  '50% - 75%',
  'Over 75%'
];

export function DealsFilters() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All Prices');
  const [selectedDiscountRange, setSelectedDiscountRange] = useState('All Discounts');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center justify-center w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
        >
          <Filter className="h-5 w-5 mr-2" />
          Filters
          <ChevronDown className={`h-5 w-5 ml-2 transform transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filters Panel */}
      <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </h3>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Category
          </label>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Price Range
          </label>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range} className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  value={range}
                  checked={selectedPriceRange === range}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700">{range}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Discount Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Discount Range
          </label>
          <div className="space-y-2">
            {discountRanges.map((range) => (
              <label key={range} className="flex items-center">
                <input
                  type="radio"
                  name="discountRange"
                  value={range}
                  checked={selectedDiscountRange === range}
                  onChange={(e) => setSelectedDiscountRange(e.target.value)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700">{range}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Sort By
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option>Most Popular</option>
            <option>Newest First</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Highest Discount</option>
            <option>Ending Soon</option>
          </select>
        </div>

        {/* Clear Filters */}
        <button
          onClick={() => {
            setSelectedCategory('All Categories');
            setSelectedPriceRange('All Prices');
            setSelectedDiscountRange('All Discounts');
          }}
          className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </>
  );
}
