import axios from "axios";
import { useEffect, useState } from "react";

interface BeerListProps {
  id: number;
  name: string;
  image_url: string;
}

export default function BeerList() {
  const [beers, setBeers] = useState<BeerListProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterByName, setFilterByName] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "id">("name");

  useEffect(() => {
    axios
      .get("https://api.punkapi.com/v2/beers")
      .then((response) => {
        setBeers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(`Erro ao buscar cervejas: ${error.message}`);
        setLoading(false);
      });
  }, []);

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(filterByName.toLowerCase())
  );

  const sortedBeers = [...filteredBeers].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else {
      return a.id - b.id;
    }
  });

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Filtrar por nome"
          value={filterByName}
          onChange={(e) => setFilterByName(e.target.value)}
        />
        <button onClick={() => setSortBy("name")}>Ordenar por Nome</button>
        <button onClick={() => setSortBy("id")}>Ordenar por ID</button>
      </div>
      {loading && <div>Carregando...</div>}
      {error && <div>{error}</div>}
      <ul>
        {sortedBeers.map((beer) => (
          <li key={beer.id}>{beer.name}</li>
        ))}
      </ul>
    </div>
  );
}
