import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaCamera } from 'react-icons/fa';

type Photo = {
  src: string;
  alt: string;
};

interface PhotoGalleryProps {
  photos: Photo[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Reset loading state when image changes
  useEffect(() => {
    setIsLoading(true);
  }, [currentIndex]);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const goToPrevious = () => {
    const isFirstPhoto = currentIndex === 0;
    const newIndex = isFirstPhoto ? photos.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastPhoto = currentIndex === photos.length - 1;
    const newIndex = isLastPhoto ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left, go next
      goToNext();
    }
    
    if (touchStart - touchEnd < -50) {
      // Swipe right, go previous
      goToPrevious();
    }
  };

  if (photos.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-48 sm:h-64 bg-primary-light/30 dark:bg-primary-dark/10 rounded-lg border border-primary-light dark:border-primary-dark/20">
        <FaCamera className="text-primary-color/70 dark:text-primary-color/70 text-3xl sm:text-4xl mb-3 sm:mb-4" />
        <p className="text-text-light dark:text-gray-400 text-sm sm:text-base">Nenhuma foto disponível</p>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 max-w-2xl mx-auto group overflow-hidden rounded-xl shadow-lg"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Indicador de deslize para dispositivos móveis */}
      {isMobile && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 bg-black/40 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm animate-pulse">
          Deslize para navegar
        </div>
      )}
      
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800/30 z-0">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-t-primary-color border-primary-light/30 animate-spin"></div>
      </div>

      <div className="relative w-full h-full z-10">
        <Image
          src={photos[currentIndex].src}
          alt={photos[currentIndex].alt}
          fill
          className={`object-cover transition-all duration-700 ease-in-out hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          onLoad={() => setIsLoading(false)}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
        
        <div className="absolute bottom-4 left-4 text-white text-xs sm:text-sm md:text-base px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg max-w-[85%] sm:max-w-[70%]">
          <p className="font-elegant italic truncate">{photos[currentIndex].alt}</p>
        </div>
      </div>

      {/* Navegação */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/60 backdrop-blur-sm rounded-full flex justify-center items-center text-primary-dark hover:bg-white/80 shadow-lg transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-color"
        aria-label="Foto anterior"
      >
        <FaChevronLeft className="text-sm sm:text-base" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/60 backdrop-blur-sm rounded-full flex justify-center items-center text-primary-dark hover:bg-white/80 shadow-lg transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-color"
        aria-label="Próxima foto"
      >
        <FaChevronRight className="text-sm sm:text-base" />
      </button>

      {/* Contador de fotos e navegação de pontos */}
      <div className="absolute bottom-4 right-4 flex gap-1 sm:gap-1.5">
        {photos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${idx === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
            aria-label={`Ir para foto ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 