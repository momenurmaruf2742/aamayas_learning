
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
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
    redirect('/admin/cards');
}

export default async function NewCardPage() {
    const topics = await prisma.topic.findMany({
        include: { category: true },
        orderBy: { name: 'asc' }
    });

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <Link href="/admin/cards" className="inline-flex items-center text-slate-400 font-bold uppercase text-xs tracking-widest hover:text-red-500 mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cards
            </Link>

            <h1 className="text-3xl font-black text-slate-800 mb-8">Add New Flashcard</h1>

            <PremiumCard className="p-8 bg-white h-fit !rounded-[32px] border border-gray-100 shadow-xl">
                <form action={createCard} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Select Topic</label>
                        <select name="topicId" required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-red-500 outline-none text-slate-600 appearance-none">
                            <option value="">-- Choose a Topic --</option>
                            {topics.map(t => (
                                <option key={t.id} value={t.id}>{t.name} ({t.category.name})</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Front Content (Label)</label>
                            <textarea
                                name="frontContent"
                                rows={4}
                                required
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-red-500"
                                placeholder="Enter text or Image URL..."
                            />
                            <p className="text-[10px] text-slate-400 mt-2">This will appear on the front of the card.</p>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Back Content (Bengali/Answer)</label>
                            <textarea
                                name="backContent"
                                rows={4}
                                required
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-red-500"
                                placeholder="Enter Bengali text..."
                            />
                            <p className="text-[10px] text-slate-400 mt-2">This will appear on the back of the card.</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                        <button type="submit" className="bg-red-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-200 flex items-center">
                            <Save className="w-5 h-5 mr-2" /> Save Card
                        </button>
                    </div>
                </form>
            </PremiumCard>
        </div>
    );
}
