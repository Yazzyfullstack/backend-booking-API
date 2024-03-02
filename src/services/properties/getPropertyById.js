import { PrismaClient } from "@prisma/client";

const getPropertyById = async (id) => {
    const prisma = new PrismaClient();

    try {
        const property = await prisma.property.findUnique({
            where: { id },
        });

        return property;
    } catch (error) {
        // Handle the error or throw a custom error
        console.error('Error getting property by ID:', error);
        throw new Error('Failed to get property by ID');
    } finally {
        await prisma.$disconnect(); // Close the Prisma client
    }
};

export default getPropertyById;
