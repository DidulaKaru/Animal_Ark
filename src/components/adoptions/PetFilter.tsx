// src/components/adoptions/PetFilter.tsx
import React from 'react';

export type FilterOption = 'all' | 'dog' | 'cat' | 'young';

interface PetFilterProps {
    activeFilter: FilterOption;
    onFilterChange: (filter: FilterOption) => void;
    counts: Record<FilterOption, number>;
}

export const PetFilter: React.FC<PetFilterProps> = ({
    activeFilter,
    onFilterChange,
    counts,
}) => {
    const filters: { id: FilterOption; label: string }[] = [
        { id: 'all', label: 'All' },
        { id: 'dog', label: 'Dogs' },
        { id: 'cat', label: 'Cats' },
        { id: 'young', label: 'Puppies & Kittens' },
    ];

    /* 
      Mobile-first container: 
      - overflow-x-auto enables horizontal scrolling
      - scrollbar hiding utilities keep the UI clean on mobile
      - snap-x ensures smooth thumb scrolling between pills
    */
    return (
        <nav
            className="flex overflow-x-auto gap-3 pb-4 w-full snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            aria-label="Filter pets"
        >
            {filters.map((filter) => {
                const isActive = activeFilter === filter.id;

                return (
                    <button
                        key={filter.id}
                        onClick={() => onFilterChange(filter.id)}
                        className={`
              snap-start shrink-0 flex items-center justify-center px-5 min-h-[44px] rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-nature-500 focus:ring-offset-2
              ${isActive
                                ? 'bg-nature-700 text-white shadow-md'
                                : 'bg-white text-nature-800 border border-nature-100 hover:bg-nature-50 shadow-sm'
                            }
            `}
                        aria-pressed={isActive}
                    >
                        {filter.label}

                        {/* Count Badge */}
                        <span
                            className={`
                ml-2 px-2 py-0.5 rounded-full text-xs font-semibold
                ${isActive
                                    ? 'bg-white/20 text-white'
                                    : 'bg-nature-100 text-nature-600'
                                }
              `}
                        >
                            {counts[filter.id]}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
};