import { OrderCreateType } from "@/@types";
import prisma from "../lib/prisma";

export const handleUser = async (data: OrderCreateType) => {
  const existingUser = await prisma.users.findFirst({
    where: {
      phone: data.phone,
    },
  });

  if (!existingUser) {
    const newUser = await prisma.users.create({
      data: {
        name: data.name,
        address: data.address,
        phone: data.phone,
        email: data.email || "",
      },
    });
    console.log("User created:", newUser);
  } else {
    const updatedUser = await prisma.users.update({
      where: { id: existingUser.id },
      data: {
        name: data.name,
        address: data.address,
      },
    });
    console.log("User updated:", updatedUser);
  }
};
