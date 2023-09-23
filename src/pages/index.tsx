import { Input } from "@/components/Login";
import { Button, Flex, Stack } from "@chakra-ui/react";

import router from "next/router";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/beerList", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if (response.status !== 200) {
        router.push("/beerList");
      } else {
        console.error(data.errors);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <Flex
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-r, teal.500, green.500)"
    >
      <Flex
        as="form"
        width="100%"
        maxW={360}
        bgGradient="linear(to-r, green.600, teal.800)"
        padding="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleLogin}
      >
        <Stack spacing="4">
          <Input
            name="email"
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            name="password"
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Stack>

        <Button type="submit" marginTop={6} colorScheme="blackAlpha" size="lg">
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
