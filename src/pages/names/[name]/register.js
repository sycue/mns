import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Alert,
  AlertIcon,
  AlertDescription,
  Stack,
  Button,
  Box
} from "@chakra-ui/react";
import { BiRightArrowAlt, BiBadgeCheck } from "react-icons/bi";
import Loading from "components/Loading";
import { useRegisterName, useFetchName, canRegister } from "hooks/useName";
import NameWrapper from "views/Name/NameWrapper";

export default function RegisterPage() {
  const router = useRouter();
  const { name } = router.query;
  const { data, loading } = useFetchName(name);
  const { register, state, tx } = useRegisterName(name);

  if (loading) {
    return (
      <Box minHeight={"md"}>
        <Loading />
      </Box>
    );
  }

  return (
    <NameWrapper data={data} actived="Register">
      {state !== "success" ? (
        !canRegister(data) ? (
          <NameRegistered />
        ) : (
          <RegisterName state={state} register={register} />
        )
      ) : (
        <RegisterSuccess data={data} tx={tx} />
      )}
    </NameWrapper>
  );
}

function NameRegistered() {
  return (
    <Stack spacing={3} p={4}>
      <Alert borderRadius="md" status="warning">
        <AlertIcon />
        <AlertDescription display="block">
          This name is already registered.
        </AlertDescription>
      </Alert>
    </Stack>
  );
}

function RegisterName({ state, register }) {
  return (
    <Stack spacing={3} p={4}>
      <Alert borderRadius="md" status="info">
        <AlertIcon />
        <AlertDescription display="block">
          This name currently is available. Fire on!
        </AlertDescription>
      </Alert>

      <Box py={3}>
        <Button
          leftIcon={<BiBadgeCheck />}
          onClick={register}
          disabled={state === "loading"}
          colorScheme="blue"
        >
          Request To Register
        </Button>
      </Box>
    </Stack>
  );
}

function RegisterSuccess({ data, tx }) {
  return (
    <Stack spacing={3} p={4}>
      <Alert borderRadius="md" status="success">
        <AlertIcon />
        <AlertDescription display="block">
          Register success: {tx}
        </AlertDescription>
      </Alert>

      <Box py={3}>
        <NextLink href={`/names/${data.name}`} passHref>
          <Button as={"a"} rightIcon={<BiRightArrowAlt />} colorScheme="blue">
            Goto Details
          </Button>
        </NextLink>
      </Box>
    </Stack>
  );
}
