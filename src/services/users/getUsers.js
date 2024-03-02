import { PrismaClient } from '@prisma/client';

const getUsers = async (username, email) => {
    // console.log("Ontvangen zoekcriteria:", username, email);

    const prisma = new PrismaClient(); 
    try {
        const users = await prisma.user.findMany({
            where: {
                username: {
                    contains: username,
                },
                email: {
                    contains: email,
                }
            }
        });

       

        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};

export default getUsers;
