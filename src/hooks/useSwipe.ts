import { useState, useEffect, useCallback } from 'react';
import { UuidProfile } from '@/utils/types';
import { generateUuidProfiles, shareUuid } from '@/utils/uuidGenerator';

const INITIAL_PROFILES_COUNT = 5;
const MATCH_PROBABILITY = 0.25; // 25% chance of a match

export const useSwipe = () => {
  const [profiles, setProfiles] = useState<UuidProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<UuidProfile | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize with some profiles
  useEffect(() => {
    const initialProfiles = generateUuidProfiles(INITIAL_PROFILES_COUNT);
    setProfiles(initialProfiles);
  }, []);

  // Get more profiles when running low
  useEffect(() => {
    if (profiles.length - currentIndex <= 2) {
      const moreProfiles = generateUuidProfiles(INITIAL_PROFILES_COUNT);
      setProfiles(prevProfiles => [...prevProfiles, ...moreProfiles]);
    }
  }, [profiles.length, currentIndex]);

  // Handle swipe action
  const handleSwipe = useCallback((direction: string) => {
    // Don't process if already animating
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSwipeDirection(direction);

    // Use a more reliable animation approach with promises
    const animationDuration = 500; // ms

    // Wait for swipe animation to complete before changing profiles
    setTimeout(() => {
      // Check if we have a match when swiping right
      if (direction === 'right' && Math.random() < MATCH_PROBABILITY) {
        const profile = profiles[currentIndex];
        setMatchedProfile(profile);
        setShowMatch(true);
      }

      // Move to next profile but keep direction for exit animation
      setCurrentIndex(prevIndex => prevIndex + 1);
      
      // Reset animation states after exit animation completes
      setTimeout(() => {
        setSwipeDirection(null);
        setIsAnimating(false);
      }, 200); // Allow exit animation to complete
    }, animationDuration);
  }, [currentIndex, profiles, isAnimating]);

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

  // Current profile to display
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
    setIsAnimating,
  };
}; 