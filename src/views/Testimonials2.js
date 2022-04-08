import { Avatar, Box, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { FcManager } from "react-icons/fc";

export default function WithLargeQuote() {
  return (
    <Stack
      bg={useColorModeValue("gray.50", "gray.800")}
      py={20}
      px={8}
      spacing={{ base: 8, md: 10 }}
      align={"center"}
      direction={"column"}
    >
      <Text
        fontSize={{ base: "xl", md: "2xl" }}
        textAlign={"center"}
        maxW={"3xl"}
      >
        The MetaName Service (MNS) is the entrance to the Metaverse. like
        company has a "domain", "email" or "phone number", Having a cool name is
        a symbol of one's own identity, and also a symbol of one's personal or
        company brand.
      </Text>
      <Box textAlign={"center"}>
        <Avatar mb={2} icon={<FcManager fontSize="2rem" />} bg="green.500" />
        <Text fontWeight={600}>Marco Dapper</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.400", "gray.400")}>
          MetaName President
        </Text>
      </Box>
    </Stack>
  );
}
