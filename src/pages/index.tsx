import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Box
      textAlign="center"
      bg="teal.50"
      minH="100vh"
      p={4}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading as="h1" fontSize="4xl" mb={4}>
        Bem-vindo à Sua Aplicação
      </Heading>
      <Text fontSize="lg" mb={8}>
        Faça login ou cadastre-se para continuar.
      </Text>
      <Flex flexDirection={{ base: "column", md: "row" }} gap={4}>
        <Link href="/login">
          <Button colorScheme="teal" size="lg">
            Login
          </Button>
        </Link>
        <Link href="/users">
          <Button colorScheme="teal" variant="outline" size="lg">
            Cadastre-se
          </Button>
        </Link>
        <Link href="/beers">
          <Button colorScheme="teal" size="lg">
            Ver Cervejas
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}
