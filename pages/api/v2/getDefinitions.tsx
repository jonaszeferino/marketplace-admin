import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../utils/mySqlConnection";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
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
    const connection = await pool.getConnection();

    try {
      const query1 = `
        SELECT pd.name, pd.description, pd.label as definition_label, pd.product_definition_id
        FROM product_definitions pd
        
      `;
      const [rows1, fields1] = await connection.query(query1);

      const query2 = `
        SELECT pdv.type, pa.label, pa.key_attribute, pdv.product_definition_id
        FROM product_definition_values pdv
        INNER JOIN product_attributes pa ON pa.product_attribute_id = pdv.product_attribute_id
        `;
      const [rows2, fields2] = await connection.query(query2);
      connection.release();

      return { definitions: rows1, attributes: rows2 };
    } catch (error) {
      console.error("Erro na segunda consulta: ", error);
      
      connection.release();
      throw error;
    }
  } catch (error) {
    console.error("Erro ao obter a conexão: ", error);
    throw error;
  }
}

