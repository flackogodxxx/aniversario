import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FaQrcode } from 'react-icons/fa';

interface QRCodeMessageProps {
  message: string;
  size?: number;
}

export default function QRCodeMessage({ message, size = 150 }: QRCodeMessageProps) {
  // Ajustar o tamanho do QR Code para telas pequenas
  const responsiveSize = typeof window !== 'undefined' && window.innerWidth < 400 ? 120 : size;
  
  return (
    <div className="flex flex-col items-center space-y-3 sm:space-y-4">
      <div className="flex items-center gap-2">
        <FaQrcode className="text-primary-color text-base sm:text-xl" />
        <h3 className="text-base sm:text-lg font-medium text-text-dark dark:text-gray-200">
          Surpresa Especial
        </h3>
      </div>
      
      <div className="bg-white p-2 sm:p-3 rounded-xl shadow-md transform transition-transform duration-300 hover:scale-105 border border-primary-light/30">
        <QRCodeSVG 
          value={message}
          size={responsiveSize}
          level="M"
          includeMargin={true}
          fgColor="var(--primary-color)"
          bgColor="#ffffff"
        />
      </div>
      
      <p className="text-xs sm:text-sm text-center text-text-light dark:text-gray-400 italic max-w-xs px-2 sm:px-0">
        Aponte a câmera do seu celular para este QR Code e descubra uma mensagem especial
      </p>
    </div>
  );
} 