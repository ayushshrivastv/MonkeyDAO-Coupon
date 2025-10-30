import { HeroSection } from '@/components/HeroSection';
import { CategoryGrid } from '@/components/CategoryGrid';
import { FeaturedDeals } from '@/components/FeaturedDeals';
import { HowItWorks } from '@/components/HowItWorks';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoryGrid />
      <FeaturedDeals />
      <HowItWorks />
    </div>
  );
}
