import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { UuidProfile } from '@/utils/types';

interface UuidCardProps {
  profile: UuidProfile;
  onSwipe: (direction: string) => void;
}

const UuidCard = forwardRef<HTMLDivElement, UuidCardProps>(
  ({ profile, onSwipe }, ref) => {
    const getRandomColor = () => {
      const colors = [
        'bg-gradient-to-br from-pink-500 to-purple-600',
        'bg-gradient-to-br from-blue-500 to-teal-400',
        'bg-gradient-to-br from-amber-500 to-red-600',
        'bg-gradient-to-br from-green-400 to-cyan-500',
        'bg-gradient-to-br from-indigo-500 to-fuchsia-500'
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
      <motion.div
        ref={ref}
        className={`w-full h-full rounded-xl shadow-xl overflow-hidden ${getRandomColor()} p-6 mx-auto`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        onDragStart={() => {
          // Removed setting drag direction
        }}
        onDragEnd={(e, { offset, velocity }) => {
          // Use a smaller threshold for desktop to make it more sensitive
          const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;
          if (swipe) {
            const direction = offset.x > 0 ? 'right' : 'left';
            onSwipe(direction);
          }
        }}
      >
        {/* Content container with fixed height to prevent layout shifts */}
        <div className="flex flex-col h-full">
          {/* UUID Display with fancy design */}
          <motion.div 
            className="text-center mb-6 relative z-10"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <h2 className="text-white text-lg font-medium mb-1">UUID</h2>
            <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-white font-mono text-md sm:text-lg break-all">
                {profile.uuid}
              </p>
            </div>
          </motion.div>

          {/* Facts about the UUID */}
          <div className="space-y-4 text-white flex-grow">
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-3 rounded-lg"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h3 className="font-medium mb-1">Age</h3>
              <p>{profile.age} days old</p>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-3 rounded-lg"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h3 className="font-medium mb-1">Version</h3>
              <p>{profile.version}</p>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-3 rounded-lg"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h3 className="font-medium mb-1">Fun Fact</h3>
              <p>{profile.funFact}</p>
            </motion.div>
          </div>

          {/* Instruction overlay */}
          <div className="text-center text-white/80 text-sm mt-4">
            Swipe or drag left to dismiss, right to like
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute bottom-[-30px] left-[-30px] w-[100px] h-[100px] rounded-full bg-white/10 blur-xl"></div>
      </motion.div>
    );
  }
);

UuidCard.displayName = 'UuidCard';

export default UuidCard; 