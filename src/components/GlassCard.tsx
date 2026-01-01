'use client';
import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', ...props }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, translateY: -5 }}
      whileTap={{ scale: 0.98 }}
      className={`glass-card rounded-2xl p-6 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
