import React from "react";
import { Box, Container, Button } from "@chakra-ui/react";
import { deployContract } from "../hooks/useWeb3";
import bin from "../configs/MNS.bin.json";
import abi from "../configs/MNS.abi.json";

export default function Deploy() {
	const [tx, setTx] = React.useState({});
	const handleClick = async e => {
		e.preventDefault();
		const args = [];
		console.log(abi);
		const txn = await deployContract({ abi, bytecode: bin.bin, args });
		setTx(txn);
	};

	return (
		<Box minH="75vh" alignItems="center">
			<Container maxW={"5xl"}>
				<Button onClick={handleClick}>deploy</Button>
				<pre>{JSON.stringify(tx, true, 2)}</pre>
			</Container>
		</Box>
	);
}
