'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { UuidProfile } from '@/utils/types';
import { generateUuidProfile } from '@/utils/uuidGenerator';

// Function to generate random fun facts about finding the perfect UUID
const getPerfectMatchPhrases = () => {
  const phrases = [
    "You've found your perfect UUID! It's like finding a digital soulmate.",
    "This UUID was waiting for you all along. It's a perfect match!",
    "Some UUIDs are meant to be. This one had your name on it!",
    "Out of trillions of possibilities, you found the one. Destiny!",
    "What are the odds? You and this UUID are meant for each other!"
  ];
  return phrases[Math.floor(Math.random() * phrases.length)];
};

// Safe base64 decode
const safeAtob = (str: string): string => {
  try {
    return atob(str);
  } catch (e) {
    return str;
  }
};

export default function UuidDetail() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';
  const [profile, setProfile] = useState<UuidProfile | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    // Try to parse the ID - it could be a base64 encoded profile or just a UUID
    try {
      // Check if it's a base64 encoded JSON profile
      const decoded = safeAtob(id);
      try {
        const parsedProfile = JSON.parse(decoded);
        setProfile(parsedProfile);
      } catch (e) {
        // Not valid JSON, create a profile with the decoded ID
        createProfileFromId(id);
      }
    } catch (e) {
      // If it's not base64 encoded, use the ID as a UUID and generate the rest
      createProfileFromId(id);
    }
    setLoaded(true);
  }, [id]);

  // Helper function to create a profile from an ID
  const createProfileFromId = (idString: string) => {
    const newProfile = generateUuidProfile();
    // Override the UUID with the one from the URL
    newProfile.uuid = idString.replace(/_/g, '-');
    setProfile(newProfile);
  };

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4 text-white text-center">
        <h1 className="text-3xl font-bold mb-4">UUID Not Found</h1>
        <p className="mb-6">Sorry, we couldn't find this UUID. It might have been lost in the digital void.</p>
        <Link href="/">
          <motion.button 
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full text-white font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Find Your Own Perfect UUID
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b border-gray-800">
        <h1 className="text-2xl font-bold text-white">UUID<span className="text-pink-500">Matcher</span></h1>
        <Link href="/">
          <motion.button
            className="text-white bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Find Your Own UUID
          </motion.button>
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        {/* Perfect match message */}
        <motion.div
          className="w-full max-w-lg mb-8 p-6 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 text-white text-center shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-3xl font-bold mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 2
            }}
          >
            It's a Perfect Match!
          </motion.h2>
          <p className="text-xl mb-2">{getPerfectMatchPhrases()}</p>
          <p className="text-sm opacity-80">Shared with 💖 from UUIDMatcher</p>
        </motion.div>

        {/* UUID Card */}
        <motion.div
          className="w-full max-w-md rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white shadow-xl relative overflow-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.3 }}
        >
          <div className="text-center mb-6 relative z-10">
            <h2 className="text-xl font-medium mb-2">Your Perfect UUID</h2>
            <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg mb-4">
              <p className="selectable-text font-mono text-lg break-all">
                {profile.uuid}
              </p>
            </div>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-medium mb-1">Age</h3>
              <p>{profile.age} days old</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-medium mb-1">Version</h3>
              <p>{profile.version}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-medium mb-1">Fun Fact</h3>
              <p>{profile.funFact}</p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] rounded-full bg-white/10 blur-2xl"></div>
          <div className="absolute bottom-[-30px] left-[-30px] w-[100px] h-[100px] rounded-full bg-white/10 blur-xl"></div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/">
            <motion.button
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Find Your Own UUID Match
            </motion.button>
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-400 text-sm">
        <p>UUIDMatcher: Connecting humans and UUIDs since 2024</p>
      </footer>
    </div>
  );
} 