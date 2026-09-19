import type { BlogPost, Author, SanityImage, SanitySlug } from '../types';

const createMockSlug = (current: string): SanitySlug => ({
    _type: 'slug',
    current,
});

const createMockImage = (unsplashUrl: string): SanityImage => ({
    _type: 'image',
    asset: {
        _ref: unsplashUrl,
        _type: 'reference',
    },
});

export const mockAuthors: Record<string, Author> = {
    sarath: {
        _id: 'author-1',
        name: 'Dr. Sarath Bandara',
        slug: createMockSlug('dr-sarath-bandara'),
        avatar: createMockImage('https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=150&q=80'),
        role: 'Faculty Advisor & Vet Surgeon',
    },
    amali: {
        _id: 'author-2',
        name: 'Amali Senanayake',
        slug: createMockSlug('amali-senanayake'),
        avatar: createMockImage('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'),
        role: 'Student Volunteer Coordinator',
    },
};

export const mockPosts: BlogPost[] = [
    {
        _id: 'post-1',
        title: 'From Campus Stray to Beloved Companion: Rex’s Second Chance',
        slug: createMockSlug('rexs-second-chance'),
        publishedAt: '2026-09-12T09:00:00.000Z',
        author: mockAuthors.amali,
        mainImage: createMockImage('https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80'),
        excerpt: 'Rex was found near the engineering faculty canteen with a fractured hind leg. Here is how community donations funded his orthopedic surgery and recovery.',
        body: [],
    },
    {
        _id: 'post-2',
        title: 'Why Mass Sterilization Clinics Are Key to Ending Street Suffering',
        slug: createMockSlug('mass-sterilization-clinic-insights'),
        publishedAt: '2026-08-28T14:30:00.000Z',
        author: mockAuthors.sarath,
        mainImage: createMockImage('https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80'),
        excerpt: 'An overview of our August campus spay-and-neuter drive, detailing veterinary protocols and why long-term humane population management works.',
        body: [],
    },
];