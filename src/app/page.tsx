'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import BackgroundMusic from '@/components/BackgroundMusic';
import Quiz from '@/components/Quiz';
import { FaHeart, FaQuoteLeft, FaQuoteRight, FaUnlock, FaGift, FaBirthdayCake, FaStar, FaCamera, FaCalendarAlt, FaHourglass } from 'react-icons/fa';
import Head from 'next/head';

// Lembranças especiais - adicione eventos reais de vocês
const MEMORIAS = [
  {
    data: "7 de Setembro",
    evento: "Nosso primeiro encontro",
    descricao: "Foi quando te mandei a primeira mensagem!"
  },
  {
    data: "12 de dezembro",
    evento: "Festa da fio",
    descricao: "Festinha top dms!"
  },
];

// Mensagens especiais de aniversário - personalize com mensagens suas
const MENSAGENS_ANIVERSARIO = [
  "Seu sorriso tem o poder de transformar meu dia. Cada momento com você nos aproxima mais estamos seguindo no ritmo certo..",
];

// A data do primeiro encontro - 7 de setembro de 2024
const FIRST_MEETING_DATE = new Date(2024, 8, 7); // Mês é 0-indexed, então 8 = setembro

// Data para contagem regressiva (1 mês a partir de agora)
const TARGET_DATE = new Date();
TARGET_DATE.setMonth(TARGET_DATE.getMonth() + 1);

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [transitionState, setTransitionState] = useState('initial');
  const [showMemoryModal, setShowMemoryModal] = useState(false);
  const [randomMessage, setRandomMessage] = useState("");
  const [timeTogetherText, setTimeTogetherText] = useState("");
  
  // Referência para o parallax
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  // Função para calcular o tempo juntos ou tempo faltante
  const calculateTimeTogether = () => {
    const now = new Date();
    const diffTime = FIRST_MEETING_DATE.getTime() - now.getTime();
    
    // Se a data for no futuro
    if (diffTime > 0) {
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const diffMonths = Math.floor(diffDays / 30);
      
      if (diffMonths > 0) {
        const remainingDays = diffDays % 30;
        return `Faltam ${diffMonths} ${diffMonths === 1 ? 'mês' : 'meses'} e ${remainingDays} ${remainingDays === 1 ? 'dia' : 'dias'}`;
      } else {
        return `Faltam ${diffDays} ${diffDays === 1 ? 'dia' : 'dias'}`;
      }
    } 
    // Se a data já passou
    else {
      const absDiffTime = Math.abs(diffTime);
      const diffDays = Math.floor(absDiffTime / (1000 * 60 * 60 * 24));
      const diffMonths = Math.floor(diffDays / 30);
      const diffYears = Math.floor(diffDays / 365);
      
      const remainingMonths = diffMonths % 12;
      const remainingDays = diffDays % 30;
      
      let text = "";
      
      if (diffYears > 0) {
        text += `${diffYears} ${diffYears === 1 ? 'ano' : 'anos'}`;
        
        if (remainingMonths > 0) {
          text += ` e ${remainingMonths} ${remainingMonths === 1 ? 'mês' : 'meses'}`;
        }
      } else if (diffMonths > 0) {
        text += `${diffMonths} ${diffMonths === 1 ? 'mês' : 'meses'}`;
        
        if (remainingDays > 0) {
          text += ` e ${remainingDays} ${remainingDays === 1 ? 'dia' : 'dias'}`;
        }
      } else {
        text += `${diffDays} ${diffDays === 1 ? 'dia' : 'dias'}`;
      }
      
      return text;
    }
  };
  
  // Garantir que o parallax não cause problemas no iOS
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxRef.current || 
          /iPad|iPhone|iPod/.test(navigator.userAgent)) return;
      
      const x = (window.innerWidth - e.pageX * 2) / 100;
      const y = (window.innerHeight - e.pageY * 2) / 100;
      
      parallaxRef.current.style.transform = `translateX(${x}px) translateY(${y}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Atualizar o contador de tempo a cada segundo
  useEffect(() => {
    if (!isMounted) return;
    
    setTimeTogetherText(calculateTimeTogether());
    
    const timer = setInterval(() => {
      setTimeTogetherText(calculateTimeTogether());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isMounted]);
  
  // Evitar erros de hidratação
  useEffect(() => {
    setIsMounted(true);
    
    // Detectar se é um dispositivo iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    // Adicionar classe ao body para estilos específicos de iOS
    if (isIOS && typeof document !== 'undefined') {
      document.body.classList.add('ios-device');
    }
    
    // Sempre começar com o quiz quando a página é carregada
    setQuizCompleted(false);
    
    // Limpar quaisquer estados anteriores se existirem
    if (sessionStorage.getItem('quizInProgress') === 'true') {
      // Se o usuário estava no meio do quiz e atualizou a página,
      // manter apenas o score se existir, mas começar o quiz novamente
      const savedScore = localStorage.getItem('quizScore');
      if (savedScore) {
        setQuizScore(Number(savedScore));
      }
    }
    
    // Marcar que o quiz está em progresso
    sessionStorage.setItem('quizInProgress', 'true');
  }, []);

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    setShowConfetti(true);
    
    // Primeiro passo da transição - mostrar a animação de desbloqueio
    setTransitionState('unlock');
    setShowUnlockAnimation(true);
    
    // Personalizar a mensagem baseada na pontuação
    if (score === 5) {
      // Mensagem para pontuação máxima
    } else if (score >= 3) {
      // Mensagem para pontuação boa
    } else {
      // Mensagem para pontuação baixa
    }
    
    // Segundo passo - após 3 segundos, iniciar efeito de desvanecimento
    setTimeout(() => {
      setTransitionState('fading');
    }, 3000);
    
    // Terceiro passo - após 1s adicional, mostrar conteúdo principal
    setTimeout(() => {
      setQuizCompleted(true);
      
      // Guardar apenas a pontuação, sem marcar como completo permanentemente
      localStorage.setItem('quizScore', score.toString());
      
      // Ocultar confete após aparecer a página principal
      setTimeout(() => {
        setShowConfetti(false);
        setShowUnlockAnimation(false);
      }, 3000);
    }, 4000);
  };

  // Escolher uma mensagem aleatória quando a página principal for mostrada
  useEffect(() => {
    if (quizCompleted) {
      const randomIndex = Math.floor(Math.random() * MENSAGENS_ANIVERSARIO.length);
      setRandomMessage(MENSAGENS_ANIVERSARIO[randomIndex]);
    }
  }, [quizCompleted]);

  // Função otimizada para eventos de toque
  const handleTouchStart = (e: React.TouchEvent) => {
    // Prevenir zoom indesejado em iOS
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  };

  if (!isMounted) {
    return null;
  }

  if (!quizCompleted) {
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="theme-color" content="#fff0f3" />
          <meta name="apple-mobile-web-app-title" content="Feliz Aniversário" />
        </Head>
        {/* Camada de transição animada */}
        {showUnlockAnimation && (
          <div className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-1000 
          ${transitionState === 'fading' ? 'opacity-0' : 'opacity-100'} 
          ${transitionState === 'initial' ? 'unlock-reveal' : ''}
          transition-container ${transitionState === 'fading' ? 'fade-out' : ''}`}>
            <div className="text-center max-w-sm mx-auto p-8 rounded-xl bg-white/10 backdrop-blur-md blur-transition">
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-red-400/20 dark:bg-red-500/20 animate-pulse-soft"></div>
                <FaGift className="text-red-400 dark:text-red-500 mx-auto text-6xl sm:text-7xl relative animate-bounce mb-2" />
              </div>
              
              <FaUnlock className="text-red-400 dark:text-red-500 mx-auto text-3xl animate-fade-in-scale mb-4" />
              
              <h2 className="text-xl sm:text-2xl font-bold text-red-400 dark:text-red-500 mb-3 animate-fade-in-scale">
                Surpresa Desbloqueada!
              </h2>
              
              <p className="text-text-dark dark:text-gray-300 mb-4 opacity-90">
                {quizScore === 5 ? (
                  <span className="font-semibold">UAU! Você acertou todas! Você realmente me conhece muito bem! ❤️</span>
                ) : quizScore >= 3 ? (
                  <span>Muito bom! Você acertou {quizScore} de 5 perguntas. Estamos no caminho certo!</span>
                ) : (
                  <span>Hmm... Apenas {quizScore} de 5 acertos. Precisamos conversar mais!</span>
                )}
              </p>
              
              <div className="mt-2 text-text-light dark:text-gray-400 text-sm opacity-75 slow-pulse">
                Preparando sua surpresa especial...
              </div>
            </div>
            
            {showConfetti && (
              <div className="confetti-animation celebration-confetti">
                {Array.from({ length: 120 }).map((_, i) => {
                  // Gerar cores aleatórias com predominância de vermelhos
                  const isRed = Math.random() > 0.3; // 70% de chance de ser vermelho
                  const hue = isRed ? Math.random() * 30 + 350 : Math.random() * 360; // 350-20 são tons de vermelho
                  return (
                    <div key={i} className="confetti-piece" style={{
                      left: `${Math.random() * 100}%`,
                      top: `-5%`,
                      backgroundColor: `hsl(${hue}, 80%, ${isRed ? 60 : 65}%)`,
                      width: `${Math.random() * 10 + 5}px`,
                      height: `${Math.random() * 16 + 6}px`,
                      transform: `rotate(${Math.random() * 360}deg)`,
                      animationDuration: `${Math.random() * 3 + 2}s`,
                      animationDelay: `${Math.random() * 0.5}s`
                    }}></div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        <Quiz onComplete={handleQuizComplete} />
      </>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-red-50 to-pink-50 overflow-hidden ios-padding"
      onTouchStart={handleTouchStart}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#fff0f3" />
        <meta name="apple-mobile-web-app-title" content="Feliz Aniversário" />
      </Head>
      
      {/* Background decorativo de aniversário */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute text-red-400/10 dark:text-red-500/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 16 + 10}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          >
            {i % 3 === 0 ? <FaBirthdayCake className="animate-pulse-soft" /> : 
             i % 3 === 1 ? <FaGift className="animate-float" /> : 
             <FaStar className="animate-pulse-soft" />}
          </div>
        ))}
      </div>
      
      {/* Círculos decorativos animados com efeito parallax */}
      <div 
        ref={parallaxRef}
        className="fixed inset-0 pointer-events-none transition-transform duration-200 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="fixed -top-16 -right-16 w-40 sm:w-60 h-40 sm:h-60 rounded-full bg-red-400/30 blur-3xl animate-pulse-soft"></div>
        <div className="fixed top-1/3 -left-20 w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-red-300/30 blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
        <div className="fixed -bottom-16 right-1/3 w-44 sm:w-64 h-44 sm:h-64 rounded-full bg-pink-200/20 blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Confetti que continua na página principal */}
      {showConfetti && (
        <div className="confetti-animation">
          {Array.from({ length: 100 }).map((_, i) => {
            const isRed = Math.random() > 0.3;
            const hue = isRed ? Math.random() * 30 + 350 : Math.random() * 360;
            return (
              <div key={i} className="confetti-piece" style={{
                left: `${Math.random() * 100}%`,
                top: `-5%`,
                backgroundColor: `hsl(${hue}, 80%, ${isRed ? 60 : 65}%)`,
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 12 + 6}px`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 0.5}s`
              }}></div>
            );
          })}
        </div>
      )}
      
      {/* Música de fundo */}
      <BackgroundMusic 
        audioSrc="/music/background-music.mp3" 
        autoPlay={true}
      />
      
      {/* Container principal - melhorado para iOS */}
      <div className="relative max-w-4xl mx-auto px-3 sm:px-4 py-5 sm:py-8 md:py-12 ios-content-container">
        {/* Banner de aniversário - bordas mais arredondadas */}
        <div className="relative w-full flex justify-center mb-4 sm:mb-8 animate-fade-in-scale">
          <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-lg ios-card">
            <FaBirthdayCake className="text-2xl sm:text-3xl md:text-4xl text-red-400 mb-1 mx-auto" />
            <h2 className="text-base sm:text-lg md:text-2xl font-bold text-red-400 text-center">
              Feliz Aniversário, Meu bem!
            </h2>
          </div>
        </div>
        
        {/* Contador de tempo juntos - redesenhado e harmonizado */}
        <div className="relative w-full flex justify-center mb-6 sm:mb-12 animate-fade-in-scale" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white rounded-2xl shadow-lg ios-card max-w-lg w-full overflow-hidden">
            {/* Borda superior colorida para manter algum destaque visual */}
            <div className="h-1.5 w-full bg-gradient-to-r from-red-400 to-pink-400"></div>
            
            {/* Conteúdo principal com padding consistente */}
            <div className="px-3 sm:px-4 py-3 sm:py-5 ios-content">
              {/* Título simplificado */}
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-400 flex items-center justify-center ios-icon">
                  <FaHeart className="text-white text-xs" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-red-500">
                  A gente se conhece faz quanto tempo?
                </h3>
              </div>
              
              {/* Display do tempo com design mais plano e seguro para iOS */}
              <div className="w-full max-w-md mx-auto py-3 sm:py-4 px-2 sm:px-3 rounded-xl bg-red-50 mb-3 sm:mb-4 ios-time-display">
                <div className="flex items-center justify-center">
                  <div className="inline-flex items-center mr-2">
                    <FaHourglass className="text-red-500 text-base sm:text-lg" />
                  </div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 text-center">
                    {timeTogetherText}
                  </p>
                </div>
              </div>
              
              {/* Data de início simplificada */}
              <div className="flex items-center justify-center text-xs sm:text-sm text-gray-600 my-1 sm:my-2">
                <span className="inline-flex items-center gap-1 sm:gap-2">
                  <FaCalendarAlt className="text-red-400" /> 
                  <span>Desde 7 de setembro de 2024</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Cabeçalho - bordas mais arredondadas */}
        <header className="text-center mb-6 sm:mb-10 md:mb-16 animate-fade-in-scale bg-white rounded-2xl p-4 sm:p-6 shadow-lg ios-card">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-red-400 mb-3 sm:mb-4 px-1">
            Para a pessoa que mais me odeia!
          </h1>
          <div className="flex justify-center items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-red-300"></div>
            <FaHeart className="text-red-400 heart-icon text-base sm:text-lg animate-pulse" />
            <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-red-300"></div>
          </div>
          
          {/* Mensagem personalizada baseada na pontuação do quiz e mensagem aleatória */}
          <div className="mt-4 sm:mt-6 text-sm sm:text-base text-center text-gray-700 animate-fade-in" style={{ animationDelay: '1s' }}>
            <p className="font-serif italic">{randomMessage}</p>
            
            {localStorage.getItem('quizScore') && (
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
                {Number(localStorage.getItem('quizScore')) === 5 ? (
                  <span>Seu conhecimento sobre mim é perfeito. Me conhece como ninguém!</span>
                ) : Number(localStorage.getItem('quizScore')) >= 3 ? (
                  <span>Cada dia juntos nos aproxima mais. Estamos no caminho certo!</span>
                ) : (
                  <span>Temos muito mais a descobrir um sobre o outro. E isso é o que torna nossa jornada tão especial!</span>
                )}
              </p>
            )}
          </div>
        </header>
        
        {/* Seção de memórias - bordas mais arredondadas */}
        <section className="mb-6 sm:mb-8 md:mb-12 bg-white rounded-2xl overflow-hidden p-3 sm:p-6 opacity-0 animate-fade-in shadow-lg ios-card" style={{ animationDelay: '0.3s', '--animation-order': '1' } as any}>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-center mb-3 sm:mb-5 text-red-400 flex items-center justify-center gap-2">
            <FaCamera className="text-red-400" /> Nossas Histórias Compartilhadas
          </h2>
          
          <div className="mx-auto max-w-md">
            <div className="relative rounded-xl overflow-hidden shadow-lg mb-4 sm:mb-5 single-image-container">
              <div className="aspect-ratio-container" style={{ paddingBottom: '75%' }}>
                <Image
                  src="/images/foto1.jpg"
                  alt="Momento especial juntos"
                  layout="fill"
                  objectFit="cover"
                  className="image-transition"
                  priority
                />
              </div>
              
              {/* Overlay com gradiente suave */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex flex-col items-center justify-end p-3 sm:p-4">
                <button
                  onClick={() => setShowMemoryModal(true)}
                  className="px-4 sm:px-6 py-2 sm:py-2.5 bg-white/90 hover:bg-white text-red-500 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 transform hover:scale-105 active:scale-95 mb-2 sm:mb-3 ios-button shadow-lg backdrop-blur-sm"
                >
                  Momento especial <FaHeart className="text-xs sm:text-sm" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="w-full flex justify-center mt-1 sm:mt-2">
            <div className="h-1 w-12 sm:w-16 md:w-24 bg-gradient-to-r from-red-300 to-red-400 rounded-full"></div>
          </div>
        </section>

        {/* Mensagem personalizada - bordas mais arredondadas */}
        <section className="mb-6 sm:mb-8 md:mb-12 bg-white rounded-2xl overflow-hidden p-4 sm:p-6 md:p-8 opacity-0 animate-fade-in shadow-lg ios-card" style={{ animationDelay: '0.6s', '--animation-order': '2' } as any}>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-center mb-3 sm:mb-4 md:mb-6 text-red-400">
            Palavras do Coração <FaHeart className="inline text-red-400 heart-icon animate-pulse" />
          </h2>
          <div className="prose max-w-none relative">
            <FaQuoteLeft className="absolute -top-2 -left-2 text-red-300 text-base sm:text-lg opacity-50 animate-float" />
            <p className="text-sm sm:text-base md:text-lg text-center italic text-gray-700 px-1 sm:px-4">
              Hoje é seu dia especial, e quero que saiba o quanto você é importante para mim.
              Desde que nos conhecemos, cada momento se transformou em uma memória preciosa.
              Seu sorriso ilumina meus dias, sua força me inspira.
              Feliz aniversário! Que este novo ciclo seja repleto de alegrias, realizações e muitas conquistas.
              Estarei sempre ao seu lado, celebrando cada conquista e superando cada desafio juntos.
              ❤️
            </p>
            <FaQuoteRight className="absolute -bottom-2 -right-2 text-red-300 text-base sm:text-lg opacity-50 animate-float" style={{ animationDelay: '0.5s' }} />
          </div>
        </section>

        {/* Rodapé com elementos de design iOS */}
        <footer className="mt-8 sm:mt-12 pt-4 sm:pt-6 md:pt-8 stagger-animation" style={{ '--animation-order': '4' } as any}>
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg text-center max-w-md mx-auto ios-card">
            <FaHeart className="text-red-400 text-xl sm:text-2xl mx-auto mb-3 sm:mb-4" />
            <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 text-red-400">
              Com Todo Meu Odio (meme obvio)
            </h2>
            <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-6">
              Que cada dia ao seu lado seja mais especial que o anterior.
            </p>
          </div>
          
          {/* Modal de memórias - design iOS */}
          {showMemoryModal && MEMORIAS.length > 0 && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md" onClick={() => setShowMemoryModal(false)}>
              <div className="bg-white p-4 sm:p-6 rounded-2xl max-w-md w-full animate-fade-in-scale shadow-xl mx-3 sm:mx-4 ios-modal" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-lg sm:text-xl font-bold text-red-400 mb-2 sm:mb-3 flex items-center gap-2">
                  <FaCalendarAlt /> {MEMORIAS[0].data}
                </h3>
                <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{MEMORIAS[0].evento}</h4>
                <p className="text-sm sm:text-base text-gray-800 mb-4 sm:mb-6 italic">"{MEMORIAS[0].descricao}"</p>
                
                <div className="flex justify-center">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setShowMemoryModal(false); }}
                    className="px-4 sm:px-5 py-2 bg-red-400 hover:bg-red-500 text-white rounded-full text-xs sm:text-sm ios-button"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}

