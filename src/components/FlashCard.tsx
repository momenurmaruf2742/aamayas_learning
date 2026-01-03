'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { RotateCw, Star, Sparkles, Rabbit, Leaf } from 'lucide-react';

interface FlashCardProps {
    card: {
        id: string;
        frontContent: string;
        backContent: string;
        image?: string;
    };
    color?: string;
    variant?: 'standard' | 'high-contrast';
}

export default function FlashCard({ card, color = 'bg-red-500', variant = 'standard' }: FlashCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    // Tilt Animation Setup
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    if (variant === 'high-contrast') {
        return (
            <motion.div
                className="perspective-1000 w-full h-[450px] cursor-pointer group"
                onClick={() => setIsFlipped(!isFlipped)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ perspective: 1000 }}
            >
                <motion.div
                    className="w-full h-full relative transform-style-3d transition-all duration-700"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                >
                    {/* --- FRONT SIDE (High Contrast) --- */}
                    <div className="absolute inset-0 backface-hidden rounded-[20px] bg-white border-[8px] border-black flex flex-col items-center justify-center p-8">
                        {card.frontContent.startsWith('http') ? (
                            <img
                                src={card.frontContent}
                                alt={card.frontContent}
                                className="w-64 h-64 object-contain grayscale contrast-200"
                            />
                        ) : (
                            <div className="text-[120px] font-black text-black leading-none tracking-tighter">
                                {card.frontContent}
                            </div>
                        )}
                    </div>

                    {/* --- BACK SIDE (High Contrast Inverse) --- */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[20px] bg-black border-[8px] border-white flex flex-col items-center justify-center p-8 text-center">
                        <div className="text-4xl font-bold text-white mb-4 font-mono">{card.backContent.split('\n')[0]}</div>
                        <div className="w-32 h-2 bg-white rounded-full mb-6"></div>
                        <div className="text-xl text-zinc-300 font-medium max-w-xs leading-relaxed">
                            {card.frontContent}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="perspective-1000 w-full h-[450px] cursor-pointer group"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsFlipped(!isFlipped)}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ perspective: 1000 }}
        >
            <motion.div
                className="w-full h-full relative transform-style-3d transition-all duration-700"
                style={{
                    rotateX: isFlipped ? 0 : rotateX,
                    rotateY: isFlipped ? 180 : rotateY,
                    // If flipped, we effectively disable the mouse tilt on the container to avoid confusion, 
                    // or we check state to apply rotations conditionally. 
                    // Simplifying: Only tilt when NOT flipped for better UX, or tilt both?
                    // Let's rely on the flip animation mainly.
                }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            >
                {/* --- FRONT SIDE --- */}
                <div className="absolute inset-0 backface-hidden rounded-[40px] bg-white border-4 border-slate-100 shadow-xl overflow-hidden flex flex-col items-center p-6">

                    {/* Image Container with Parallax Internal Move */}
                    <div className="w-full h-64 bg-slate-50 rounded-[32px] overflow-hidden mb-6 relative group-hover:shadow-inner transition-all">
                        <div className="absolute inset-0 bg-noise opacity-10 mix-blend-multiply z-10"></div>
                        {card.frontContent.startsWith('http') ? (
                            <motion.img
                                src={card.frontContent}
                                alt={card.frontContent}
                                className="w-full h-full object-cover"
                                style={{ scale: 1.1 }}
                                whileHover={{ scale: 1.2 }}
                                transition={{ duration: 0.5 }}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-emerald-50">
                                <Rabbit className="w-24 h-24 text-emerald-300" />
                            </div>
                        )}

                        {/* Rating Badge Overlay */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm z-20">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-[10px] font-bold">4.8</span>
                        </div>
                    </div>

                    {/* Label */}
                    <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-auto">
                        {card.image || card.frontContent.split('/').pop()?.split('.')[0] || "Label"}
                    </h3>

                    {/* Footer Hint */}
                    <div className="w-full flex justify-between items-center border-t border-slate-100 pt-4">
                        <span className="text-[10px] font-black tracking-widest text-slate-300 uppercase">Flash card 01</span>
                        <div className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-wide group-hover:text-red-600">
                            <RotateCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                            Flip
                        </div>
                    </div>
                </div>

                {/* --- BACK SIDE --- */}
                <div
                    className="absolute inset-0 backface-hidden rotate-y-180 rounded-[40px] bg-white border-4 border-red-100 shadow-xl overflow-hidden flex flex-col p-8 items-center text-center justify-center relative"
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-noise opacity-[0.03]"></div>
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-rose-50 rounded-full blur-3xl opacity-50"></div>

                    <div className="relative z-10">
                        <span className="inline-block p-4 rounded-2xl bg-red-50 mb-6 text-red-500 shadow-inner">
                            <Sparkles className="w-8 h-8" />
                        </span>

                        <h2 className="text-6xl font-black text-red-500 mb-2 font-serif text-shadow-sm">
                            {/* Assuming backContent is like "Bengali\nEnglish\nFact" */}
                            {card.backContent.split('\n')[0] || "Translation"}
                        </h2>

                        <div className="w-16 h-1 bg-gradient-to-r from-red-200 to-rose-200 rounded-full mx-auto mb-6"></div>

                        <p className="text-2xl font-bold text-slate-800 underline decoration-red-200 decoration-4 underline-offset-4 mb-6">
                            {card.frontContent.split('/').pop()?.split('.')[0] || "Label"}
                        </p>

                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm relative group">
                            <div className="absolute -top-3 -left-3">
                                <Leaf className="w-6 h-6 text-green-400 fill-current rotate-[-15deg]" />
                            </div>
                            <p className="text-slate-600 italic font-medium leading-relaxed">
                                "Did you know? {card.backContent.split('\n').length > 1 ? card.backContent.split('\n').slice(1).join(' ') : 'This is a fascinating animal found in the wild.'}"
                            </p>
                        </div>
                    </div>

                    <div className="absolute bottom-6 text-[10px] font-black text-slate-200 uppercase tracking-[0.3em]">
                        Aamayas Learning Series
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
