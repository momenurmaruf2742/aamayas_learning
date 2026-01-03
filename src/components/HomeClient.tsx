'use client';

import { useState, useMemo, useRef } from 'react';
import { ShoppingCart, Search, Printer, Menu, Plus, Minus, Truck, ShieldCheck, Clock, BookOpen, Star, Heart, Check, Layout, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import FlashCard from './FlashCard';
import { useRouter } from 'next/navigation';

export default function HomeClient({ categories }: { categories: any[] }) {
    const router = useRouter();
    const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id);
    const [quantity, setQuantity] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const activeCategory = useMemo(() =>
        categories.find((c: any) => c.id === activeCategoryId) || categories[0],
        [categories, activeCategoryId]
    );

    const topics = activeCategory?.topics || [];
    const [activeTopicId, setActiveTopicId] = useState<string | null>(null);

    // Auto-select first topic when category changes
    useMemo(() => {
        if (topics.length > 0 && (!activeTopicId || !topics.find((t: any) => t.id === activeTopicId))) {
            setActiveTopicId(topics[0].id);
        }
    }, [topics, activeTopicId]);

    const activeTopic = useMemo(() =>
        topics.find((t: any) => t.id === activeTopicId) || topics[0],
        [topics, activeTopicId]
    );

    const cards = activeTopic?.cards || [];


    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = 300; // Scroll width of approx 2 items
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="min-h-screen font-sans font-feature-settings-ss01 selection:bg-red-500 selection:text-white">
            {/* ... Header ... */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm transition-all duration-300 supports-[backdrop-filter]:bg-white/60">
                {/* ... (Header content same as before) ... */}
                <div className="max-w-[1700px] mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-2xl shadow-lg shadow-red-500/20 ring-4 ring-red-50">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black tracking-tighter text-slate-900 leading-none">
                                AAMAYAS<span className="text-red-500">.</span>
                            </h1>
                            <p className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase mt-1">Early Learning Expert</p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="hidden md:flex relative w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-red-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Find flashcards, categories..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-full py-3 pl-12 pr-6 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500 transition-all shadow-sm group-focus-within:shadow-md"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        {activeTopic && (
                            <Link href={`/print/${activeTopic.id}`} className="hidden sm:flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 active:translate-y-0 transform hover:scale-105">
                                <Printer className="w-4 h-4" />
                                <span>Print Cards</span>
                            </Link>
                        )}
                        <Link href="/admin/cards" className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                            <Menu className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-[1700px] mx-auto p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* LEFT SIDEBAR - Stickied */}
                <aside className="lg:col-span-3 space-y-8 lg:sticky lg:top-32 h-fit">
                    {/* ... (Sidebar same as before) ... */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/80 backdrop-blur-md rounded-[40px] p-8 border border-white/50 shadow-colored relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                        <div className="relative">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-200/50">
                                <Star className="w-3 h-3 fill-current" /> Premium Pack
                            </div>

                            <h2 className="text-3xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
                                10 Pack of Basic Flash Cards
                            </h2>

                            {/* Quantity + Cart */}
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center justify-between bg-slate-50/80 p-2 rounded-2xl border border-slate-200/50">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-600 hover:text-red-600 transition-colors">
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="font-bold text-xl text-slate-800">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-600 hover:text-red-600 transition-colors">
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                <button className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-black py-4 rounded-2xl shadow-glow-red hover:shadow-red-500/40 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3 group-hover:scale-[1.02]">
                                    <ShoppingCart className="w-5 h-5" />
                                    ADD TO CART
                                </button>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 text-emerald-800 text-xs font-bold mb-8">
                                <div className="bg-emerald-100 p-2.5 rounded-xl">
                                    <Truck className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="uppercase tracking-wide opacity-70 text-[10px]">Ready for pickup</p>
                                    <p>Available at local store</p>
                                </div>
                            </div>

                            {/* Details List */}
                            <div className="space-y-5 border-t border-dashed border-gray-200 pt-8">
                                <div className="flex justify-between items-center group/item">
                                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wider group-hover/item:text-slate-600 transition-colors">Total Cards</span>
                                    <span className="text-base font-black text-slate-800">120 Pieces</span>
                                </div>
                                <div className="flex justify-between items-center group/item">
                                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wider group-hover/item:text-slate-600 transition-colors">Material</span>
                                    <span className="text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">Laminated + Box</span>
                                </div>
                                <div className="flex justify-between items-center group/item">
                                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wider group-hover/item:text-slate-600 transition-colors">Age Group</span>
                                    <span className="text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">3-8 Years</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Benefits Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-900/20"
                    >
                        {/* ... benefits content ... */}
                        <div className="absolute top-0 right-0 p-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                        <h3 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-emerald-400" /> Benefits
                        </h3>
                        <ul className="space-y-4 relative z-10">
                            {[
                                'Boosts Memory Retention',
                                'Enhances Vocabulary',
                                'Improves Concentration',
                                'Visual Learning Aid'
                            ].map((benefit, i) => (
                                <li key={i} className="flex items-start gap-3 group">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:scale-110 transition-all duration-300">
                                        <Check className="w-3 h-3 text-emerald-300 group-hover:text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors leading-normal">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </aside>

                {/* RIGHT CONTENT */}
                <div className="lg:col-span-9 space-y-10">

                    {/* Categories Navigation */}
                    <div className="relative group/nav">
                        {/* Title */}
                        <div className="flex items-center justify-between mb-4 px-1">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Collections</div>
                            <div className="flex gap-2">
                                <button onClick={() => scroll('left')} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm border border-slate-100 hover:bg-slate-50 hover:border-slate-300 transition-all">
                                    <ChevronLeft className="w-4 h-4 text-slate-600" />
                                </button>
                                <button onClick={() => scroll('right')} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm border border-slate-100 hover:bg-slate-50 hover:border-slate-300 transition-all">
                                    <ChevronRight className="w-4 h-4 text-slate-600" />
                                </button>
                            </div>
                        </div>

                        {/* Scroll Container */}
                        <div
                            ref={scrollContainerRef}
                            className="flex gap-4 overflow-x-auto pb-4 no-scrollbar mask-gradient-right w-full scroll-smooth"
                        >
                            {categories.map((category: any) => {
                                const isActive = activeCategoryId === category.id;
                                return (
                                    <motion.button
                                        key={category.id}
                                        onClick={() => setActiveCategoryId(category.id)}
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`
                                            flex-shrink-0 px-6 py-3 rounded-2xl border-2 transition-all duration-300 flex items-center gap-3
                                            ${isActive
                                                ? 'bg-white border-red-500 shadow-glow-red text-slate-900 ring-2 ring-red-50'
                                                : 'bg-white border-transparent text-slate-500 hover:border-slate-200 hover:bg-slate-50 shadow-sm'
                                            }
                                        `}
                                    >
                                        <span className={`font-bold uppercase tracking-wider text-xs ${isActive ? 'text-red-500' : ''}`}>{category.name}</span>
                                        {isActive && (
                                            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                                {category.topics?.length || 0}
                                            </span>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Topic Pills */}

                    {topics.length > 0 && (
                        <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
                            {topics.map((topic: any) => {
                                const isActive = activeTopicId === topic.id;
                                return (
                                    <motion.button
                                        key={topic.id}
                                        onClick={() => setActiveTopicId(topic.id)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`
                                            flex-shrink-0 h-12 px-6 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2 shadow-sm
                                            ${isActive
                                                ? 'bg-gradient-to-r from-red-600 to-rose-500 text-white shadow-lg shadow-red-500/30'
                                                : 'bg-white text-slate-600 border border-slate-200 hover:border-red-200 hover:text-red-600'
                                            }
                                        `}
                                    >
                                        {isActive && <Layout className="w-4 h-4 opacity-70" />}
                                        {topic.name}
                                    </motion.button>
                                );
                            })}
                        </div>
                    )}

                    {/* Enhanced Topic Banner */}
                    <AnimatePresence mode='wait'>
                        {activeTopic && (
                            <motion.div
                                key={activeTopic.id}
                                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                className="relative h-[320px] rounded-[48px] overflow-hidden group shadow-2xl shadow-red-900/10"
                            >
                                {/* Animated Gradient Background */}
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 animate-gradient bg-[length:200%_200%]"></div>
                                <div className="absolute inset-0 bg-noise opacity-20"></div>

                                {/* Decor */}
                                <div className="absolute top-0 right-0 p-40 bg-white/10 rounded-full blur-[100px] -mr-20 -mt-20 mix-blend-overlay animate-pulse"></div>
                                <div className="absolute bottom-0 left-0 p-32 bg-black/10 rounded-full blur-[80px] -ml-10 -mb-10 mix-blend-multiply"></div>

                                <div className="absolute inset-0 p-12 flex flex-col justify-center items-start text-white">
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="bg-white/20 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6 shadow-sm"
                                    >
                                        Topic Explorer
                                    </motion.div>

                                    <motion.h2
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-7xl font-black mb-4 tracking-tighter text-shadow-lg"
                                    >
                                        {activeTopic.name}
                                    </motion.h2>

                                    <motion.p
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-xl font-medium opacity-90 max-w-lg leading-relaxed"
                                    >
                                        Explore our collection of <span className="font-bold underline decoration-white/30 underline-offset-4">{cards.length} interactive cards</span> designed to boost vocabulary.
                                    </motion.p>
                                </div>

                                <div className="absolute bottom-10 right-10">
                                    <div className="bg-white/10 result-blur-md backdrop-blur-xl border border-white/20 p-4 rounded-3xl flex items-center gap-4 shadow-lg transform rotate-[-2deg] group-hover:rotate-0 transition-all duration-500">
                                        <div className="bg-white p-3 rounded-2xl shadow-inner">
                                            <Star className="w-6 h-6 text-yellow-400 fill-current animate-spin-slow" />
                                        </div>
                                        <div className="pr-4">
                                            <p className="text-xs font-bold uppercase opacity-70 tracking-widest">Rating</p>
                                            <p className="text-2xl font-black">4.9/5</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Flashcards Grid with Stagger Animation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
                        {cards.map((card: any, index: number) => (
                            <motion.div
                                key={card.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <FlashCard
                                    card={card}
                                    color="bg-red-500"
                                    variant={
                                        (activeCategory?.name.includes('0-2') || activeCategory?.name.includes('infant') || activeTopic?.name.includes('Contrast'))
                                            ? 'high-contrast'
                                            : 'standard'
                                    }
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Premium Footer */}
            <footer className="mt-24 border-t border-gray-200 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-50/50 bg-noise"></div>
                <div className="max-w-[1700px] mx-auto px-10 py-20 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-4 space-y-8">
                        <div className="flex items-center space-x-3">
                            <div className="bg-red-600 p-2.5 rounded-xl shadow-lg">
                                <Heart className="w-6 h-6 text-white fill-current" />
                            </div>
                            <span className="text-2xl font-black tracking-tight text-slate-800">AAMAYAS LEARNING</span>
                        </div>
                        <p className="text-slate-500 leading-relaxed font-medium">
                            Empowering early childhood education through scientifically designed learning materials. Made with love for the next generation.
                        </p>
                        <div className="flex gap-4">
                            {/* Socials placeholder */}
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                                    <Star className="w-4 h-4" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                            <h4 className="font-black text-lg mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-red-500" /> Fast Delivery
                            </h4>
                            <p className="text-sm text-slate-500">Order before 2 PM for same-day dispatch across the country.</p>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                            <h4 className="font-black text-lg mb-4 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-red-500" /> Premium Quality
                            </h4>
                            <p className="text-sm text-slate-500">Thick, laminated cards designed to withstand toddler play.</p>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                            <h4 className="font-black text-lg mb-4 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-red-500" /> Expert Approved
                            </h4>
                            <p className="text-sm text-slate-500">Curriculum designed by early childhood educators.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
