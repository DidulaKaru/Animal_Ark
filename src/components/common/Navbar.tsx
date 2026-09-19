import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
    { name: 'Adoptions', href: '#adoptions' },
    { name: 'Donate', href: '#donate' },
    { name: 'Stories', href: '#stories' },
    { name: 'About', href: '#about' },
];

export const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);
    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-nature-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo & Branding */}
                    <div className="flex-shrink-0 flex items-center">
                        <a href="#" className="flex items-center gap-2.5 group">
                            <img
                                src="/favicon.png"
                                alt="Animal Ark Emblem"
                                className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
                            />
                            <img
                                src="/logo.png"
                                alt="Animal Ark"
                                className="h-6 sm:h-7 w-auto object-contain"
                            />
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8" aria-label="Desktop Navigation">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-base font-semibold text-nature-700 hover:text-[#ff7b00] transition-colors min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-nature-500 rounded-md px-2"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Mobile Menu Toggle Button */}
                    <div className="flex md:hidden">
                        <button
                            type="button"
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 min-h-[44px] min-w-[44px] rounded-md text-nature-700 hover:text-nature-900 hover:bg-nature-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-nature-500 transition-colors"
                            aria-expanded={isMobileMenuOpen}
                            aria-label="Toggle navigation menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="block w-6 h-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block w-6 h-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-nature-100 shadow-lg absolute w-full">
                    <nav className="px-4 pt-2 pb-4 space-y-1 sm:px-6" aria-label="Mobile Navigation">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={closeMenu}
                                className="block px-4 py-3 min-h-[44px] rounded-xl text-base font-semibold text-nature-800 hover:bg-nature-50 hover:text-[#ff7b00] transition-colors focus:outline-none focus:ring-2 focus:ring-nature-500"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};