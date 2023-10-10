import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

let sku 
let sellerId

async function fetchProducts({ sku, sellerId }) {
  try {
    // Use os parâmetros SKU e Seller ID para filtrar os produtos
    const { data: productsData, error: productsError } = await supabase
      .from("products")
      .select("*")
      .eq("seller_id", sellerId)
      .eq("sku", sku);
      console.log(sku)
      console.log(sellerId)

    if (productsError) {
      throw productsError;
    }

    const skus = productsData.map((product) => product.sku);
    const { data: categoriesData, error: categoriesError } = await supabase
      .from("product_categories")
      .select("parent,child_1,child_2,child_3")
      .in("sku", skus);

    if (categoriesError) {
      throw categoriesError;
    }

    const { data: brandsData, error: brandsError } = await supabase
      .from("brands")
      .select("lable")
      .in(
        "id",
        productsData.map((brand) => brand.brand_id)
      );

    if (brandsError) {
      throw brandsError;
    }

    const combinedData = {
      products: productsData,
      categories: categoriesData,
      brands: brandsData,
    };

    return combinedData;
  } catch (error) {
    console.error(
      "Erro ao consultar a tabela 'products', 'product_categories' e 'brands':",
      error
    );
    return null;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
    if (req.method === "POST") {
      try {
        // Obtenha os parâmetros SKU e Seller ID do corpo da solicitação
        const { sku, sellerId } = req.body;
  
        const products = await fetchProducts({ sku, sellerId });
  
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