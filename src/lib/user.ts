import { OrderCreateType } from "@/@types";
import prisma from "../lib/prisma";

export const handleUser = async (data: OrderCreateType) => {
  if (data?.userId) {
    const updatedUser = await prisma.users.update({
      where: { id: data.userId },
      data: {
        email: data.email,
      },
    });
    console.log("User updated from subscription:", updatedUser);
    return updatedUser;
  }
  const existingUser = await prisma.users.findFirst({
    where: {
      phone: data.phone,
    },
  });

  if (!existingUser) {
    const newUser = await prisma.users.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || "",
      },
    });
    console.log("User created:", newUser);
    return newUser;
  } else {
    const updatedUser = await prisma.users.update({
      where: { id: existingUser.id },
      data: {
        name: data.name,
      },
    });
    console.log("User updated:", updatedUser);
    return updatedUser;
  }
};
