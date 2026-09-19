import React from 'react';
import { MessageCircle, Phone, MapPin } from 'lucide-react';

const WHATSAPP_NUMBER = '94768624268';
const INSTAGRAM_URL = 'https://www.instagram.com/animalark_uop/';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-nature-900 text-nature-300 py-12 sm:py-16 border-t border-nature-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">

                    {/* Column 1: Brand & Mission */}
                    <div className="flex flex-col">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2.5">
                                <img
                                    src={`${import.meta.env.BASE_URL}favicon.png`}
                                    alt="Animal Ark Emblem"
                                    className="h-9 w-auto object-contain"
                                />
                                <img
                                    src={`${import.meta.env.BASE_URL}logo.png`}
                                    alt="Animal Ark"
                                    className="h-6 w-auto object-contain"
                                />
                            </div>
                            <p className="text-sm text-nature-600 max-w-sm leading-relaxed">
                                A dedicated volunteer network providing rescue, rehabilitation, and rehoming services
                                for stray and injured animals across the Peradeniya community.
                            </p>
                        </div>
                        <p className="text-sm leading-relaxed text-nature-400">
                            A dedicated volunteer network providing rescue, rehabilitation, and rehoming services for stray and injured animals across the Peradeniya community.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-nature-700 font-bold mb-4 uppercase tracking-wider text-sm">
                            Quick Links
                        </h3>
                        <ul className="space-y-3 text-sm font-medium">
                            <li>
                                <a href="#adoptions" className="hover:text-[#ff7b00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff7b00] rounded-sm">
                                    Available Adoptions
                                </a>
                            </li>
                            <li>
                                <a href="#stories" className="hover:text-[#ff7b00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff7b00] rounded-sm">
                                    Rescue Stories
                                </a>
                            </li>
                            <li>
                                <a href="#donate" className="hover:text-[#ff7b00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff7b00] rounded-sm">
                                    Make a Donation
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="hover:text-[#ff7b00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff7b00] rounded-sm">
                                    About Our Team
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Contact & Emergency */}
                    <div>
                        <h3 className="text-nature-700 font-bold mb-4 uppercase tracking-wider text-sm">
                            Emergency & Contact
                        </h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-[#ff7b00] shrink-0" />
                                <div>
                                    <p className="font-semibold text-nature-700">Helpline</p>
                                    <a href="tel:+94768624268" className="hover:text-white transition-colors">
                                        +94 76 862 4268
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-[#ff7b00] shrink-0" />
                                <div>
                                    <p className="font-semibold text-nature-700">Location</p>
                                    <p>University of Peradeniya,<br />Sri Lanka</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Social Integration */}
                    <div>
                        <h3 className="text-nature-700 font-bold mb-4 uppercase tracking-wider text-sm">
                            Connect With Us
                        </h3>
                        <div className="flex flex-col gap-3">
                            <a
                                href={INSTAGRAM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-nature-800 hover:bg-nature-700 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff7b00]"
                            >
                                <InstagramIcon className="w-5 h-5" />
                                <span className="text-sm font-semibold">Follow on Instagram</span>
                            </a>

                            <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-600/20 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                <MessageCircle className="w-5 h-5" />
                                <span className="text-sm font-semibold">Chat on WhatsApp</span>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom Section: Legal & Attribution */}
                <div className="pt-8 border-t border-nature-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-nature-500">
                    <p>
                        &copy; {currentYear} Animal Ark Peradeniya. All rights reserved.
                    </p>
                    <p>
                        Built with zero-overhead architecture by <span className="font-semibold text-nature-400">Amboss</span>.
                    </p>
                </div>
            </div>
        </footer >
    );
};