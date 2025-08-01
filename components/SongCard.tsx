import React from 'react';
import { Play, Heart, Eye, MoreHorizontal, Plus, X } from 'lucide-react';
import { Song } from '@/types';
import { useTheme } from '@/app/page';

interface SongCardProps {
  song: Song;
  onPlay: (song: Song) => void;
  formatNumber: (num: number) => string;
  onAddToPlaylist?: (song: Song) => void;
  showRemoveButton?: boolean;
  onRemove?: () => void;
}

const SongCard: React.FC<SongCardProps> = ({ 
  song, 
  onPlay, 
  formatNumber, 
  onAddToPlaylist,
  showRemoveButton = false,
  onRemove
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`flex items-center p-3 ${isDarkMode ? 'bg-gray-800/50 hover:bg-gray-800' : 'bg-white/50 hover:bg-white border border-gray-200'} rounded-lg transition-all group`}>
      <div className="relative mr-3">
        <img
          src={song.image}
          alt={song.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <button
          onClick={() => onPlay(song)}
          className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Play className="text-white" size={16} fill="white" />
        </button>
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} truncate`}>{song.name}</h3>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm truncate`}>{song.artist}</p>
        <div className="flex items-center space-x-4 mt-1">
          <div className="flex items-center space-x-1">
            <Eye size={12} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
            <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-xs`}>{formatNumber(song.views)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Heart size={12} className={`${song.isLiked ? 'text-red-400 fill-red-400' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-xs`}>{formatNumber(song.likes)}</span>
          </div>
          <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-xs`}>{song.language}</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 ml-3">
        {showRemoveButton && onRemove && (
          <button 
            onClick={onRemove}
            className={`p-1 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded-full transition-colors text-red-400 hover:text-red-300`}
          >
            <X size={16} />
          </button>
        )}
        {onAddToPlaylist && (
          <button 
            onClick={() => onAddToPlaylist(song)}
            className={`p-1 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded-full transition-colors`}
          >
            <Plus size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
          </button>
        )}
        <button className={`p-1 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded-full transition-colors`}>
          <MoreHorizontal size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
        </button>
      </div>
    </div>
  );
};

export default SongCard;