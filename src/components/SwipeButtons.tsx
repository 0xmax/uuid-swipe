import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface SwipeButtonsProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onShare: () => void;
}

// Animation variants for consistent button animations
const buttonVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.9 }
};

const SwipeButtons: React.FC<SwipeButtonsProps> = ({ 
  onSwipeLeft, 
  onSwipeRight,
  onShare
}) => {
  return (
    <div className="flex justify-center items-center gap-4 py-2 px-4 max-w-md mx-auto">
      {/* Dislike Button */}
      <motion.button
        className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white text-red-500 shadow-lg flex items-center justify-center cursor-pointer active:bg-red-50"
        variants={buttonVariants}
        whileTap="tap"
        whileHover="hover"
        onClick={(e) => {
          e.preventDefault(); // Prevent any default behavior
          onSwipeLeft();
        }}
        aria-label="Dislike UUID"
        style={{ 
          willChange: 'transform',
          backfaceVisibility: 'hidden'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </motion.button>

      {/* Share Button */}
      <motion.button
        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white text-purple-500 shadow-lg flex items-center justify-center cursor-pointer active:bg-purple-50"
        variants={buttonVariants}
        whileTap="tap"
        whileHover="hover"
        onClick={(e) => {
          e.preventDefault();
          onShare();
        }}
        aria-label="Share UUID"
        style={{ 
          willChange: 'transform',
          backfaceVisibility: 'hidden'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </motion.button>

      {/* Like Button */}
      <motion.button
        className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white text-green-500 shadow-lg flex items-center justify-center cursor-pointer active:bg-green-50"
        variants={buttonVariants}
        whileTap="tap"
        whileHover="hover"
        onClick={(e) => {
          e.preventDefault();
          onSwipeRight();
        }}
        aria-label="Like UUID"
        style={{ 
          willChange: 'transform',
          backfaceVisibility: 'hidden'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </motion.button>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(SwipeButtons); 