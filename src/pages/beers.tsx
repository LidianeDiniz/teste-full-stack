// pages/beers.tsx
import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import BeerList from "../components/BeerList";
import { Beer, fetchBeers } from "../services/api";

const Beers: React.FC = () => {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{ name?: string; abv?: number }>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchBeers(filters);
        setBeers(data);
        setIsLoading(false);
      } catch (error: any) {
        setError("Erro ao obter dados da API da Punk: " + error.message);
        setIsLoading(false);
        console.error(error);
      }
    }
    fetchData();
  }, [filters]);

  return (
    <Box width="100%" minHeight="100vh" p={4}>
      {error ? (
        <p>{error}</p>
      ) : (
        <BeerList beers={beers} isLoading={isLoading} />
      )}
    </Box>
  );
};

export default Beers;
