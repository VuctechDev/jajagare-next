import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { sendNotifEmail } from "@/lib/resend";
import { getDateRange } from "@/lib/date";
import { handleUser } from "@/lib/user";

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
        createdAt: getDateRange(date as string),
      },
      include: { user: true },
    });
    const total = await prisma.orders.aggregate({
      _sum: {
        quantity: true,
      },
      where: {
        createdAt: getDateRange(date as string),
      },
    });
    return res.json({ data: orders, total: total._sum.quantity ?? 0 });
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
