'use client';

import { useState } from 'react';
import { CheckCircle, ShoppingCart, Plus, Minus, Info } from 'lucide-react';

interface SidebarProps {
    categoryName: string;
    categoryDescription?: string;
    totalCards?: number;
    ageGroup?: string;
}

export default function Sidebar({ categoryName, categoryDescription, totalCards = 240, ageGroup = "3 Months - 6 Years" }: SidebarProps) {
    const [quantity, setQuantity] = useState(1);

    return (
        <aside className="lg:col-span-3 space-y-6">
            {/* Main Info Card */}
            <div className="bg-[#EAEAEA] rounded-[30px] p-8 shadow-sm border border-gray-200/50">
                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6 leading-tight">
                    {categoryName || "Flash Cards Collection"}
                </h2>

                {/* Quantity & Cart */}
                <div className="flex items-center space-x-3 mb-8">
                    <div className="flex items-center bg-gray-200/50 rounded-lg overflow-hidden border border-gray-300">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="p-3 hover:bg-gray-300 transition"
                        >
                            <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="px-4 font-bold text-gray-700">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="p-3 hover:bg-gray-300 transition"
                        >
                            <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                    <button className="flex-1 bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition-colors shadow-md flex items-center justify-center">
                        <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                    </button>
                </div>

                {/* Pickup Info */}
                <div className="flex items-center text-green-700 text-xs font-bold bg-green-100/50 p-3 rounded-xl mb-6 border border-green-200">
                    <CheckCircle className="w-4 h-4 mr-2" /> Pickup available at Mind Wealth (24h)
                </div>

                {/* Specs List */}
                <div className="space-y-4 pt-6 border-t border-gray-300 text-xs font-bold text-gray-500">
                    <div className="flex justify-between items-center">
                        <span className="uppercase tracking-wider">Total Cards</span>
                        <span className="text-gray-900 font-black">{totalCards}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="uppercase tracking-wider">Material</span>
                        <span className="text-gray-900 font-black">Food Grade</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="uppercase tracking-wider">Age Group</span>
                        <span className="text-gray-900 font-black">{ageGroup}</span>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-[#484B6A] text-white rounded-[30px] p-6 shadow-lg">
                <h4 className="text-lg font-bold mb-5 flex items-center">
                    <Info className="w-5 h-5 mr-2" /> Benefits of Learning
                </h4>
                <div className="space-y-4 text-xs font-medium opacity-90">
                    <div className="flex items-start">
                        <div className="bg-white/20 p-1 rounded mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-3 h-3" />
                        </div>
                        <div>
                            <strong className="block text-white mb-1">Right Brain Learning</strong>
                            Develops lifetime memory skills.
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="bg-white/20 p-1 rounded mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-3 h-3" />
                        </div>
                        <div>
                            <strong className="block text-white mb-1">Concentration</strong>
                            Eye-catching images improve attention.
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="bg-white/20 p-1 rounded mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-3 h-3" />
                        </div>
                        <div>
                            <strong className="block text-white mb-1">Enrich Vocabulary</strong>
                            Remember words at high speed.
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="bg-white/20 p-1 rounded mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-3 h-3" />
                        </div>
                        <div>
                            <strong className="block text-white mb-1">Bonding</strong>
                            Creates playful parent-child time.
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
