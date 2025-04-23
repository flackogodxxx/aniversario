import React, { useState, useEffect, useRef } from 'react';
import { FaMusic, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

interface BackgroundMusicProps {
  audioSrc: string;
  autoPlay?: boolean;
}

export default function BackgroundMusic({ audioSrc, autoPlay = false }: BackgroundMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showVolume, setShowVolume] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Verificar se é dispositivo móvel
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    if (audioRef.current) {
      audioRef.current.volume = volume;
      
      if (autoPlay) {
        // Tentativa de autoplay
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              // Autoplay foi bloqueado pelo navegador
              console.log('Autoplay foi bloqueado pelo navegador:', error);
              setIsPlaying(false);
            });
        }
      }
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [autoPlay, volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-3 sm:left-6 z-50">
      <div className="relative group">
        <button
          onClick={togglePlay}
          onMouseEnter={() => !isMobile && setShowVolume(true)}
          onTouchStart={() => isMobile && setShowVolume(!showVolume)}
          className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-card-bg-dark text-primary-color rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-light/30 dark:border-primary-dark/30 transform hover:scale-105"
          aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
        >
          {isPlaying ? <FaVolumeUp size={isMobile ? 16 : 20} /> : <FaMusic size={isMobile ? 16 : 20} />}
        </button>
        
        {/* Tooltip - apenas para desktop */}
        {!isMobile && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-white dark:bg-card-bg-dark text-text-dark dark:text-gray-200 text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            {isPlaying ? 'Pausar música' : 'Tocar música de fundo'}
          </div>
        )}
        
        {/* Controle de volume */}
        <div 
          className={`absolute -top-16 sm:-top-20 left-1/2 -translate-x-1/2 p-2 sm:p-3 bg-white dark:bg-card-bg-dark rounded-lg shadow-lg transition-all duration-300 ${showVolume ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          onMouseEnter={() => !isMobile && setShowVolume(true)}
          onMouseLeave={() => !isMobile && setShowVolume(false)}
          onClick={(e) => isMobile && e.stopPropagation()}
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 sm:w-24 accent-primary-color"
          />
        </div>
      </div>
      <audio ref={audioRef} src={audioSrc} loop />
    </div>
  );
} 