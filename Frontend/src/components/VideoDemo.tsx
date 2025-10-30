'use client';

import { useState, useRef } from 'react';
import { Upload, Play, Pause, Volume2, VolumeX, Download, Share2, Trash2, Video as VideoIcon } from 'lucide-react';

interface VideoFile {
  id: string;
  name: string;
  url: string;
  size: string;
  duration: string;
  uploadDate: string;
  thumbnail?: string;
}

export function VideoDemo() {
  const [videos, setVideos] = useState<VideoFile[]>([
    {
      id: '1',
      name: 'DealCoin Platform Overview',
      url: '/demo-video-placeholder.mp4',
      size: '25.4 MB',
      duration: '2:34',
      uploadDate: '2024-10-30',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop'
    }
  ]);
  
  const [selectedVideo, setSelectedVideo] = useState<VideoFile | null>(videos[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('video/')) {
      alert('Please select a valid video file');
      return;
    }

    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      alert('File size must be less than 100MB');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Create video URL and add to list
          const videoUrl = URL.createObjectURL(file);
          const newVideo: VideoFile = {
            id: Date.now().toString(),
            name: file.name,
            url: videoUrl,
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            duration: '0:00', // Would be calculated from actual video
            uploadDate: new Date().toISOString().split('T')[0],
          };
          
          setVideos(prev => [newVideo, ...prev]);
          setSelectedVideo(newVideo);
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const deleteVideo = (videoId: string) => {
    setVideos(prev => prev.filter(v => v.id !== videoId));
    if (selectedVideo?.id === videoId) {
      const remainingVideos = videos.filter(v => v.id !== videoId);
      setSelectedVideo(remainingVideos[0] || null);
    }
  };

  const shareVideo = (video: VideoFile) => {
    if (navigator.share) {
      navigator.share({
        title: video.name,
        text: 'Check out this DealCoin demo video!',
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Video link copied to clipboard!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          📹 Video Demo Center
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Upload and showcase demo videos of DealCoin features. Perfect for tutorials, 
          product demonstrations, and user guides.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Player */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {selectedVideo ? (
              <div className="relative">
                {/* Video Element */}
                <div className="relative bg-black aspect-video">
                  {selectedVideo.url.includes('placeholder') ? (
                    // Placeholder for demo video
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-600 to-secondary-600">
                      <div className="text-center text-white">
                        <VideoIcon className="h-24 w-24 mx-auto mb-4 opacity-50" />
                        <h3 className="text-2xl font-bold mb-2">Demo Video Placeholder</h3>
                        <p className="text-blue-200">Upload your own video to see it here</p>
                      </div>
                    </div>
                  ) : (
                    <video
                      ref={videoRef}
                      src={selectedVideo.url}
                      className="w-full h-full object-cover"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      controls={false}
                    />
                  )}
                  
                  {/* Custom Controls Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={togglePlay}
                          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                          {isPlaying ? (
                            <Pause className="h-6 w-6" />
                          ) : (
                            <Play className="h-6 w-6 ml-1" />
                          )}
                        </button>
                        
                        <button
                          onClick={toggleMute}
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                          {isMuted ? (
                            <VolumeX className="h-5 w-5" />
                          ) : (
                            <Volume2 className="h-5 w-5" />
                          )}
                        </button>
                        
                        <span className="text-sm font-medium">
                          {selectedVideo.duration}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => shareVideo(selectedVideo)}
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                          <Share2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Video Info */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedVideo.name}
                  </h2>
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <span>Size: {selectedVideo.size}</span>
                    <span>Duration: {selectedVideo.duration}</span>
                    <span>Uploaded: {new Date(selectedVideo.uploadDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ) : (
              // No video selected state
              <div className="aspect-video flex items-center justify-center bg-gray-100">
                <div className="text-center text-gray-500">
                  <VideoIcon className="h-24 w-24 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Video Selected</h3>
                  <p>Upload a video or select one from the list</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Video List & Upload */}
        <div className="space-y-6">
          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Upload New Video
            </h3>
            
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors"
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-gray-500">
                MP4, WebM, AVI up to 100MB
              </p>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            {/* Upload Progress */}
            {isUploading && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Video List */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Video Library ({videos.length})
            </h3>
            
            <div className="space-y-3">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedVideo?.id === video.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1 line-clamp-2">
                        {video.name}
                      </h4>
                      <div className="text-sm text-gray-500 space-y-1">
                        <div>{video.size} • {video.duration}</div>
                        <div>{new Date(video.uploadDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          shareVideo(video);
                        }}
                        className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteVideo(video.id);
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {videos.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <VideoIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No videos uploaded yet</p>
                  <p className="text-sm">Upload your first demo video above</p>
                </div>
              )}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              💡 Video Tips
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Keep videos under 5 minutes for best engagement</li>
              <li>• Use 1080p resolution for crisp quality</li>
              <li>• Include clear audio narration</li>
              <li>• Show key features step-by-step</li>
              <li>• Add captions for accessibility</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
