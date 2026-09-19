import { useState, useMemo } from 'react';
import type { BlogPost, NewsUpdate } from './types';
import { mockPets } from './data/mockPets';
import { mockNews } from './data/mockNews';
import { mockPosts, mockAuthors } from './data/mockPosts';

// Layout & Navigation Components
import { EmergencyTicker } from './components/news/EmergencyTicker';
import { Navbar } from './components/common/Navbar';
import { Hero } from './components/hero/Hero';
import { Footer } from './components/common/Footer';

// Section Components
import { PetCard } from './components/adoptions/PetCard';
import { PetFilter } from './components/adoptions/PetFilter';
import { StoriesSection } from './components/blog/StoriesSection';
import { DonationHub } from './components/donations/DonationHub';
import { AboutSection } from './components/about/AboutSection';

// Interactive Overlays
import { StoryModal } from './components/blog/StoryModal';
import { NewsModal } from './components/news/NewsModal';

type FilterType = 'all' | 'dog' | 'cat' | 'young';

export default function App() {
  // Modal selection state
  const [selectedStory, setSelectedStory] = useState<BlogPost | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsUpdate | null>(null);

  // Adoption gallery filter state
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Memoized filter counts
  const counts = useMemo(
    () => ({
      all: mockPets.length,
      dog: mockPets.filter((p) => p.species.toLowerCase() === 'dog').length,
      cat: mockPets.filter((p) => p.species.toLowerCase() === 'cat').length,
      young: mockPets.filter((p) => {
        const age = p.age.toLowerCase();
        return age.includes('month') || age.includes('puppy') || age.includes('kitten');
      }).length,
    }),
    []
  );

  // Memoized filtered pets list
  const filteredPets = useMemo(() => {
    return mockPets.filter((pet) => {
      if (activeFilter === 'dog') return pet.species.toLowerCase() === 'dog';
      if (activeFilter === 'cat') return pet.species.toLowerCase() === 'cat';
      if (activeFilter === 'young') {
        const age = pet.age.toLowerCase();
        return age.includes('month') || age.includes('puppy') || age.includes('kitten');
      }
      return true;
    });
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-nature-50 text-nature-800 flex flex-col antialiased">
      {/* Top Urgent Emergency Notification Bar */}
      <EmergencyTicker news={mockNews} onSelectNews={setSelectedNews} />

      {/* Main Sticky Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Adoption Gallery */}
        <section
          id="adoptions"
          className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-16"
        >
          <header className="text-center mb-10 space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-nature-900">
              Available for Adoption
            </h2>
            <p className="text-nature-600 max-w-xl mx-auto text-sm sm:text-base">
              Every adoption frees up shelter resources to rescue another vulnerable animal.
            </p>
          </header>

          <PetFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={counts}
          />

          {filteredPets.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPets.map((pet) => (
                <PetCard key={pet._id} pet={pet} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-nature-200 mt-8">
              <p className="text-nature-600 font-medium">
                No animals currently found in this category. Check back soon!
              </p>
            </div>
          )}
        </section>

        {/* Stories Section */}
        <StoriesSection posts={mockPosts} onSelectStory={setSelectedStory} />

        {/* Donation Hub */}
        <section
          id="donate"
          className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-16"
        >
          <DonationHub />
        </section>

        {/* About Section */}
        <AboutSection members={Object.values(mockAuthors)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Reading Overlays / Modals */}
      <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
      <NewsModal item={selectedNews} onClose={() => setSelectedNews(null)} />
    </div>
  );
}