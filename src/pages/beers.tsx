import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchBeerData } from "../utils/api";

interface BeerListProps {
  id: number;
  name: string;
  image_url: string;
}

export default function BeerList() {
  const [beers, setBeers] = useState<BeerListProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBeerData()
      .then((data) => {
        console.log(data);
        setBeers(data);
        setLoading(false);
      })
      .catch((error) => console.error("Erro ao buscar dados da API:", error));
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Box>
      <Text
        fontSize="5xl"
        color="blueviolet"
        textAlign="center"
        marginBottom="4"
        fontWeight="extrabold"
      >
        Lista de Cervejas
      </Text>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)"
        }}
        gap={4}
      >
        {beers.map((beer) => (
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
              <img
                src={beer.image_url}
                alt={beer.name}
                className="beer-image"
                style={{
                  height: "auto",
                  maxWidth: "5rem",
                  objectFit: "contain"
                }}
              />
              <Box p="4">
                <Text fontWeight="semibold">{beer.name}</Text>
              </Box>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
