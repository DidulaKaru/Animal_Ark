import type { AdoptionPet, SanityImage } from '../types';

/*
  Helper function to generate a mock SanityImage using an Unsplash URL.
  We store the URL in the `_ref` field so it passes strict type checking 
  while allowing the UI to render it immediately during development.
*/
const createMockImage = (unsplashUrl: string): SanityImage => ({
    _type: 'image',
    asset: {
        _ref: unsplashUrl,
        _type: 'reference',
    },
});

export const mockPets: AdoptionPet[] = [
    {
        _id: 'pet-001',
        name: 'Milo',
        slug: {
            _type: 'slug',
            current: 'milo-mixed-puppy',
        },
        species: 'Dog',
        gender: 'Male',
        age: '3 months',
        status: 'Available',
        healthDetails: ['Vaccinated', 'Dewormed', 'First-round shots completed'],
        photos: [
            createMockImage('https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80'),
            createMockImage('https://images.unsplash.com/photo-1537151608804-ea2f1d73908e?auto=format&fit=crop&w=800&q=80'),
        ],
        story: 'Milo is a playful local mixed-breed puppy found wandering near the Peradeniya Botanical Gardens. He is full of energy, loves belly rubs, and is looking for a loving forever home where he can run and play.',
    },
    {
        _id: 'pet-002',
        name: 'Kalu',
        slug: {
            _type: 'slug',
            current: 'kalu-rescued-cat',
        },
        species: 'Cat',
        gender: 'Female',
        age: '2 years',
        status: 'Adopted',
        healthDetails: ['Vaccinated', 'Spayed/Neutered', 'Dewormed'],
        photos: [
            createMockImage('https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=800&q=80'),
        ],
        story: 'Kalu was rescued from a busy market area in Peradeniya. Initially shy, she has blossomed into a very affectionate lap cat. We are thrilled to announce she has recently found her forever family!',
    },
    {
        _id: 'pet-003',
        name: 'Rex',
        slug: {
            _type: 'slug',
            current: 'rex-recovery-dog',
        },
        species: 'Dog',
        gender: 'Male',
        age: '4 years',
        status: 'Available',
        healthDetails: ['Vaccinated', 'Spayed/Neutered', 'Special Needs / Amputee'],
        photos: [
            createMockImage('https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=800&q=80'),
            createMockImage('https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80'),
        ],
        story: 'Rex is a brave survivor. He was brought to us after a hit-and-run incident near the university campus. Despite losing one of his hind legs, his spirit remains unbroken. He gets around perfectly fine on three legs and is incredibly loyal and protective.',
    },
];