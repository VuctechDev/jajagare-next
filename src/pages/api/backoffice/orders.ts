import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// const getStatus = (userId: string, delivery: string) => {
//   if (userId === "b8380558-b8ce-48f1-862c-6d155f63bcd6") {
//     return "writeOff";
//   }
//   if (delivery) {
//     return "open";
//   }
//   return "done";
// };

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
      },
    });
    return res.status(201).json({ data });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
