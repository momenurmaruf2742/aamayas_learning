'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
    Printer, ChevronRight, RotateCw, BookOpen, Info, CheckCircle, X, Settings,
    Plus, Trash2, ShoppingCart, Minus, ChevronLeft, Layout, Maximize2
} from 'lucide-react';

// Image helper
const getImg = (id: string) => id && id.startsWith('http') ? id : `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=800`;

// FlashCard Component
const FlashCard = ({ card, color }: { card: any; color: string }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="relative w-full h-[450px] cursor-pointer perspective-1000 group mb-6"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-white rounded-[40px] border-4 border-gray-100 shadow-xl flex flex-col items-center justify-center p-8 hover:shadow-2xl transition-all">
                    <div className="w-full h-72 rounded-3xl overflow-hidden mb-6 bg-gray-50 flex items-center justify-center">
                        {card.frontContent && card.frontContent !== "none" ? (
                            <img src={getImg(card.frontContent)} alt={card.frontContent} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        ) : (
                            <div className="text-9xl font-black text-gray-200">{card.frontContent?.charAt(0) || '?'}</div>
                        )}
                    </div>
                    <div className="text-4xl font-black text-gray-800 uppercase tracking-tighter">{card.frontContent || 'CARD'}</div>
                    <div className="mt-auto text-gray-400 text-[10px] flex items-center uppercase font-bold tracking-widest animate-pulse">
                        <RotateCw className="w-3 h-3 mr-2" /> CLICK TO FLIP
                    </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gray-50 rounded-[40px] border-4 border-gray-200 shadow-xl p-10 flex flex-col items-center justify-center text-center">
                    <div className="text-5xl font-black text-red-600 mb-4">{card.backContent?.split('\\n')[0] || card.backContent || 'Answer'}</div>
                    <div className="text-3xl font-bold text-gray-800 mb-8 uppercase tracking-widest underline decoration-red-200 decoration-4 underline-offset-8">
                        {card.frontContent || 'Question'}
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-inner border border-gray-100 italic text-gray-600 leading-relaxed text-xl">
                        "{card.backContent || 'Educational fact.'}"
                    </div>
                    <div className="mt-auto text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                        Aamayas Learning Series
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function HomeClient({ categories }: { categories: any[] }) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id || null);
    const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    const selectedCategory = useMemo(() =>
        categories.find(c => c.id === selectedCategoryId) || categories[0],
        [categories, selectedCategoryId]
    );

    const topics = selectedCategory?.topics || [];

    // Auto-select first topic
    useMemo(() => {
        if (topics.length > 0 && !activeTopicId) {
            setActiveTopicId(topics[0].id);
        }
    }, [topics, activeTopicId]);

    const activeTopic = useMemo(() =>
        topics.find((t: any) => t.id === activeTopicId) || topics[0],
        [topics, activeTopicId]
    );

    const cards = activeTopic?.cards || [];

    return (
        <div className="min-h-screen bg-[#E5E7EB] font-sans text-gray-900">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center sticky top-0 z-50 shadow-sm">
                <div className="flex items-center space-x-3">
                    <div className="bg-red-600 p-2.5 rounded-2xl shadow-lg shadow-red-100">
                        <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tighter uppercase leading-none">AAMAYAS LEARNING</h1>
                        <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Early Learning Expert</span>
                    </div>
                </div>
            </header>

            <main className="max-w-[1600px] mx-auto p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEFT SIDEBAR */}
                <aside className="lg:col-span-3 space-y-6">
                    <div className="bg-[#EAEAEA] rounded-[40px] p-8 shadow-sm border border-gray-200/50">
                        {/* <h2 className="text-2xl font-bold text-gray-800 leading-tight mb-6">
                            10 Pack of Basic Flash Cards
                        </h2> */}

                        {/* Quantity + Cart */}
                        {/* <div className="flex items-center space-x-3 mb-8">
                            <div className="flex items-center bg-gray-200/50 rounded-xl overflow-hidden border border-gray-300">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-300 transition text-gray-600">
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-5 font-black text-gray-700 text-lg">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-300 transition text-gray-600">
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <button className="flex-1 bg-red-500 text-white font-black py-4 px-4 rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-200 flex items-center justify-center">
                                <ShoppingCart className="w-5 h-5 mr-2" /> ADD TO CART
                            </button>
                        </div> */}

                        {/* Pickup */}
                        <div className="flex items-center text-green-700 text-[10px] font-black bg-green-100/50 p-4 rounded-2xl mb-8 border border-green-200 uppercase tracking-widest leading-tight">
                            <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" /> <h2 className="text-2xl font-bold text-gray-800 leading-tight mb-6">
                            10 Pack of Basic Flash Cards
                        </h2>
                        </div>

                        {/* Specs */}
                        <div className="space-y-4 pt-6 border-t border-gray-300 text-[11px] font-black text-gray-400 uppercase tracking-wider">
                            <div className="flex justify-between items-center"><span>Total Cards</span> <span className="text-gray-900">240 (24 per topic)</span></div>
                            <div className="flex justify-between items-center"><span>Material</span> <span className="text-gray-900">Food Grade</span></div>
                            <div className="flex justify-between items-center"><span>Age Group</span> <span className="text-gray-900">3M - 6Y</span></div>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="bg-[#484B6A] text-white rounded-[40px] p-8 shadow-2xl relative overflow-hidden group">
                        <h4 className="text-xl font-black mb-6 flex items-center tracking-tight">
                            <Info className="w-5 h-5 mr-3 text-indigo-300" /> Benefits of Learning
                        </h4>
                        <div className="space-y-5 text-xs font-semibold opacity-95">
                            <div className="flex items-start">
                                <div className="bg-white/10 p-1.5 rounded-lg mr-4 mt-0.5"><CheckCircle className="w-4 h-4 text-indigo-300" /></div>
                                <div><span className="block text-indigo-200 mb-0.5 uppercase tracking-tighter">Right Brain</span> Develops photographic lifetime memory.</div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-white/10 p-1.5 rounded-lg mr-4 mt-0.5"><CheckCircle className="w-4 h-4 text-indigo-300" /></div>
                                <div><span className="block text-indigo-200 mb-0.5 uppercase tracking-tighter">Concentration</span> Visual stimulation improves baby focus.</div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-white/10 p-1.5 rounded-lg mr-4 mt-0.5"><CheckCircle className="w-4 h-4 text-indigo-300" /></div>
                                <div><span className="block text-indigo-200 mb-0.5 uppercase tracking-tighter">Vocabulary</span> Builds foundation for fast word recall.</div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-white/10 p-1.5 rounded-lg mr-4 mt-0.5"><CheckCircle className="w-4 h-4 text-indigo-300" /></div>
                                <div><span className="block text-indigo-200 mb-0.5 uppercase tracking-tighter">Bonding</span> Creates quality interactive parent time.</div>
                            </div>
                        </div>
                        <Maximize2 className="absolute -right-10 -bottom-10 w-48 h-48 opacity-5 group-hover:scale-110 transition-transform duration-1000" />
                    </div>
                </aside>

                {/* RIGHT AREA */}
                <div className="lg:col-span-9">
                    {/* Category Pills */}
                    <div className="mb-8 flex overflow-x-auto pb-2 no-scrollbar space-x-3 items-center">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => { setSelectedCategoryId(cat.id); setActiveTopicId(null); }}
                                className={`flex-shrink-0 px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${selectedCategoryId === cat.id ? "bg-red-500 text-white shadow-xl shadow-red-200" : 'bg-white text-gray-500 border hover:bg-gray-50'}`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Topic Pills */}
                    {topics.length > 1 && (
                        <div className="mb-8 flex overflow-x-auto pb-2 no-scrollbar space-x-3 items-center">
                            <Layout className="w-5 h-5 text-gray-300 flex-shrink-0" />
                            {topics.map((topic: any) => (
                                <button
                                    key={topic.id}
                                    onClick={() => setActiveTopicId(topic.id)}
                                    className={`flex-shrink-0 px-8 py-3.5 rounded-2xl text-sm font-black transition-all ${activeTopicId === topic.id ? 'bg-orange-500 text-white shadow-xl' : 'bg-white text-gray-500 hover:bg-gray-50 border'}`}
                                >
                                    {topic.name}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Topic Banner */}
                    {activeTopic && (
                        <div className="bg-orange-700 rounded-[50px] p-12 text-white mb-10 shadow-2xl relative overflow-hidden flex items-center justify-between">
                            <div className="relative z-10">
                                <div className="bg-black/20 backdrop-blur-md inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">Topic Explorer</div>
                                <h2 className="text-6xl font-black tracking-tighter mb-2 drop-shadow-md">{activeTopic.name}</h2>
                                <p className="opacity-90 italic font-medium max-w-sm">{selectedCategory?.description || 'Learn with flashcards'}</p>
                            </div>
                            <Printer className="w-16 h-16 bg-white/20 p-4 rounded-3xl cursor-pointer hover:bg-white/30 transition-all shadow-inner hidden sm:block" />
                        </div>
                    )}

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {cards.map((card: any) => (
                            <FlashCard key={card.id} card={card} color="bg-orange-700" />
                        ))}

                        {cards.length === 0 && (
                            <div className="col-span-full text-center py-20 bg-white rounded-[40px] shadow-sm">
                                <BookOpen className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                                <p className="text-gray-400 font-bold">No cards available yet.</p>
                            </div>
                        )}
                    </div>

                    {/* Footer Branding */}
                    <footer className="mt-20 text-center py-20 border-t border-gray-200">
                        <div className="w-10 h-10 text-red-500 mx-auto mb-6">❤️</div>
                        <h4 className="text-3xl font-black text-gray-900 mb-3 tracking-tighter uppercase">Aamayas Learning</h4>
                        <p className="text-gray-500 max-w-xl mx-auto font-medium leading-relaxed px-4">
                            We believe every child has a genius within. Our research-based cards stimulate visual intelligence and build cognitive foundations.
                        </p>
                        <div className="mt-10 flex justify-center space-x-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            <span>Scientific Design</span>
                            <span>•</span>
                            <span>Parenting Hub</span>
                            <span>•</span>
                            <span>Early Brain Growth</span>
                        </div>
                    </footer>
                </div>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
          .perspective-1000 { perspective: 1000px; }
          .backface-hidden { backface-visibility: hidden; }
          .transform-style-3d { transform-style: preserve-3d; }
          .rotate-y-180 { transform: rotateY(180deg); }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />
        </div>
    );
}
