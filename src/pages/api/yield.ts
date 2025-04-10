import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { YieldType } from "@/@types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await prisma.eggs_yield.findMany({
      orderBy: {
        date: "desc",
      },
      take: 30,
    });
    const total = data.reduce((sum, entry) => sum + entry.quantity, 0);
    const [topDay] = await prisma.$queryRawUnsafe<YieldType[]>(`
      SELECT *, (quantity::float / chickens) as yield
      FROM "eggs_yield"
      WHERE chickens > 0
      ORDER BY yield DESC
      LIMIT 1;
    `);

    return res.json({ data, total, topDay });
  }

  if (req.method === "POST") {
    const { quantity, comment, chickens, date } = req.body;
    const data = await prisma.eggs_yield.upsert({
      where: { date: new Date(date) },
      update: {
        quantity: +quantity,
        chickens: +chickens,
        comment,
      },
      create: {
        quantity: +quantity,
        chickens: +chickens,
        comment,
        date: new Date(date),
      },
    });
    return res.status(201).json({ data });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
