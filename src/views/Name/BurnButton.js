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
import { BiX } from "react-icons/bi";
import { useBurn } from "../../hooks/useName";

export default function BurnButton({ data, setData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state, submit } = useBurn(data.tokenId, () => {
    onClose();
  });

  return (
    <>
      <Button
        leftIcon={<BiX />}
        colorScheme="red"
        onClick={onOpen}
        disabled={state === "loading"}
        mr={3}
      >
        Burn
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Burn</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure want to burn this name?</ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              disabled={state === "loading"}
              onClick={submit}
              colorScheme="red"
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
