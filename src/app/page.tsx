import prisma from '@/lib/prisma';
import HomeClient from '@/components/HomeClient';

export default async function Home() {
    const categories = await prisma.category.findMany({
        orderBy: { createdAt: 'asc' },
        include: {
            topics: {
                include: {
                    cards: true
                }
            }
        }
    });

    return <HomeClient categories={categories} />;
}
