import { useRouter } from "next/router";
import {
  Container,
  Box,
  Button,
  Divider,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

const options = [
  { id: 1, desc: "1 lorem ipsum" },
  { id: 2, desc: "Lorem, ipsum dolor." },
  { id: 3, desc: "Monthly Updates" }
];
/*
interface PackageTierProps {
  title: string;
  options: Array<{ id: number, desc: string }>;
  typePlan: string;
  checked?: boolean;
}
*/
const PackageTier = (
  { title, options, typePlan, checked = false } /*: PackageTierProps*/
) => {
  const router = useRouter();
  const colorTextLight = checked ? "white" : "green.600";
  const bgColorLight = checked ? "green.400" : "gray.300";

  const colorTextDark = checked ? "white" : "green.500";
  const bgColorDark = checked ? "green.400" : "gray.300";

  return (
    <Stack
      p={3}
      py={3}
      justifyContent={{ base: "flex-start", md: "space-around" }}
      direction={{ base: "column", md: "row" }}
      alignItems={{ md: "center" }}
    >
      <Heading size={"md"}>{title}</Heading>
      {/*
      <List spacing={3} textAlign="start">
        {options.map((desc, id) => (
          <ListItem key={desc.id}>
            <ListIcon as={FaCheckCircle} color="green.500" />
            {desc.desc}
          </ListItem>
        ))}
      </List>
      */}
      <Heading size={"xl"}>{typePlan}</Heading>
      <Stack>
        <Button
          size="md"
          color={useColorModeValue(colorTextLight, colorTextDark)}
          bgColor={useColorModeValue(bgColorLight, bgColorDark)}
          onClick={() => {
            router.push("/");
          }}
        >
          Get Started
        </Button>
      </Stack>
    </Stack>
  );
};

const ThreeTierPricingHorizontal = () => {
  return (
    <Container maxW={"6xl"} my={10}>
      <Box py={6} px={5} min={"100vh"}>
        <Stack spacing={4} width={"100%"} direction={"column"}>
          <Stack
            p={5}
            alignItems={"center"}
            justifyContent={{ base: "flex-start", md: "space-around" }}
            direction={{ base: "column", md: "row" }}
          >
            <Stack width={{ base: "100%", md: "40%" }} textAlign={"center"}>
              <Heading size={"lg"}>
                Pricing for <Text color="green.400">Your Name</Text>
              </Heading>
            </Stack>
            <Stack width={{ base: "100%", md: "60%" }}>
              <Text textAlign={"right"}>
                MetaName registration is free. In order to ensure the fairness
                of the community, we do not encourage but do not limit users to
                register multiple names. We recommend that you transfer it to
                community users who really need it at a reasonable price, so as
                to maximize the value of the MetaName community.
              </Text>
            </Stack>
          </Stack>

          <Divider />
          <PackageTier title={"Registration"} typePlan="Free" />
          <Divider />
          <PackageTier title={"Renew"} checked={true} typePlan="Free" />
          <Divider />
          <PackageTier title={"Transfer"} typePlan="Free" />
        </Stack>
      </Box>
    </Container>
  );
};

export default ThreeTierPricingHorizontal;
