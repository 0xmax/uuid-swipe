import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UuidProfile } from '@/utils/types';

interface MatchProps {
  profile: UuidProfile;
  isVisible: boolean;
  onClose: () => void;
  onShare: () => void;
}

const Match: React.FC<MatchProps> = ({ profile, isVisible, onClose, onShare }) => {
  // Confetti effect
  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        onClose();
      }, 8000); // Auto-close after 8 seconds
      
      return () => clearTimeout(timeout);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl p-6 max-w-md w-full text-white shadow-2xl"
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Confetti animation */}
            <div className="absolute -top-10 left-0 right-0 h-40 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                  }}
                  initial={{ y: -20 }}
                  animate={{
                    y: 400,
                    x: Math.random() * 100 - 50,
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 0.5,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </div>

            <div className="text-center">
              <motion.h2
                className="text-3xl font-bold mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                It's a Match!
              </motion.h2>
              
              <motion.div
                className="bg-white/10 backdrop-blur-sm p-4 rounded-lg mb-6"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-lg font-mono break-all">
                  {profile.uuid}
                </p>
              </motion.div>
              
              <motion.p 
                className="text-lg mb-6"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                You've matched with this UUID! It seems to like you too 😉
              </motion.p>
              
              <div className="flex gap-3 justify-center">
                <motion.button
                  className="bg-white text-purple-600 px-6 py-3 rounded-full font-medium shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={onShare}
                >
                  Share Match
                </motion.button>
                
                <motion.button
                  className="bg-transparent border-2 border-white px-6 py-3 rounded-full font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  onClick={onClose}
                >
                  Keep Swiping
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Match; 