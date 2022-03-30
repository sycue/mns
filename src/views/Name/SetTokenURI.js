import {
  Button,
  IconButton,
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
import { BiWrench } from "react-icons/bi";
import FormError from "../../components/FormError";
import { useSetTokenURI } from "../../hooks/useName";

export default function SetTokenURI({ data, setData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, control } = useForm();
  const { errors } = useFormState({ control });
  const { state, submit } = useSetTokenURI(data.tokenId, _data => {
    setData({ ...data, tokenURI: _data.tokenURI });
    onClose();
  });

  return (
    <>
      <IconButton
        icon={<BiWrench />}
        colorScheme="blue"
        size="xs"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(submit)}>
            <ModalHeader>Set Token URI</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="tokenURI">
                <Input
                  defaultValue={data.tokenURI}
                  {...register("tokenURI", { required: "Token URI required" })}
                  placeholder="Input your token URI"
                />
                <FormError error={errors.tokenURI} />
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
