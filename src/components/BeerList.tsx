import { Box, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaSortAlphaDown } from "react-icons/fa";
import BackButton from "./BackButton";

interface Beer {
  id: number;
  name: string;
  abv: number;
  style: string;
  image_url: string;
  tagline: string;
}

interface BeerListProps {
  beers: Beer[];
  isLoading: boolean;
  initialSortBy?: "name" | "id";
}

const BeerList: React.FC<BeerListProps> = ({
  beers,
  isLoading,
  initialSortBy = "name"
}) => {
  const [sortBy, setSortBy] = useState<"name" | "id">(initialSortBy);
  const [filterByName, setFilterByName] = useState<string>("");

  const filteredAndSortedBeers = beers
    .filter((beer) =>
      beer.name.toLowerCase().includes(filterByName.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return a.id - b.id;
      }
    });

  return (
    <Box>
      <Flex justifyContent="space-between" mb="5">
        <Heading as="h2" size="lg" mb={6}>
          Lista de Cervejas
        </Heading>
        <BackButton />
      </Flex>
      <input
        type="text"
        placeholder="Filtrar por nome"
        value={filterByName}
        onChange={(e) => setFilterByName(e.target.value)}
      />

      <div>
        <button
          onClick={() => setSortBy("name")}
          disabled={sortBy === "name"}
          style={{ display: "flex", alignItems: "center" }}
        >
          Ordenar por Nome <FaSortAlphaDown style={{ marginLeft: "0.5rem" }} />
        </button>
      </div>
      {isLoading ? (
        <p>Carregando cervejas...</p>
      ) : (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)"
          }}
          gap={4}
          alignItems="stretch"
        >
          {filteredAndSortedBeers.map((beer) => (
            <GridItem key={beer.id}>
              <Flex
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                width="100%"
                height="100%"
                flexDirection="column"
                alignItems="center"
                justifyContent="flex-end"
                textColor="teal.900"
                fontWeight="medium"
                fontSize="1xl"
                cursor="pointer"
                transition="ease-in-out, 2"
                _hover={{
                  filter: "brightness(0.4)",
                  borderWidth: "2px",
                  borderColor: "teal.300",
                  borderRadius: "xl"
                }}
              >
                {beer.image_url && (
                  <img
                    src={beer.image_url}
                    alt={beer.name}
                    className="beer-image"
                    style={{
                      width: "5rem",
                      height: "auto",
                      maxWidth: "100%",
                      objectFit: "cover"
                    }}
                  />
                )}
                <Text>{beer.name}</Text>
              </Flex>
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default BeerList;
