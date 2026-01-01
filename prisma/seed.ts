const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // Reset database (optional, helps development)
    await prisma.flashcard.deleteMany();
    await prisma.topic.deleteMany();
    await prisma.category.deleteMany();

    // 1. Fun with Dots (Math)
    const mathCat = await prisma.category.create({
        data: {
            name: 'Fun with Dots (Math Program)',
            ageGroup: '3 Months - 7 Years',
            image: 'https://img.freepik.com/free-vector/math-background-with-colorful-elements_1308-27083.jpg'
        }
    });

    const dotsTopic = await prisma.topic.create({
        data: { name: 'Red Dots (1-20)', categoryId: mathCat.id }
    });

    // Generate 1-20 dots
    for (let i = 1; i <= 20; i++) {
        // We'll create a simple text representation or use a placeholder URL 
        // Ideally these would be images. For text representation:
        const dotString = Array(i).fill('🔴').join(' ');
        await prisma.flashcard.create({
            data: {
                frontContent: dotString, // Visual
                backContent: i.toString(), // Number
                topicId: dotsTopic.id
            }
        });
    }

    // 2. Flags (World Countries)
    const flagCat = await prisma.category.create({
        data: {
            name: 'World Countries Flags',
            ageGroup: '6 Months - 10 Years',
            image: 'https://img.freepik.com/free-vector/flags-world-banner_1284-17366.jpg'
        }
    });

    const asiaTopic = await prisma.topic.create({
        data: { name: 'Asian Countries', categoryId: flagCat.id }
    });

    const flagsData = [
        { name: 'Bangladesh', flag: '🇧🇩', capital: 'Dhaka', currency: 'Taka', lang: 'Bengali' },
        { name: 'India', flag: '🇮🇳', capital: 'New Delhi', currency: 'Rupee', lang: 'Hindi, English' },
        { name: 'Japan', flag: '🇯🇵', capital: 'Tokyo', currency: 'Yen', lang: 'Japanese' },
        { name: 'China', flag: '🇨🇳', capital: 'Beijing', currency: 'Yuan', lang: 'Mandarin' },
        { name: 'Saudi Arabia', flag: '🇸🇦', capital: 'Riyadh', currency: 'Riyal', lang: 'Arabic' },
    ];

    for (const country of flagsData) {
        await prisma.flashcard.create({
            data: {
                frontContent: country.flag, // Emoji flag is great for now
                backContent: `Country: ${country.name}\nCapital: ${country.capital}\nCurrency: ${country.currency}\nLang: ${country.lang}`,
                topicId: asiaTopic.id
            }
        });
    }

    const westernTopic = await prisma.topic.create({
        data: { name: 'Western Countries', categoryId: flagCat.id }
    });

    const westernFlags = [
        { name: 'USA', flag: '🇺🇸', capital: 'Washington DC' },
        { name: 'UK', flag: '🇬🇧', capital: 'London' },
        { name: 'Canada', flag: '🇨🇦', capital: 'Ottawa' },
        { name: 'Australia', flag: '🇦🇺', capital: 'Canberra' },
    ];

    for (const country of westernFlags) {
        await prisma.flashcard.create({
            data: {
                frontContent: country.flag,
                backContent: `Country: ${country.name}\nCapital: ${country.capital}`,
                topicId: westernTopic.id
            }
        });
    }

    // 3. Basic Flashcards (Vocabulary)
    const vocabCat = await prisma.category.create({
        data: {
            name: 'Basic Vocabulary',
            ageGroup: '3 Months - 6 Years',
            image: 'https://img.freepik.com/free-vector/hand-drawn-fruits-collection_23-2148962534.jpg'
        }
    });

    const fruitTopic = await prisma.topic.create({ data: { name: 'Fruits', categoryId: vocabCat.id } });

    await prisma.flashcard.create({ data: { frontContent: '🍎', backContent: 'Apple - A sweet red fruit.', topicId: fruitTopic.id } });
    await prisma.flashcard.create({ data: { frontContent: '🍌', backContent: 'Banana - A long yellow fruit.', topicId: fruitTopic.id } });
    await prisma.flashcard.create({ data: { frontContent: '🍇', backContent: 'Grapes - Small purple berries.', topicId: fruitTopic.id } });
    await prisma.flashcard.create({ data: { frontContent: '🍊', backContent: 'Orange - A citrus fruit.', topicId: fruitTopic.id } });
    await prisma.flashcard.create({ data: { frontContent: '🍓', backContent: 'Strawberry - Red fruit with seeds.', topicId: fruitTopic.id } });


    const animalTopic = await prisma.topic.create({ data: { name: 'Animals', categoryId: vocabCat.id } });
    await prisma.flashcard.create({ data: { frontContent: '🐅', backContent: 'Tiger - The biggest cat.', topicId: animalTopic.id } });
    await prisma.flashcard.create({ data: { frontContent: '🐘', backContent: 'Elephant - Creates big sounds.', topicId: animalTopic.id } });
    await prisma.flashcard.create({ data: { frontContent: '🐈', backContent: 'Cat - A popular pet.', topicId: animalTopic.id } });

    console.log('✅ Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
