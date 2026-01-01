'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PageHeader({ title, subtitle, backHref }: { title: string, subtitle?: string, backHref?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-3xl p-8 mb-8 text-center relative overflow-hidden"
        >
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

            {backHref && (
                <Link href={backHref} className="absolute left-6 top-6 p-2 rounded-full hover:bg-white/20 transition-colors text-white">
                    <ArrowLeft size={24} />
                </Link>
            )}

            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
                {title}
            </h1>
            {subtitle && (
                <p className="text-lg text-white/80 mt-2 font-medium">
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
}
