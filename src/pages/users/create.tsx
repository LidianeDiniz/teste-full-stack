import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
  VStack
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { Input } from "../../components/Input";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
};

const CreateUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "No mínimo 6 caracteres"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas precisam ser iguais")
});

export default function CreateUser() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(CreateUserFormSchema)
  });

  const { errors } = formState;
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);

    localStorage.setItem("user", JSON.stringify(values));
    setIsSuccess(true);
  };
  const handleGoToLogin = () => {
    router.push("/login");
  };

  return (
    <Flex
      width="100%"
      minH="100vh"
      align="center"
      justify="center"
      bg="teal.50"
    >
      <Box
        flex="1"
        borderRadius={8}
        bg="white"
        p={["4", "6"]}
        as="form"
        onSubmit={handleSubmit(handleCreateUser)}
        maxW="md"
        boxShadow="md"
      >
        <Heading size="lg" fontWeight="normal" textAlign="center">
          Criar usuário
        </Heading>

        {isSuccess ? (
          <VStack spacing="4">
            <Text color="green.500" textAlign="center">
              Usuário criado com sucesso!
            </Text>
            <Button colorScheme="teal" onClick={handleGoToLogin} width="100%">
              Ir para Login
            </Button>
          </VStack>
        ) : (
          <>
            <Divider my="6" borderColor="gray.200" />

            <VStack spacing="4">
              <Input
                type="name"
                label="Nome completo"
                error={errors.name}
                {...register("name")}
              />
              <Input
                type="email"
                label="E-mail"
                error={errors.email}
                {...register("email")}
              />
              <Input
                label="Senha"
                type="password"
                error={errors.password}
                {...register("password")}
              />
              <Input
                label="Confirmação de senha"
                type="password"
                error={errors.password_confirmation}
                {...register("password_confirmation")}
              />
            </VStack>

            <Button
              mt="6"
              type="submit"
              colorScheme="teal"
              isLoading={formState.isSubmitting}
              width="100%"
            >
              Salvar
            </Button>
          </>
        )}
      </Box>
    </Flex>
  );
}
