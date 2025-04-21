import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { queryHandler } from "@/lib/queryHandler";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { sort, all } = queryHandler(req.query);
    if (all) {
      const users = await prisma.users.findMany();
      return res.json({ data: users, total: users.length });
    }
    const enrichedUsersRaw = await prisma.$queryRawUnsafe<
      {
        id: string;
        name: string;
        phone: string;
        email: string;
        orderCount: bigint;
        quantitySum: bigint;
        lastOrder: Date | null;
      }[]
    >(`
        SELECT
          u.id,
          u.name,
          u.phone,
          u.email,
          COUNT(o.id) AS "orderCount",
          COALESCE(SUM(o.quantity), 0) AS "quantitySum",
          MAX(o."createdAt") AS "lastOrder"
        FROM "users" u
        LEFT JOIN "orders" o ON u.id = o."userId"
        GROUP BY u.id
        ORDER BY "${sort}" DESC NULLS LAST
      `);

    const enrichedUsers = enrichedUsersRaw.map((user) => ({
      ...user,
      orderCount: Number(user.orderCount),
      quantitySum: Number(user.quantitySum),
    }));

    return res.json({ data: enrichedUsers, total: enrichedUsers.length });
  }

  if (req.method === "POST") {
    const { name, phone, email } = req.body;
    const data = await prisma.users.upsert({
      where: { phone },
      update: {
        name,
        email,
      },
      create: {
        name,
        phone,
        email: email ?? "",
      },
    });
    return res.status(201).json({ data });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
