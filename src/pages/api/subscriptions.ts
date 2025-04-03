import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { sendNotifEmail } from "@/lib/resend";
import { handleUser } from "@/lib/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const subscriptions = await prisma.subscriptions.findMany();
    const count = await prisma.subscriptions.count();
    return res.json({ data: subscriptions, total: count ?? 0 });
  }

  if (req.method === "POST") {
    const { email } = req.body;
    await handleUser(req.body);
    const data = await prisma.subscriptions.create({
      data: {
        email,
      },
    });
    sendNotifEmail.subscription(email);
    return res.status(201).json(data);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
