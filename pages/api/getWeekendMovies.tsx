import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const urlString =
    "https://api.themoviedb.org/3/trending/movie/week?api_key=dd10bb2fbc12dfb629a0cbaa3f47810c&language=pt-BR";

  try {
    const response = await fetch(urlString, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const result = await response.json();
      res.status(200).json(result);
    } else {
      throw new Error("Dados Incorretos");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
};
