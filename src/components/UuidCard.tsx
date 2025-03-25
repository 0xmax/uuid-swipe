import React, { forwardRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { UuidProfile } from '@/utils/types';

interface UuidCardProps {
  profile: UuidProfile;
  onSwipe: (direction: string) => void;
}

const UuidCard = forwardRef<HTMLDivElement, UuidCardProps>(
  ({ profile, onSwipe }, ref) => {
    // Memoize the color to prevent recalculation during animations
    const cardColor = useMemo(() => {
      const colors = [
        'bg-gradient-to-br from-pink-500 to-purple-600',
        'bg-gradient-to-br from-blue-500 to-teal-400',
        'bg-gradient-to-br from-amber-500 to-red-600',
        'bg-gradient-to-br from-green-400 to-cyan-500',
        'bg-gradient-to-br from-indigo-500 to-fuchsia-500'
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }, [profile.uuid]); // Only recalculate when UUID changes

    return (
      <motion.div
        ref={ref}
        className={`w-full h-full rounded-xl shadow-xl overflow-hidden ${cardColor} py-4 px-3 sm:p-6 mx-auto`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          // Add velocity to make swiping feel more responsive
          velocity: 2
        }}
        drag="x" // Constrain to horizontal dragging only for better performance
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.7} // Make dragging more responsive
        onDragEnd={(e, { offset, velocity }) => {
          // Use a dynamic threshold based on velocity for more responsive swipes
          const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;
          if (swipe) {
            const direction = offset.x > 0 ? 'right' : 'left';
            onSwipe(direction);
          }
        }}
        style={{
          // Force hardware acceleration for smoother animations
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        {/* Content container with fixed layout to prevent shifts */}
        <div className="flex flex-col h-full select-none">
          {/* UUID Display with fancy design - avoid hover animations on mobile */}
          <div className="text-center mb-3 sm:mb-6 relative z-10">
            <h2 className="text-white text-base sm:text-lg font-medium mb-1 leading-tight whitespace-nowrap">UUID</h2>
            <div className="bg-black/20 backdrop-blur-sm p-2 sm:p-4 rounded-lg">
              <p className="text-white font-mono text-xs sm:text-lg break-all leading-tight">
                {profile.uuid}
              </p>
            </div>
          </div>

          {/* Facts about the UUID - remove hover animations for performance */}
          <div className="space-y-2 sm:space-y-4 text-white flex-grow">
            <div className="bg-white/10 backdrop-blur-sm p-2 sm:p-3 rounded-lg">
              <h3 className="font-medium mb-0.5 sm:mb-1 text-sm sm:text-base leading-tight whitespace-nowrap">Age</h3>
              <p className="text-sm sm:text-base leading-tight">{profile.age} days old</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-2 sm:p-3 rounded-lg">
              <h3 className="font-medium mb-0.5 sm:mb-1 text-sm sm:text-base leading-tight whitespace-nowrap">Version</h3>
              <p className="text-sm sm:text-base leading-tight">{profile.version}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-2 sm:p-3 rounded-lg">
              <h3 className="font-medium mb-0.5 sm:mb-1 text-sm sm:text-base leading-tight whitespace-nowrap">Star Sign</h3>
              <p className="text-sm sm:text-base leading-tight">{profile.starSign}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-2 sm:p-3 rounded-lg">
              <h3 className="font-medium mb-0.5 sm:mb-1 text-sm sm:text-base leading-tight whitespace-nowrap">Fun Fact</h3>
              <p className="text-sm sm:text-base leading-tight">{profile.funFact}</p>
            </div>
          </div>

          {/* Instruction overlay */}
          <div className="text-center text-white/80 text-xs sm:text-sm mt-3 sm:mt-4 leading-tight">
            Swipe or drag left to dismiss, right to like
          </div>
        </div>
        
        {/* Decorative elements - simplify for better performance */}
        <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-[-30px] left-[-30px] w-[100px] h-[100px] rounded-full bg-white/10 blur-xl pointer-events-none"></div>
      </motion.div>
    );
  }
);

UuidCard.displayName = 'UuidCard';

export default React.memo(UuidCard); // Memoize the whole component to prevent unnecessary re-renders 