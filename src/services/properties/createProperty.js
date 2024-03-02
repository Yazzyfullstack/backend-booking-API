import { PrismaClient } from '@prisma/client';

const createProperty = async (title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating, reviews) => {
    const prisma = new PrismaClient();

    try {
        const property = await prisma.property.create({
            data: {
                title,
                description,
                location,
                pricePerNight,
                bedroomCount,
                bathRoomCount,
                maxGuestCount,
                hostId,
                rating,
                reviews,
            },
        });

        return property;
    } catch (error) {
        // Handle  error or throw a custom error
        console.error('Error creating property:', error);
        throw new Error('Failed to create property');
    } finally {
        await prisma.$disconnect(); // Close the Prisma client
    }
};

export default createProperty;
