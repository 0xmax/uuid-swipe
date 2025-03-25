import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // Try to get the UUID from the id parameter
  let uuid = params.id;
  try {
    if (typeof window !== 'undefined') {
      const decoded = atob(params.id);
      const profile = JSON.parse(decoded);
      uuid = profile.uuid;
    }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    // If it's not base64 encoded, use the id as is
    uuid = params.id.replace(/_/g, '-');
  }

  // Shorten the UUID for the title
  const shortUuid = uuid.substring(0, 8);

  return {
    title: `Perfect UUID Match Found - ${shortUuid}...`,
    description: "You&apos;ve found your perfect UUID! It&apos;s a match made in digital heaven. Share this unique identifier with the world!",
    openGraph: {
      title: 'Perfect UUID Match - UUIDMatcher',
      description: "You&apos;ve found your perfect UUID! Share this unique identifier with the world!",
      images: [`/uuid/${params.id}/opengraph-image`],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Perfect UUID Match - UUIDMatcher',
      description: "You&apos;ve found your perfect UUID! Share this unique identifier with the world!",
      images: [`/uuid/${params.id}/opengraph-image`],
    },
  };
} 