import { Box, Button, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Box textAlign="center">
      <Heading as="h1" fontSize="4xl" mt={10}>
        Welcome to Your Application
      </Heading>
      <Text mt={4}>Faça login ou cadastre-se para continuar.</Text>
      <Link href="/login">
        <Button mt={4} colorScheme="teal">
          Login
        </Button>
      </Link>
      <Link href="/users">
        <Button mt={4} colorScheme="teal" variant="outline">
          Cadastre-se
        </Button>
      </Link>
      <Link href="/beers">
        <Button mt={4} colorScheme="teal">
          Ver Cervejas
        </Button>
      </Link>
    </Box>
  );
}
