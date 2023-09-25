import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton
} from "@chakra-ui/react";

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <Box mt={4}>
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        borderRadius="md"
      >
        <AlertIcon boxSize="20px" mr={0} />
        <AlertTitle mt={1} mb={1} fontSize="lg">
          Erro
        </AlertTitle>
        <AlertDescription maxWidth="">{message}</AlertDescription>
        <CloseButton
          position="absolute"
          right="8px"
          top="8px"
          onClick={onClose}
        />
      </Alert>
    </Box>
  );
};

export default ErrorMessage;

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    pauseOnHover: true,
    draggable: true
  });
};
