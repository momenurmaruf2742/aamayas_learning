import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Trash2, Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import PremiumCard from '@/components/PremiumCard';

async function createCard(formData: FormData) {
    'use server';
    const frontContent = formData.get('frontContent') as string;
    const backContent = formData.get('backContent') as string;
    const topicId = formData.get('topicId') as string;

    await prisma.flashcard.create({
        data: { frontContent, backContent, topicId },
    });
    revalidatePath('/admin/cards');
}

async function deleteCard(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await prisma.flashcard.delete({ where: { id } });
    revalidatePath('/admin/cards');
}

export default async function AdminCards() {
    const topics = await prisma.topic.findMany({ include: { category: true } });
    const cards = await prisma.flashcard.findMany({
        orderBy: { createdAt: 'desc' },
        include: { topic: true },
        take: 50 // Limit display
    });

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <Link href="/admin" className="inline-flex items-center text-slate-400 font-bold uppercase text-xs tracking-widest hover:text-red-500 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </Link>

                <h1 className="text-3xl font-black text-slate-800 mb-8">Data Flashcards</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="lg:col-span-1">
                        <PremiumCard className="p-8 bg-white h-fit !rounded-[32px] border border-gray-100">
                            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                                <Plus className="w-5 h-5 mr-2 text-emerald-500" /> New Flashcard
                            </h2>
                            <form action={createCard} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Topic</label>
                                    <select name="topicId" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-emerald-500 outline-none text-slate-600">
                                        {topics.map(t => (
                                            <option key={t.id} value={t.id}>{t.name} ({t.category.name})</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Front Content</label>
                                    <textarea name="frontContent" rows={2} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-emerald-500" placeholder="Text or Image URL" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Back Content (Answer)</label>
                                    <textarea name="backContent" rows={4} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-emerald-500" />
                                </div>
                                <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
                                    Add Card
                                </button>
                            </form>
                        </PremiumCard>
                    </div>

                    {/* List */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {cards.map((card) => (
                            <div key={card.id} className="bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative group">
                                <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-slate-300 bg-slate-50 px-2 py-1 rounded-full">{card.topic.name}</span>

                                <div className="mb-4">
                                    <div className="text-xs font-bold text-slate-400 uppercase mb-1">Front</div>
                                    <div className="font-bold text-slate-800 line-clamp-1">{card.frontContent}</div>
                                </div>

                                <div className="mb-4">
                                    <div className="text-xs font-bold text-slate-400 uppercase mb-1">Back</div>
                                    <div className="text-sm text-slate-600 line-clamp-2">{card.backContent}</div>
                                </div>

                                <form action={deleteCard} className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <input type="hidden" name="id" value={card.id} />
                                    <button className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </form>
                            </div>
                        ))}
                        {cards.length === 0 && (
                            <div className="col-span-2 text-center py-12 bg-slate-50 rounded-[24px] border border-dashed border-slate-200">
                                <p className="text-slate-400 font-medium">No cards yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
