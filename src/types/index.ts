/*
  ---------------------------------------------------------------------------
  SANITY UTILITY TYPES
  ---------------------------------------------------------------------------
*/
export type SlugValue = string | { current: string };

export interface SanityImageObject {
    _type?: 'image';
    asset: {
        _ref: string;
        _type?: 'reference';
        url?: string;
    };
    hotspot?: object;
    crop?: object;
}

export type ImageSource = SanityImageObject | string;

export interface SanitySlug {
    _type: 'slug';
    current: string;
}

export interface SanityImageCrop {
    _type: 'sanity.imageCrop';
    top: number;
    bottom: number;
    left: number;
    right: number;
}

export interface SanityImageHotspot {
    _type: 'sanity.imageHotspot';
    x: number;
    y: number;
    height: number;
    width: number;
}

export interface SanityImage {
    _type: 'image';
    asset: {
        _ref: string;
        _type: 'reference';
    };
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
}

export interface PortableTextBlock {
    _type: string;
    _key: string;
    children?: any[];
    markDefs?: any[];
    style?: string;
    [key: string]: any;
}

/*
  ---------------------------------------------------------------------------
  CORE ENTITY MODELS
  ---------------------------------------------------------------------------
*/

/*
  Represents a team member or author in the CMS.
*/
export interface Author {
    _id: string;
    name: string;
    slug: SanitySlug;
    avatar: SanityImage;
    role: string;
}

/*
  Represents a blog post entry with rich text content.
*/
export interface BlogPost {
    _id: string;
    title: string;
    slug: SanitySlug;
    publishedAt: string; // ISO 8601 datetime string
    author: Author;      // Assumes the reference is expanded during the GROQ fetch
    mainImage: SanityImage;
    excerpt: string;
    body: PortableTextBlock[];
}

/*
  Represents a pet available for adoption, fostering, or already adopted.
*/
export interface AdoptionPet {
    _id: string;
    name: string;
    slug: SanitySlug;
    species: 'Dog' | 'Cat' | 'Other';
    gender: 'Male' | 'Female';
    age: string;
    status: 'Available' | 'Fostered' | 'Adopted';
    healthDetails: string[];
    photos: SanityImage[];
    story: string;
    contactNumber?: string;
}

/*
  Represents a lightweight, time-sensitive news announcement.
*/
export interface NewsUpdate {
    _id: string;
    title: string;
    date: string; // YYYY-MM-DD date string
    snippet: string;
    linkUrl?: string; // Optional external URL
    fullDetails?: string;    // In-depth description for the on-site dialog
    location?: string;       // e.g. "Peradeniya Campus, Near Canteen"
}