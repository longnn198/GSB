import React from "react";
import { Box, Image, Text, Button, HStack, Spinner } from "@chakra-ui/react";
import { numberFormat } from "../../../utils/index";
import { IPackage, IWallet } from "../../../type";

interface InvestCardProps {
  packages: IPackage;
  isBuying: boolean;
  rate: number;
  wallet?: IWallet;
  onBuy: () => void;
}
const InvestCard = ({
  packages,
  isBuying,
  rate,
  wallet,
  onBuy,
}: InvestCardProps) => {
  return (
    <Box
      w="100%"
      bg="bg.secondary"
      borderRadius="16px"
      overflow="hidden"
      padding="10px"
      border="1px solid rgba(254,223,86, 0.6)"
      alignItems="center"
      display="flex"
      flexDirection="column"
    >
      <Box
        bgImage={`/${packages.bg}`}
        w="full"
        h="210px"
        borderRadius="16px"
        bgSize="contain"
        bgPos="center"
      />
      <Box
        w="80px"
        h="80px"
        margin="0px auto"
        borderRadius="full"
        marginTop="-60px"
        position="relative"
      >
        <Image
          src={`/${packages.icon}`}
          alt="bnb"
          w="80px"
          borderRadius="full"
          objectFit="cover"
          border="6px solid rgba(254,223,86, 0.6)"
        />
      </Box>

      <Text my="20px" fontSize="24px" fontWeight="bold">
        {packages.name}
      </Text>
      <Button
        disabled
        variant="primaty"
        my="20px"
        bg="transparent"
        border="1px solid #fff"
        color="rgba(255,255,255,0.7"
      >
        {numberFormat(packages.amount)} GSB
      </Button>
      <HStack my="15px">
        <Text color="gray"> Amount of GSB to pay: </Text>
        <Text variant="notoSan" fontSize="16px">
          {numberFormat(packages.amount / rate)} {packages.token}
        </Text>
      </HStack>
      <Button
        w="full"
        variant="primary"
        disabled={!wallet?.address || isBuying}
        onClick={onBuy}
      >
        {isBuying ? <Spinner /> : "Buy GSB"}
      </Button>
    </Box>
  );
};

export default InvestCard;
