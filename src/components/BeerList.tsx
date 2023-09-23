import { fetchBeerData } from "@/utils/api";
import { useEffect, useState } from "react";

interface BeerListProps {
  id: number;
  name: string;
  abv: number;
  style: string;
}

const BeerList = () => {
  const [beers, setBeers] = useState<BeerListProps[]>([]);
  const [filteredBeers, setFilteredBeers] = useState<BeerListProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCriteria, setFilterCriteria] = useState("");
  const [sortField, setSortField] = useState("name");

  useEffect(() => {
    fetchBeerData()
      .then((data) => {
        setBeers(data);
        setLoading(false);
      })
      .catch((error) => console.error("Erro ao buscar dados da API:", error));
  }, []);

  useEffect(() => {
    const filtered = beers.filter((beer) =>
      beer.name.toLowerCase().includes(filterCriteria.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (sortField === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortField === "abv") {
        return a.abv - b.abv;
      }
      return 0;
    });

    setFilteredBeers(filtered);
  }, [beers, filterCriteria, sortField]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Lista de Cervejas</h1>
      <input
        type="text"
        placeholder="Filtrar por nome"
        value={filterCriteria}
        onChange={(e) => setFilterCriteria(e.target.value)}
      />
      <button onClick={() => setSortField("name")}>Ordenar por Nome</button>
      <button onClick={() => setSortField("abv")}>
        Ordenar por Teor Alcoólico
      </button>
      <ul>
        {filteredBeers.map((beer) => (
          <li key={beer.id}>
            <strong>{beer.name}</strong>
            <p>Teor Alcoólico: {beer.abv}%</p>
            <p>Estilo: {beer.style}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BeerList;
