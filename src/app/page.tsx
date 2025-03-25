'use client';

import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UuidCard from '@/components/UuidCard';
import SwipeButtons from '@/components/SwipeButtons';
import Match from '@/components/Match';
import { useSwipe } from '@/hooks/useSwipe';

export default function Home() {
  const cardRef = useRef<HTMLDivElement>(null);
  const {
    currentProfile,
    swipeDirection,
    showMatch,
    matchedProfile,
    handleSwipe,
    handleShare,
    handleShareMatch,
    handleCloseMatch,
  } = useSwipe();

  // Manual swipe with the card reference - simplified for better reliability
  const handleButtonSwipe = (direction: string) => {
    // Skip any animation or DOM manipulation, directly call handleSwipe
    handleSwipe(direction);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* App header - fixed height to prevent layout shifts */}
      <header className="p-4 flex justify-between items-center border-b border-gray-800 h-[60px]">
        <h1 className="text-2xl font-bold text-white">UUID<span className="text-pink-500">Matcher</span></h1>
        <motion.button
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full text-sm font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
        >
          Share
        </motion.button>
      </header>

      {/* Main content - adjusted with improved padding and responsive height */}
      <main className="flex-grow flex flex-col justify-center items-center p-4 pb-safe">
        {/* Card container with fixed dimensions to prevent layout shifts */}
        <div className="w-full max-w-sm mx-auto relative h-[min(70vh,480px)] md:h-[500px] mb-4" 
             style={{ 
               willChange: 'contents',
               perspective: '1000px' // 3D perspective for smoother animations
             }}>
          {/* Card stack effect - static elements that don't animate */}
          <div 
            className="absolute top-1 left-1 right-1 bottom-0 rounded-xl bg-gray-800 opacity-20 z-0 pointer-events-none" 
            style={{ 
              transform: 'rotate(-2deg)',
            }}
          />
          <div 
            className="absolute top-0.5 left-0.5 right-0.5 bottom-0 rounded-xl bg-gray-800 opacity-30 z-0 pointer-events-none" 
            style={{ 
              transform: 'rotate(1deg)',
            }}
          />

          {/* Active card - positioned absolutely to prevent layout shifts */}
          <div className="absolute inset-0">
            <AnimatePresence mode="wait">
              {currentProfile && (
                <motion.div
                  key={currentProfile.uuid}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: swipeDirection === 'left' ? -500 : swipeDirection === 'right' ? 500 : 0,
                    rotate: swipeDirection === 'left' ? -30 : swipeDirection === 'right' ? 30 : 0,
                  }}
                  exit={{ 
                    opacity: 0,
                    x: swipeDirection === 'left' ? -500 : swipeDirection === 'right' ? 500 : 0,
                    rotate: swipeDirection === 'left' ? -30 : swipeDirection === 'right' ? 30 : 0,
                  }}
                  transition={{ 
                    type: 'spring', 
                    damping: 20,
                    stiffness: 350,
                    mass: 0.8 // Lighter mass for more responsive animations
                  }}
                  className="absolute inset-0 z-10"
                  style={{
                    willChange: 'transform',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <UuidCard 
                    ref={cardRef}
                    profile={currentProfile} 
                    onSwipe={handleSwipe} 
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* No more profiles message - absolutely positioned to maintain layout */}
          <AnimatePresence>
            {!currentProfile && (
              <motion.div 
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 flex flex-col items-center justify-center text-white text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4">No more UUIDs!</h2>
                <p className="mb-6">We&apos;re generating some more unique identifiers for you.</p>
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Swipe buttons - fixed height to prevent layout shifts */}
        <div className="w-full mb-4 h-[52px]">
          <SwipeButtons 
            onSwipeLeft={() => handleButtonSwipe('left')} 
            onSwipeRight={() => handleButtonSwipe('right')} 
            onShare={handleShare}
          />
        </div>
      </main>

      {/* Footer - made more compact on mobile */}
      <footer className="p-2 text-center text-gray-400 text-xs sm:text-sm">
        <p>Swipe through unique UUIDs. Find your perfect match!</p>
      </footer>

      {/* Match modal */}
      {matchedProfile && (
        <Match 
          profile={matchedProfile} 
          isVisible={showMatch} 
          onClose={handleCloseMatch}
          onShare={handleShareMatch}
        />
      )}
    </div>
  );
}
