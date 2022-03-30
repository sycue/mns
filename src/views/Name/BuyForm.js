import { useState } from "react";
import {
  Alert,
  AlertIcon,
  Icon,
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import {
  toDecimal,
  fromDecimal,
  useApprove,
  useGetPrice,
  useBuy,
  useGetBalance,
  useGetAcceptedTokenBalance,
  useAllowance,
} from "hooks/useShop";

export default function BuyForm() {
  const history = useHistory();
  const [amount, setAmount] = useState(10);
  const [approving, setApproving] = useState(0);
  const approve = useApprove();
  const price = useGetPrice();
  const balance = useGetBalance();
  const acceptedTokenbalance = useGetAcceptedTokenBalance();
  const buy = useBuy();
  const allowance = useAllowance();

  const amountBN = fromDecimal(amount);
  const mncAmount = balance.div(price);
  const maxAmount = mncAmount.gt(acceptedTokenbalance)
    ? acceptedTokenbalance
    : mncAmount;
  const hasBalance = maxAmount.gte(amountBN);
  const approved = amount > 0 && allowance.data.gte(amountBN);
  const canApprove = amount > 0 && !approved && approving === 0 && hasBalance;

  const formatBN = (bn) => {
    return toDecimal(bn).toFormat(2);
  };

  const handleChange = (value) => {
    setAmount(value);
    if (value > 0) allowance.query();
  };

  const handleApprove = async (e) => {
    e.preventDefault();
    await approve.submit(amountBN);
    let i = 0;
    let timerId = setInterval(async () => {
      const result = await allowance.query();
      if (result.gte(amountBN)) {
        clearInterval(timerId);
        setApproving(-1); // approved
        return;
      }

      // 10 min
      if (i >= 300) {
        clearInterval(timerId);
        setApproving(0); // reset
      } else {
        i++;
        setApproving(i);
      }
    }, 2000);
  };

  const handleBuy = (e) => {
    e.preventDefault();
    buy.submit(amountBN);
  };

  if (buy.state === "success") {
    return (
      <Box p={10}>
        <Alert status="success">
          <AlertIcon />
          The purchase was successful, please check your MNC in your Metamask.
        </Alert>
        <Box mt={3}>
          <Button
            variant="ghost"
            leftIcon={<FiArrowLeft />}
            onClick={() => history.go(0)}
          >
            Back
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box p={10}>
      <Box>
        <FormControl
          id="amount"
          isInvalid={allowance.status === "success" ? !hasBalance : false}
        >
          <FormLabel>Matic Amount</FormLabel>
          <NumberInput
            max={toDecimal(maxAmount).toNumber()}
            min={1}
            value={amount}
            onChange={handleChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Flex>
            <Box flex={1}>
              <FormHelperText>{`${formatBN(
                amountBN
              )} MATIC * ${price} = ${formatBN(
                amountBN.multipliedBy(price)
              )} MNC`}</FormHelperText>
            </Box>
            <Box>
              <FormHelperText>
                Your Matic Balance: {formatBN(acceptedTokenbalance)} / Shop MNC
                Balance: {formatBN(balance)}
              </FormHelperText>
            </Box>
          </Flex>
          {!hasBalance && (
            <FormErrorMessage>
              Sorry, there is no sufficient balance.
            </FormErrorMessage>
          )}
        </FormControl>
      </Box>
      <Box mt={3}>
        <Button
          mr={2}
          colorScheme="blue"
          onClick={handleApprove}
          disabled={!canApprove}
          loading={approve.state === "loading" ? "true" : "false"}
        >
          {approving > 0
            ? `Approving (${approving})`
            : approving === -1
            ? "Approved"
            : "Approve"}
        </Button>

        <Icon mr={2} as={FiArrowRight} />

        <Button
          onClick={handleBuy}
          disabled={!approved}
          loading={buy.state === "loading" ? "true" : "false"}
        >
          Buy
        </Button>
      </Box>
    </Box>
  );
}
