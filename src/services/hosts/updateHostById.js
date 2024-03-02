import { PrismaClient } from "@prisma/client";

const updateHostById = async (id, updatedHost) => {
    const prisma = new PrismaClient();

    try {
        const host = await prisma.host.updateMany({
            where: { id },
            data: updatedHost,
        });

        return host.count > 0 ? id : null;
    } catch (error) {
        // Handle the error or throw a custom error
        console.error('Error updating host by ID:', error);
        throw new Error('Failed to update host by ID');
    } finally {
        await prisma.$disconnect(); // Close the Prisma client
    }
};

export default updateHostById;
