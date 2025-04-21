import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { sendNotifEmail } from "@/lib/resend";
import { getDateRange } from "@/lib/date";
import { handleUser } from "@/lib/user";
import { queryHandler } from "@/lib/queryHandler";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { date, status, take, sort } = queryHandler(req.query);
    console.log(queryHandler(req.query));

    if (!date) {
      const data = await prisma.orders.findMany({
        include: { user: true },
        where: { status },
        orderBy: {
          [sort]: "desc",
        },
        take: +take,
      });
      const total = data.reduce((sum, entry) => sum + entry.quantity, 0);

      return res.json({ data, total });
    }

    const data = await prisma.orders.findMany({
      where: {
        createdAt: getDateRange(date),
        status: status,
      },
      include: { user: true },
      orderBy: {
        [sort]: "desc",
      },
      take: +take,
    });
    const total = data.reduce((sum, entry) => sum + entry.quantity, 0);
    return res.json({ data, total });
  }

  if (req.method === "POST") {
    const user = await handleUser(req.body);
    const { product, quantity, price, address, comment, delivery } = req.body;
    const order = await prisma.orders.create({
      data: {
        product,
        quantity,
        price,
        address,
        comment,
        userId: user?.id ?? "",
        delivery: new Date(delivery),
      },
    });
    sendNotifEmail.order(req.body);
    return res.status(201).json(order);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}

// const order = await prisma.orders.findMany({
//   include: { user: true }
// });
// From users → orders:
// ts
// Copy
// Edit
// const user = await prisma.users.findUnique({
//   where: { id: "some-user-id" },
//   include: { orders: true }
// });
