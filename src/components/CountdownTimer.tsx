import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import { FaCalendarAlt, FaClock, FaHeart } from 'react-icons/fa';

interface CountdownTimerProps {
  targetDate: Date;
  eventName: string;
  isElapsedTime?: boolean; // Novo parâmetro para indicar se é contagem de tempo decorrido
}

export default function CountdownTimer({ targetDate, eventName, isElapsedTime = false }: CountdownTimerProps) {
  // Estado para armazenar o tempo decorrido
  const [elapsedTime, setElapsedTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Efeito para calcular o tempo decorrido desde 7 de setembro de 2024
  useEffect(() => {
    if (isElapsedTime) {
      const startDate = new Date('2024-09-07T00:00:00');
      
      const updateElapsedTime = () => {
        const now = new Date();
        // Verificamos se a data de início já passou
        if (now < startDate) {
          setElapsedTime({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
          });
          return;
        }
        
        const diffInMs = now.getTime() - startDate.getTime();
        const diffInSecs = Math.floor(diffInMs / 1000);
        
        const days = Math.floor(diffInSecs / (24 * 60 * 60));
        const hours = Math.floor((diffInSecs % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((diffInSecs % (60 * 60)) / 60);
        const seconds = Math.floor(diffInSecs % 60);
        
        setElapsedTime({ days, hours, minutes, seconds });
      };
      
      // Atualizamos imediatamente e configuramos um intervalo
      updateElapsedTime();
      const intervalId = setInterval(updateElapsedTime, 1000);
      
      // Limpamos o intervalo quando o componente for desmontado
      return () => clearInterval(intervalId);
    }
  }, [isElapsedTime]);

  // Renderizador para o tempo decorrido
  const renderElapsedTime = () => {
    return (
      <div className="flex flex-col items-center bg-primary-light/40 dark:bg-primary-dark/40 rounded-xl shadow-lg overflow-hidden p-4 sm:p-6 md:p-8">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
          <FaClock className="text-primary-color text-base sm:text-xl" />
          <h3 className="text-base sm:text-xl font-semibold text-primary-color">
            {eventName}
          </h3>
        </div>
        
        <div className="grid grid-cols-4 gap-1 sm:gap-2 md:gap-4 text-center w-full max-w-lg">
          <div className="flex flex-col p-2 sm:p-3 md:p-5 bg-gradient-to-b from-primary-light to-white/80 dark:from-primary-dark/30 dark:to-primary-dark/40 rounded-lg shadow-sm border border-primary-light dark:border-primary-dark/20">
            <span className="text-xl sm:text-2xl md:text-4xl font-bold text-primary-dark dark:text-primary-light font-elegant">{elapsedTime.days}</span>
            <span className="text-2xs sm:text-xs md:text-sm text-text-dark dark:text-gray-300 mt-1 uppercase tracking-wider font-medium">Dias</span>
          </div>
          <div className="flex flex-col p-2 sm:p-3 md:p-5 bg-gradient-to-b from-primary-light to-white/80 dark:from-primary-dark/30 dark:to-primary-dark/40 rounded-lg shadow-sm border border-primary-light dark:border-primary-dark/20">
            <span className="text-xl sm:text-2xl md:text-4xl font-bold text-primary-dark dark:text-primary-light font-elegant">{elapsedTime.hours}</span>
            <span className="text-2xs sm:text-xs md:text-sm text-text-dark dark:text-gray-300 mt-1 uppercase tracking-wider font-medium">Hrs</span>
          </div>
          <div className="flex flex-col p-2 sm:p-3 md:p-5 bg-gradient-to-b from-primary-light to-white/80 dark:from-primary-dark/30 dark:to-primary-dark/40 rounded-lg shadow-sm border border-primary-light dark:border-primary-dark/20">
            <span className="text-xl sm:text-2xl md:text-4xl font-bold text-primary-dark dark:text-primary-light font-elegant">{elapsedTime.minutes}</span>
            <span className="text-2xs sm:text-xs md:text-sm text-text-dark dark:text-gray-300 mt-1 uppercase tracking-wider font-medium">Min</span>
          </div>
          <div className="flex flex-col p-2 sm:p-3 md:p-5 bg-gradient-to-b from-primary-light to-white/80 dark:from-primary-dark/30 dark:to-primary-dark/40 rounded-lg shadow-sm border border-primary-light dark:border-primary-dark/20">
            <span className="text-xl sm:text-2xl md:text-4xl font-bold text-primary-dark dark:text-primary-light font-elegant">{elapsedTime.seconds}</span>
            <span className="text-2xs sm:text-xs md:text-sm text-text-dark dark:text-gray-300 mt-1 uppercase tracking-wider font-medium">Seg</span>
          </div>
        </div>
        
        <div className="mt-3 sm:mt-5 text-center text-xs sm:text-sm text-text-light dark:text-gray-400 flex flex-col items-center space-y-1">
          <div className="flex items-center gap-1">
            <FaHeart className="text-red-400 text-xs animate-pulse" />
            <span>Desde 7 de setembro, construindo memórias juntos</span>
            <FaHeart className="text-red-400 text-xs animate-pulse" />
          </div>
          <p>Que continue por muitos anos!</p>
        </div>
      </div>
    );
  };

  // Renderizador personalizado para a contagem regressiva
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return (
        <div className="text-center bg-primary-light/40 dark:bg-primary-dark/40 rounded-xl shadow-lg overflow-hidden p-4 sm:p-6">
          <div className="flex justify-center mb-2 sm:mb-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-light/70 dark:bg-primary-dark/50 flex items-center justify-center">
              <FaCalendarAlt className="text-primary-color text-base sm:text-xl" />
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-primary-color">É hoje! 🎉</h3>
          <p className="text-base sm:text-lg font-elegant text-text-dark dark:text-gray-300">{eventName} chegou!</p>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center bg-primary-light/40 dark:bg-primary-dark/40 rounded-xl shadow-lg overflow-hidden p-4 sm:p-6 md:p-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
            <FaClock className="text-primary-color text-base sm:text-xl" />
            <h3 className="text-base sm:text-xl font-semibold text-primary-color">
              Contagem para {eventName}
            </h3>
          </div>
          
          <div className="grid grid-cols-4 gap-1 sm:gap-2 md:gap-4 text-center w-full max-w-lg">
            <div className="flex flex-col p-2 sm:p-3 md:p-5 bg-gradient-to-b from-primary-light to-white/80 dark:from-primary-dark/30 dark:to-primary-dark/40 rounded-lg shadow-sm border border-primary-light dark:border-primary-dark/20">
              <span className="text-xl sm:text-2xl md:text-4xl font-bold text-primary-dark dark:text-primary-light font-elegant">{days}</span>
              <span className="text-2xs sm:text-xs md:text-sm text-text-dark dark:text-gray-300 mt-1 uppercase tracking-wider font-medium">Dias</span>
            </div>
            <div className="flex flex-col p-2 sm:p-3 md:p-5 bg-gradient-to-b from-primary-light to-white/80 dark:from-primary-dark/30 dark:to-primary-dark/40 rounded-lg shadow-sm border border-primary-light dark:border-primary-dark/20">
              <span className="text-xl sm:text-2xl md:text-4xl font-bold text-primary-dark dark:text-primary-light font-elegant">{hours}</span>
              <span className="text-2xs sm:text-xs md:text-sm text-text-dark dark:text-gray-300 mt-1 uppercase tracking-wider font-medium">Hrs</span>
            </div>
            <div className="flex flex-col p-2 sm:p-3 md:p-5 bg-gradient-to-b from-primary-light to-white/80 dark:from-primary-dark/30 dark:to-primary-dark/40 rounded-lg shadow-sm border border-primary-light dark:border-primary-dark/20">
              <span className="text-xl sm:text-2xl md:text-4xl font-bold text-primary-dark dark:text-primary-light font-elegant">{minutes}</span>
              <span className="text-2xs sm:text-xs md:text-sm text-text-dark dark:text-gray-300 mt-1 uppercase tracking-wider font-medium">Min</span>
            </div>
            <div className="flex flex-col p-2 sm:p-3 md:p-5 bg-gradient-to-b from-primary-light to-white/80 dark:from-primary-dark/30 dark:to-primary-dark/40 rounded-lg shadow-sm border border-primary-light dark:border-primary-dark/20">
              <span className="text-xl sm:text-2xl md:text-4xl font-bold text-primary-dark dark:text-primary-light font-elegant">{seconds}</span>
              <span className="text-2xs sm:text-xs md:text-sm text-text-dark dark:text-gray-300 mt-1 uppercase tracking-wider font-medium">Seg</span>
            </div>
          </div>
          
          <div className="mt-3 sm:mt-5 text-center text-xs sm:text-sm text-text-light dark:text-gray-400 flex flex-col items-center space-y-1">
            <div className="flex items-center gap-1">
              <FaHeart className="text-red-400 text-xs animate-pulse" />
              <span>Desde 7 de setembro, construindo memórias juntos</span>
              <FaHeart className="text-red-400 text-xs animate-pulse" />
            </div>
            <p>Que continue por muitos anos!</p>
          </div>
        </div>
      );
    }
  };

  // Se é contagem de tempo decorrido, usamos o renderizador personalizado
  if (isElapsedTime) {
    return renderElapsedTime();
  }

  // Caso contrário, usamos o Countdown padrão
  return (
    <Countdown date={targetDate} renderer={renderer} />
  );
} 