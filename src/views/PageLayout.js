import Head from "next/head";
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";

export default function PageLayout({ headTitle, pageTitle, children }) {
  return (
    <>
      <Head>
        <title>{headTitle} | MetaName</title>
      </Head>
      <Box bg={useColorModeValue("#F9FAFB", "gray.700")} p={5} w="full">
        <Box
          bg={useColorModeValue("white", "gray.800")}
          rounded="xl"
          px={10}
          py={10}
          maxW="7xl"
          mx="auto"
        >
          <Heading
            mb={4}
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight={700}
            textAlign={{ base: "center", md: "left" }}
            color={useColorModeValue("gray.900", "gray.400")}
          >
            {pageTitle}
          </Heading>
          <Box
            mb={5}
            textAlign={{ base: "center", sm: "left" }}
            color={useColorModeValue("gray.600", "gray.400")}
            fontSize={{ md: "lg" }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
}
