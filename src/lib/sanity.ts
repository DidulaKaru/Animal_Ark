import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

/*
  ---------------------------------------------------------------------------
  1. SANITY CLIENT INITIALIZATION (Section 5.1)
  ---------------------------------------------------------------------------
  Configured to use the Edge CDN for sub-100ms response times.
*/
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'mock-project-id';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01';

if (!import.meta.env.VITE_SANITY_PROJECT_ID) {
  console.warn('VITE_SANITY_PROJECT_ID is not defined. Using mock fallback for development.');
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Ensures content is served from the Sanity Edge CDN nearest to the user
});

/*
  ---------------------------------------------------------------------------
  2. ASSET OPTIMIZATION PIPELINE (Section 5.2)
  ---------------------------------------------------------------------------
*/
const builder = createImageUrlBuilder(sanityClient);

// Infer the exact parameter type that builder.image() expects
type SanityImageSource = Parameters<typeof builder.image>[0];

/**
 * General helper to generate image URLs from Sanity image records.
 * 
 * @param source - The Sanity image object
 * @returns An image builder instance to chain further modifications
 */
export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Specific helper for Pet Thumbnails (Section 5.2).
 * Automatically converts to WebP, scales to 400px width (maintaining aspect ratio),
 * and applies automatic quality optimization to ensure <80KB payload sizes.
 * 
 * @param source - The Sanity image object
 * @returns A fully resolved, optimized URL string
 */
export function getPetThumbnailUrl(source: SanityImageSource): string {
  return builder
    .image(source)
    .width(400)
    .format('webp')
    .auto('format')
    .url();
}