// Adicionar CSS personalizado para as animações
const style = typeof document !== 'undefined' ? document.createElement('style') : null;
if (style) {
  style.textContent = `
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes float {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
      100% {
        transform: translateY(0);
      }
    }
    
    .animate-float {
      animation: float 3s ease-in-out infinite;
      -webkit-animation: float 3s ease-in-out infinite;
    }
    
    .animate-fade-in {
      animation: fade-in 0.5s ease-out forwards;
      -webkit-animation: fade-in 0.5s ease-out forwards;
    }
    
    .animate-fade-in-scale {
      animation: fade-in-scale 0.3s ease-out forwards;
      -webkit-animation: fade-in-scale 0.3s ease-out forwards;
    }
    
    @keyframes fade-in-scale {
      from { 
        opacity: 0;
        transform: scale(0.9);
      }
      to { 
        opacity: 1;
        transform: scale(1);
      }
    }
    
    @-webkit-keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @-webkit-keyframes float {
      0% {
        -webkit-transform: translateY(0);
      }
      50% {
        -webkit-transform: translateY(-10px);
      }
      100% {
        -webkit-transform: translateY(0);
      }
    }
    
    @-webkit-keyframes fade-in-scale {
      from { 
        opacity: 0;
        -webkit-transform: scale(0.9);
      }
      to { 
        opacity: 1;
        -webkit-transform: scale(1);
      }
    }
    
    /* Otimizações para iOS */
    @supports (-webkit-touch-callout: none) {
      /* CSS específico para iOS */
      .min-h-screen {
        /* Corrige o problema de altura 100vh no Safari iOS */
        min-height: -webkit-fill-available;
      }
      
      /* Melhora a suavidade das animações no iOS */
      .animate-float,
      .animate-fade-in,
      .animate-fade-in-scale {
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
      }
      
      /* Desativa o destaque de toque em elementos clicáveis */
      button, a {
        -webkit-tap-highlight-color: transparent;
      }
      
      /* Ajustes de padding para notch e home indicator */
      .ios-padding {
        padding-top: env(safe-area-inset-top);
        padding-bottom: env(safe-area-inset-bottom);
        padding-left: env(safe-area-inset-left);
        padding-right: env(safe-area-inset-right);
      }
      
      /* Estilo de cartões mais iOS-like */
      .ios-card {
        transform: translateZ(0); /* Ativa aceleração de hardware */
        -webkit-transform: translateZ(0);
        will-change: transform; /* Melhora performance no Safari */
        overflow: hidden;
        border-radius: 16px !important;
      }
      
      .ios-inner-card {
        border-radius: 12px;
      }
      
      /* Estilo de botões mais iOS-like */
      .ios-button {
        min-height: 44px;
        border-radius: 22px;
        font-weight: 500;
        padding-left: 20px;
        padding-right: 20px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }
      
      /* Estilo de modal mais iOS-like */
      .ios-modal {
        border-radius: 16px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      }
      
      /* Botões de compartilhamento maiores para toque */
      .ios-share-button {
        min-width: 44px;
        min-height: 44px;
      }
      
      /* Ajustar espaçamento para melhor toque */
      .ios-content-container {
        padding-left: 16px;
        padding-right: 16px;
      }
      
      /* Otimizações específicas para iOS */
      .ios-content {
        position: relative;
        z-index: 1; /* Garante que o conteúdo fique acima de qualquer elemento decorativo */
      }
      
      .ios-time-display {
        background-color: rgba(254, 226, 226, 0.5);
        -webkit-backdrop-filter: none; /* Remove o blur que pode causar bugs */
        border: 1px solid rgba(252, 165, 165, 0.2);
      }
      
      .ios-icon {
        /* Previne animações que podem causar problemas */
        animation: none !important;
        -webkit-animation: none !important;
      }
      
      /* Assegura que animações sejam suaves no iOS */
      .animate-fade-in-scale {
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
      }
      
      /* Corrige problema com a altura de imagens no Safari */
      img, svg {
        max-height: 100%;
        height: auto;
      }
    }
    
    /* Classe para estilo específico de dispositivos iOS */
    .ios-device button,
    .ios-device a.button,
    .ios-device .interactive-element {
      /* Aumentar área de toque para iOS */
      min-height: 44px;
      min-width: 44px;
    }
    
    /* Animações para o contador de tempo */
    .time-counter-display {
      position: relative;
      overflow: hidden;
    }
    
    .time-counter-display::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 50%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
      );
      animation: shine 3s infinite;
    }
    
    @keyframes shine {
      0% { left: -100%; }
      20% { left: 100%; }
      100% { left: 100%; }
    }
    
    @-webkit-keyframes shine {
      0% { left: -100%; }
      20% { left: 100%; }
      100% { left: 100%; }
    }
    
    /* Estilos para a imagem única */
    .single-image-container {
      box-shadow: 0 10px 25px rgba(0,0,0,0.08);
      transform: translateZ(0);
      -webkit-transform: translateZ(0);
      will-change: transform;
      transition: transform 0.4s ease;
    }
    
    .single-image-container:hover {
      transform: translateY(-5px) scale(1.01);
    }
    
    .aspect-ratio-container {
      position: relative;
      width: 100%;
    }
    
    .image-transition {
      transition: transform 0.8s ease;
    }
    
    .single-image-container:hover .image-transition {
      transform: scale(1.05);
    }
    
    /* Otimizações para iOS */
    @supports (-webkit-touch-callout: none) {
      .single-image-container {
        transform: none;
        -webkit-transform: none;
      }
      
      .single-image-container:hover {
        transform: none;
      }
      
      .single-image-container:hover .image-transition {
        transform: none;
      }
    }
  `;
  typeof document !== 'undefined' && document.head.appendChild(style);
}


