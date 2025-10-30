'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';

export function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Hide navbar on video page since it has its own floating nav
  if (pathname === '/video') {
    return null;
  }
  
  return <Navbar />;
}

export function ConditionalFooter() {
  const pathname = usePathname();
  
  // Hide footer on video page for full-screen experience
  if (pathname === '/video') {
    return null;
  }
  
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2024 DealCoin. All rights reserved.</p>
      </div>
    </footer>
  );
}
