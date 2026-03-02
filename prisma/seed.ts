import { PrismaClient, Role } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in .env');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // ===============================
  // 1️⃣ Create Admin
  // ===============================

  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@gym.com' },
    update: {},
    create: {
      email: 'admin@gym.com',
      password: hashedPassword,
      name: 'Admin User',
      role: Role.ADMIN,
    },
  });

  console.log('✅ Admin created');

  // ===============================
  // 2️⃣ Create 10 Trainers
  // ===============================

  console.log('👨‍🏫 Creating 10 Trainers...');
  const trainers = [];

  for (let i = 1; i <= 10; i++) {
    const trainer = await prisma.user.upsert({
      where: { email: `trainer${i}@gym.com` },
      update: {},
      create: {
        email: `trainer${i}@gym.com`,
        password: hashedPassword,
        name: `Trainer ${i}`,
        role: Role.TRAINER,
        bio: 'Certified professional dedicated to your fitness journey.',
        specialties: ['HIIT', 'Strength', 'Nutrition'],
        socialLinks: {
          instagram: 'https://instagram.com',
          twitter: 'https://twitter.com',
          linkedin: 'https://linkedin.com',
        },
        image:
          'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=800',
      },
    });

    trainers.push(trainer);
  }

  console.log('✅ Trainers created');

  // ===============================
  // 3️⃣ Create 100 Users
  // ===============================

  console.log('👥 Creating 100 Users...');

  for (let i = 1; i <= 100; i++) {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    await prisma.user.upsert({
      where: { email: `user${i}@gym.com` },
      update: {},
      create: {
        email: `user${i}@gym.com`,
        password: hashedPassword,
        name: `User ${i}`,
        role: Role.USER,
        memberships: {
          create: {
            startDate,
            endDate,
            type: 'MONTHLY',
            status: 'ACTIVE',
          },
        },
      },
    });
  }

  console.log('✅ Users created');

  // ===============================
  // 4️⃣ Create 5 Classes
  // ===============================

  console.log('🏋️ Creating 5 Classes...');

  const classData = [
    {
      name: 'Morning Yoga',
      desc: 'Start your day with zen',
      capacity: 20,
      image:
        'https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'HIIT Blast',
      desc: 'High Intensity Interval Training',
      capacity: 15,
      image:
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Power Lifting',
      desc: 'Build serious strength',
      capacity: 10,
      image:
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Zumba Dance',
      desc: 'Dance your way to fitness',
      capacity: 25,
      image:
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Evening Meditation',
      desc: 'Relax and unwind',
      capacity: 30,
      image:
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    },
  ];

  for (let i = 0; i < classData.length; i++) {
    const trainer = trainers[i % trainers.length];
    const data = classData[i];

    const existingClass = await prisma.class.findFirst({
      where: { name: data.name },
    });

    const scheduleDate = new Date();
    scheduleDate.setDate(scheduleDate.getDate() + i + 1);

    if (!existingClass) {
      await prisma.class.create({
        data: {
          name: data.name,
          description: data.desc,
          trainerId: trainer.id,
          schedule: scheduleDate,
          capacity: data.capacity,
          image: data.image,
        },
      });

      console.log(`✅ Created class: ${data.name}`);
    } else {
      console.log(`⚠️ Class ${data.name} already exists`);
    }
  }

  console.log('🎉 Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
