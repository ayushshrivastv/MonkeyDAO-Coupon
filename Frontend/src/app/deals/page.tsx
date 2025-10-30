import { DealsGrid } from '@/components/DealsGrid';
import { DealsFilters } from '@/components/DealsFilters';

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Deals
          </h1>
          <p className="text-gray-600">
            Discover amazing NFT deals from verified merchants
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <DealsFilters />
          </div>

          {/* Deals Grid */}
          <div className="lg:col-span-3">
            <DealsGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
