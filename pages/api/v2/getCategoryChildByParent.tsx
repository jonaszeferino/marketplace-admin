import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../utils/mySqlConnection";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      console.log("chamou o metodo dentro da api");
      const hierarchy = req.query.hierarchy;
      if (!hierarchy) {
        return res
          .status(400)
          .json({ error: "Parâmetro 'hierarchy' é obrigatório" });
      }
      const hierarchyAsNumber = Array.isArray(hierarchy)
        ? parseInt(hierarchy[0])
        : parseInt(hierarchy);

      if (isNaN(hierarchyAsNumber)) {
        return res
          .status(400)
          .json({ error: "Parâmetro 'hierarchy' inválido" });
      }
      const products = await fetchProducts(hierarchyAsNumber);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Erro na solicitação" });
      console.log(error);
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};

async function fetchProducts(hierarchy: number) {
  try {
    const query = `SELECT * FROM category WHERE hierarchy = ?`;
    const [rows, fields] = await pool.query(query, [hierarchy]);
    return rows;
  } catch (error) {
    console.error("Erro ao consultar as tabelas: ", error);
    console.log(error);
    throw error;
  }
}
