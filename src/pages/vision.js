import {
  Box,
  Heading,
  Text,
  Flex,
  SimpleGrid,
  useColorModeValue
} from "@chakra-ui/react";
import Image4 from "../assets/FlatWeb/FlatWeb14";

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
              Our Vision
            </Heading>

            <P>
              In the real world, identity is with you. You were born with it.
              Your identity will never change in your life. Your passport is
              your identification method. Without it... You'll be lost!
            </P>

            <P>
              In the metaverse, your mind, body, and identity are three separate
              entities. You can actively choose all of them. You can choose who
              you want to be and how you want to look.
            </P>

            <P>
              The metaverse doesn't bestow your identity upon you. Only
              nation-states do! The metaverse is utterly neutral because you can
              choose your own identity.
            </P>

            <P>You choose who you are and who you want to become!</P>

            <P>
              In the metaverse, you can buy individual MetaName(MNS)
              representing yourself. You can choose between millions of web3
              names to embody yourself on the internet… in the metaverse.
            </P>

            <P>
              If you have access and control over your web3 wallet, you control
              your identity. You can buy and choose any web3 name on the open
              market.
            </P>

            <P>
              This name is exchangeable and transferable across all metaverses.
            </P>

            <P>And you can actively choose them, buy them, and trade them.</P>

            <P>
              Your identity suddenly is a transferable and exchangeable entity.
            </P>

            <P>It's something you can choose; you make your own decision!</P>
          </Box>
          <Box>
            <Image4 />
          </Box>
        </SimpleGrid>
      </Box>
    </Flex>
  );
}
