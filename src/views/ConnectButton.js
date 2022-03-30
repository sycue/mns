import NextLink from "next/link";
import {
  Box,
  Portal,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useConnect, CONNECTED_TEXT } from "../hooks/useName";
import { addressSummary } from "../utils/account";
import ClientOnly from "../components/ClientOnly";

export default function ConnectButton() {
  return (
    process.browser && (
      <ClientOnly>
        <Box display={{ base: "none", lg: "block" }}>
          <ConnectView />
        </Box>
      </ClientOnly>
    )
  );
}

function ConnectView() {
  const { accounts, isDisabled, buttonText, onClick } = useConnect();
  return buttonText === CONNECTED_TEXT ? (
    <ConnectMenu accounts={accounts} />
  ) : (
    <Button
      disabled={isDisabled}
      onClick={onClick}
      fontSize={"sm"}
      fontWeight={600}
      rounded={"full"}
      px={6}
      colorScheme={"green"}
      bg={"green.400"}
      _hover={{ bg: "green.500" }}
    >
      {buttonText}
    </Button>
  );
}

function ConnectMenu({ accounts }) {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {CONNECTED_TEXT}
      </MenuButton>
      <Portal>
        <MenuList>
          {accounts.map(acc => (
            <MenuItem key={acc}>{addressSummary(acc)}</MenuItem>
          ))}
          <MenuDivider />
          <NextLink href="/names/owned" passHref>
            <MenuItem as={"a"}>My Names</MenuItem>
          </NextLink>
        </MenuList>
      </Portal>
    </Menu>
  );
}
