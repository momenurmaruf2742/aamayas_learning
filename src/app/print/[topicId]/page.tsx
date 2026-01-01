```
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function PrintPage({ params }: { params: Promise<{ topicId: string }> }) {
    const { topicId } = await params;
    const topic = await prisma.topic.findUnique({
        where: { id: topicId },
        include: { cards: true }
    });

    if (!topic) notFound();

    // Chunk cards into groups of 4 for A4 pages
    const chunks = [];
    for (let i = 0; i < topic.cards.length; i += 4) {
        chunks.push(topic.cards.slice(i, i + 4));
    }

    return (
        <div className="bg-white min-h-screen">
            <style>{`
@media print {
    @page { size: A4; margin: 0; }
          body { -webkit - print - color - adjust: exact; }
    nav, footer, .no - print { display: none!important; }
}
`}</style>

            <div className="no-print p-8 text-center bg-slate-100 border-b border-slate-200 mb-8">
                <h1 className="text-2xl font-bold text-slate-800 mb-2">Print Preview: {topic.name}</h1>
                <p className="text-slate-600 mb-4">
                    This layout is designed for <strong>A4</strong> paper. <br />
                    It prints 4 cards per page. <br />
                    <strong>Double-sided printing:</strong> If your printer supports it, flip on "Short Edge" for landscape or match the orientation. <br />
                    The Backs are mirrored so they match the Fronts when printed back-to-back.
                </p>
                <button
                    onClick={() => { }} // In a client component we'd utilize window.print(), but inline onclick works in simple HTML often, or we let user use browser menu. 
                    // Since this is a server component, we can use a small script or just tell user to Ctrl+P.
                    // Adding a simple script for the button.
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold shadow-lg hover:bg-indigo-700 transition-colors"
                // We can't use onClick in Server Component. I'll add a script tag.
                >
                    Press Ctrl + P to Print
                </button>
            </div>

            <div className="max-w-[210mm] mx-auto bg-white">
                {chunks.map((chunk, pageIndex) => (
                    <div key={`chunk - ${ pageIndex } `}>

                        {/* FRONTS PAGE */}
                        <div className="w-[210mm] h-[297mm] p-[10mm] grid grid-cols-2 gap-[5mm] page-break-after-always">
                            {chunk.map((card) => (
                                <div key={`front - ${ card.id } `} className="border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center p-8 relative">
                                    <span className="absolute top-2 left-2 text-[10px] text-slate-400">FRONT</span>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-slate-900">{card.frontContent}</div>
                                    </div>
                                </div>
                            ))}
                            {/* Fill empty spots if less than 4 */}
                            {[...Array(4 - chunk.length)].map((_, i) => (
                                <div key={`empty - front - ${ i } `} className="border-2 border-dashed border-slate-100 rounded-xl opacity-20"></div>
                            ))}
                        </div>

                        {/* BACKS PAGE (Mirrored Order) */}
                        {/* To match front:
                Top-Left Front (0) -> Top-Right Back (0)
                Top-Right Front (1) -> Top-Left Back (1)
                ...
                So we swap the columns visually or reorder the array.
                Row 1: [0, 1] -> Backs should be [1, 0]
                Row 2: [2, 3] -> Backs should be [3, 2]
            */}
                        <div className="w-[210mm] h-[297mm] p-[10mm] grid grid-cols-2 gap-[5mm] page-break-after-always">
                            {/* Row 1 Backs (1, 0) */}
                            {[chunk[1], chunk[0]].map((card, idx) => (
                                card ? (
                                    <div key={`back - ${ card.id } `} className="border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center p-8 relative bg-slate-50">
                                        <span className="absolute top-2 right-2 text-[10px] text-slate-400">BACK</span>
                                        <div className="text-center">
                                            <div className="text-xl text-slate-700">{card.backContent}</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div key={`empty - back - r1 - ${ idx } `} className="border-2 border-dashed border-slate-100 rounded-xl opacity-20"></div>
                                )
                            ))}

                            {/* Row 2 Backs (3, 2) */}
                            {[chunk[3], chunk[2]].map((card, idx) => (
                                card ? (
                                    <div key={`back - ${ card.id } `} className="border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center p-8 relative bg-slate-50">
                                        <span className="absolute top-2 right-2 text-[10px] text-slate-400">BACK</span>
                                        <div className="text-center">
                                            <div className="text-xl text-slate-700">{card.backContent}</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div key={`empty - back - r2 - ${ idx } `} className="border-2 border-dashed border-slate-100 rounded-xl opacity-20"></div>
                                )
                            ))}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
