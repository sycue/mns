import NextLink from "next/link";
import {
  Badge,
  Box,
  Flex,
  Container,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from "@chakra-ui/icons";
import Logo from "../components/Logo2";
import ColorMode from "../components/ColorMode";
import ConnectButton from "../views/ConnectButton";

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box mt={"2"}>
      <Flex
        as={Container}
        color={useColorModeValue("gray.600", "white")}
        maxW={"6xl"}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          alignItems={"center"}
          justify={{ base: "center", md: "start" }}
        >
          <NextLink href="/" passHref>
            <Flex
              as="a"
              alignItems="center"
              color={useColorModeValue("gray.800", "white")}
            >
              <Logo />
              <Text
                ml={2}
                textAlign={useBreakpointValue({ base: "center", md: "left" })}
                fontFamily={"heading"}
                fontWeight={"bold"}
                fontSize="lg"
                color={useColorModeValue("gray.800", "white")}
              >
                MetaName
              </Text>
              <Badge ml={2} colorScheme="green">
                Beta
              </Badge>
            </Flex>
          </NextLink>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <ConnectButton />
          <ColorMode />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map(navItem => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box>
                <NextLink href={navItem.href ?? "/"} passHref>
                  <Link
                    as="a"
                    p={2}
                    fontSize={"sm"}
                    fontWeight={500}
                    color={linkColor}
                    rounded={"md"}
                    _hover={{
                      textDecoration: "none",
                      color: linkHoverColor,
                      bg: useColorModeValue("green.50", "gray.900")
                    }}
                  >
                    {navItem.label}
                  </Link>
                </NextLink>
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map(child => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel } /*: NavItem*/) => {
  return (
    <NextLink href={href ?? "/"} passHref>
      <Link
        as={"a"}
        role={"group"}
        display={"block"}
        p={2}
        rounded={"md"}
        _hover={{ bg: useColorModeValue("green.50", "gray.900") }}
      >
        <Stack direction={"row"} align={"center"}>
          <Box>
            <Text
              transition={"all .3s ease"}
              _groupHover={{ color: "green.500" }}
              fontWeight={500}
            >
              {label}
            </Text>
            <Text fontSize={"sm"}>{subLabel}</Text>
          </Box>
          <Flex
            transition={"all .3s ease"}
            transform={"translateX(-10px)"}
            opacity={0}
            _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
            justify={"flex-end"}
            align={"center"}
            flex={1}
          >
            <Icon color={"green.500"} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
    </NextLink>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map(navItem => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href } /*: NavItem*/) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none"
        }}
      >
        <NextLink href={href ?? "/"} passHref>
          <Text
            as={"a"}
            fontWeight={600}
            color={useColorModeValue("gray.600", "gray.200")}
          >
            {label}
          </Text>
        </NextLink>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map(child => (
              <NextLink key={child.label} href={child.href ?? "/"} passHref>
                <Link py={2}>{child.label}</Link>
              </NextLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

/*
interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}
*/

const NAV_ITEMS /*: Array<NavItem>*/ = [
  {
    label: "Home",
    href: "/"
  },
  /*
  {
    label: "Solutions",
    children: [
      {
        label: "Explore Design Work",
        subLabel: "Trending Design to inspire you",
        href: "#"
      },
      {
        label: "New & Noteworthy",
        subLabel: "Up-and-coming Designers",
        href: "#"
      }
    ]
  },
  {
    label: "Features",
    children: [
      {
        label: "Job Board",
        subLabel: "Find your dream design job",
        href: "#"
      },
      {
        label: "Freelance Projects",
        subLabel: "An exclusive list for contract work",
        href: "#"
      }
    ]
  },
  */
  {
    label: "Registration",
    href: "/registration",
    children: [
      {
        label: "Registration Rules",
        subLabel: "",
        href: "/registration"
      },
      {
        label: "Pricing",
        subLabel: "",
        href: "/pricing"
      }
    ]
  },
  {
    label: "About",
    href: "/about",
    children: [
      {
        label: "About MetaName",
        subLabel: "",
        href: "/about"
      },
      {
        label: "Our Vision",
        subLabel: "",
        href: "/vision"
      }
    ]
  }
];
