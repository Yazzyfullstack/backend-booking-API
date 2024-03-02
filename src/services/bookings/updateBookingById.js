import { PrismaClient } from "@prisma/client";


const updateBookingById = async (id, updatedBooking) => {
    const prisma = new PrismaClient();

    try {
        const { user, property, ...rest } = updatedBooking;

        const booking = await prisma.booking.update({
            where: { id },
            data: {
                ...rest,
                user: user
                    ? {
                        connect: { id: user },
                    }
                    : undefined,
                property: property
                    ? {
                        connect: { id: property }
                    }
                    : undefined
            }
        });

        return booking;
    } catch (error) {
        // Handle the error and return an appropriate response.
        console.error("Error updating booking:", error);
        throw error; // or return an error response
    } finally {
        await prisma.$disconnect(); //  disconnect from the database
    }
};

export default updateBookingById;
