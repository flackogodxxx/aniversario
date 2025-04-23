'use client';

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { FaCheck, FaTimes, FaHeart, FaArrowRight, FaGift, FaGlasses, FaMapMarkerAlt } from 'react-icons/fa';
import { FaBirthdayCake } from 'react-icons/fa';
import Image from 'next/image';
import QuizOption from './QuizOption';

interface QuizProps {
  onComplete: (score: number) => void;
}

interface Question {
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

// Componente de confete otimizado
const Confetti = memo(() => (
  <div className="confetti-animation">
    {Array.from({ length: 50 }).map((_, i) => {
      const isRed = Math.random() > 0.3;
      const hue = isRed ? Math.random() * 30 + 350 : Math.random() * 360;
      return (
        <div key={i} className="confetti-piece" style={{
          left: `${Math.random() * 100}%`,
          top: `-5%`,
          backgroundColor: `hsl(${hue}, 80%, ${isRed ? 60 : 65}%)`,
          width: `${Math.random() * 6 + 4}px`,
          height: `${Math.random() * 10 + 6}px`,
          transform: `rotate(${Math.random() * 360}deg)`,
          animationDuration: `${Math.random() * 3 + 2}s`,
          animationDelay: `${Math.random() * 0.5}s`
        }}></div>
      );
    })}
  </div>
));

Confetti.displayName = 'Confetti';

export default function Quiz({ onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shake, setShake] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPresent, setShowPresent] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  // Lista de perguntas
  const questions: Question[] = [
    {
      text: "Você gostou do presente?",
      options: [
        "Craro que sim.",
        "Sim, adorei! É exatamente o que eu queria.",
        "Odiei Felipe, tchau.",
        "Estou emocionada! Você sempre sabe como me fazer sorrir."
      ],
      correctAnswerIndex: 2
    },
    {
      text: "Eu menti que ia te dar o presente?",
      options: [
        "Sim, você me enganou direitinho!",
        "Não, eu sabia que você ia me dar um presente.",
        "Talvez...",
        "Você me pegou de surpresa! Achei que voce ta mentindo."
      ],
      correctAnswerIndex: 3
    },
    {
      text: "Você está de TPM?",
      options: [
        "Sim, to estresssada.",
        "Não, estou apenas curtindo o momento.",
        "Talvez um pouquinho...",
        "Não, estou ótima! E agora ainda mais feliz."
      ],
      correctAnswerIndex: 3
    },
    {
      text: "Qual ingrediente especial para mim te fazer feliz?",
      options: [
        "Ser eu mesmo",
        "Ficar quieto",
        "Te obdecer sempre",
        "Impossivel voce me fazer feliz"
      ],
      correctAnswerIndex: 3
    },
    {
      text: "Churrasco em casa esse final de semana?",
      options: [
        "Sim, comemorar ne!",
        "Nao vai ter nada nao fia."
      ],
      correctAnswerIndex: 1
    }
  ];

  // Função para selecionar uma opção
  function handleOptionSelect(optionIndex: number) {
    if (showFeedback || isProcessing) return;
    
    setIsProcessing(true);
    setSelectedOption(optionIndex);
    
    const correct = optionIndex === questions[currentQuestion].correctAnswerIndex;
    setIsCorrect(correct);
    
    // Vibração para feedback tátil
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(correct ? [100] : [50, 50, 50]);
    }
    
    // Efeito de shake em caso de erro
    if (!correct) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
    
