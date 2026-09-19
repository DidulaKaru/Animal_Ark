import React, { useEffect } from 'react';
import { X, Share2, Heart } from 'lucide-react';
import type { BlogPost, SanityImage, PortableTextBlock } from '../../types';
import { urlForImage } from '../../lib/sanity';

interface StoryModalProps {
    story: BlogPost | null;
    onClose: () => void;
}

/*
  Helper to resolve the image URL for both mock Unsplash URLs and real Sanity assets.
 */
const resolveImageUrl = (image?: SanityImage, width: number = 800) => {
    if (!image) return '/placeholder-image.jpg';
    if (image.asset._ref.startsWith('http')) {
        return image.asset._ref;
    }
    return urlForImage(image).width(width).format('webp').url();
};

/*
  A lightweight renderer for Sanity Portable Text blocks.
  Extracts text from standard block types to render paragraphs.
 */
const renderPortableText = (blocks: PortableTextBlock[]) => {
    return blocks.map((block) => {
        if (block._type !== 'block' || !block.children) return null;

        // Concatenate text spans within the block
        const textContent = block.children.map((child: any) => child.text).join('');

        if (!textContent.trim()) return <br key={block._key} />;

        return (
            <p key={block._key} className="mb-5 last:mb-0">
                {textContent}
            </p>
        );
    });
};

export const StoryModal: React.FC<StoryModalProps> = ({ story, onClose }) => {
    // Handle scroll locking and ESC key dismissal
    useEffect(() => {
        if (!story) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [story, onClose]);

    if (!story) return null;

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(story.publishedAt));

    const mainImageUrl = resolveImageUrl(story.mainImage, 1200);
    const avatarUrl = resolveImageUrl(story.author?.avatar, 100);

    // Handle backdrop click to close
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: story.title,
                    text: story.excerpt,
                    url: window.location.href,
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            // Fallback for browsers that don't support Web Share API
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="relative max-h-[90vh] overflow-y-auto max-w-2xl w-full bg-white rounded-2xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">

                {/* Hero Image & Close Button */}
                <div className="relative h-64 sm:h-80 w-full shrink-0 bg-nature-100">
                    <img
                        src={mainImageUrl}
                        alt={story.title}
                        className="w-full h-full object-cover"
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content Container */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col">

                    {/* Meta Row */}
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-nature-500">
                            {formattedDate}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-wider">
                            Rescue Story
                        </span>
                    </div>

                    {/* Title */}
                    <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-nature-900 mb-6 leading-tight">
                        {story.title}
                    </h2>

                    {/* Author Block */}
                    <div className="flex items-center gap-4 mb-8 p-4 rounded-xl bg-nature-50 border border-nature-100">
                        <img
                            src={avatarUrl}
                            alt={story.author?.name || 'Author'}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        <div>
                            <p className="text-base font-bold text-nature-900">
                                {story.author?.name}
                            </p>
                            <p className="text-sm font-medium text-emerald-600">
                                {story.author?.role}
                            </p>
                        </div>
                    </div>

                    {/* Article Body */}
                    <div className="prose prose-nature max-w-none text-base sm:text-lg leading-relaxed text-nature-700 mb-10">
                        {story.body ? renderPortableText(story.body) : <p>{story.excerpt}</p>}
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-auto pt-6 border-t border-nature-100 flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={handleShare}
                            className="flex-1 flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-xl font-semibold text-nature-700 bg-nature-50 hover:bg-nature-100 border border-nature-200 transition-colors focus:outline-none focus:ring-2 focus:ring-nature-500"
                        >
                            <Share2 className="w-5 h-5" />
                            Share Story
                        </button>
                        <a
                            href="#adoptions"
                            onClick={onClose}
                            className="flex-1 flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <Heart className="w-5 h-5" />
                            Support & Adopt
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};