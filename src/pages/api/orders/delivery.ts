import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getDateRange } from "@/lib/date";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { date } = req.query;
    if (!date) {
      const orders = await prisma.orders.findMany({
        include: { user: true },
      });
      return res.json({ data: orders, total: 0 });
    }
    const orders = await prisma.orders.findMany({
      where: {
        delivery: getDateRange(date as string),
      },
      include: { user: true },
    });
    const total = await prisma.orders.aggregate({
      _sum: {
        quantity: true,
      },
      where: {
        delivery: getDateRange(date as string),
      },
    });
    return res.json({ data: orders, total: total._sum.quantity ?? 0 });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
