import { Input } from "@/components/Login";
import { Button, Flex, Stack } from "@chakra-ui/react";

const LoginPage = () => {
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
      >
        <Stack spacing="4">
          <Input name="email" label="E-mail" />
          <Input name="password" label="Senha" />
        </Stack>

        <Button type="submit" marginTop={6} colorScheme="blackAlpha" size="lg">
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
