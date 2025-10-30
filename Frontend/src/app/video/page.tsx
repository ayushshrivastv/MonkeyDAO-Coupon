import { VideoDemo } from '@/components/VideoDemo';

export const metadata = {
  title: 'Video Demo - DealCoin',
  description: 'Watch and upload demo videos showcasing DealCoin NFT marketplace features',
};

export default function VideoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <VideoDemo />
    </div>
  );
}
