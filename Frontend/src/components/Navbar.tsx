'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">DealCoin</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/deals" className="text-gray-700 hover:text-primary-600 font-medium">
              Browse Deals
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-primary-600 font-medium">
              Categories
            </Link>
            <Link href="/merchant" className="text-gray-700 hover:text-primary-600 font-medium">
              For Merchants
            </Link>
            <Link href="/my-coupons" className="text-gray-700 hover:text-primary-600 font-medium">
              My Coupons
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search deals..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Wallet Button */}
          <div className="flex items-center space-x-4">
            {mounted ? (
              <WalletMultiButton className="!bg-primary-600 hover:!bg-primary-700" />
            ) : (
              <div className="h-10 w-32 bg-primary-600 rounded-lg animate-pulse"></div>
            )}
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search deals..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <Link 
                href="/deals" 
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Deals
              </Link>
              <Link 
                href="/categories" 
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                href="/merchant" 
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                For Merchants
              </Link>
              <Link 
                href="/my-coupons" 
                className="text-gray-700 hover:text-primary-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                My Coupons
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
