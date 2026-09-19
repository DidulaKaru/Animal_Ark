import React from 'react';
import { HeartPulse, Home, Users } from 'lucide-react';
import type { Author, SanityImage } from '../../types';
import { urlForImage } from '../../lib/sanity';

interface AboutSectionProps {
    members: Author[];
}

/**
 * Helper to resolve the image URL for both mock Unsplash URLs and real Sanity assets.
 */
const resolveImageUrl = (image?: SanityImage, width: number = 400) => {
    if (!image) return '/placeholder-avatar.jpg';
    if (image.asset._ref.startsWith('http')) {
        return image.asset._ref;
    }
    return urlForImage(image).width(width).format('webp').url();
};

export const AboutSection: React.FC<AboutSectionProps> = ({ members }) => {
    return (
        <section id="about" className="py-16 sm:py-24 bg-white border-t border-nature-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Top Half: Narrative & Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">

                    {/* Narrative Block */}
                    <div className="flex flex-col justify-center">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-nature-900 tracking-tight mb-6">
                            Our Roots & Mission
                        </h2>
                        <div className="space-y-5 text-base sm:text-lg text-nature-700 leading-relaxed">
                            <p>
                                Born from the compassionate community at the <strong>University of Peradeniya</strong> campus,
                                Animal Ark began as a small group of students and faculty determined to improve the lives of local street dogs and cats.
                            </p>
                            <p>
                                Today, we operate as a dedicated volunteer network. Our core commitments remain unwavering:
                                providing <strong>ethical medical rescue</strong> for injured animals, running community-wide <strong>sterilization and vaccination clinics</strong>,
                                and maintaining a strict <strong>zero-kill foster placement</strong> program to ensure every rescue finds a loving forever home.
                            </p>
                        </div>
                    </div>

                    {/* Impact Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-2 gap-4 sm:gap-6">
                        <div className="bg-nature-50 border border-nature-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                                <HeartPulse className="w-6 h-6" />
                            </div>
                            <span className="text-3xl font-black text-nature-900 mb-1">120+</span>
                            <span className="text-sm font-semibold text-nature-600 uppercase tracking-wide">Animals Treated</span>
                        </div>

                        <div className="bg-nature-50 border border-nature-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
                            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
                                <Home className="w-6 h-6" />
                            </div>
                            <span className="text-3xl font-black text-nature-900 mb-1">85+</span>
                            <span className="text-sm font-semibold text-nature-600 uppercase tracking-wide">Forever Homes</span>
                        </div>

                        <div className="bg-nature-50 border border-nature-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm sm:col-span-3 lg:col-span-2">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                                <Users className="w-6 h-6" />
                            </div>
                            <span className="text-3xl font-black text-nature-900 mb-1">100%</span>
                            <span className="text-sm font-semibold text-nature-600 uppercase tracking-wide">Volunteer Run</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Half: Volunteer & Staff Directory */}
                {members && members.length > 0 && (
                    <div className="pt-12 border-t border-nature-100">
                        <div className="text-center mb-10">
                            <h3 className="text-2xl sm:text-3xl font-bold text-nature-900 mb-3">
                                Meet Our Team
                            </h3>
                            <p className="text-nature-600 max-w-2xl mx-auto">
                                The dedicated volunteers and veterinary partners who make our mission possible every single day.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                            {members.map((member) => (
                                <div
                                    key={member._id}
                                    className="flex flex-col items-center text-center group"
                                >
                                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-4 overflow-hidden rounded-full border-4 border-nature-50 shadow-sm group-hover:shadow-md transition-shadow bg-nature-100">
                                        <img
                                            src={resolveImageUrl(member.avatar)}
                                            alt={`Photo of ${member.name}`}
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                    </div>
                                    <h4 className="text-lg font-bold text-nature-800 mb-1">
                                        {member.name}
                                    </h4>
                                    <p className="text-sm font-medium text-emerald-600">
                                        {member.role}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
};