    // Usar setTimeout para garantir que a mudança de estado seja processada
    setTimeout(() => {
      setShowFeedback(true);
      
      if (correct) {
        setScore(prev => prev + 1);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2500);
      }
      
      setIsProcessing(false);
    }, 200);
  }

  // Função para ir para a próxima pergunta
  function handleNext() {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    setTimeout(() => {
      setSelectedOption(null);
      setShowFeedback(false);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setIsProcessing(false);
      } else {
        setShowPresent(true);
        setIsProcessing(false);
      }
    }, 200);
  }

  // Função para continuar para os resultados
  function handleContinueToResults() {
    if (isProcessing) return;
    
    setShowPasswordModal(true);
  }

  // Função para verificar a senha
  function handlePasswordSubmit() {
    if (password === "777") {
      setIsProcessing(true);
      setShowPasswordModal(false);
      
      setTimeout(() => {
        onComplete(score);
        setIsProcessing(false);
      }, 200);
    } else {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 1500);
    }
  }

  // Função para iniciar o quiz
  function handleStartQuiz() {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      setShowIntro(false);
      setIsProcessing(false);
    }, 200);
  }

  // Feedback personalizado
  function getFeedbackMessage(isCorrect: boolean, questionIndex: number) {
    if (isCorrect) {
      const messages = [
        "Eu sabia que você ia escolher essa! Você me conhece tão bem!",
        "Resposta certíssima! Igual naquele dia que a gente conversou sobre isso...",
        "Isso mesmo! Você realmente presta atenção em mim!",
        "Perfeito! Como você sempre acerta o que eu penso?",
        "Exatamente! Você lembra de todos os nossos combinados!"
      ];
      return messages[questionIndex];
    } else {
      const messages = [
        "Hmm, não foi dessa vez... lembra daquele dia que conversamos sobre isso?",
        "Quase! Talvez você precise prestar mais atenção quando eu falo...",
        "Errou! Mas tudo bem, eu ainda te gosto mesmo assim!",
        "Resposta errada! Como voce errou isso camilly?",
        "Vou nao presta atencao em nada que eu falo"
      ];
      return messages[questionIndex];
    }
  }

  if (showIntro) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-pink-50 p-2 sm:p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-4 sm:p-6 shadow-lg animate-fade-in">
          <div className="text-center mb-4 sm:mb-6">
            <FaBirthdayCake className="mx-auto text-3xl sm:text-4xl text-red-400 mb-3 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-bold text-red-400 mb-2">
              Perguntas Especiais de Aniversário
            </h1>
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-300"></div>
              <FaHeart className="text-red-400 text-sm animate-pulse" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-300"></div>
            </div>
            <p className="text-gray-600 italic mb-3 text-sm sm:text-base">
              "Nao tem presente infelizmente, to liso."
            </p>
            <p className="text-gray-800 mb-3 text-sm sm:text-base">
              Ei! Preparei este quiz especial para testar o quanto você me conhece. 
              Responda as 5 perguntas para desbloquear sua surpresa de aniversário!
            </p>
            
            <button 
              onClick={handleStartQuiz}
              className="w-full px-6 py-3 sm:px-8 sm:py-4 bg-red-400 hover:bg-red-500 text-white rounded-lg font-medium text-base sm:text-lg transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-md mt-3"
              disabled={isProcessing}
            >
              Começar Quiz <FaGift className="inline ml-1 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar a mensagem de localização do presente físico
  if (showPresent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-pink-50 p-2 sm:p-4">
        {showConfetti && <Confetti />}
        
        <div className="bg-white rounded-xl max-w-md w-full p-4 sm:p-6 shadow-lg animate-fade-in">
          <div className="text-center mb-3 sm:mb-4">
            <FaGift className="mx-auto text-3xl sm:text-4xl text-red-400 mb-2 animate-bounce" />
            <h1 className="text-xl sm:text-2xl font-bold text-red-400 mb-2">
              Atenção Especial!
            </h1>
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-300"></div>
              <FaHeart className="text-red-400 text-sm animate-pulse" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-300"></div>
            </div>
          </div>
          
          <div className="mb-4 sm:mb-6">
            <p className="text-gray-700 text-center mb-3 text-sm sm:text-base">
              Você concluiu o quiz! tem algo esperando voce:
            </p>
            
            <div className="bg-red-50 rounded-lg p-3 sm:p-5 border-2 border-red-200 mb-4 shadow-md">
              <p className="text-center font-medium text-gray-800 flex items-center justify-center gap-2 mb-2 text-sm sm:text-base">
                <FaMapMarkerAlt className="text-red-400" />
                Vá até a Maria Anthonia e fale a senha:
              </p>
              <div className="bg-white rounded-lg p-2 sm:p-3 shadow-inner">
                <p className="text-center text-red-500 text-lg sm:text-xl font-bold mb-1 animate-pulse-soft">
                  "o felipe é muito glow"
                </p>
              </div>
              <p className="text-center text-xs text-gray-500 italic mt-2">
                Tem algo esperando por você! 💖
              </p>
            </div>
          </div>
          
          <button
            onClick={handleContinueToResults}
            disabled={isProcessing}
            className="w-full p-3 sm:p-4 bg-red-400 hover:bg-red-500 text-white rounded-lg font-medium text-base sm:text-lg transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-md flex items-center justify-center animate-pulse-soft"
          >
            Continue!
            <FaArrowRight className="inline ml-2 animate-bounce" />
          </button>
          
          {/* Modal de senha */}
          {showPasswordModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setShowPasswordModal(false)}>
              <div 
                className="bg-white p-4 sm:p-6 rounded-2xl max-w-md w-full animate-fade-in-scale shadow-xl border-2 border-red-200" 
                onClick={(e) => e.stopPropagation()}
                style={{ 
                  backgroundImage: 'radial-gradient(circle at top right, rgba(255,226,226,0.3) 0%, transparent 70%)',
                  backgroundSize: 'cover' 
                }}
              >
                <div className="relative mb-4 sm:mb-6">
                  <div className="absolute -top-1 -left-1 w-10 h-10 sm:w-12 sm:h-12 bg-red-100/50 rounded-full -z-10"></div>
                  <div className="absolute -bottom-1 -right-1 w-14 h-14 sm:w-16 sm:h-16 bg-red-50/60 rounded-full -z-10"></div>
                  <h3 className="text-xl sm:text-2xl font-bold text-red-400 mb-2 text-center">
                    <FaGift className="inline-block mr-2 mb-1 animate-pulse" />
                    Senha Secreta
                  </h3>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-red-300"></div>
                    <FaHeart className="text-red-400 text-sm animate-pulse" />
                    <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-red-300"></div>
                  </div>
                </div>
                
                <div className="mb-4 sm:mb-6">
                  <p className="text-gray-700 mb-4 text-center text-sm sm:text-base">
                    Para desbloquear sua surpresa especial de aniversário, digite a senha:
                  </p>
                  
                  <div className={`transition-all duration-300 ${passwordError ? 'animate-shake' : ''}`}>
                    <div className={`relative border-2 ${passwordError ? 'border-red-400' : 'border-red-200'} rounded-xl overflow-hidden shadow-sm`}>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-3 sm:px-4 sm:py-4 bg-red-50/30 text-center text-lg sm:text-xl focus:outline-none focus:bg-white transition-colors duration-300"
                        placeholder="777"
                        autoFocus
                      />
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-red-200/5 to-transparent background-shine"></div>
                    </div>
                  </div>
                  
                  {passwordError && (
                    <p className="text-red-500 text-sm mt-2 text-center animate-pulse">
                      Senha incorreta! Tente novamente.
                    </p>
                  )}
                </div>
                
                <div className="flex justify-center gap-3 sm:gap-4">
                  <button
                    onClick={() => setShowPasswordModal(false)}
                    className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-md flex-1 transform hover:scale-105 active:scale-95"
                  >
                    Cancelar
                  </button>
                  
                  <button
                    onClick={handlePasswordSubmit}
                    className="px-4 py-2 sm:px-6 sm:py-3 bg-red-400 hover:bg-red-500 text-white rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-md flex-1 transform hover:scale-105 active:scale-95 relative overflow-hidden"
                  >
                    <span className="relative z-10">Desbloquear</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-pink-50 p-2 sm:p-4">
      {showConfetti && <Confetti />}
      
      <div className="bg-white rounded-xl max-w-md w-full p-4 sm:p-6 shadow-lg animate-fade-in">
        <div className="absolute top-3 left-3 text-red-200 text-3xl sm:text-4xl opacity-20">
          <FaBirthdayCake />
        </div>
        <div className="absolute bottom-3 right-3 text-red-200 text-3xl sm:text-4xl opacity-20">
          <FaGift />
        </div>
        
        <div className="text-center mb-2 sm:mb-3 relative z-10">
          <h1 className="text-xl sm:text-2xl font-bold text-red-400 mb-1 sm:mb-2">
            Pergunta {currentQuestion + 1}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            <FaGlasses className="inline mr-1" /> Vamos ver o quanto você me conhece...
          </p>
        </div>
        
        <div className="w-full bg-gray-100 h-2 sm:h-3 rounded-full mb-4 sm:mb-6">
          <div 
            className="bg-red-400 h-2 sm:h-3 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + (showFeedback ? 1 : 0)) / questions.length) * 100}%` }}
          ></div>
        </div>
        
        <div className={`mb-4 sm:mb-6 ${shake ? 'animate-shake' : ''}`}>
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">
            {questions[currentQuestion].text}
          </h2>
          
          <div className="space-y-2 sm:space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <QuizOption
                key={index}
                option={option}
                index={index}
                selected={selectedOption === index}
                correct={isCorrect}
                showFeedback={showFeedback}
                correctIndex={questions[currentQuestion].correctAnswerIndex}
                onSelect={() => handleOptionSelect(index)}
              />
            ))}
          </div>
        </div>
        
        {showFeedback && (
          <div className="mt-3 sm:mt-4 animate-fade-in">
            <p className={`mb-3 sm:mb-4 p-3 sm:p-4 rounded-lg font-medium text-sm sm:text-base ${isCorrect ? 'bg-green-50 text-green-700 border-l-4 border-green-400' : 'bg-red-50 text-red-700 border-l-4 border-red-400'}`}>
              {isCorrect ? (
                <span>
                  <FaCheck className="inline mr-2" /> 
                  {getFeedbackMessage(true, currentQuestion)}
                </span>
              ) : (
                <span>
                  <FaTimes className="inline mr-2" /> 
                  {getFeedbackMessage(false, currentQuestion)}
                </span>
              )}
            </p>
            <button
              onClick={handleNext}
              disabled={isProcessing}
              className="w-full p-3 sm:p-4 bg-red-400 hover:bg-red-500 text-white rounded-lg font-medium text-base sm:text-lg transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-md flex items-center justify-center"
            >
              {currentQuestion < questions.length - 1 ? 'Próxima Pergunta' : 'Ver Minha Surpresa'} 
              <FaArrowRight className="inline ml-2 animate-bounce" />
            </button>
          </div>
        )}
        
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-gray-600 flex items-center justify-center text-sm sm:text-base">
            <FaHeart className="text-red-400 mr-1 animate-pulse" />
            <span>Pontuação: {score} de {currentQuestion + (showFeedback ? 1 : 0)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// Adiciona estilos necessários para animações
const style = typeof document !== 'undefined' ? document.createElement('style') : null;
if (style) {
  style.textContent = `
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-5px); }
      40%, 80% { transform: translateX(5px); }
    }
    
    .animate-fade-in {
      animation: fade-in 0.5s ease-out forwards;
    }
    
    .animate-fade-in-scale {
      animation: fade-in-scale 0.3s ease-out forwards;
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
    
    .animate-shake {
      animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
    
    .animate-pulse-slow {
      animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    
    .animate-pulse-soft {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.8;
      }
    }
    
    .background-shine {
      animation: background-shine 2s linear infinite;
    }
    
    @keyframes background-shine {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(100%);
      }
    }
    
    .confetti-animation {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 100;
    }
    
    .confetti-piece {
      position: absolute;
      animation: confetti-fall 3s linear forwards;
    }
    
    @keyframes confetti-fall {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
      }
    }
  `;
  typeof document !== 'undefined' && document.head.appendChild(style);
}