'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Heart, ArrowRight, BookOpen, Star } from 'lucide-react';
import PremiumHeader from '@/components/PremiumHeader';
import Link from 'next/link';

export default function HomeClient({ categories }: { categories: any[] }) {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    const categoryColors = [
        'from-orange-500 to-pink-500',
        'from-blue-500 to-cyan-500',
        'from-purple-500 to-indigo-500',
        'from-green-500 to-emerald-500',
        'from-red-500 to-rose-500',
        'from-yellow-500 to-amber-500',
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            <PremiumHeader />

            {/* Hero Section with Animated Gradient */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
                <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-center"
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            className="inline-block mb-6"
                        >
                            <Sparkles className="w-16 h-16 text-purple-600" />
                        </motion.div>
                        <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Aamayas Learning
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 mb-8 font-medium">
                            Right Brain Development Through Interactive Flashcards
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block"
                        >
                            <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all flex items-center gap-3">
                                Start Learning <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Categories Grid */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-12"
                >
                    <h2 className="text-4xl font-black text-slate-800 mb-4 flex items-center gap-3">
                        <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                        Explore Collections
                    </h2>
                    <p className="text-slate-600 text-lg">Choose a category to begin your learning journey</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, idx) => (
                        <Link key={category.id} href={`/category/${category.id}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * idx, duration: 0.5 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                onHoverStart={() => setHoveredCard(category.id)}
                                onHoverEnd={() => setHoveredCard(null)}
                                className="relative group cursor-pointer"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[idx % categoryColors.length]} opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity duration-300 blur-xl`}></div>

                                <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-200">
                                    <motion.div
                                        animate={hoveredCard === category.id ? { rotate: 360 } : { rotate: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${categoryColors[idx % categoryColors.length]} flex items-center justify-center mb-6 shadow-lg`}
                                    >
                                        <BookOpen className="w-8 h-8 text-white" />
                                    </motion.div>

                                    <h3 className="text-2xl font-black text-slate-800 mb-3">{category.name}</h3>
                                    <p className="text-slate-500 mb-4 font-medium">{category.ageGroup}</p>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-purple-600 bg-purple-50 px-4 py-2 rounded-full">
                                            {category.topics?.length || 0} Topics
                                        </span>
                                        <motion.div
                                            animate={hoveredCard === category.id ? { x: 5 } : { x: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ArrowRight className="w-6 h-6 text-purple-600" />
                                        </motion.div>
                                    </div>

                                    {/* Animated Border */}
                                    <motion.div
                                        className="absolute inset-0 rounded-3xl"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: hoveredCard === category.id ? 1 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${categoryColors[idx % categoryColors.length]} opacity-20`}></div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-br from-violet-600 to-purple-600 rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: Zap, title: 'Fast Learning', desc: 'High-speed flashing for photographic memory' },
                            { icon: Heart, title: 'Bonding Time', desc: 'Create meaningful moments with your child' },
                            { icon: Sparkles, title: 'Right Brain', desc: 'Stimulate creativity and artistic growth' }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 * idx, duration: 0.5 }}
                                whileHover={{ scale: 1.05 }}
                                className="text-center"
                            >
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                    className="inline-block mb-6"
                                >
                                    <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
                                        <feature.icon className="w-10 h-10" />
                                    </div>
                                </motion.div>
                                <h3 className="text-2xl font-black mb-3">{feature.title}</h3>
                                <p className="text-white/80 font-medium">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
