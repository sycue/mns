import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Button,
  Flex,
  Box,
  Text,
  Stack,
  HStack,
  useColorModeValue,
  Badge
} from "@chakra-ui/react";
import { BiRightArrowAlt } from "react-icons/bi";
import Loading from "components/Loading";
import { useFetchName, isOwner, canRegister, isExpired } from "hooks/useName";
import NameWrapper from "views/Name/NameWrapper";
import SetTokenURI from "views/Name/SetTokenURI";
import TransferButton from "views/Name/TransferButton";
import RenewButton from "views/Name/RenewButton";
import BurnButton from "views/Name/BurnButton";
import NameAvatar from "views/Name/NameAvatar";

export default function DetailPage() {
  const router = useRouter();
  const { name } = router.query;
  const { data, setData, loading } = useFetchName(name);

  if (loading) {
    return (
      <Box minHeight={"md"}>
        <Loading />
      </Box>
    );
  }

  return (
    <NameWrapper data={data} actived="Details">
      <Stack spacing={3} p={4}>
        <DetailItem label="Identicon">
          <NameAvatar name={data.name} />
        </DetailItem>
        <DetailItem label="Token ID">{data.tokenId || "-"}</DetailItem>
        <DetailItem label="Token URI">
          <HStack spacing={3}>
            <Text>{data.tokenURI || "No Token URI set"}</Text>
            {isOwner(data.owner) && (
              <SetTokenURI data={data} setData={setData} />
            )}
          </HStack>
        </DetailItem>
        <DetailItem label="Owner">{data.owner || "Not owned"}</DetailItem>
        <DetailItem label="Expiration Date">
          {parseExpiryTime(data.expiryTime)}
          {data.exists && isExpired(data.expiryTime) && (
            <Badge ml={2} colorScheme="yellow">
              Expired
            </Badge>
          )}
        </DetailItem>

        <Box pt={3}>
          {isOwner(data.owner) && (
            <>
              <RenewButton data={data} setData={setData} />
              <TransferButton data={data} setData={setData} />
              <BurnButton data={data} setData={setData} />
            </>
          )}

          {canRegister(data) && (
            <NextLink
              href={`/names/${encodeURIComponent(data.name)}/register`}
              passHref
            >
              <Button
                mr={3}
                as={"a"}
                rightIcon={<BiRightArrowAlt />}
                colorScheme="green"
                variant="link"
              >
                Register Now
              </Button>
            </NextLink>
          )}
        </Box>
      </Stack>
    </NameWrapper>
  );
}

function DetailItem({ label, children }) {
  const color = useColorModeValue("gray.500", "gray.300");
  return (
    <Flex>
      <Box minW="160px">
        <Text fontWeight="bold">{label}</Text>
      </Box>
      <Box flex="1" px="2">
        <Box color={color}>{children}</Box>
      </Box>
    </Flex>
  );
}

function parseExpiryTime(time) {
  if (!time) return "-";
  const d = new Date(time * 1000);
  return d.toString();
}
