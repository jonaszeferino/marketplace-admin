import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

async function fetchProducts() {
  try {
    const { data, error } = await supabase.rpc(
        "SELECT * FROM product_defintions PD INNER JOIN product_attributes PA on PD.product_attributes_id = PA.id",
      {}
    );

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Erro ao consultar as tabelas: ", error);
    return null;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const products = await fetchProducts();

      if (products) {
        res.status(200).json(products);
      } else {
        res.status(500).json({ error: "Erro ao buscar produtos" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro na solicitação" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
