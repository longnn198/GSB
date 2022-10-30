import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

interface ConnectWalletProps {
  onConnectWallet: () => void;
}
const ConnectWallet = ({ onConnectWallet }: ConnectWalletProps) => {
  return (
    <Button variant="primary" onClick={onConnectWallet}>
      Connect Wallet
    </Button>
  );
};

export default ConnectWallet;
