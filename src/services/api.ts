import axios from 'axios';

export interface Beer {
  id: number;
  name: string;
  abv: number;
  style: string;
  image_url: string;
  tagline: string;
}

export async function fetchBeers(filters?: { name?: string; abv?: number }): Promise<Beer[]> {
  try {
    const params = new URLSearchParams();
    if (filters) {
      if (filters.name) params.append('name', filters.name);
      if (filters.abv) params.append('abv', filters.abv.toString());
    }

    const response = await axios.get(`https://api.punkapi.com/v2/beers?${params}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao obter dados da API da Punk');
  }
}