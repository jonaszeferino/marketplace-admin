import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

async function fetchProductDefinitions(name) {
  try {
    const { data, error } = await supabase
      .from("product_definitions")
      .select("*")
      .eq("name", name);

    if (error) {
      throw error;
      console.log(error)
    }

    return data;
  } catch (error) {
    console.error("Erro ao consultar a tabela 'product_definitions':", error);
    console.log(error)
    return null;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Obtenha o nome do corpo da solicitação JSON
      const { name } = req.body;

      const productDefinitions = await fetchProductDefinitions(name);

      if (productDefinitions) {
        res.status(200).json(productDefinitions);
      } else {
        res.status(500).json({ error: "Erro ao buscar definições de produtos" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro na solicitação" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
