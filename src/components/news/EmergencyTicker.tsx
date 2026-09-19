import { useState } from 'react';
import { AlertCircle, ArrowRight, X } from 'lucide-react';
import type { NewsUpdate } from '../../types';

interface EmergencyTickerProps {
    news?: NewsUpdate[];
    onSelectNews?: (item: NewsUpdate) => void;
}

export function EmergencyTicker({ news, onSelectNews }: EmergencyTickerProps) {
    const [isDismissed, setIsDismissed] = useState(false);

    if (isDismissed || !news || news.length === 0) {
        return null;
    }

    const activeAlert = news[0];

    return (
        <aside
            aria-label="Emergency Announcement"
            className="bg-amber-50 border-b border-amber-200 text-amber-950 px-4 py-2.5 sm:py-2"
        >
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">

                {/* Left Side: Badge + Content */}
                <div className="flex items-start sm:items-center gap-2.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 shrink-0 pt-0.5 sm:pt-0">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />
                        <span className="bg-amber-600 text-white text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                            Urgent
                        </span>
                    </div>

                    <div className="text-xs sm:text-sm font-medium leading-snug flex-1">
                        <span className="text-amber-900">{activeAlert.snippet}</span>
                        {onSelectNews && (
                            <button
                                type="button"
                                onClick={() => onSelectNews(activeAlert)}
                                className="inline-flex items-center gap-1 font-semibold text-amber-700 hover:text-amber-900 ml-2 underline underline-offset-2 cursor-pointer transition-colors"
                            >
                                <span>Read details</span>
                                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Right Side: Dismiss Button */}
                <div className="absolute top-2.5 right-3 sm:static sm:flex sm:items-center shrink-0">
                    <button
                        type="button"
                        onClick={() => setIsDismissed(true)}
                        aria-label="Dismiss alert"
                        className="p-1 rounded-md text-amber-700 hover:text-amber-950 hover:bg-amber-100 transition-colors cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

            </div>
        </aside>
    );
}