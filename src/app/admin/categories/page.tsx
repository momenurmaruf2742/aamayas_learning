import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Trash2, Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import PremiumCard from '@/components/PremiumCard';

async function createCategory(formData: FormData) {
    'use server';
    const name = formData.get('name') as string;
    const ageGroup = formData.get('ageGroup') as string;
    const image = formData.get('image') as string;

    await prisma.category.create({
        data: { name, ageGroup, image },
    });
    revalidatePath('/admin/categories');
}

async function deleteCategory(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await prisma.category.delete({ where: { id } });
    revalidatePath('/admin/categories');
}

export default async function AdminCategories() {
    const categories = await prisma.category.findMany({
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { topics: true } } }
    });

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <Link href="/admin" className="inline-flex items-center text-slate-400 font-bold uppercase text-xs tracking-widest hover:text-red-500 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </Link>

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-black text-slate-800">Product Categories</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Create Form */}
                    <div className="lg:col-span-1">
                        <PremiumCard className="p-8 bg-white h-fit !rounded-[32px] border border-gray-100">
                            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                                <Plus className="w-5 h-5 mr-2 text-indigo-500" /> New Collection
                            </h2>
                            <form action={createCategory} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Collection Name</label>
                                    <input name="name" placeholder="e.g. Fun with Dots" required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Target Age</label>
                                    <input name="ageGroup" placeholder="e.g. 3-6 Years" required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Cover Image URL</label>
                                    <input name="image" placeholder="https://..." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-indigo-500" />
                                </div>
                                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                                    Create Collection
                                </button>
                            </form>
                        </PremiumCard>
                    </div>

                    {/* List */}
                    <div className="lg:col-span-2 space-y-4">
                        {categories.map((cat) => (
                            <div key={cat.id} className="bg-white p-6 rounded-[24px] border border-gray-100 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">{cat.name}</h3>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{cat.ageGroup} • {cat._count.topics} Topics</p>
                                </div>
                                <form action={deleteCategory}>
                                    <input type="hidden" name="id" value={cat.id} />
                                    <button className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                                        <Trash2 size={20} />
                                    </button>
                                </form>
                            </div>
                        ))}
                        {categories.length === 0 && (
                            <div className="text-center py-12 bg-slate-50 rounded-[24px] border border-dashed border-slate-200">
                                <p className="text-slate-400 font-medium">No collections yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
