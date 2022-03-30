import { ReactElement } from "react";
import {
  useColorModeValue,
  Box,
  Container,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex
} from "@chakra-ui/react";
import { FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";

/*
interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}
*/

const Feature = ({ title, text, icon } /*: FeatureProps*/) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"gray.800"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

export default function SimpleThreeColumns() {
  return (
    <Box bg={useColorModeValue("gray.50", "gray.800")} my={{ base: 3, lg: 5 }}>
      <Container as={Stack} maxW={"6xl"} py={10}>
        <Box p={4}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Feature
              icon={<Icon as={FaDiscord} w={10} h={10} />}
              title={"Discord"}
              text={"Join our Discord community"}
            />
            <Feature
              icon={<Icon as={FaTwitter} w={10} h={10} />}
              title={"Twitter"}
              text={"Follow us on Twitter"}
            />
            <Feature
              icon={<Icon as={FaGithub} w={10} h={10} />}
              title={"GitHub"}
              text={"Get source code from GitHub"}
            />
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
}
