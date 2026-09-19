import React, { useState } from 'react';
import { Copy, Check, ExternalLink, QrCode, Heart } from 'lucide-react';

const BANK_DETAILS = {
    bankName: 'Bank of Ceylon',
    branch: 'Peradeniya Branch',
    accountName: 'Animal Ark Rescue',
    accountNumber: '8473920184',
};

const PAYPAL_LINK = 'https://paypal.me/animalarkperadeniya'; // Example link

export const DonationHub: React.FC = () => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyAccount = async () => {
        try {
            await navigator.clipboard.writeText(BANK_DETAILS.accountNumber);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <section className="w-full max-w-5xl mx-auto my-8" aria-labelledby="donation-heading">
            <div className="text-center mb-8">
                <Heart className="w-10 h-10 mx-auto text-emerald-600 mb-3" aria-hidden="true" />
                <h2 id="donation-heading" className="text-3xl font-bold text-stone-800 mb-3">
                    Support Our Mission
                </h2>
                <p className="text-stone-600 max-w-2xl mx-auto px-4">
                    Your contributions provide food, shelter, and life-saving medical care to animals in need across Peradeniya.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 sm:px-6">

                {/* LOCAL DONATION CARD (LKR) */}
                <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden flex flex-col">
                    <div className="bg-stone-50 border-b border-stone-200 px-6 py-4">
                        <h3 className="text-xl font-bold text-stone-800">Local Support (LKR)</h3>
                        <p className="text-sm text-stone-500 mt-1">Direct bank transfer or LANKAQR</p>
                    </div>

                    <div className="p-6 flex-grow flex flex-col gap-6">
                        {/* Bank Details Table/List */}
                        <ul className="space-y-3 text-sm sm:text-base text-stone-700">
                            <li className="flex justify-between items-center py-1 border-b border-stone-100">
                                <span className="font-medium text-stone-500">Bank</span>
                                <span className="font-semibold text-stone-800">{BANK_DETAILS.bankName}</span>
                            </li>
                            <li className="flex justify-between items-center py-1 border-b border-stone-100">
                                <span className="font-medium text-stone-500">Branch</span>
                                <span className="font-semibold text-stone-800">{BANK_DETAILS.branch}</span>
                            </li>
                            <li className="flex justify-between items-center py-1 border-b border-stone-100">
                                <span className="font-medium text-stone-500">Account Name</span>
                                <span className="font-semibold text-stone-800">{BANK_DETAILS.accountName}</span>
                            </li>
                            <li className="flex justify-between items-center py-2">
                                <span className="font-medium text-stone-500">Account No.</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-lg text-emerald-700 tracking-wide">
                                        {BANK_DETAILS.accountNumber}
                                    </span>
                                    <button
                                        onClick={handleCopyAccount}
                                        className="flex items-center justify-center w-10 h-10 min-h-[44px] rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
                                        aria-label="Copy account number"
                                        title="Copy account number"
                                    >
                                        {isCopied ? (
                                            <Check className="w-5 h-5 text-emerald-600" />
                                        ) : (
                                            <Copy className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </li>
                        </ul>

                        {/* LANKAQR Section */}
                        <div className="mt-auto pt-4 border-t border-stone-100">
                            <div className="flex items-start gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
                                <div className="flex-shrink-0 bg-white p-2 rounded-lg border border-stone-200 shadow-sm">
                                    {/* Placeholder for actual LANKAQR Image */}
                                    <QrCode className="w-12 h-12 text-stone-400" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-stone-800 flex items-center gap-2">
                                        LANKAQR Supported
                                    </h4>
                                    <p className="text-sm text-stone-600 mt-1">
                                        Scan this code using any Sri Lankan banking app to donate instantly.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* INTERNATIONAL DONATION CARD */}
                <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden flex flex-col">
                    <div className="bg-emerald-50 border-b border-emerald-100 px-6 py-4">
                        <h3 className="text-xl font-bold text-emerald-900">International Support</h3>
                        <p className="text-sm text-emerald-700 mt-1">Secure foreign currency contributions</p>
                    </div>

                    <div className="p-6 flex-grow flex flex-col justify-between gap-6">
                        <div className="space-y-4">
                            <p className="text-stone-700 leading-relaxed">
                                Living abroad? Your foreign contributions go a incredibly long way in Sri Lanka.
                            </p>
                            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                                <h4 className="font-semibold text-stone-800 mb-2">How your donation helps:</h4>
                                <ul className="space-y-2 text-sm text-stone-600 list-disc list-inside marker:text-emerald-500">
                                    <li>Procuring urgent medical supplies and vaccines.</li>
                                    <li>Funding specialized surgeries for injured rescues.</li>
                                    <li>Supporting our community spay/neuter programs.</li>
                                </ul>
                            </div>
                        </div>

                        <a
                            href={PAYPAL_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-full min-h-[44px] px-6 py-3 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 mt-auto"
                        >
                            Donate via PayPal
                            <ExternalLink className="w-5 h-5 ml-2 opacity-90" />
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
};