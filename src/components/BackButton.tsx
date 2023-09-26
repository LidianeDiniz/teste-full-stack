import { Button } from "@chakra-ui/react";
import Link from "next/link";

const BackButton = () => {
  return (
    <Link href="/">
      <Button colorScheme="teal" mt={4}>
        Voltar
      </Button>
    </Link>
  );
};

export default BackButton;
