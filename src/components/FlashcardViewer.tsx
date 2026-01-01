'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCw, Sparkles } from 'lucide-react';

export default function FlashcardViewer({ cards, topicId }: { cards: any[]; topicId: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [direction, setDirection] = useState(0);

    const currentCard = cards[currentIndex];

    const nextCard = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % cards.length);
        setIsFlipped(false);
    };

    const prevCard = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
        setIsFlipped(false);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
        }),
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-slate-600">
                        Card {currentIndex + 1} of {cards.length}
                    </span>
                    <span className="text-sm font-bold text-purple-600">
                        {Math.round(((currentIndex + 1) / cards.length) * 100)}% Complete
                    </span>
                </div>
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-violet-600 to-purple-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            {/* Flashcard */}
            <div className="relative h-[500px] perspective-1000">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: 'spring', stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        className="absolute inset-0"
                    >
                        <motion.div
                            className="relative w-full h-full cursor-pointer transform-style-3d"
                            onClick={() => setIsFlipped(!isFlipped)}
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                        >
                            {/* Front */}
                            <div className="absolute inset-0 backface-hidden bg-white rounded-[3rem] shadow-2xl p-12 flex flex-col items-center justify-center border-4 border-purple-100">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring' }}
                                    className="w-full h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl flex items-center justify-center mb-8 overflow-hidden"
                                >
                                    {currentCard.frontContent?.startsWith('http') ? (
                                        <img
                                            src={currentCard.frontContent}
                                            alt="Flashcard"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-8xl font-black text-slate-800">{currentCard.frontContent}</span>
                                    )}
                                </motion.div>

                                <h2 className="text-4xl font-black text-slate-800 mb-6">{currentCard.frontContent}</h2>

                                <motion.div
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="flex items-center gap-2 text-purple-600 font-bold"
                                >
                                    <RotateCw className="w-5 h-5" />
                                    Click to flip
                                </motion.div>
                            </div>

                            {/* Back */}
                            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-violet-600 to-purple-600 rounded-[3rem] shadow-2xl p-12 flex flex-col items-center justify-center text-white">
                                <Sparkles className="w-16 h-16 mb-6" />
                                <h3 className="text-5xl font-black mb-8">{currentCard.backContent.split('\n')[0]}</h3>
                                <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 max-w-lg">
                                    <p className="text-xl leading-relaxed italic">"{currentCard.backContent}"</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6 mt-12">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevCard}
                    className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-purple-600 hover:bg-purple-50 transition-colors"
                >
                    <ChevronLeft className="w-6 h-6" />
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold shadow-xl hover:shadow-2xl transition-all"
                >
                    Flip Card
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextCard}
                    className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-purple-600 hover:bg-purple-50 transition-colors"
                >
                    <ChevronRight className="w-6 h-6" />
                </motion.button>
            </div>
        </div>
    );
}
