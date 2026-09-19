import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { BlogPost, SanityImage } from '../../types';
import { urlForImage } from '../../lib/sanity';

interface StoryCardProps {
    post: BlogPost;
    onSelect?: (post: BlogPost) => void;
}

/**
 * Helper to resolve the image URL for both mock Unsplash URLs and real Sanity assets.
 */
const resolveImageUrl = (image?: SanityImage, width: number = 800) => {
    if (!image) return '/placeholder-image.jpg';
    if (image.asset._ref.startsWith('http')) {
        return image.asset._ref;
    }
    return urlForImage(image).width(width).format('webp').url();
};

export const StoryCard: React.FC<StoryCardProps> = ({ post, onSelect }) => {
    // Format the date using the native Intl.DateTimeFormat API
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(post.publishedAt));

    const mainImageUrl = resolveImageUrl(post.mainImage);
    const avatarUrl = resolveImageUrl(post.author?.avatar, 100);

    return (
        <article
            onClick={() => onSelect?.(post)}
            onKeyDown={(e) => {
                if (onSelect && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onSelect(post);
                }
            }}
            tabIndex={onSelect ? 0 : undefined}
            role={onSelect ? 'button' : undefined}
            aria-label={`Read story: ${post.title}`}
            className="group flex flex-col bg-white rounded-2xl shadow-sm border border-nature-200 overflow-hidden hover:shadow-md transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
            {/* Featured Image Container */}
            <div className="relative h-56 w-full overflow-hidden bg-nature-100">
                <img
                    src={mainImageUrl}
                    alt={post.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-out"
                    loading="lazy"
                />
            </div>

            {/* Card Content */}
            <div className="flex flex-col flex-grow p-6">
                {/* Meta Row */}
                <div className="flex items-center justify-between mb-3 text-xs font-medium">
                    <span className="text-nature-500">{formattedDate}</span>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                        Rescue Story
                    </span>
                </div>

                {/* Title & Excerpt */}
                <h3 className="text-xl font-bold text-nature-800 mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {post.title}
                </h3>
                <p className="text-sm text-nature-600 line-clamp-3 mb-4 flex-grow">
                    {post.excerpt}
                </p>

                {/* Read More Link */}
                <div className="flex items-center text-emerald-600 font-semibold text-sm mb-5 group/link">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1.5 group-hover/link:translate-x-1 transition-transform" />
                </div>

                {/* Author Attribution Row */}
                <div className="flex items-center gap-3 pt-4 border-t border-nature-100 mt-auto">
                    <img
                        src={avatarUrl}
                        alt={post.author?.name || 'Author'}
                        className="w-9 h-9 rounded-full object-cover border border-nature-200 bg-nature-50"
                        loading="lazy"
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-nature-900 leading-tight">
                            {post.author?.name}
                        </span>
                        <span className="text-xs text-nature-500 font-medium">
                            {post.author?.role}
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
};