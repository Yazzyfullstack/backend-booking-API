import { PrismaClient } from "@prisma/client";

const deleteUserById = async (id) => {
    const prisma = new PrismaClient();

    try {
        const deletionResult = await prisma.user.deleteMany({
            where: { id },
        });

        if (deletionResult.count > 0) {
            return id;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error deleting user by ID:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};

export default deleteUserById;
