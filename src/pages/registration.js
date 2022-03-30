import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

// Replace test data with your own
const features = [
  {
    title: "Open characters",
    text: "Open all 2-80 characters at the same time. to prevent fraud, MetaName only supports characters a to z, digits 0 through 9, hyphen (-)."
  },
  {
    title: "Reserved characters",
    text: "Only characters within 2 digits and some 3-digit characters are reserved for use by important business ecosystem partners and non-profit organizations."
  },
  {
    title: "Registration fee",
    text: "Only need to pay less than 0.1 USD for network gas, registering MetaName is free。MNS belongs to the main network infrastructure of Polygon. Gas fees are paid through matic tokens. "
  },
  {
    title: "Transactions",
    text: "Each name registration only requires the user to submit one transaction. After the registration is completed, you are the owner of the MetaName."
  },

  {
    title: "Registration time",
    text: "Registration does not need to wait, usually completed within one minute."
  },

  {
    title: "Renewal time",
    text: "Renew is required once a year, and the price of renew will not exceed US$2/year. "
  }
];

export default function GridListWithHeading() {
  return (
    <Box p={4} my={20}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={"3xl"}>Registration Rules</Heading>
        <Text color={"gray.600"} fontSize={"xl"}>
          Accepted characters and combinations
        </Text>
      </Stack>

      <Container maxW={"6xl"} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {features.map((feature, id) => (
            <HStack key={id} align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={"gray.600"}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
