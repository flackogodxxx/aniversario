'use client';

import React, { useState, useEffect } from 'react';
import { FaClock, FaHeart, FaStar } from 'react-icons/fa';

interface TimeElapsedCounterProps {
  startDate: Date;
  className?: string;
}

export default function TimeElapsedCounter({ startDate, className = '' }: TimeElapsedCounterProps) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const calculateTimeElapsed = () => {
      const now = new Date();
      const timeDifference = now.getTime() - startDate.getTime();
      
      // Cálculo do tempo decorrido
      const secondsTotal = Math.floor(timeDifference / 1000);
      const minutesTotal = Math.floor(secondsTotal / 60);
      const hoursTotal = Math.floor(minutesTotal / 60);
      
      setDays(Math.floor(hoursTotal / 24));
      setHours(hoursTotal % 24);
      setMinutes(minutesTotal % 60);
      setSeconds(secondsTotal % 60);
    };

    // Calcular imediatamente
    calculateTimeElapsed();
    
    // Atualizar a cada segundo
    const interval = setInterval(calculateTimeElapsed, 1000);
    
    // Limpar intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className={`bg-white rounded-xl p-6 shadow-lg animate-fade-in ${className}`}>
      <div className="text-center mb-4">
        <FaClock className="mx-auto text-2xl text-red-400 mb-2" />
        <h2 className="text-xl font-bold text-red-400 mb-1">Tempo Juntos</h2>
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-300"></div>
          <FaHeart className="text-red-400 text-sm animate-pulse" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-300"></div>
        </div>
        <p className="text-gray-600 text-sm italic">Desde 07.09.2024</p>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-red-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-red-500">{days}</div>
          <div className="text-xs text-gray-500 mt-1">Dias</div>
        </div>
        <div className="bg-red-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-red-500">{hours}</div>
          <div className="text-xs text-gray-500 mt-1">Horas</div>
        </div>
        <div className="bg-red-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-red-500">{minutes}</div>
          <div className="text-xs text-gray-500 mt-1">Min</div>
        </div>
        <div className="bg-red-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-red-500">{seconds}</div>
          <div className="text-xs text-gray-500 mt-1">Seg</div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-600 text-sm flex items-center justify-center">
          <FaStar className="text-yellow-400 mr-1" />
          <span>Cada momento com você conta</span>
          <FaStar className="text-yellow-400 ml-1" />
        </p>
      </div>
    </div>
  );
} 