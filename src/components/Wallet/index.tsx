import React from "react";
import { Button, HStack, Image, Text } from "@chakra-ui/react";
import { numberFormat, showSortAddress } from "../../utils";
interface WalletProps {
  address?: string;
  amount: number;
}
const Wallet = ({ address, amount }: WalletProps) => {
  return (
    <Button variant="outline" ml="10px">
      <HStack>
        <Text>{showSortAddress(address)}</Text>
        <Image src="/caosaovang.png" alt="bnb" w="25px" />
        <Text>{numberFormat(amount)}</Text>
      </HStack>
    </Button>
  );
};

export default Wallet;
