import { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  useColorModeValue,
  Tooltip,
  Input,
  InputGroup,
  InputRightAddon,
  InputLeftElement

  // IconProps
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import Bg from "../assets/Patterns/pattern-002.svg";

export default function CallToActionWithIllustration() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const handleChange = e => {
    setError("");
    setName(e.target.value);
  };

  const handleSubmit = () => {
    if (name && CheckIsValidName(name)) {
      const path = `/names/${encodeURIComponent(name)}`;
      router.push(path);
    } else {
      setError(
        "Invalid name, the name characters must be a to z, digits 0 through 9, hyphen (-), have a minimum of 3 and a maximum of 80 characters."
      );
    }
  };

  return (
    <Flex
      bg={useColorModeValue("gray.200", "gray.900")}
      bgImage={`url('${Bg.src}')`}
      bgPosition="center bottom"
      bgRepeat="repeat-x"
      minH="90vh"
      alignItems="center"
    >
      <Container maxW={"5xl"}>
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={700}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Your Metaverse{" "}
            <Text as={"span"} color={"green.400"}>
              Unique Name
            </Text>
          </Heading>
          <Text color={"gray.400"} maxW={"3xl"} fontSize="xl">
            Your Web3.0 identity for all your crypto accounts to receive NFTs
            and crypto acrossing all Dapps and the Metaverse
          </Text>
          <Stack spacing={6} direction={"row"}>
            <Tooltip
              hasArrow
              label={error}
              placement="top"
              bg="yellow.600"
              isOpen={error !== ""}
            >
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FiSearch color="gray.300" />}
                />
                <Input
                  rounded={"full"}
                  type="text"
                  placeholder="Find your name"
                  value={name}
                  border={2}
                  borderStyle={"solid"}
                  borderColor={useColorModeValue("gray.600", "gray.500")}
                  onChange={handleChange}
                />
                <InputRightAddon
                  rounded={"full"}
                  border={2}
                  borderStyle={"solid"}
                  borderColor={useColorModeValue("gray.600", "gray.500")}
                  children=".meta"
                />
              </InputGroup>
            </Tooltip>

            <Button
              rounded={"full"}
              px={10}
              colorScheme={"green"}
              bg={"green.400"}
              _hover={{ bg: "green.500" }}
              onClick={handleSubmit}
            >
              Get it free
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  );
}

function CheckIsValidName(name) {
  return /^[a-z][a-z0-9-]{2,79}$/.test(name);
}
