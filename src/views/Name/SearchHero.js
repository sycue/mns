import { useState } from "react";
import { useRouter } from "next/router";
import {
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  useColorModeValue
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
// import bg from "assets/hero-bg.svg";

export default function SearchHero() {
  const [name, setName] = useState("");
  const router = useRouter();

  return (
    <Box>
      <Stack
        as={Container}
        maxW={"3xl"}
        textAlign={"center"}
        spacing={{ base: 8, md: 12 }}
        py={{ base: 12, md: 24 }}
      >
        <Heading
          fontWeight={900}
          fontSize={{ base: "2xl", sm: "3xl", md: "5xl" }}
          lineHeight={"110%"}
        >
          Your Metaverse Unique Name
        </Heading>
        <Text
          color={useColorModeValue("gray.800", "gray.200")}
          fontWeight="500"
          fontSize="xl"
        >
          Monetize your content by charging your most loyal readers and reward
          them loyalty points. Give back to your loyal readers by granting them
          access to your pre-releases and sneak-peaks.
        </Text>
        <Stack
          direction={"row"}
          spacing={3}
          align={"center"}
          alignSelf={"center"}
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
              border={3}
              borderStyle={"solid"}
              borderColor={useColorModeValue("gray.800", "gray.200")}
              onChange={e => setName(e.target.value)}
            />
          </InputGroup>
          <Button
            colorScheme={"blue"}
            bg={useColorModeValue("gray.800", "gray.300")}
            rounded={"full"}
            px={8}
            onClick={() => {
              if (name) {
                const path = `/names/${encodeURIComponent(name)}`;
                router.push(path);
              }
            }}
          >
            Go
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
