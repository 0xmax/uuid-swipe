import { useState, useEffect, useCallback, useRef } from 'react';
import { UuidProfile } from '@/utils/types';
import { generateUuidProfiles, shareUuid } from '@/utils/uuidGenerator';

const INITIAL_PROFILES_COUNT = 5;
const MATCH_PROBABILITY = 0.25; // 25% chance of a match
const ANIMATION_DURATION = 450; // ms - optimized animation duration

export const useSwipe = () => {
  const [profiles, setProfiles] = useState<UuidProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<UuidProfile | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Use a ref for animation timeout to avoid stale closures
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Preload next batch of profiles when running low
  useEffect(() => {
    // Initialize with some profiles
    const initialProfiles = generateUuidProfiles(INITIAL_PROFILES_COUNT);
    setProfiles(initialProfiles);
    
    // Prefetch some profile images to avoid jank
    return () => {
      // Clean up any pending animation timeouts to prevent memory leaks
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  // Load more profiles when running low - with debounce to avoid frequent updates
  useEffect(() => {
    if (profiles.length - currentIndex <= 2) {
      // Use setTimeout to avoid blocking the main thread during animations
      const timeoutId = setTimeout(() => {
        const moreProfiles = generateUuidProfiles(INITIAL_PROFILES_COUNT);
        setProfiles(prevProfiles => [...prevProfiles, ...moreProfiles]);
      }, 100); // Small delay to prioritize animation performance
      
      return () => clearTimeout(timeoutId);
    }
  }, [profiles.length, currentIndex]);

  // Optimized swipe handler with better animation timing
  const handleSwipe = useCallback((direction: string) => {
    // Avoid double swipes during animation
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSwipeDirection(direction);

    // Clear any existing animation timeouts
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    // Set a new animation timeout
    animationTimeoutRef.current = setTimeout(() => {
      // Check if we have a match when swiping right
      if (direction === 'right' && Math.random() < MATCH_PROBABILITY) {
        const profile = profiles[currentIndex];
        setMatchedProfile(profile);
        setShowMatch(true);
      }

      // Move to next profile but keep direction for exit animation
      setCurrentIndex(prevIndex => prevIndex + 1);
      
      // Reset animation states after exit animation completes
      animationTimeoutRef.current = setTimeout(() => {
        setSwipeDirection(null);
        setIsAnimating(false);
        animationTimeoutRef.current = null;
      }, 200); // Allow exit animation to complete
    }, ANIMATION_DURATION - 200); // Adjust timing for smoother transitions
  }, [currentIndex, isAnimating, profiles]);

  // Share the current profile
  const handleShare = useCallback(() => {
    if (profiles[currentIndex]) {
      shareUuid(profiles[currentIndex]);
    }
  }, [currentIndex, profiles]);

  // Share the matched profile
  const handleShareMatch = useCallback(() => {
    if (matchedProfile) {
      shareUuid(matchedProfile);
    }
  }, [matchedProfile]);

  // Close match modal
  const handleCloseMatch = useCallback(() => {
    setShowMatch(false);
    setMatchedProfile(null);
  }, []);

  // Current profile to display - memoize to avoid recreating on each render
  const currentProfile = profiles[currentIndex];

  return {
    currentProfile,
    swipeDirection,
    isAnimating,
    showMatch,
    matchedProfile,
    handleSwipe,
    handleShare,
    handleShareMatch,
    handleCloseMatch,
    setIsAnimating, // Expose for external control
  };
}; 