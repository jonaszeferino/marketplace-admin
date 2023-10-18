import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../utils/mySqlConnection";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const {
        name,
        ean,
        description,
        price_list_id,
        brand_id,
        sku,
        seller_id,
        is_visible,
        is_published,
        visible_from,
        visible_to,
        variations,
        product_definition_id,
        product_parent_id,
        product_child_id,
        shipped_weight,
        shipped_width,
        shipped_length,
        shipped_height,
        price,
        promo_price,
      } = req.body;

      const errorMessages = [];
      if (product_definition_id != 7) {
        errorMessages.push("wrong definition - use getDefinition method");
      }
      if (!name) {
        errorMessages.push("name is required");
      }
      if (!sku) {
        errorMessages.push("sku is required");
      }
      if (price === null) {
        errorMessages.push("price is required");
      }
      if (price < 0.1) {
        errorMessages.push("price cannot be less than 0.1");
      }
      if (price < promo_price) {
        errorMessages.push("price cannot be less than the promo_price");
      }
      if (shipped_weight < 0.1) {
        errorMessages.push("shipped_weight cannot be less than 0.1");
      }
      if (shipped_height < 1) {
        errorMessages.push("shipped_heigth cannot be less than 1");
      }
      if (shipped_width < 1) {
        errorMessages.push("shipped_width cannot be less than 1");
      }
      if (shipped_length < 1) {
        errorMessages.push("shipped_length cannot be less than 1");
      }
      if (errorMessages.length > 0) {
        res.status(400).json({ errors: errorMessages });
      } else {
        return;
      }
      const insertQuery = `INSERT INTO products (name, ean, description, price_list_id, brand_id, sku,seller_id, is_visible,is_published,visible_from,visible_to,
          variations,product_definition_id,product_parent_id,product_child_id,shipped_weight,shipped_width,shipped_length,shipped_height,price,promo_price) 
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
      await pool.query(insertQuery, [
        name,
        ean,
        description,
        price_list_id,
        brand_id,
        sku,
        seller_id,
        is_visible,
        is_published,
        visible_from,
        visible_to,
        variations,
        product_definition_id,
        product_parent_id,
        product_child_id,
        shipped_weight,
        shipped_width,
        shipped_length,
        shipped_height,
        price,
        promo_price,
      ]);

      res.status(200).json({ message: "Inserção bem-sucedida" });
    } catch (error) {
      res.status(500).json({ error: "Erro na solicitação" });
      console.log(error);
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
