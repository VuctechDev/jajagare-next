import { soldEggsCount } from "@/lib/data";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const balance = await prisma.eggs_yield.aggregate({
      _sum: {
        quantity: true,
      },
    });

    const reserved = await prisma.orders.aggregate({
      _sum: {
        quantity: true,
      },
      where: {
        status: "open",
      },
    });
    const sold = await prisma.orders.aggregate({
      _sum: {
        quantity: true,
      },
      where: {
        status: "done",
        userId: { not: "b8380558-b8ce-48f1-862c-6d155f63bcd6" },
      },
    });

    return res.status(201).json({
      reserved: reserved._sum.quantity,
      balance: balance._sum.quantity! - soldEggsCount - sold._sum.quantity!,
      sold: sold._sum.quantity,
    });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
