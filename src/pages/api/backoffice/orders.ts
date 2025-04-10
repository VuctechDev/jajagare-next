import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log(req.body);
    const { product, quantity, price, userId, comment, delivery } = req.body;
    const data = await prisma.orders.create({
      data: {
        product,
        quantity: +quantity,
        price,
        address: "",
        comment,
        delivery: delivery ? new Date(delivery) : null,
        status: delivery ? "open" : "done",
        userId,
        // user: {
        //   connect: { id: userId },
        // },
      },
    });
    return res.status(201).json({ data });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
