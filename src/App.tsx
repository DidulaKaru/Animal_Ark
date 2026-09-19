import { useState, useMemo } from 'react';
import { mockPets } from './data/mockPets';
import { mockNews } from './data/mockNews';
import { EmergencyTicker } from './components/news/EmergencyTicker';
import { Hero } from './components/hero/Hero';
import { PetCard } from './components/adoptions/PetCard';
import { PetFilter } from './components/adoptions/PetFilter';
import { DonationHub } from './components/donations/DonationHub';
import { Navbar } from './components/common/Navbar';

type FilterType = 'all' | 'dog' | 'cat' | 'young';

export default function App() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  <Navbar />

  const counts = useMemo(() => ({
    all: mockPets.length,
    dog: mockPets.filter((p) => p.species.toLowerCase() === 'dog').length,
    cat: mockPets.filter((p) => p.species.toLowerCase() === 'cat').length,
    young: mockPets.filter((p) => {
      const age = p.age.toLowerCase();
      return age.includes('month') || age.includes('puppy') || age.includes('kitten');
    }).length,
  }), []);

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
    <div className="min-h-screen bg-nature-50 text-nature-800 flex flex-col">
      {/* Top Urgent Bar */}
      <EmergencyTicker news={mockNews} />

      <Navbar />

      {/* Hero Header */}
      <Hero />

      {/* Adoption Gallery */}
      <section id="adoptions" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-6">
        <header className="text-center mb-8 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-nature-800">
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

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      </section>

      {/* Donation Hub */}
      <section id="donate" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-6">
        <DonationHub />
      </section>
    </div>
  );
}