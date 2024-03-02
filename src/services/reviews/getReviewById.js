import { PrismaClient } from "@prisma/client";

const getReviewById = async (id) => {
    const prisma = new PrismaClient();
    const review = await prisma.review.findUnique({
        where: { id },
    });

    if (!review) {// Review : id specified don't exist
        
        return null;
    }

    return review;
};

export default getReviewById;
