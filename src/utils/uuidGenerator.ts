import { v4 as uuidv4 } from 'uuid';
import { UuidProfile } from './types';

// Fun facts about UUIDs
const uuidFunFacts = [
  "This UUID has enough entropy to be practically collision-free",
  "If every person on Earth generated 1 billion UUIDs, the chance of collision would still be almost zero",
  "This UUID is using a cryptographically secure random number generator",
  "UUIDs can be used for 10 billion years before having a 50% chance of a single collision",
  "This UUID consumes 128 bits of entropy from the universe",
  "This UUID helps maintain causality in distributed systems",
  "This UUID was born to be unique, just like you",
  "UUIDs are used by spacecraft to identify objects in space",
  "This UUID contains the meaning of life, but in hexadecimal",
  "If this UUID was printed on paper, it would be longer than your grocery receipt",
  "This UUID probably contains your birthday somewhere in its digits",
  "UUIDs were standardized in 2005, making them older than TikTok",
  "This UUID is unique across all time and space (probably)",
  "This UUID contains more randomness than a cat's behavior"
];

// UUID versions and their descriptions
const uuidVersions = [
  "v4 (Random)",
  "v4 (Random with timestamp)",
  "v4 (RFC 4122 compliant)",
  "v4 (Cryptographically secure)",
  "v4 (Quantum resistant)"
];

// Generate a random integer between min and max (inclusive)
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate a random UUID profile
export const generateUuidProfile = (): UuidProfile => {
  return {
    uuid: uuidv4(),
    age: getRandomInt(1, 120),
    version: uuidVersions[getRandomInt(0, uuidVersions.length - 1)],
    funFact: uuidFunFacts[getRandomInt(0, uuidFunFacts.length - 1)]
  };
};

// Generate multiple UUID profiles
export const generateUuidProfiles = (count: number): UuidProfile[] => {
  return Array.from({ length: count }, generateUuidProfile);
};

// Generate a sharable URL for a UUID profile
const generateShareableUrl = (profile: UuidProfile): string => {
  try {
    // Option 1: Encode the entire profile as base64
    const profileJson = JSON.stringify(profile);
    const encodedProfile = btoa(profileJson);
    return `${window.location.origin}/uuid/${encodedProfile}`;
  } catch (e) {
    // Option 2: Fallback to just using the UUID
    // Replace dashes with underscores for URL compatibility
    const safeUuid = profile.uuid.replace(/-/g, '_');
    return `${window.location.origin}/uuid/${safeUuid}`;
  }
};

// Share a UUID
export const shareUuid = (profile: UuidProfile) => {
  const shareUrl = generateShareableUrl(profile);
  const shareText = `I found my perfect UUID match! Check it out:`;
  
  if (navigator.share) {
    navigator.share({
      title: 'My Perfect UUID Match',
      text: shareText,
      url: shareUrl
    }).catch(error => {
      console.error('Error sharing UUID:', error);
      // No fallback to clipboard, just show an error message
      alert('Sharing failed. Please try again or share the URL manually.');
    });
  } else {
    // No clipboard fallback, just open the URL in a new tab
    window.open(shareUrl, '_blank');
  }
}; 