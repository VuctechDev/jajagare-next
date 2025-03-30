import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid order id" });
  }

  if (req.method === "PATCH") {
    try {
      const updatedOrder = await prisma.orders.update({
        where: { id },
        data: { status: "done" },
      });
      return res.status(200).json({ data: updatedOrder });
    } catch (error) {
      console.error(error);
      return res.status(404).json({ error: "Order not found" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.orders.delete({
        where: { id },
      });
      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res.status(404).json({ error: "Order not found" });
    }
  }

  res.setHeader("Allow", ["PATCH", "DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
