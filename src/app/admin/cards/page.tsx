
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
        <div className="p-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black text-slate-800">Flash Cards</h1>
                <Link
                    href="/admin/cards/new"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl flex items-center shadow-lg shadow-red-200 transition-all"
                >
                    <Plus className="w-5 h-5 mr-2" /> Add Card
                </Link>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-[20px] shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="p-5 text-xs font-bold uppercase tracking-widest text-slate-400">Category</th>
                                <th className="p-5 text-xs font-bold uppercase tracking-widest text-slate-400">Label</th>
                                <th className="p-5 text-xs font-bold uppercase tracking-widest text-slate-400">Bengali</th>
                                <th className="p-5 text-xs font-bold uppercase tracking-widest text-slate-400">Image</th>
                                <th className="p-5 text-xs font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {cards.map((card) => (
                                <tr key={card.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="p-5">
                                        <div className="font-bold text-slate-700">{card.topic.name}</div>
                                        <div className="text-xs text-slate-400">{card.topic.category.name}</div>
                                    </td>
                                    <td className="p-5 font-bold text-slate-800">{card.frontContent}</td>
                                    <td className="p-5 text-slate-600 font-medium font-bengali">{card.backContent}</td>
                                    <td className="p-5">
                                        {(card.frontImage || card.frontContent.startsWith('http')) ? (
                                            <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden border border-gray-200">
                                                <img
                                                    src={card.frontImage || card.frontContent}
                                                    alt={card.frontContent}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <span className="text-xs text-slate-300 italic">No image</span>
                                        )}
                                    </td>
                                    <td className="p-5 text-right w-[140px]">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/cards/${card.id}/edit`} className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100">
                                                <Edit size={18} />
                                            </Link>
                                            <form action={deleteCard}>
                                                <input type="hidden" name="id" value={card.id} />
                                                <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100">
                                                    <Trash2 size={18} />
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {cards.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-slate-400">
                                        No flashcards found. Create your first one!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
