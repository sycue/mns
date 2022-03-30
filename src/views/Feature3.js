import React from "react";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  Icon,
  Stack
} from "@chakra-ui/react";
import Logo from "../components/Logo2";
import {
  MdOutlineSocialDistance,
  MdAccountBalanceWallet,
  MdWebStories
} from "react-icons/md";
import { BsBadgeVrFill } from "react-icons/bs";

export default function C2g() {
  const Feature = props => {
    return (
      <Flex>
        <Flex shrink={0}>
          <Flex
            alignItems="center"
            justifyContent="center"
            h={12}
            w={12}
            rounded="md"
            bg={useColorModeValue("brand.500")}
            color="white"
          >
            <Icon boxSize={6} as={props.icon} />

            {/*
            <Icon
              boxSize={6}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {props.icon}
            </Icon>
            */}
          </Flex>
        </Flex>
        <Box ml={4}>
          <chakra.dt
            fontSize="lg"
            fontWeight="medium"
            lineHeight="6"
            color={useColorModeValue("gray.900")}
          >
            {props.title}
          </chakra.dt>
          <chakra.dd mt={2} color={useColorModeValue("gray.500", "gray.400")}>
            {props.children}
          </chakra.dd>
        </Box>
      </Flex>
    );
  };

  return (
    <Flex
      bg={useColorModeValue("gray.50", "gray.800")}
      p={{ base: 5, lg: 10 }}
      mt={{ base: 5, lg: 10 }}
      w="auto"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bg={useColorModeValue("white", "gray.900")}
        rounded="xl"
        p={{ base: 5, lg: 20 }}
      >
        <Box maxW="7xl" mx="auto" px={{ base: 4, lg: 8 }}>
          <Flex pt={10} w="auto" justifyContent="center" alignItems="center">
            <Logo height={80} />
          </Flex>

          <Box textAlign={"center"} mt={5}>
            {/*
            <chakra.h2
              mt={3}
              color={useColorModeValue("brand.600")}
              fontWeight="semibold"
              letterSpacing="wide"
            >
              MetaName
            </chakra.h2>
            */}
            <chakra.p
              mt={2}
              fontSize={{ base: "3xl", sm: "4xl" }}
              lineHeight="8"
              fontWeight="extrabold"
              letterSpacing="tight"
              color={useColorModeValue("gray.900")}
            >
              Your Metaverse Identity
            </chakra.p>
            <chakra.p
              mt={4}
              maxW="2xl"
              fontSize="xl"
              mx={{ lg: "auto" }}
              color={useColorModeValue("gray.500", "gray.400")}
            >
              MetaName help to bridge the gap between identity and Metaverse.
            </chakra.p>
          </Box>

          <Box mt={20}>
            <Stack
              spacing={{ base: 10, md: 0 }}
              display={{ md: "grid" }}
              gridTemplateColumns={{ md: "repeat(2,1fr)" }}
              gridColumnGap={{ md: 8 }}
              gridRowGap={{ md: 10 }}
            >
              <Feature
                title="Hold and control your social network ID"
                icon={MdOutlineSocialDistance}
              >
                Register your social network ID as a NFT that you can always
                control. You will also get a unique name that can be used on
                social media, leaving a lasting influence.
              </Feature>

              <Feature
                title="Cryptocurrencies address"
                icon={MdAccountBalanceWallet}
              >
                A cryptocurrency address that is easy to record and identify.
              </Feature>

              <Feature title="Web3 unique user name" icon={MdWebStories}>
                You can use MetaName as the username to log in to the web3
                website without worrying about losing control of it.
              </Feature>

              <Feature title="Entrance to Metaverse" icon={BsBadgeVrFill}>
                Every space, celebrity, virtual character, and NFT worth
                collecting in the metaverse deserves to have a MetaName so that
                people can find and remember it easily.
              </Feature>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
