import {
  Button,
  Input,
  FormControl,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import { useForm, useFormState } from "react-hook-form";
import { BiTransfer } from "react-icons/bi";
import { useTransfer } from "../../hooks/useName";
import FormError from "../../components/FormError";

export default function TransferButton({ data, setData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, control } = useForm();
  const { errors } = useFormState({ control });
  const { state, submit } = useTransfer(data.tokenId, _data => {
    setData({ ...data, owner: _data.owner });
    onClose();
  });

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<BiTransfer />}
        colorScheme="yellow"
        mr={3}
      >
        Transfer
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(submit)}>
            <ModalHeader>Transfer to</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="owner">
                <Input
                  {...register("owner", { required: "To address required" })}
                  placeholder="Input transfer to address"
                />
                <FormError error={errors.owner} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                disabled={state === "loading"}
                type="submit"
                colorScheme="blue"
              >
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
