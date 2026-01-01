import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CategoryClient from '@/components/CategoryClient';

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const category = await prisma.category.findUnique({
        where: { id },
        include: {
            topics: {
                include: { _count: { select: { cards: true } } }
            }
        }
    });

    if (!category) notFound();

    return <CategoryClient category={category} />;
}
