import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Trash2, Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import PremiumCard from '@/components/PremiumCard';

async function createTopic(formData: FormData) {
    'use server';
    const name = formData.get('name') as string;
    const categoryId = formData.get('categoryId') as string;

    await prisma.topic.create({
        data: { name, categoryId },
    });
    revalidatePath('/admin/topics');
}

async function deleteTopic(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await prisma.topic.delete({ where: { id } });
    revalidatePath('/admin/topics');
}

export default async function AdminTopics() {
    const categories = await prisma.category.findMany();
    const topics = await prisma.topic.findMany({
        orderBy: { createdAt: 'desc' },
        include: { category: true, _count: { select: { cards: true } } }
    });

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <Link href="/admin" className="inline-flex items-center text-slate-400 font-bold uppercase text-xs tracking-widest hover:text-red-500 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </Link>

                <h1 className="text-3xl font-black text-slate-800 mb-8">Data Topics</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="lg:col-span-1">
                        <PremiumCard className="p-8 bg-white h-fit !rounded-[32px] border border-gray-100">
                            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                                <Plus className="w-5 h-5 mr-2 text-pink-500" /> New Topic
                            </h2>
                            <form action={createTopic} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Topic Name</label>
                                    <input name="name" placeholder="e.g. Animals" required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-pink-500" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Parent Category</label>
                                    <select name="categoryId" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-pink-500 outline-none text-slate-600">
                                        {categories.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" className="w-full bg-pink-600 text-white font-bold py-3 rounded-xl hover:bg-pink-700 transition-colors shadow-lg shadow-pink-200">
                                    Add Topic
                                </button>
                            </form>
                        </PremiumCard>
                    </div>

                    {/* List */}
                    <div className="lg:col-span-2 space-y-4">
                        {topics.map((topic) => (
                            <div key={topic.id} className="bg-white p-6 rounded-[24px] border border-gray-100 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">{topic.name}</h3>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                        {topic.category.name} • {topic._count.cards} Cards
                                    </p>
                                </div>
                                <form action={deleteTopic}>
                                    <input type="hidden" name="id" value={topic.id} />
                                    <button className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                                        <Trash2 size={20} />
                                    </button>
                                </form>
                            </div>
                        ))}
                        {topics.length === 0 && (
                            <div className="text-center py-12 bg-slate-50 rounded-[24px] border border-dashed border-slate-200">
                                <p className="text-slate-400 font-medium">No topics yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
