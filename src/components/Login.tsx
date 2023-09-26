import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text
} from "@chakra-ui/react";
import { Model, createServer } from "miragejs";
import { useRouter } from "next/router";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { showErrorToast } from "./ErrorMessage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const server = createServer({
        models: {
          user: Model
        }
      });

      server.db.loadData({
        users: [
          {
            name: "User 1",
            email: "user@email.com",
            password: "senha123"
          }
        ]
      });

      const user = server.db.users.findBy({ email });

      const storedUserString = localStorage.getItem("user");
      const storedUser = storedUserString ? JSON.parse(storedUserString) : null;

      if (user && user.password === password) {
        router.push("/beers");
      } else if (
        storedUser &&
        storedUser.email === email &&
        storedUser.password === password
      ) {
        router.push("/beers");
      } else {
        showErrorToast(
          "Usuário ou senha inválidos. Por favor, verifique seus dados ou cadastre-se."
        );
        setError("Usuário ou senha inválidos");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      showErrorToast("Erro ao fazer login");
      setError("Erro ao fazer login");
    }
  };

  const handleSignup = () => {
    router.push("/users/create");
  };

  const handleBack = () => {
    return router.push("/");
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bgGradient="linear(to-r, teal.500, green.500)"
    >
      <Flex
        as="form"
        flexDir="column"
        bg="white"
        p="8"
        rounded="md"
        maxW="md"
        boxShadow="lg"
      >
        <Stack spacing="4">
          <FormControl>
            <FormLabel>E-mail</FormLabel>
            <Input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
        </Stack>
        <Button colorScheme="teal" size="lg" onClick={handleLogin} mt={4}>
          Entrar
        </Button>

        {error && (
          <Text mt={2} textAlign="center" color="gray.600">
            <Flex flexDirection="column">
              <Button
                colorScheme="teal"
                size="lg"
                onClick={handleSignup}
                variant="link"
              >
                Cadastrar
              </Button>

              <Button
                colorScheme="teal"
                size="lg"
                onClick={handleBack}
                variant="link"
              >
                Voltar
              </Button>
            </Flex>
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default Login;
