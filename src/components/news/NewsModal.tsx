// src/components/news/NewsModal.tsx
import React, { useEffect } from 'react';
import { X, MapPin, AlertTriangle, MessageCircle } from 'lucide-react';
import type { NewsUpdate } from '../../types';

interface NewsModalProps {
    item: NewsUpdate | null;
    onClose: () => void;
}

const WHATSAPP_NUMBER = '94768624268';

export const NewsModal: React.FC<NewsModalProps> = ({ item, onClose }) => {
    // Handle scroll locking and ESC key dismissal
    useEffect(() => {
        if (!item) return;

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
    }, [item, onClose]);

    if (!item) return null;

    // Format the date
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(item.date));

    // Handle backdrop click to close
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Fallbacks for extended fields if they are added to the schema later
    const narrative = (item as any).fullDetails || item.snippet;
    const location = (item as any).location || 'Peradeniya Area';

    // Pre-fill WhatsApp message based on the alert
    const whatsappMessage = encodeURIComponent(`Hi Animal Ark, I am reaching out regarding the urgent alert: "${item.title}". How can I help?`);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="news-modal-title"
        >
            <div className="relative max-h-[90vh] overflow-y-auto max-w-lg w-full bg-white rounded-2xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">

                {/* Alert Header */}
                <div className="bg-amber-50 border-b border-amber-200 p-5 sm:p-6 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 shrink-0">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-red-600 text-white uppercase tracking-wider shadow-sm mb-1">
                                Urgent Alert
                            </span>
                            <p className="text-sm font-medium text-amber-900">
                                {formattedDate}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 shrink-0"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content Body */}
                <div className="p-5 sm:p-6 flex-grow flex flex-col">

                    {/* Location Pill */}
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-stone-500 mb-4">
                        <MapPin className="w-4 h-4" />
                        {location}
                    </div>

                    {/* Title & Narrative */}
                    <h2 id="news-modal-title" className="text-2xl font-bold text-stone-900 mb-4 leading-tight">
                        {item.title}
                    </h2>

                    <div className="prose prose-stone max-w-none text-base leading-relaxed text-stone-700 mb-8">
                        <p>{narrative}</p>
                    </div>

                    {/* Dual Action Footer */}
                    <div className="mt-auto pt-6 border-t border-stone-100 flex flex-col sm:flex-row gap-3">
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={onClose}
                            className="flex-1 flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-[0.98] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Contact Rescue Team
                        </a>
                        <button
                            onClick={onClose}
                            className="flex-1 flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-xl font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-stone-500"
                        >
                            Dismiss
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};