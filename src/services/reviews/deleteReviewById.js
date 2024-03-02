import { PrismaClient } from "@prisma/client";

const deleteReviewById = async (id) => {
    const prisma = new PrismaClient();

    const existingReview = await prisma.review.findUnique({
        where: { id },
    });

    if (!existingReview) {
        // Review id specified > doesn't exist
        return null;
    }

    const deletedReview = await prisma.review.delete({
        where: { id },
    });

    return deletedReview ? id : null;
};

export default deleteReviewById;
