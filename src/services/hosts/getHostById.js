import { PrismaClient } from "@prisma/client";

const getHostById = async (id) => {
    const prisma = new PrismaClient();

    try {
        const host = await prisma.host.findUnique({
            where: { id },
        });

        return host;
    } catch (error) {
        // Handle the error  or throw a custom error
        console.error('Error getting host by ID:', error);
        throw new Error('Failed to get host by ID');
    } finally {
        await prisma.$disconnect(); // Close the Prisma client
    }
};

export default getHostById;
