import NextLink from "next/link";
import {
	Heading,
	Box,
	Center,
	Flex,
	Text,
	Stack,
	Button,
	useColorModeValue
} from "@chakra-ui/react";
import NameAvatar from "./NameAvatar";

export default function OwnedItem({ item }) {
	return (
		<Center py={6}>
			<Box
				maxW={"320px"}
				w={"full"}
				bg={useColorModeValue("white", "gray.800")}
				boxShadow={"2xl"}
				rounded={"md"}
				overflow={"hidden"}
			>
				{/*
        <Image
          h={"120px"}
          w={"full"}
          src={pattern.toDataUri()}
          objectFit={"cover"}
        />
        */}
				<Flex justify={"center"} mt={10}>
					{/* mt={-12}>*/}
					<NameAvatar name={item.name} />
				</Flex>

				<Box p={6}>
					<Stack spacing={0} align={"center"} mb={3}>
						<Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
							{item.name}
						</Heading>
						<Text color={"gray.500"}>
							Expires: {parseExpiryTime(item.expiryTime)}
						</Text>
					</Stack>

					{/*
          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>23k</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Followers
              </Text>
            </Stack>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>23k</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Followers
              </Text>
            </Stack>
          </Stack>
          */}

					<NextLink href={`/names/${encodeURIComponent(item.name)}`} passHref>
						<Button
							as={"a"}
							w={"full"}
							mt={8}
							bg={useColorModeValue("#151f21", "gray.900")}
							color={"white"}
							rounded={"md"}
							_hover={{
								transform: "translateY(-2px)",
								boxShadow: "lg"
							}}
						>
							Details
						</Button>
					</NextLink>
				</Box>
			</Box>
		</Center>
	);
}

function parseExpiryTime(time) {
	if (!time) return "-";
	const d = new Date(time * 1000);
	return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
}
