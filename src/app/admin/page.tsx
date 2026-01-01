import Link from 'next/link';
import { Layers, Book, CreditCard, ChevronRight, Settings } from 'lucide-react';
import PremiumCard from '@/components/PremiumCard';

export default function AdminPage() {
    const menuItems = [
        { title: 'Manage Categories', desc: 'Create and edit product collections', icon: Layers, href: '/admin/categories', color: 'bg-indigo-100 text-indigo-600' },
        { title: 'Manage Topics', desc: 'Organize cards into learning topics', icon: Book, href: '/admin/topics', color: 'bg-pink-100 text-pink-600' },
        { title: 'Manage Flashcards', desc: 'Add new content to topics', icon: CreditCard, href: '/admin/cards', color: 'bg-emerald-100 text-emerald-600' },
    ];

    return (
        <div className="bg-[#F8FAFC] min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">Admin Dashboard</h1>
                        <p className="text-slate-500 font-medium mt-2">Welcome back, Administrator.</p>
                    </div>
                    <div className="bg-white p-3 rounded-full shadow-sm text-slate-400">
                        <Settings className="w-6 h-6" />
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {menuItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <PremiumCard className="p-8 h-full bg-white flex flex-col items-center text-center justify-center hover:shadow-xl transition-shadow border border-gray-100">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${item.color}`}>
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                                <p className="text-slate-500 text-sm mb-6">{item.desc}</p>
                                <div className="mt-auto text-slate-300">
                                    <ChevronRight />
                                </div>
                            </PremiumCard>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
