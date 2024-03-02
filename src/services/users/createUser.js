import { PrismaClient } from "@prisma/client";

const createUser = async (username, password, name, email, phoneNumber, profilePicture, aboutMe) => {
    const prisma = new PrismaClient();

    try {
        return await prisma.user.create({
            data: {
                username,
                password,
                name,
                email,
                phoneNumber,
                profilePicture,
                aboutMe,
            },
        });
    } finally {
        await prisma.$disconnect(); //close the prisma client
    }
};

export default createUser;
