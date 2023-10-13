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
    const query = 
    `SELECT pd.name , pd.description , pd.label as definition_label, pdv.type, pa.label, pa.key_attribute  
    from product_definitions pd
    INNER JOIN  product_definition_values pdv
    on pd.product_definition_id = pdv.product_definition_id
    INNER JOIN product_attributes pa on pa.product_attribute_id = pdv.product_attribute_id`;

    const [rows, fields] = await pool.query(query);

    if (rows.length > 0) {
      const { definition_label, name, description, ...rest } = rows[0];

      const result = {
        definition_label,
        name,
        description,
        data: rows.map((row) => ({
          ...rest,
          type: row.type,
          label: row.label,
          key_attribute: row.key_attribute,
        })),
      };

      return result;
    }

    return {};
  } catch (error) {
    console.error("Erro ao consultar as tabelas: ", error);
    throw error;
  }
}
