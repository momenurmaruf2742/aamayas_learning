
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Trash2, Plus, Edit, Search } from 'lucide-react';
import Link from 'next/link';

async function deleteCard(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await prisma.flashcard.delete({ where: { id } });
    revalidatePath('/admin/cards');
}

export default async function AdminCards() {
    const cards = await prisma.flashcard.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            topic: {
                include: {
                    category: true
                }
            }
        },
        take: 100
    });

    return (
        <div className="p-8 max-w-[1700px] mx-auto min-h-screen bg-slate-50/50">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">Flash Cards</h1>
                    <p className="text-slate-500 font-medium mt-1">Manage your interactive content</p>
                </div>
                <Link
                    href="/admin/cards/new"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-2xl flex items-center shadow-lg shadow-red-200 hover:shadow-red-300 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                >
                    <Plus className="w-5 h-5 mr-2" /> Add New Card
                </Link>
            </div>

            {/* Floating Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-4 px-2">
                    <thead>
                        <tr className="text-slate-400">
                            <th className="px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em]">Collection & Topic</th>
                            <th className="px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em]">Front / Label</th>
                            <th className="px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em]">Back / Meaning</th>
                            <th className="px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em]">Preview</th>
                            <th className="px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cards.map((card) => (
                            <tr key={card.id} className="bg-white hover:bg-slate-50 shadow-sm hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 group rounded-2xl">
                                {/* First cell needs rounded corners */}
                                <td className="p-6 rounded-l-2xl border-y border-l border-slate-100 group-hover:border-slate-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-black text-xs shadow-inner">
                                            {card.topic.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-800">{card.topic.name}</div>
                                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{card.topic.category.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6 border-y border-slate-100 group-hover:border-slate-200">
                                    <div className="font-black text-slate-700 text-lg">{card.frontContent}</div>
                                </td>
                                <td className="p-6 border-y border-slate-100 group-hover:border-slate-200 max-w-xs">
                                    <div className="line-clamp-2 text-sm text-slate-500 font-medium leading-relaxed">
                                        {card.backContent}
                                    </div>
                                </td>
                                <td className="p-6 border-y border-slate-100 group-hover:border-slate-200">
                                    {(card.frontImage || card.frontContent.startsWith('http')) ? (
                                        <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                            <img
                                                src={card.frontImage || card.frontContent}
                                                alt={card.frontContent}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 text-xs text-center font-bold p-1">
                                            No Img
                                        </div>
                                    )}
                                </td>
                                <td className="p-6 rounded-r-2xl border-y border-r border-slate-100 group-hover:border-slate-200 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                        <Link href={`/admin/cards/${card.id}/edit`} className="w-10 h-10 flex items-center justify-center bg-white text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-sm border border-slate-200 hover:border-blue-500 hover:shadow-blue-200">
                                            <Edit size={16} strokeWidth={2.5} />
                                        </Link>
                                        <form action={deleteCard}>
                                            <input type="hidden" name="id" value={card.id} />
                                            <button className="w-10 h-10 flex items-center justify-center bg-white text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm border border-slate-200 hover:border-red-500 hover:shadow-red-200">
                                                <Trash2 size={16} strokeWidth={2.5} />
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {cards.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-20 text-center">
                                    <div className="flex flex-col items-center justify-center opacity-50">
                                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                            <Search className="w-8 h-8 text-slate-400" />
                                        </div>
                                        <p className="font-bold text-slate-500 text-lg">No cards found</p>
                                        <p className="text-slate-400 text-sm">Start by adding your first flashcard above.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
