import { PrismaClient } from "@prisma/client";
import amenitiesData from "../src/data/amenities.json" assert { type: "json" };
import bookingsData from "../src/data/bookings.json" assert { type: "json" };
import hostsData from "../src/data/hosts.json" assert { type: "json" };;
import propertiesData from "../src/data/properties.json" assert { type: "json" };
import reviewsData from "../src/data/reviews.json" assert { type: "json" };
import usersData from "../src/data/users.json" assert { type: "json" };

// Feedback: De volgorde van het inladen van de data aanpassen, aangezien host niet wordt gevonden wat error foreign key geeft.
//Volgorde nu: users, hosts, properties, amenities, reviews, bookings

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
  });

//import data json
async function main() {
  const { amenities } = amenitiesData;
  const { bookings } = bookingsData;
  const { hosts } = hostsData;
  const { properties } = propertiesData;
  const { reviews } = reviewsData;
  const { users } = usersData;

  // 1.Users eerst. De gebruiker is eerst aangemaakt voor host 
  for (const user of users) {
    await prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: user

    })//2.hosts: Host kan nu eerst gevonden worden. Host aangemaakt voor properties 
}    for (const host of hosts) {
    await prisma.host.upsert({
        where: { id: host.id },
        update: {},
        create: host
    })

    //3.properties 
}    for (const property of properties) {
    await prisma.property.upsert({
        where: { id: property.id },
        update: {},
        create: property
    })

    //4.amenities
}    for (const amenity of amenities) {
    await prisma.amenity.upsert({
        where: { id: amenity.id },
        update: {},
        create: amenity,
    });

    //5.reviews
}    for (const review of reviews) {
    await prisma.review.upsert({
        where: { id: review.id },
        update: {},
        create: {
            id: review.id,
            rating: review.rating,
            comment: review.comment,
            user: {
                connect: { id: review.userId }
            },
            property: {
                connect: { id: review.propertyId }
            }
        }
    })

    //6.bookings
}    for (const booking of bookings) {
    await prisma.booking.upsert({
        where: { id: booking.id },
        update: {},
        create: {
            id: booking.id,
            checkinDate: booking.checkinDate,
            checkoutDate: booking.checkoutDate,
            numberOfGuests: booking.numberOfGuests,
            totalPrice: booking.totalPrice,
            bookingStatus: booking.bookingStatus,
            user: {
                connect: { id: booking.userId }
            },
            property: {
                connect: { id: booking.propertyId }
            }
        },        })
}
}
main()
.then(async () => {
    await prisma.$disconnect();
})
.catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
  
   

    
