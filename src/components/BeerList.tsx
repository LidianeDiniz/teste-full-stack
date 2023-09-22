import { useEffect, useState } from "react";

type BeerListProps = {
  id: number;
  name: string;
};

const BeerList = () => {
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    fetch("https://api.punkapi.com/v2/beers")
      .then((response) => response.json())
      .then((data) => setBeers(data))
      .catch((error) =>
        console.error("Erro ao buscar dados da API Punk:", error)
      );
  }, []);

  return (
    <div>
      <h1>Lista de Cervejas</h1>
      <ul>
        {beers.map((beer: BeerListProps) => (
          <li key={beer.id}>{beer.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BeerList;
