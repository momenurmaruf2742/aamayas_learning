import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Scissors, Check, BookOpen, Star, Heart } from 'lucide-react';

export default async function PrintPage({ params }: { params: Promise<{ topicId: string }> }) {
    const { topicId } = await params;
    const topic = await prisma.topic.findUnique({
        where: { id: topicId },
        include: { cards: true, category: true }
    });

    if (!topic) notFound();

    // Chunk cards into groups of 4 for A4 pages
    const chunks = [];
    for (let i = 0; i < topic.cards.length; i += 4) {
        chunks.push(topic.cards.slice(i, i + 4));
    }

    const brandColors = ["text-red-600", "text-blue-600", "text-green-600", "text-orange-600", "text-purple-600"];

    return (
        <div className="bg-white min-h-screen">
            {/* Screen-only instructions */}
            <div className="no-print p-8 text-center bg-slate-50 border-b border-slate-200 mb-8">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-black text-slate-800 mb-3">🖨️ Ready to Print</h1>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        This PDF is designed for <strong>A4 Paper</strong>. <br />
                        For best results, select <strong>"Background Graphics"</strong> in print settings.
                    </p>
                    <div className="inline-block bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
                        <kbd className="px-4 py-2 bg-slate-100 rounded-xl font-bold text-slate-700 text-sm border-b-2 border-slate-300">CTRL + P</kbd>
                    </div>
                </div>
            </div>

            <div className="max-w-[210mm] mx-auto bg-white print:m-0 print:w-full">

                {/* --- COVER PAGE --- */}
                <div className="w-[210mm] h-[297mm] p-[10mm] flex flex-col items-center justify-between border-8 border-double border-red-100 rounded-3xl bg-white relative overflow-hidden page-break-after-always">
                    {/* Decorative Background */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-red-50 rounded-br-full opacity-50 -z-10"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-50 rounded-tl-full opacity-50 -z-10"></div>

                    {/* Header */}
                    <div className="w-full flex justify-between items-center z-10">
                        <div className="flex items-center gap-2">
                            <div className="bg-red-600 p-2 rounded-lg">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-black text-xl tracking-tight text-slate-800">AAMAYAS</span>
                        </div>
                        <div className="text-xs font-bold uppercase tracking-widest text-slate-400 border border-slate-200 px-3 py-1 rounded-full">
                            Flashcard Collection
                        </div>
                    </div>

                    {/* Center Content */}
                    <div className="text-center z-10">
                        <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-black uppercase tracking-widest">
                            {topic.category.name}
                        </div>
                        <h1 className="text-[80px] font-black leading-none text-slate-900 mb-6 tracking-tighter">
                            {topic.name}
                        </h1>
                        <div className="w-24 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mx-auto mb-8"></div>
                        <p className="text-2xl text-slate-500 font-medium max-w-md mx-auto leading-normal">
                            A set of <strong className="text-slate-800">{topic.cards.length} interactive cards</strong> designed to boost vocabulary and visual learning.
                        </p>
                    </div>

                    {/* Bottom Info */}
                    <div className="w-full z-10">
                        <div className="grid grid-cols-3 gap-4 mb-12">
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
                                <div className="text-3xl font-black text-red-500 mb-1">{topic.cards.length}</div>
                                <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Total Cards</div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
                                <div className="text-3xl font-black text-blue-500 mb-1">A4</div>
                                <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Paper Size</div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
                                <div className="text-3xl font-black text-green-500 mb-1">3+</div>
                                <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Ages</div>
                            </div>
                        </div>

                        <div className="text-center border-t border-dashed border-slate-200 pt-8">
                            <p className="text-xs text-slate-400 mb-2 font-medium">www.aamayaslearning.com</p>
                            <div className="flex justify-center gap-1">
                                {brandColors.map((c, i) => (
                                    <div key={i} className={`w-2 h-2 rounded-full ${c.replace('text', 'bg')}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- CONTENT PAGES --- */}
                {chunks.map((chunk, pageIndex) => (
                    <div key={`chunk-${pageIndex}`}>

                        {/* FRONTS PAGE */}
                        <div className="w-[210mm] h-[297mm] p-[10mm] relative page-break-after-always">
                            {/* Cutting Guides (Crosses in center) */}
                            <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-slate-300 z-0"></div>
                            <div className="absolute top-0 left-1/2 h-full border-l border-dashed border-slate-300 z-0"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 z-10 text-slate-400">
                                <Scissors size={24} />
                            </div>

                            <div className="grid grid-cols-2 grid-rows-2 h-full gap-0 relative z-10">
                                {chunk.map((card) => (
                                    <div key={`front-${card.id}`} className="flex items-center justify-center p-8 border border-slate-100 bg-white">
                                        <div className="w-full h-full border-4 border-slate-800 rounded-[32px] flex flex-col items-center justify-center relative shadow-sm">

                                            {/* Huge Image Placeholder (or actual image) */}
                                            {(card.frontImage || card.frontContent.startsWith('http')) ? (
                                                <img src={card.frontImage || card.frontContent} className="w-48 h-48 object-contain mb-8" />
                                            ) : (
                                                <div className="w-48 h-48 bg-slate-50 rounded-full flex items-center justify-center mb-8">
                                                    <Star className="w-20 h-20 text-slate-200" />
                                                </div>
                                            )}

                                            <div className="text-5xl font-black text-slate-900 uppercase tracking-tight">{card.frontContent}</div>

                                            <div className="absolute bottom-6 flex items-center gap-2 text-xs font-bold text-slate-300">
                                                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                                {topic.name}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* BACKS PAGE (Mirrored Order) */}
                        <div className="w-[210mm] h-[297mm] p-[10mm] relative page-break-after-always">
                            {/* Cutting Guides */}
                            <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-slate-300 z-0"></div>
                            <div className="absolute top-0 left-1/2 h-full border-l border-dashed border-slate-300 z-0"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 z-10 text-slate-400">
                                <Scissors size={24} />
                            </div>

                            <div className="grid grid-cols-2 grid-rows-2 h-full gap-0 relative z-10">
                                {/* Row 1 Backs (1, 0) */}
                                {[chunk[1], chunk[0]].map((card, idx) => (
                                    card ? (
                                        <div key={`back-r1-${card.id}`} className="flex items-center justify-center p-8 border border-slate-100 bg-white">
                                            <div className="w-full h-full border-4 border-slate-200 rounded-[32px] flex flex-col items-center justify-center relative bg-slate-50/50 p-8 text-center">
                                                <div className="mb-4 text-xs font-black uppercase tracking-widest text-slate-400">Usage Guide</div>
                                                <div className="text-4xl font-serif font-bold text-slate-700 mb-6">{card.backContent}</div>
                                                <p className="text-sm text-slate-500 font-medium leading-relaxed italic max-w-xs">
                                                    "Ask the child to repeat the word. Use the image on the front for visual association."
                                                </p>

                                                <div className="absolute bottom-6 right-6">
                                                    <Heart className="w-6 h-6 text-slate-200 fill-current" />
                                                </div>
                                            </div>
                                        </div>
                                    ) : <div key={`empty-r1-${idx}`} className="bg-transparent"></div>
                                ))}

                                {/* Row 2 Backs (3, 2) */}
                                {[chunk[3], chunk[2]].map((card, idx) => (
                                    card ? (
                                        <div key={`back-r2-${card.id}`} className="flex items-center justify-center p-8 border border-slate-100 bg-white">
                                            <div className="w-full h-full border-4 border-slate-200 rounded-[32px] flex flex-col items-center justify-center relative bg-slate-50/50 p-8 text-center">
                                                <div className="mb-4 text-xs font-black uppercase tracking-widest text-slate-400">Usage Guide</div>
                                                <div className="text-4xl font-serif font-bold text-slate-700 mb-6">{card.backContent}</div>
                                                <p className="text-sm text-slate-500 font-medium leading-relaxed italic max-w-xs">
                                                    "Ask the child to repeat the word. Use the image on the front for visual association."
                                                </p>

                                                <div className="absolute bottom-6 right-6">
                                                    <Heart className="w-6 h-6 text-slate-200 fill-current" />
                                                </div>
                                            </div>
                                        </div>
                                    ) : <div key={`empty-r2-${idx}`} className="bg-transparent"></div>
                                ))}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
