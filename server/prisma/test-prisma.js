import prisma from './prisma/Prisma.js';

async function testPrisma() {
    try {
        // Test a simple query
        const userCount = await prisma.user.count();
        console.log(`User count: ${userCount}`);
        console.log('Prisma client initialized successfully');
    } catch (error) {
        console.error('Error initializing Prisma client:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testPrisma();