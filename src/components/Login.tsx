import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { showErrorToast } from "./ErrorMessage";

interface CheckUserCredentialsProps {
  email: string;
  password: string;
}

function checkUserCredentials(credentials: CheckUserCredentialsProps): boolean {
  return (
    credentials.email === "user@email.com" &&
    credentials.password === "senha123"
  );
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = () => {
    const isValidUser = checkUserCredentials({ email, password });
    if (isValidUser) {
      router.push("/beers");
    } else {
      showErrorToast(
        "Usuário ou senha inválidos. Por favor, verifique seus dados ou cadastre-se."
      );
      setError("Usuário ou senha inválidos");
    }
  };

  const handleSignup = () => {
    router.push("/users/create");
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
        bgGradient="linear(to-r, green.600, teal.800)"
        p="8"
        rounded="md"
        maxW="md"
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
        <Button colorScheme="teal" size="lg" onClick={handleLogin}>
          Entrar
        </Button>
        {error && (
          <Text mt={2} textAlign="center" color="gray.600">
            <Button
              colorScheme="teal"
              size="lg"
              onClick={handleSignup}
              variant="outline"
            >
              Cadastrar
            </Button>
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default Login;
