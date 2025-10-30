import { FloatingNavDemo } from '@/components/FloatingNavDemo';

export const metadata = {
  title: 'Video Demo - DealCoin',
  description: 'Watch and upload demo videos showcasing DealCoin NFT marketplace features',
};

export default function VideoPage() {
  return (
    <div className="relative w-full min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      <FloatingNavDemo />
        <div className="w-full flex items-center justify-center pt-32 pb-16" style={{ minHeight: 'calc(100vh - 200px)' }}>
          <div className="text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-light mb-6 text-white" style={{ textShadow: '0 0 20px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,1), 0 0 60px rgba(0,0,0,0.9), 2px 2px 8px rgba(0,0,0,1)', WebkitTextStroke: '1px rgba(0,0,0,0.8)' }}>
              Video Demo
            </h1>
            <p className="text-white text-lg mb-6 max-w-2xl mx-auto leading-relaxed" style={{ textShadow: '0 0 15px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,1), 2px 2px 6px rgba(0,0,0,1)', WebkitTextStroke: '0.5px rgba(0,0,0,0.8)' }}>
              DealCoin revolutionizes the coupon marketplace by transforming deals into tradeable NFTs on Solana. Watch our comprehensive demo to see how merchants create exclusive offers and users collect valuable digital coupons.
            </p>
            <p className="text-white text-lg mb-6 max-w-2xl mx-auto leading-relaxed" style={{ textShadow: '0 0 15px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,1), 2px 2px 6px rgba(0,0,0,1)', WebkitTextStroke: '0.5px rgba(0,0,0,0.8)' }}>
              Experience seamless wallet integration, browse curated deal categories, and discover how blockchain technology ensures authentic, fraud-proof discounts. Every coupon is a unique NFT with verifiable ownership and redemption history.
            </p>
            
            {/* Featured Demo Video */}
            <div className="mt-16 bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-6">Featured Demo</h3>
              <div className="aspect-video bg-gradient-to-br from-primary-900/50 to-secondary-900/50 rounded-xl flex items-center justify-center border border-white/10">
                <div className="text-center text-white/80">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15a2 2 0 012 2v0a2 2 0 01-2 2h-3.586a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H5a2 2 0 01-2-2v0a2 2 0 012-2h1.586a1 1 0 01.707.293l2.414 2.414A1 1 0 0010.414 11H12a2 2 0 012 2v0a2 2 0 01-2 2h-1.586a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 004.586 11H3a2 2 0 01-2-2v0a2 2 0 012-2h1.586a1 1 0 01.707.293l2.414 2.414A1 1 0 008.414 9H10a2 2 0 012 2v0a2 2 0 01-2 2H8.414a1 1 0 01-.707-.293L5.293 10.293A1 1 0 004.586 10H3a2 2 0 01-2-2v0a2 2 0 012-2h1.586a1 1 0 01.707.293l2.414 2.414A1 1 0 008.414 8H10a2 2 0 012 2v0a2 2 0 01-2 2H8.414a1 1 0 01-.707-.293L5.293 7.293A1 1 0 004.586 7H3a2 2 0 01-2-2v0a2 2 0 012-2h1.586a1 1 0 01.707.293l2.414 2.414A1 1 0 008.414 5H10a2 2 0 012 2v0a2 2 0 01-2 2H8.414a1 1 0 01-.707-.293L5.293 4.293A1 1 0 004.586 4H3a2 2 0 01-2-2v0a2 2 0 012-2h1.586a1 1 0 01.707.293l2.414 2.414A1 1 0 008.414 2H10" />
                  </svg>
                  <p className="text-lg font-medium">DealCoin Platform Overview</p>
                  <p className="text-sm text-white/60 mt-2">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
