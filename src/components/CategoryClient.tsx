'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';
import PremiumHeader from '@/components/PremiumHeader';

export default function CategoryClient({ category }: { category: any }) {
    const colors = [
        'from-orange-500 to-pink-500',
        'from-blue-500 to-cyan-500',
        'from-purple-500 to-indigo-500',
        'from-green-500 to-emerald-500',
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            <PremiumHeader />

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Link href="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-bold mb-8 group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Collections
                    </Link>
                </motion.div>

                {/* Category Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-[3rem] p-12 md:p-16 text-white mb-16 relative overflow-hidden shadow-2xl"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                            className="inline-block mb-6"
                        >
                            <div className="bg-white/20 backdrop-blur-lg p-4 rounded-2xl">
                                <Sparkles className="w-12 h-12" />
                            </div>
                        </motion.div>

                        <h1 className="text-5xl md:text-6xl font-black mb-4">{category.name}</h1>
                        <p className="text-xl text-white/90 mb-6 font-medium">Age Group: {category.ageGroup}</p>
                        <div className="flex items-center gap-3">
                            <span className="bg-white/20 backdrop-blur-lg px-6 py-3 rounded-full font-bold">
                                {category.topics?.length || 0} Topics Available
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {category.topics?.map((topic: any, idx: number) => (
                        <Link key={topic.id} href={`/topic/${topic.id}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * idx, duration: 0.5 }}
                                whileHover={{ y: -10, scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="group relative"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${colors[idx % colors.length]} opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity duration-300 blur-xl`}></div>

                                <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors[idx % colors.length]} flex items-center justify-center mb-6 shadow-lg`}
                                    >
                                        <Zap className="w-8 h-8 text-white" />
                                    </motion.div>

                                    <h3 className="text-2xl font-black text-slate-800 mb-3">{topic.name}</h3>

                                    <div className="flex items-center justify-between mt-6">
                                        <span className="text-sm font-bold text-purple-600 bg-purple-50 px-4 py-2 rounded-full">
                                            {topic._count.cards} Cards
                                        </span>
                                        <motion.div
                                            className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-600 transition-colors"
                                            whileHover={{ x: 5 }}
                                        >
                                            <ArrowLeft className="w-5 h-5 text-purple-600 group-hover:text-white rotate-180" />
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
