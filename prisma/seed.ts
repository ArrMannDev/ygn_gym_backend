import { PrismaClient, Role } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Seeding database...');

    // 1. Create Admin
    const admin = await prisma.user.upsert({
        where: { email: 'admin@gym.com' },
        update: {},
        create: {
            email: 'admin@gym.com',
            password: 'password123',
            name: 'Admin User',
            role: Role.ADMIN,
        },
    });
    console.log({ admin });

    // 2. Create 10 Trainers
    console.log('Creating 10 Trainers...');
    const trainers = [];
    for (let i = 1; i <= 10; i++) {
        const trainer = await prisma.user.upsert({
            where: { email: `trainer${i}@gym.com` },
            update: {},
            create: {
                email: `trainer${i}@gym.com`,
                password: 'password123',
                name: `Trainer ${i}`,
                role: Role.TRAINER,
            },
        });
        trainers.push(trainer);
    }

    // 3. Create 100 Users
    console.log('Creating 100 Users...');
    for (let i = 1; i <= 100; i++) {
        await prisma.user.upsert({
            where: { email: `user${i}@gym.com` },
            update: {},
            create: {
                email: `user${i}@gym.com`,
                password: 'password123',
                name: `User ${i}`,
                role: Role.USER,
                memberships: {
                    create: {
                        startDate: new Date(),
                        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
                        type: 'MONTHLY',
                        status: 'ACTIVE',
                    },
                },
            },
        });
    }

    // 4. Create 5 Classes
    console.log('Creating 5 Classes...');
    const classData = [
        { name: 'Morning Yoga', desc: 'Start your day with zen', capacity: 20 },
        { name: 'HIIT Blast', desc: 'High Intensity Interval Training', capacity: 15 },
        { name: 'Power Lifting', desc: 'Build serious strength', capacity: 10 },
        { name: 'Zumba Dance', desc: 'Dance your way to fitness', capacity: 25 },
        { name: 'Evening Meditation', desc: 'Relax and unwind', capacity: 30 },
    ];

    for (let i = 0; i < 5; i++) {
        const trainerIndex = i % trainers.length;
        const trainer = trainers[trainerIndex];
        const data = classData[i];

        const existingClass = await prisma.class.findFirst({ where: { name: data.name } });
        if (!existingClass) {
            const newClass = await prisma.class.create({
                data: {
                    name: data.name,
                    description: data.desc,
                    trainerId: trainer.id,
                    schedule: new Date(new Date().setDate(new Date().getDate() + 1 + i)), // Staggered days
                    capacity: data.capacity,
                }
            });
            console.log(`Created class: ${newClass.name}`);
        } else {
            console.log(`Class ${data.name} already exists.`);
        }
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
