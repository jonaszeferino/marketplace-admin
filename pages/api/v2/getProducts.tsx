import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../utils/mySqlConnection';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const products = await fetchProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Erro na solicitação' });
      console.log(error)
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
};

async function fetchProducts() {
  try {
    const query = `
      SELECT p.*, b.name as brand_name, b.label FROM products p JOIN brands b on b.id = p.brand_id
      
    `;
    const [rows, fields] = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('Erro ao consultar as tabelas: ', error);
    throw error;
  }
}
