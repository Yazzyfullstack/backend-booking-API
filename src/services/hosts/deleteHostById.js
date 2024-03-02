import { PrismaClient } from "@prisma/client";

const deleteHostById = async (id) => {
    const prisma = new PrismaClient();

    try {
        const host = await prisma.host.deleteMany({
            where: { id },
        });

        return host.count > 0 ? id : null;
    } catch (error) {
        // Handle the error or throw a custom error
        console.error('Error deleting host by ID:', error);
        throw new Error('Failed to delete host by ID');
    } finally {
        await prisma.$disconnect(); // Close the Prisma client
    }
};

export default deleteHostById;
