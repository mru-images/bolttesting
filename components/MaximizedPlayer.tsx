import React, { useState } from 'react';
import { ChevronDown, MoreHorizontal, Heart, Share2, Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Plus, Eye } from 'lucide-react';
import { Song } from '@/types';
import { useTheme } from '@/app/page';

interface MaximizedPlayerProps {
  song: Song;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onMinimize: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onToggleLike: () => void;
  formatNumber: (num: number) => string;
  onAddToPlaylist: () => void;
}

const MaximizedPlayer: React.FC<MaximizedPlayerProps> = ({
  song,
  isPlaying,
  onTogglePlay,
  onMinimize,
  onPrevious,
  onNext,
  onToggleLike,
  formatNumber,
  onAddToPlaylist
}) => {
  const { isDarkMode } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(83); // 1:23 in seconds
  const [duration, setDuration] = useState(222); // 3:42 in seconds

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className={`fixed inset-0 ${isDarkMode ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black' : 'bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200'} z-50 flex flex-col`}>
      {/* Header - Fixed */}
      <div className="flex items-center justify-between p-4 pt-12 flex-shrink-0">
        <button 
          onClick={onMinimize} 
          className={`p-2 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} rounded-full transition-colors`}
        >
          <ChevronDown size={24} className={isDarkMode ? 'text-white' : 'text-gray-900'} />
        </button>
        <div className="text-center flex-1">
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Playing from</p>
          <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium`}>Trending Now</p>
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className={`p-2 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} rounded-full transition-colors`}
          >
            <MoreHorizontal size={24} className={isDarkMode ? 'text-white' : 'text-gray-900'} />
          </button>
          
          {/* Dropdown Menu */}
          {showMenu && (
            <div className={`absolute right-0 top-12 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg shadow-lg py-2 w-48 z-10`}>
              <button 
                onClick={() => {
                  onAddToPlaylist();
                  setShowMenu(false);
                }}
                className={`w-full text-left px-4 py-2 ${isDarkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-900'} flex items-center transition-colors`}
              >
                <Plus size={16} className="mr-3" />
                Add to Playlist
              </button>
              <button className={`w-full text-left px-4 py-2 ${isDarkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-900'} flex items-center transition-colors`}>
                <Share2 size={16} className="mr-3" />
                Share
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable Content Area - Properly contained */}
      <div className="flex-1 overflow-y-auto px-4">
        <div className="max-h-full">
          {/* Album Art - Smaller and centered */}
          <div className="flex justify-center py-6">
            <div className="relative w-56 h-56">
              <img
                src={song.image}
                alt={song.name}
                className="w-full h-full rounded-2xl object-cover shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Song Info */}
          <div className="text-center mb-6">
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{song.name}</h1>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-lg`}>{song.artist}</p>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <span className={`${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'} text-sm px-3 py-1 rounded-full`}>
                {song.language}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-1">
                <Eye size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{formatNumber(song.views)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart size={16} className={`${song.isLiked ? 'text-red-400 fill-red-400' : isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{formatNumber(song.likes)}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar with Time */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm font-mono`}>
                {formatTime(currentTime)}
              </span>
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm font-mono`}>
                {formatTime(duration)}
              </span>
            </div>
            <div className={`w-full h-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-full cursor-pointer`}>
              <div 
                className="h-full bg-purple-500 rounded-full relative transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"></div>
              </div>
            </div>
          </div>

          {/* Main Controls */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-6">
              <button className={`p-2 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} rounded-full transition-colors`}>
                <Shuffle size={24} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
              </button>
              
              <button 
                onClick={onPrevious}
                className={`p-3 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} rounded-full transition-colors`}
              >
                <SkipBack size={28} className={isDarkMode ? 'text-white' : 'text-gray-900'} />
              </button>
              
              <button
                onClick={onTogglePlay}
                className="p-4 bg-purple-500 hover:bg-purple-600 rounded-full transition-colors shadow-lg"
              >
                {isPlaying ? (
                  <Pause size={32} className="text-white" />
                ) : (
                  <Play size={32} className="text-white" fill="white" />
                )}
              </button>
              
              <button 
                onClick={onNext}
                className={`p-3 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} rounded-full transition-colors`}
              >
                <SkipForward size={28} className={isDarkMode ? 'text-white' : 'text-gray-900'} />
              </button>
              
              <button className={`p-2 ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} rounded-full transition-colors`}>
                <Repeat size={24} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
              </button>
            </div>
          </div>

          {/* Bottom Section with Like Button and Volume - Final section */}
          <div className="pb-8">
            <div className="flex items-center justify-between">
              {/* Like Button - Bottom Left */}
              <button 
                onClick={onToggleLike}
                className={`flex items-center space-x-2 px-4 py-2 ${song.isLiked ? 'bg-red-500 hover:bg-red-600' : isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} rounded-full transition-colors`}
              >
                <Heart size={18} className={`${song.isLiked ? 'text-white fill-white' : isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} />
                <span className={`text-sm font-medium ${song.isLiked ? 'text-white' : isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {song.isLiked ? 'Liked' : 'Like'}
                </span>
              </button>
              
              {/* Volume Control */}
              <div className="flex items-center space-x-3 flex-1 max-w-32 ml-6">
                <Volume2 size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                <div className={`flex-1 h-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-full`}>
                  <div className={`h-full ${isDarkMode ? 'bg-white' : 'bg-gray-600'} rounded-full w-3/4 relative`}>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaximizedPlayer;