import React, { useState } from 'react';
import { AlertCircle, ArrowRight, X } from 'lucide-react';
import type { NewsUpdate } from '../../types';

interface EmergencyTickerProps {
    news?: NewsUpdate[];
    onSelectNews?: (item: NewsUpdate) => void;
}

export const EmergencyTicker: React.FC<EmergencyTickerProps> = ({ news, onSelectNews }) => {
    const [isVisible, setIsVisible] = useState(true);

    // If no news is provided, the array is empty, or the user dismissed it, render nothing.
    if (!news || news.length === 0 || !isVisible) {
        return null;
    }

    // Display the most recent/urgent update
    const activeAlert = news[0];

    return (
        <div
            role="alert"
            className="bg-amber-50 border-b border-amber-200 relative transition-all duration-300 ease-in-out"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex items-center justify-between flex-wrap gap-3">

                    {/* Alert Content */}
                    <div className="flex items-center flex-1 min-w-0 gap-3">
                        <span className="flex p-1 rounded-lg bg-amber-100">
                            <AlertCircle className="w-5 h-5 text-amber-600" aria-hidden="true" />
                        </span>

                        <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-amber-900">
                            <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-600 text-white uppercase tracking-wider shadow-sm">
                                Urgent
                            </span>
                            <span className="truncate">
                                {activeAlert.snippet}
                            </span>
                        </div>
                    </div>

                    {/* Optional Link & Actions */}
                    <div className="flex items-center gap-4 shrink-0">
                        {onSelectNews ? (
                            <button
                                type="button"
                                onClick={() => onSelectNews(activeAlert)}
                                className="flex items-center text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors group cursor-pointer focus:outline-none focus:underline"
                            >
                                Read more
                                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        ) : activeAlert.linkUrl ? (
                            <a
                                href={activeAlert.linkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors group"
                            >
                                Read more
                                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                            </a>
                        ) : null}

                        {/* Dismiss Button */}
                        <button
                            type="button"
                            onClick={() => setIsVisible(false)}
                            className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-amber-100 text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
                            aria-label="Dismiss alert"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};