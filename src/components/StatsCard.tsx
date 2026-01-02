'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    gradient: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    delay?: number;
}

export default function StatsCard({ title, value, icon: Icon, gradient, trend, delay = 0 }: StatsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative group"
        >
            {/* Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity duration-300 blur-xl`}></div>
            
            {/* Card Content */}
            <div className="relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                    </div>
                    {trend && (
                        <div className={`text-sm font-bold px-3 py-1 rounded-full ${trend.isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {trend.isPositive ? '+' : ''}{trend.value}%
                        </div>
                    )}
                </div>
                
                <h3 className="text-3xl font-black text-slate-800 mb-1">{value}</h3>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</p>
                
                {/* Animated Border on Hover */}
                <motion.div
                    className="absolute inset-0 rounded-3xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${gradient} opacity-10`}></div>
                </motion.div>
            </div>
        </motion.div>
    );
}
