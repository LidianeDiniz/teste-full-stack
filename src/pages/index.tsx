import { Button, Flex, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Login";

type SignInFormData = {
  email: string;
  password: string;
};

export default function SingnIn() {
  const { register, handleSubmit, formState } = useForm<SignInFormData>();

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
  };

  const { errors } = formState;
  console.log(errors);
  return (
    <Flex
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent="center"
      bgColor="red.600"
    >
      <Flex
        as="form"
        width="100%"
        maxW={360}
        bg="gray.800"
        padding="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input name="email" label="E-mail" error={errors.email} />
          <Input name="password" label="Senha" />
        </Stack>

        <Button
          type="submit"
          marginTop={6}
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
