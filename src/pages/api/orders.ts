import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

const date = "2025-04-08";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { delivery } = req.query;
    const orders = await prisma.orders.findMany({
      where: {
        delivery: {
          gte: new Date(`${delivery}T00:00:00.000Z`),
          lt: new Date(`${delivery}T23:59:59.999Z`),
        },
        status: "open",
      },
    });
    return res.json({ data: orders });
  }

  if (req.method === "POST") {
    const {
      product,
      quantity,
      price,
      address,
      email,
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
        email,
        phone,
        name,
        comment,
        delivery: new Date(delivery),
      },
    });
    return res.status(201).json(order);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
