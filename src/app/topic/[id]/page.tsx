import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PremiumHeader from '@/components/PremiumHeader';
import PremiumFooter from '@/components/PremiumFooter';
import FlashcardViewer from '@/components/FlashcardViewer';

export default async function TopicPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const topic = await prisma.topic.findUnique({
        where: { id },
        include: {
            cards: true,
            category: true,
        }
    });

    if (!topic) notFound();

    return (
        <div className="bg-[#F8FAFC] min-h-screen">
            <PremiumHeader />

            <main className="max-w-[1440px] mx-auto px-6 py-10">
                <Link href={`/category/${topic.categoryId}`} className="inline-flex items-center text-slate-400 font-bold uppercase text-xs tracking-widest hover:text-red-500 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to {topic.category.name}
                </Link>

                <div className="text-center mb-12">
                    <span className="bg-white border border-gray-200 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block text-slate-400">Current Session</span>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-2">{topic.name}</h1>
                    <p className="text-slate-500 font-medium">Flash & Learn Mode</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <FlashcardViewer cards={topic.cards} topicId={topic.id} />
                </div>

                <div className="mt-16 text-center max-w-2xl mx-auto bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                    <h4 className="font-black text-lg text-slate-800 mb-2">Tips for Parents</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Show cards rapidly (1 second per card) to stimulate the right brain's photographic memory capabilities.
                        Repeat this set 2-3 times a day.
                    </p>
                </div>
            </main>

            <PremiumFooter />
        </div>
    );
}
