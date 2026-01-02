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
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-white/80 backdrop-blur-xl border-r border-gray-200 shadow-xl z-50 hidden lg:block">
                <div className="p-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                            <Home className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-black">AAMAYAS</h1>
                            <p className="text-xs text-purple-600 font-bold">Admin Panel</p>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="space-y-2">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                        : 'text-slate-600 hover:bg-purple-50'
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-purple-600'}`} />
                                    <span className="font-bold text-sm">{item.title}</span>
                                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom Actions */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
                    <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 w-full transition-all">
                        <Settings className="w-5 h-5" />
                        <span className="font-bold text-sm">Settings</span>
                    </button>
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 w-full transition-all mt-2">
                        <LogOut className="w-5 h-5" />
                        <span className="font-bold text-sm">Exit Admin</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64 min-h-screen">
                {children}
            </main>
        </div>
    );
}
