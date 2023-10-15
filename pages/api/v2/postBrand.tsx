import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../utils/mySqlConnection';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { name, label } = req.body;

      if (!name || !label) {
        res.status(400).json({ error: 'Os campos "name" e "label" são obrigatórios.' });
        return;
      }

      // Execute o comando SQL de inserção
      const insertQuery = 'INSERT INTO brands (name, label) VALUES (?, ?)';
      await pool.query(insertQuery, [name, label]);

      res.status(200).json({ message: 'Inserção bem-sucedida' });
    } catch (error) {
      res.status(500).json({ error: 'Erro na solicitação' });
      console.log(error);
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
};
