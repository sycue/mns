import {
  Box,
  Heading,
  Text,
  Flex,
  SimpleGrid,
  useColorModeValue
} from "@chakra-ui/react";
import Image4 from "../assets/FlatWeb/FlatWeb12";

export default function Asm() {
  const P = ({ children }) => (
    <Text
      mb={5}
      textAlign={{ base: "center", sm: "left" }}
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize={{ md: "lg" }}
    >
      {children}
    </Text>
  );

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
              About MetaName
            </Heading>
            <P>
              The MetaName Service (MNS) is the entrance to the Metaverse. like
              company has a "domain", "email" or "phone number", Having a cool
              name is a symbol of one's own identity, and also a symbol of one's
              personal or company brand.
            </P>

            <P>
              The main task of MNS is to establish the unique mapping between
              characters and other data of people in the virtual world, and
              people can control it themselves . For example, they can map the
              "Averie.meta" with the cryptocurrency address that is difficult to
              remember, and the users only need to enter "Averie.meta" to send
              money. They can also set links to e-mails, social accounts or
              other data.
            </P>

            <P>
              MNS is base on Polygon protocol which is building and connecting
              Ethereum-compatible blockchain networks. So, MNS is able to fully
              benefit from Ethereum’s network effects, The advantage is users
              can create there own names at a low cost "zero gas".
            </P>

            <P>
              MNS is built to enable a future where MetaName are as widespread
              and easy to use as domain and email address today.
            </P>
          </Box>
          <Box>
            <Image4 />
          </Box>
        </SimpleGrid>
      </Box>
    </Flex>
  );
}
