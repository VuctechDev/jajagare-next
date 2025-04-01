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
    const orders = await prisma.orders.findMany({
      where: {
        createdAt: getDateRange(date as string),
      },
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
    const {
      product,
      quantity,
      price,
      address,
      phone,
      name,
      comment,
      delivery,
    } = req.body;
    const order = await prisma.orders.create({
      data: {
        product,
        quantity,
        price,
        address,
        phone,
        name,
        comment,
        delivery: new Date(delivery),
      },
    });
    await handleUser(req.body);
    sendNotifEmail.order(req.body);
    return res.status(201).json(order);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
