import {
  chakra,
  VisuallyHidden,
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

const SocialButton = (
  { children, label, href } /*: {
  children: ReactNode,
  label: string,
  href: string
}*/
) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200")
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Social() {
  return (
    <Stack direction={"row"} spacing={6}>
      <SocialButton
        label={"Twitter"}
        href={"https://twitter.com/metaname_world"}
      >
        <FaTwitter />
      </SocialButton>
      <SocialButton label={"Discord"} href={"https://discord.gg/e72ayWkP2e"}>
        <FaDiscord />
      </SocialButton>
      <SocialButton
        label={"GitHub"}
        href={"https://github.com/metaname-world/mns"}
      >
        <FaGithub />
      </SocialButton>
    </Stack>
  );
}
