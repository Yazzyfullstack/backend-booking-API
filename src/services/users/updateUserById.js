import { PrismaClient } from "@prisma/client";


  const prisma = new PrismaClient();

  const updateUserById = async (id, userData) => {
  
    const updatedUser = await prisma.user.update({
      where: { id },
      data: userData,
    });
  
    return updatedUser;
  };
   
  




export default updateUserById;

