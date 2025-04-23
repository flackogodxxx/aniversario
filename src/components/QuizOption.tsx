'use client';

import { FaCheck, FaTimes } from 'react-icons/fa';

interface QuizOptionProps {
  option: string;
  index: number;
  selected: boolean;
  correct: boolean;
  showFeedback: boolean;
  correctIndex: number;
  onSelect: () => void;
}

export default function QuizOption({ 
  option, 
  index, 
  selected,
  correct, 
  showFeedback,
  correctIndex,
  onSelect 
}: QuizOptionProps) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-3 sm:p-4 my-2 rounded-lg border-2 transition-all duration-300 hover:bg-red-100 transform hover:scale-[1.01] active:scale-[0.99] shadow-sm
        ${selected && showFeedback && correct ? 'bg-green-50 border-green-400 text-green-700' : ''}
        ${selected && showFeedback && !correct ? 'bg-red-50 border-red-400 text-red-700' : ''}
        ${selected && !showFeedback ? 'bg-red-100 border-red-400 text-gray-800' : ''}
        ${!selected ? 'border-gray-200 text-gray-800 hover:bg-gray-50' : ''}
        ${showFeedback && index === correctIndex && !selected ? 'bg-green-50 border-green-400 text-green-700' : ''}
      `}
    >
      <div className="flex items-center">
        <span className="flex-grow font-medium text-sm sm:text-base">{option}</span>
        {showFeedback && correct && selected && (
          <FaCheck className="text-green-500 ml-2 animate-bounce text-sm sm:text-base" />
        )}
        {showFeedback && !correct && selected && (
          <FaTimes className="text-red-500 ml-2 animate-bounce text-sm sm:text-base" />
        )}
        {showFeedback && index === correctIndex && !selected && (
          <FaCheck className="text-green-500 ml-2 animate-bounce text-sm sm:text-base" />
        )}
      </div>
    </button>
  );
} 