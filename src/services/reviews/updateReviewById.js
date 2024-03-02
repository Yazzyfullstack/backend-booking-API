import { PrismaClient } from "@prisma/client";

const updateReviewById = async (id, updatedReview) => {
    const prisma = new PrismaClient();

    const review = await prisma.review.update({
        where: { id },
        data: {
            ...updatedReview, // Spread the properties from updatedReview
            user: updatedReview.user
                ? {
                    connect: { id: updatedReview.user },
                }
                : undefined,
            property: updatedReview.property
                ? {
                    connect: { id: updatedReview.property }
                }
                : undefined
        }
    });

    return review;
};

export default updateReviewById;
