import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  VStack
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { Input } from "../../components/Input";

type CreateUserFormData = {
  name: string;
  email: string;

  password: string;
  password_confirmation?: string;
};

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
}

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

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
    router.push("/login");
  };

  return (
    <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
      <Box
        flex="1"
        borderRadius={8}
        bg="teal.100"
        p={["6", "8"]}
        as="form"
        onSubmit={handleSubmit(handleCreateUser)}
      >
        <Heading size="lg" fontWeight="normal">
          Criar usuário
        </Heading>

        <Divider my="6" borderColor="gray.700" />

        <VStack spacing="8">
          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
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
          </SimpleGrid>

          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
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
          </SimpleGrid>
        </VStack>

        <Flex mt="8" justify="flex-end">
          <Button
            as={Button}
            type="submit"
            colorScheme="pink"
            isLoading={formState.isSubmitting}
          >
            Salvar
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
