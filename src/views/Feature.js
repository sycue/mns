import {
  Stack,
  Box,
  Flex,
  Text,
  Heading,
  SimpleGrid,
  useColorModeValue
} from "@chakra-ui/react";
// import { CONFETTI_LIGHT, CONFETTI_DARK } from "./HeroBg";

/*
      position={"relative"}
      backgroundImage={useColorModeValue(CONFETTI_LIGHT, CONFETTI_DARK)}
      backgroundAttachment="fixed"
      bg={"gray.800"}
*/
export default function StatsGridWithImage() {
  return (
    <Box p={{ base: 5, lg: 20 }}>
      <Box maxW="7xl" mx="auto" px={{ base: 4, lg: 8 }}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Stack
            flex={1}
            color={"gray.500"}
            justify={{ lg: "center" }}
            py={{ base: 4, md: 10, xl: 20 }}
          >
            <Box mb={{ base: 8, md: 20 }}>
              <Text
                fontFamily={"heading"}
                fontWeight={700}
                textTransform={"uppercase"}
                mb={3}
                fontSize={"xl"}
                color={"gray.500"}
              >
                Technology
              </Text>
              <Heading mb={5} fontSize={{ base: "3xl", md: "5xl" }}>
                21st century agriculture
              </Heading>
              <Text fontSize={"xl"} color={"gray.400"}>
                The NewLife™ technology allows you to monitor your crops and get
                complete insights at real time. The proprietary
                software/hardware ecosystem prevents your plants from getting
                neglected.
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {stats.map(stat => (
                <Box key={stat.title}>
                  <Text fontFamily={"heading"} fontSize={"3xl"} mb={3}>
                    {stat.title}
                  </Text>
                  <Text fontSize={"xl"} color={"gray.400"}>
                    {stat.content}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

const StatsText = ({ children }) => (
  <Text as={"span"} fontWeight={700}>
    {children}
  </Text>
);

const stats = [
  {
    title: "10+",
    content: (
      <>
        <StatsText>Software modules</StatsText> for detailed monitoring and
        real-time analytics
      </>
    )
  },
  {
    title: "24/7",
    content: (
      <>
        <StatsText>Analytics</StatsText> enabled right in your dashboard without
        history limitations
      </>
    )
  },
  {
    title: "13%",
    content: (
      <>
        <StatsText>Farms</StatsText> in North America has chosen NewLife™ as
        their management solution
      </>
    )
  },
  {
    title: "250M+",
    content: (
      <>
        <StatsText>Plants</StatsText> currently connected and monitored by the
        NewLife™ software
      </>
    )
  }
];
