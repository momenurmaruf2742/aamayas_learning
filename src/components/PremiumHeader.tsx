'use client';

import { BookOpen, Search, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PremiumHeader() {
    const pathname = usePathname();
    if (pathname.startsWith('/login')) return null;

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-5 flex justify-between items-center sticky top-0 z-50 shadow-sm">
            <Link href="/" className="flex items-center space-x-3">
                <div className="bg-red-600 p-2.5 rounded-2xl shadow-lg shadow-red-200">
                    <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-black tracking-tighter leading-none">AAMAYAS LEARNING</h1>
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Right Brain Development</span>
                </div>
            </Link>

            <div className="hidden lg:flex items-center bg-gray-100 px-6 py-2.5 rounded-full border border-gray-200 w-1/3">
                <Search className="w-4 h-4 text-gray-400 mr-3" />
                <input type="text" placeholder="Search collection..." className="bg-transparent border-none focus:ring-0 text-sm font-medium w-full outline-none" />
            </div>

            <div className="flex items-center space-x-4">
                <Link href="/admin" className="md:flex bg-gray-100 p-3 rounded-xl hover:bg-gray-200 transition-colors text-slate-600">
                    <Menu className="w-6 h-6" />
                </Link>
            </div>
        </header>
    );
}
