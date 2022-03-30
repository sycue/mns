import React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Flex,
  SimpleGrid,
  useColorModeValue
} from "@chakra-ui/react";
import Image4 from "../assets/FlatWeb/FlatWeb12";
import Image5 from "../assets/FlatWeb/FlatWeb14";

export default function Asm() {
  return (
    <Flex
      bg={useColorModeValue("#F9FAFB", "gray.700")}
      p={{ base: 5, lg: 20 }}
      w="full"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bg={useColorModeValue("white", "gray.800")}
        rounded="xl"
        p={{ base: 5, lg: 20 }}
        maxW="7xl"
        mx="auto"
      >
        <SimpleGrid
          alignItems="start"
          columns={{ base: 1, md: 2 }}
          mb={24}
          spacingY={{ base: 10, md: 32 }}
          spacingX={{ base: 10, md: 24 }}
        >
          <Box>
            <Heading
              mb={4}
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight={700}
              textAlign={{ base: "center", md: "left" }}
              color={useColorModeValue("gray.900", "gray.400")}
            >
              Clear overview for efficient tracking
            </Heading>
            <Text
              mb={5}
              textAlign={{ base: "center", sm: "left" }}
              color={useColorModeValue("gray.600", "gray.400")}
              fontSize={{ md: "lg" }}
            >
              Handle your subscriptions and transactions efficiently with the
              clear overview in Dashboard. Features like the smart search option
              allow you to quickly find any data you’re looking for.
            </Text>
            <Button
              w={{ base: "full", sm: "auto" }}
              size="lg"
              bg={useColorModeValue("gray.900", "gray.700")}
              _hover={{ bg: useColorModeValue("gray.700", "gray.600") }}
              color={useColorModeValue("gray.100", "gray.200")}
              as="a"
            >
              Learn More
            </Button>
          </Box>
          <Box>
            <Image4 />
          </Box>
        </SimpleGrid>
        <SimpleGrid
          alignItems="center"
          columns={{ base: 1, md: 2 }}
          flexDirection="column-reverse"
          mb={24}
          spacingY={{ base: 10, md: 32 }}
          spacingX={{ base: 10, md: 24 }}
        >
          <Box order={{ base: "none", md: 2 }}>
            <Heading
              mb={4}
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="extrabold"
              letterSpacing="tight"
              textAlign={{ base: "center", md: "left" }}
              color={useColorModeValue("gray.900", "gray.400")}
              lineHeight={{ md: "shorter" }}
            >
              Decide how you integrate Payments
            </Heading>
            <Text
              mb={5}
              textAlign={{ base: "center", sm: "left" }}
              color={useColorModeValue("gray.600", "gray.400")}
              fontSize={{ md: "lg" }}
            >
              Love to code? Next to our ready-made and free plugins you can use
              our expansive yet simple API; decide how you integrate Payments
              and build advanced and reliable products yourself from scratch.
            </Text>
            <Button
              w={{ base: "full", sm: "auto" }}
              size="lg"
              bg={useColorModeValue("gray.900", "gray.700")}
              _hover={{ bg: useColorModeValue("gray.700", "gray.600") }}
              color={useColorModeValue("gray.100", "gray.200")}
              as="a"
            >
              Learn More
            </Button>
          </Box>
          <Box>
            <Image5 />
          </Box>
        </SimpleGrid>
      </Box>
    </Flex>
  );
}
