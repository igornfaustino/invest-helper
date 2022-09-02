// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const key = process.env.HBRASIL_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const { code } = req.query;
    const url = `https://api.hgbrasil.com/finance/stock_price?key=${key}&symbol=${code}`;
    console.log(key, code, url);
    const stockData = await fetch(url)
      .then((response) => response.json())
      .then((data) => data.results[(code as string).toUpperCase()]);
    res.status(200).json(stockData);
  }
}
