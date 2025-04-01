import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getDateRange } from "@/lib/date";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { date } = req.query;
    const orders = await prisma.orders.findMany({
      where: {
        delivery: getDateRange(date as string),
        status: "open",
      },
    });
    return res.json({ data: orders });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
