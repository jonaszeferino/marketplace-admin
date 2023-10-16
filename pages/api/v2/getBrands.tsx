import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../utils/mySqlConnection";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      console.log('chamou o metodo dentro da api')
      const products = await fetchProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Erro na solicitação" });
      console.log(error);
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};

async function fetchProducts() {
  try {
    const query = `select * from brands`;
    const [rows, fields] = await pool.query(query);
    return rows;
  } catch (error) {
    console.error("Erro ao consultar as tabelas: ", error);
    console.log(error)
    throw error;
  }
}
