'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Layers,
    Book,
    CreditCard,
    Home,
    ChevronRight,
    Settings,
    LogOut
} from 'lucide-react';

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();

    const menuItems = [
        { title: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
        { title: 'Collections', icon: Layers, href: '/admin/categories' },
        { title: 'Categories', icon: Book, href: '/admin/topics' },
        { title: 'Cards', icon: CreditCard, href: '/admin/cards' },
        { title: 'View Public Site', icon: Home, href: '/' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
            {/* Sidebar with Glassmorphism */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-white/90 backdrop-blur-2xl border-r border-white/50 shadow-2xl z-50 hidden lg:block overflow-hidden">
                {/* Decorative background blobs */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -ml-20 -mt-20 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl -mr-20 -mb-20 pointer-events-none"></div>

                <div className="p-6 relative z-10 h-full flex flex-col">
                    {/* Logo Area */}
                    <Link href="/" className="flex items-center gap-3 mb-10 group">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-500">
                            <Home className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tighter text-slate-800 group-hover:text-purple-600 transition-colors">AAMAYAS</h1>
                            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400">Admin Panel</p>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="space-y-2 flex-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 px-4">Menu</p>
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group overflow-hidden ${isActive
                                        ? 'text-white shadow-xl shadow-purple-500/30'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                >
                                    {isActive && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-pink-600"></div>
                                    )}
                                    <item.icon className={`hidden relative z-10 w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-purple-600'}`} />
                                    <span className={`relative z-10 font-bold text-sm tracking-wide`}>{item.title}</span>
                                    {isActive && <ChevronRight className="relative z-10 w-4 h-4 ml-auto text-white/70" />}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom Actions */}
                    <div className="pt-6 border-t border-slate-100">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-xs font-bold text-slate-500">System Healthy</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full w-3/4 bg-green-500 rounded-full"></div>
                            </div>
                        </div>
                        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 w-full transition-all group">
                            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-bold text-sm">Exit Admin</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64 min-h-screen">
                {children}
            </main>
        </div>
    );
}
