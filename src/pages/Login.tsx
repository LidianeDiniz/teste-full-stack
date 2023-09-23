// pages/login.tsx
import { Button, Flex, Input, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    router.push("/beerList");
  };

  return (
    <Flex
      h="100vh"
      alignItems="center"
      justifyContent="center"
      bgColor="teal.500"
    >
      <VStack
        spacing={4}
        bgColor="white"
        p={8}
        borderRadius="md"
        boxShadow="md"
        w={{ base: "90%", sm: "80%", md: "50%" }}
      >
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleLogin} w="100%" size="lg">
          Entrar
        </Button>
      </VStack>
    </Flex>
  );
};

export default LoginPage;
