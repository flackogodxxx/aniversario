import React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon
} from 'react-share';
import { FaShare } from 'react-icons/fa';

interface ShareButtonsProps {
  url: string;
  title: string;
  message?: string;
}

export default function ShareButtons({ url, title, message = 'Veja esta surpresa especial que preparei para você!' }: ShareButtonsProps) {
  // Tamanho responsivo para os ícones
  const iconSize = typeof window !== 'undefined' && window.innerWidth < 400 ? 32 : 40;
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <FaShare className="text-primary-color text-base sm:text-xl" />
        <h3 className="text-base sm:text-lg font-medium text-text-dark dark:text-gray-200">
          Compartilhe o amor
        </h3>
      </div>

      <p className="text-xs sm:text-sm text-center text-text-light dark:text-gray-400 mb-3 sm:mb-5 max-w-xs px-2 sm:px-0">
        Compartilhe esta surpresa com outras pessoas especiais
      </p>
      
      <div className="flex justify-center gap-2 sm:gap-3">
        <div className="transform transition-all duration-300 hover:scale-110 hover:-rotate-6">
          <FacebookShareButton url={url} hashtag="#surpresaespecial">
            <FacebookIcon size={iconSize} round className="shadow-md" />
          </FacebookShareButton>
        </div>
        
        <div className="transform transition-all duration-300 hover:scale-110 hover:rotate-6">
          <WhatsappShareButton url={url} title={`${title}\n${message}`}>
            <WhatsappIcon size={iconSize} round className="shadow-md" />
          </WhatsappShareButton>
        </div>
        
        <div className="transform transition-all duration-300 hover:scale-110 hover:-rotate-6">
          <TelegramShareButton url={url} title={title}>
            <TelegramIcon size={iconSize} round className="shadow-md" />
          </TelegramShareButton>
        </div>
        
        <div className="transform transition-all duration-300 hover:scale-110 hover:rotate-6">
          <TwitterShareButton url={url} title={message}>
            <TwitterIcon size={iconSize} round className="shadow-md" />
          </TwitterShareButton>
        </div>
      </div>
    </div>
  );
} 