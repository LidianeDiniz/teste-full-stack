export async function fetchBeerData() {
  try {
    const response = await fetch("https://api.punkapi.com/v2/beers");
    if (!response.ok) {
      throw new Error("Erro na resposta da API");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(`Erro ao buscar dados da API: ${error.message}`);
  }
}
