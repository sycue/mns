import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import { BiListPlus } from "react-icons/bi";
import { useRenew } from "../../hooks/useName";

export default function RenewButton({ data, setData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state, submit } = useRenew(data.tokenId, () => {
    onClose();
  });

  return (
    <>
      <Button
        mr={3}
        leftIcon={<BiListPlus />}
        colorScheme="blue"
        onClick={onOpen}
        disabled={state === "loading"}
      >
        Renew
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Renew</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure want to renew this name?</ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              disabled={state === "loading"}
              onClick={submit}
              colorScheme="blue"
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
