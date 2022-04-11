import NextLink from "next/link";
import {
  Flex,
  Box,
  Container,
  Link as ChakraLink,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import Logo from "../components/Logo2";
import Social from "./Social";

const Link = ({ href, children }) => (
  <NextLink href={href} passHref>
    <ChakraLink>{children}</ChakraLink>
  </NextLink>
);

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function LargeWithLogoLeft() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 1fr 1fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Flex alignItems="center">
              <Logo
                height={28}
                color={useColorModeValue("gray.700", "white")}
              />
              <Text
                ml={2}
                fontFamily={"heading"}
                fontWeight={"bold"}
                fontSize="xl"
                color={useColorModeValue("gray.800", "white")}
              >
                MetaName
              </Text>
            </Flex>
            <Text fontSize={"sm"}>
              © 2022 MetaName World. All rights reserved
            </Text>
            <Social />
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Product</ListHeader>
            <Link href={"/"}>Overview</Link>
            <Link href={"/"}>Features</Link>
            <Link href={"/registration"}>Registration</Link>
            <Link href={"/pricing"}>Pricing</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>About</ListHeader>
            <Link href={"/about"}>About MetaName</Link>
            <Link href={"/vision"}>Our Vision</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Follow Us</ListHeader>
            <ChakraLink
              target="_blank"
              href={"https://twitter.com/metaname_world"}
            >
              Twitter
            </ChakraLink>
            <ChakraLink target="_blank" href={"https://discord.gg/e72ayWkP2e"}>
              Discord
            </ChakraLink>
            <ChakraLink
              target="_blank"
              href={"https://github.com/metaname-world/mns"}
            >
              GitHub
            </ChakraLink>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
