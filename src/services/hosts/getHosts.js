import { PrismaClient } from '@prisma/client';

const getHosts = async (name) => {
    const prisma = new PrismaClient();

    try {
        const hosts = await prisma.host.findMany({
            where: {
                name: {
                    contains: name,
                },
            },
        });

        return hosts;
    } catch (error) {
        // Handle the error or throw a custom error
        console.error('Error getting hosts:', error);
        throw new Error('Failed to get hosts');
    } finally {
        await prisma.$disconnect(); // Close the Prisma client
    }
};

export default getHosts;
