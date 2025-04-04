import { NextApiRequest, NextApiResponse } from "next";

const code = "VYIHYUYU6VUYRFWQ(*&NOGUIHIJp77erve980IUYGVFi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { authCode } = req.body;
    return res.status(201).json({ success: authCode === code });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
