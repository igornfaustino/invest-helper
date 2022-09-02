// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = object;

const key = process.env.HBRASIL_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const { code } = req.query;
    const url = `https://api.hgbrasil.com/finance/stock_price?key=${key}&symbol=${code}`;
    try {
      const stockData = await fetch(url)
        .then((response) => response.json())
        .then((data) => data.results[(code as string).toUpperCase()]);
      res.status(200).json(stockData);
    } catch (error: any) {
      res.status(400).json({
        error: "bad request",
      });
    }
  }
}
