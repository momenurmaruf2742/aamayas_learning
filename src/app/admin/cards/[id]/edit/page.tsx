
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import PremiumCard from '@/components/PremiumCard';

async function updateCard(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const frontContent = formData.get('frontContent') as string;
    const backContent = formData.get('backContent') as string;
    const topicId = formData.get('topicId') as string;

    await prisma.flashcard.update({
        where: { id },
        data: { frontContent, backContent, topicId },
    });
    revalidatePath('/admin/cards');
    redirect('/admin/cards');
}

export default async function EditCardPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const card = await prisma.flashcard.findUnique({ where: { id } });
    const topics = await prisma.topic.findMany({
        include: { category: true },
        orderBy: { name: 'asc' }
    });

    if (!card) {
        return <div>Card not found</div>;
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <Link href="/admin/cards" className="inline-flex items-center text-slate-400 font-bold uppercase text-xs tracking-widest hover:text-red-500 mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cards
            </Link>

            <h1 className="text-3xl font-black text-slate-800 mb-8">Edit Flashcard</h1>

            <PremiumCard className="p-8 bg-white h-fit !rounded-[32px] border border-gray-100 shadow-xl">
                <form action={updateCard} className="space-y-6">
                    <input type="hidden" name="id" value={card.id} />

                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Select Topic</label>
                        <select name="topicId" defaultValue={card.topicId} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-red-500 outline-none text-slate-600 appearance-none">
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
                                defaultValue={card.frontContent}
                                rows={4}
                                required
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Back Content (Bengali/Answer)</label>
                            <textarea
                                name="backContent"
                                defaultValue={card.backContent}
                                rows={4}
                                required
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-red-500"
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                        <button type="submit" className="bg-red-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-200 flex items-center">
                            <Save className="w-5 h-5 mr-2" /> Update Card
                        </button>
                    </div>
                </form>
            </PremiumCard>
        </div>
    );
}
