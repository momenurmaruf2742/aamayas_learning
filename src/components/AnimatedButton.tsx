'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'gradient' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    icon?: ReactNode;
}

export default function AnimatedButton({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    icon,
    className = '',
    ...props
}: AnimatedButtonProps) {
    const baseStyles = 'font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300',
        secondary: 'bg-pink-600 text-white hover:bg-pink-700 shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300',
        gradient: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300',
        outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50',
        ghost: 'text-purple-600 hover:bg-purple-50'
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Loading...
                </>
            ) : (
                <>
                    {icon && icon}
                    {children}
                </>
            )}
        </motion.button>
    );
}
