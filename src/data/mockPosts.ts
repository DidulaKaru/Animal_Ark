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

// Helper to generate fully conforming Sanity Portable Text blocks
const createMockBlock = (text: string, key: string) => ({
    _key: key,
    _type: 'block' as const,
    style: 'normal',
    markDefs: [],
    children: [
        {
            _key: `${key}-span`,
            _type: 'span' as const,
            text,
            marks: [],
        },
    ],
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
        body: [
            createMockBlock(
                'Rex was discovered by students near the University of Peradeniya engineering canteen during heavy monsoon rains. He was unable to bear weight on his left hind leg and showed severe signs of dehydration.',
                'block-1'
            ),
            createMockBlock(
                'Thanks to swift mobilization from our student volunteer network and financial aid channeled through our emergency fund, Rex was admitted to the Peradeniya Veterinary Teaching Hospital. X-rays confirmed a femoral fracture requiring orthopedic pin fixation.',
                'block-2'
            ),
            createMockBlock(
                'Following a successful surgery and four weeks of cage rest with physiotherapy, Rex made a complete recovery. Today, he lives with a loving foster-turned-permanent family in Kandy!',
                'block-3'
            ),
        ],
    },
    {
        _id: 'post-2',
        title: 'Why Mass Sterilization Clinics Are Key to Ending Street Suffering',
        slug: createMockSlug('mass-sterilization-clinic-insights'),
        publishedAt: '2026-08-28T14:30:00.000Z',
        author: mockAuthors.sarath,
        mainImage: createMockImage('https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80'),
        excerpt: 'An overview of our August campus spay-and-neuter drive, detailing veterinary protocols and why long-term humane population management works.',
        body: [
            createMockBlock(
                'An overview of our August campus spay-and-neuter drive, detailing veterinary protocols and why long-term humane population management works.',
                'block-1'
            ),
            createMockBlock(
                'These are not just stray animals; they are integral members of our campus community who experience hunger, injury, and isolation. Humane population management through sterilization directly reduces animal suffering while maintaining a balanced ecosystem.',
                'block-2'
            ),
            createMockBlock(
                'Our approach emphasizes sterilization, vaccination, and community education to prevent overpopulation at its source. Learn more about how you can support sustainable animal welfare on campus.',
                'block-3'
            ),
            createMockBlock(
                'Looking ahead, Animal Ark plans to expand its outreach to nearby communities, providing veterinary care and education programs that promote responsible pet ownership and compassionate coexistence with animals. Your continued support makes this long-term vision possible.',
                'block-4'
            ),
        ],
    },
];