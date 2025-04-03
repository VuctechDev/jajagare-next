import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const orderStats = await prisma.orders.groupBy({
      by: ["userId"],
      _sum: {
        quantity: true,
      },
      _count: {
        id: true,
      },
      _max: {
        createdAt: true,
      },
    });
    const users = await prisma.users.findMany();

    const enrichedUsers = users.map((user) => {
      const stats = orderStats.find((stat) => stat.userId === user.id);

      return {
        ...user,
        orderCount: stats?._count.id ?? 0,
        quantitySum: stats?._sum.quantity ?? 0,
        lastOrder: stats?._max.createdAt ?? null,
      };
    });
    // const users = await prisma.users.findMany({
    //   include: {
    //     _count: {
    //       select: {
    //         orders: true,
    //       },
    //     },
    //   },
    // });
    // const count = await prisma.users.count();
    return res.json({ data: enrichedUsers, total: users?.length ?? 0 });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
