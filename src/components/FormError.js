import { useColorModeValue, FormHelperText } from "@chakra-ui/react";

export default function FormError({ error }) {
  const color = useColorModeValue("red.600", "red.300");
  if (!error) {
    return <></>;
  }

  return <FormHelperText color={color}>{error?.message}</FormHelperText>;
}
