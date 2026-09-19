import React from 'react';
import { StoryCard } from './StoryCard';
import type { BlogPost } from '../../types';

interface StoriesSectionProps {
    posts: BlogPost[];
    onSelectStory?: (story: BlogPost) => void;
}

export const StoriesSection: React.FC<StoriesSectionProps> = ({ posts, onSelectStory }) => {
    if (!posts || posts.length === 0) {
        return null;
    }

    return (
        <section id="stories" className="py-16 sm:py-24 bg-nature-50 border-t border-nature-200 scroll-mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-nature-900 tracking-tight mb-4">
                        Stories of Hope & Recovery
                    </h2>
                    <p className="text-base sm:text-lg text-nature-600 leading-relaxed">
                        Read how your compassion transforms street animal lives across Peradeniya.
                        Every rescue is a testament to the power of community support.
                    </p>
                </div>

                {/* Responsive Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <StoryCard key={post._id} post={post} onSelect={onSelectStory} />
                    ))}
                </div>

            </div>
        </section>
    );
};