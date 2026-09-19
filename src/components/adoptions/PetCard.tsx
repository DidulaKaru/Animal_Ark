// src/components/adoptions/PetCard.tsx
import React from 'react';
import { MessageCircle } from 'lucide-react';
import type { AdoptionPet, SanityImage } from '../../types';
import { getPetThumbnailUrl } from '../../lib/sanity';

interface PetCardProps {
    pet: AdoptionPet;
}

const WHATSAPP_PHONE_NUMBER = '94768624268';

/**
 * Helper to resolve the image URL.
 * Handles both real Sanity image references and our Unsplash mock data URLs.
 */
const resolveImageUrl = (image?: SanityImage) => {
    if (!image) return '/placeholder-pet.jpg'; // Fallback if no image exists

    // If it's our mock data (Unsplash URL stored in _ref)
    if (image.asset._ref.startsWith('http')) {
        return image.asset._ref;
    }

    // Otherwise, process through the Sanity asset pipeline (Section 5.2)
    return getPetThumbnailUrl(image);
};

export const PetCard: React.FC<PetCardProps> = ({ pet }) => {
    const primaryImage = pet.photos?.[0];
    const imageUrl = resolveImageUrl(primaryImage);

    // Section 5.3: WhatsApp Adoption Pipeline Logic
    const targetPhone = pet.contactNumber?.replace(/[^0-9]/g, '') || WHATSAPP_PHONE_NUMBER;
    const whatsappMessage = `I am interested in adopting ${pet.name} (Ref: ${pet._id}). Is he/she still available?`;
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(whatsappMessage)}`;

    // Determine status badge styling based on the pet's current status
    const statusStyles = {
        Available: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        Fostered: 'bg-amber-100 text-amber-800 border-amber-200',
        Adopted: 'bg-stone-200 text-stone-600 border-stone-300',
    };

    const isAdopted = pet.status === 'Adopted';

    return (
        <article className="flex flex-col bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden transition-shadow hover:shadow-md">
            {/* Photo Container */}
            <div className="relative h-64 w-full bg-stone-100">
                <img
                    src={imageUrl}
                    alt={`Photo of ${pet.name}`}
                    className="object-cover w-full h-full"
                    loading="lazy"
                />
                {/* Status Badge Overlay */}
                <div
                    className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm backdrop-blur-sm ${statusStyles[pet.status]}`}
                >
                    {pet.status}
                </div>
            </div>

            {/* Card Body */}
            <div className="flex flex-col flex-grow p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-stone-800">{pet.name}</h3>
                    <span className="text-sm font-medium text-stone-500 bg-stone-100 px-2 py-1 rounded-lg">
                        {pet.age}
                    </span>
                </div>

                <p className="text-sm text-stone-600 mb-4 font-medium">
                    {pet.gender} • {pet.species}
                </p>

                {/* Health Details Pills */}
                {pet.healthDetails && pet.healthDetails.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {pet.healthDetails.map((detail, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-stone-50 text-stone-600 border border-stone-200"
                            >
                                {detail}
                            </span>
                        ))}
                    </div>
                )}

                {/* Backstory Preview */}
                <p className="text-sm text-stone-600 line-clamp-3 mb-6 flex-grow">
                    {pet.story}
                </p>

                {/* Action Button */}
                <a
                    href={isAdopted ? undefined : whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-disabled={isAdopted}
                    className={`
            flex items-center justify-center w-full min-h-[44px] px-4 py-2 rounded-xl font-semibold transition-colors
            ${isAdopted
                            ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-[0.98] shadow-sm'
                        }
          `}
                >
                    {isAdopted ? (
                        'Already Adopted'
                    ) : (
                        <>
                            <MessageCircle className="w-5 h-5 mr-2" />
                            Inquire via WhatsApp
                        </>
                    )}
                </a>
            </div>
        </article>
    );
};