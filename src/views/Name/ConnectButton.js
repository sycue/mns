import {
  Portal,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { useConnect, CONNECTED_TEXT } from "hooks/useName";
import { addressSummary } from "utils/account";

export default function ConnectButton() {
  const { accounts, isDisabled, buttonText, onClick } = useConnect();
  return buttonText === CONNECTED_TEXT ? (
    <ConnectMenu accounts={accounts} />
  ) : (
    <Button
      disabled={isDisabled}
      onClick={onClick}
      display={{ base: "none", md: "inline-flex" }}
      fontSize={"sm"}
      fontWeight={600}
      color={"white"}
      bg={"blue.500"}
      _hover={{
        bg: "blue.300",
      }}
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
          {accounts.map((acc) => (
            <MenuItem key={acc}>{addressSummary(acc)}</MenuItem>
          ))}
          <MenuDivider />
          <MenuItem as={RouterLink} to="/names/owned">
            My Names
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
}
