'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type PremiumCardProps = {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    selected?: boolean;
};

export default function PremiumCard({ children, className = '', onClick, selected = false }: PremiumCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`
        relative rounded-[28px] transition-all duration-300 cursor-pointer overflow-hidden
        ${selected
                    ? "bg-white shadow-xl shadow-slate-200/50 border-2 border-red-500 ring-4 ring-red-50"
                    : "bg-transparent border-2 border-transparent hover:bg-white hover:border-gray-100 hover:shadow-lg"
                }
        ${className}
      `}
        >
            {children}
        </motion.div>
    );
}
