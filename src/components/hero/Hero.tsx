import React from 'react';

export const Hero: React.FC = () => {
    return (
        <section className="relative bg-nature-50 overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">

                    {/* Left Column: Copy & Actions */}
                    <div className="flex flex-col justify-center text-center md:text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-nature-900 tracking-tight leading-[1.15]">
                            A Lifeline for <br className="hidden sm:block" />
                            <span className="text-emerald-600">Rescued Animals</span> <br className="hidden sm:block" />
                            in Peradeniya
                        </h1>

                        <p className="mt-6 text-base sm:text-lg lg:text-xl text-nature-700 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                            We are a dedicated volunteer network providing rescue, rehabilitation, and rehoming services for stray and injured animals across the Peradeniya community. Every adoption and donation saves a life.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                            <a
                                href="#adoptions"
                                className="flex items-center justify-center w-full sm:w-auto min-h-[44px] px-8 py-3 rounded-xl text-base font-semibold text-white bg-nature-700 hover:bg-nature-800 active:scale-[0.98] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-nature-500 focus:ring-offset-2 focus:ring-offset-nature-50"
                            >
                                Meet Animals
                            </a>
                            <a
                                href="#donate"
                                className="flex items-center justify-center w-full sm:w-auto min-h-[44px] px-8 py-3 rounded-xl text-base font-semibold text-nature-800 bg-white border border-nature-200 hover:bg-nature-50 active:scale-[0.98] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-nature-500 focus:ring-offset-2 focus:ring-offset-nature-50"
                            >
                                Support Us
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Image Showcase */}
                    <div className="relative mx-auto w-full max-w-md md:max-w-none">
                        {/* Decorative background blob/shape (optional, adds to the nature feel) */}
                        <div className="absolute -inset-4 bg-emerald-100/50 rounded-full blur-3xl -z-10"></div>

                        <div className="relative grid grid-cols-2 gap-4 sm:gap-6">
                            {/* Main Image */}
                            <div className="col-span-2">
                                <img
                                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80"
                                    alt="A happy rescued dog running outdoors"
                                    className="w-full h-64 sm:h-72 md:h-80 object-cover rounded-2xl shadow-lg border-4 border-white"
                                    loading="eager"
                                />
                            </div>

                            {/* Secondary Image 1 */}
                            <div className="col-span-1">
                                <img
                                    src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80"
                                    alt="A rescued cat resting comfortably"
                                    className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-2xl shadow-md border-4 border-white"
                                    loading="lazy"
                                />
                            </div>

                            {/* Secondary Image 2 */}
                            <div className="col-span-1">
                                <img
                                    src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80"
                                    alt="A volunteer holding a puppy"
                                    className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-2xl shadow-md border-4 border-white"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};