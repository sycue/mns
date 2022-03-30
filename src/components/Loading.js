import React from "react";

import { Spinner, Center } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Center h="100vh" w="100vw" position="fixed" left="0" top="0">
      <Spinner />
    </Center>
  );
};

export default Loading;
