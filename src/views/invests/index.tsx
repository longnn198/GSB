declare var window: any;
import React, { useCallback, useEffect, useState } from "react";
import {
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { ConnectWallet, SuccessModal } from "../../components";
import Wallet from "../../components/Wallet/index";
import { IPackage, IRate, IWallet, Token } from "../../type";
import { GoldenStarBalms } from "../../constants";
import InvestCard from "../components/InvestCard";
import CrowSaleContract from "../../contracts/CrowdSaleContract";
import UsdtContract from "../../contracts/UsdtContract";
const InvestView = () => {
  const [wallet, setWallet] = useState<IWallet>();
  const [rate, setRate] = useState<IRate>({ usdtRate: 0, bnbRate: 0 });
  const [packages, setPackages] = useState<IPackage>();
  const [txHash, setTxHash] = useState<string>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [web3Provider, setWeb3Provider] =
    useState<ethers.providers.Web3Provider>();

  const onConnectWallet = useCallback(async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        undefined
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const balance = await signer.getBalance();
      const bnbBalace = Number.parseFloat(ethers.utils.formatEther(balance));
      setWallet({ address: address, amount: bnbBalace });
      setWeb3Provider(provider);
    }
  }, []);

  const getRate = useCallback(async () => {
    const crowdContract = new CrowSaleContract();
    const bnbRate = await crowdContract.getBnbRate();
    const usdtRate = await crowdContract.getUsdtRate();
    setRate({ bnbRate, usdtRate });
  }, []);

  useEffect(() => {
    getRate();
  }, [getRate]);

  const handleBuyIco = useCallback(
    async (packages: IPackage) => {
      if (!web3Provider) return;
      setPackages(packages);
      setIsProcessing(true);
      let hash = "";
      const crowdContract = new CrowSaleContract(web3Provider);
      if (packages.token === Token.USDT) {
        const usdtContract = new UsdtContract(web3Provider);
        await usdtContract.approve(
          crowdContract._contractAddress,
          packages.amount / rate.bnbRate
        );
        hash = await crowdContract.buyTokenByUSDT(packages.amount);
      } else {
        hash = await crowdContract.buyTokenByBNB(packages.amount);
      }
      setTxHash(hash);
      onOpen();
      try {
      } catch (er: any) {}
      setPackages(undefined);
      setIsProcessing(false);
    },
    [onOpen, rate, web3Provider]
  );

  return (
    <Flex
      w={{ base: "full", lg: "90%" }}
      flexDirection="column"
      margin="26px auto"
    >
      <Flex>
        <Heading size="lg" fontWeight="bold">
          Golden Star Balm aka Cao Sao Vàng
        </Heading>
        <Spacer />

        {wallet?.address ? (
          <Wallet address={wallet?.address} amount={wallet?.amount || 0} />
        ) : (
          <ConnectWallet onConnectWallet={onConnectWallet} />
        )}
      </Flex>

      <SimpleGrid columns={{ base: 1, lg: 3 }} mt="52px" spacing={10}>
        {GoldenStarBalms.map((GoldenStarBalm, index) => (
          <InvestCard
            key={String(index)}
            packages={GoldenStarBalm}
            isBuying={isProcessing && GoldenStarBalm.key === packages?.key}
            rate={
              GoldenStarBalm.token === Token.BNB ? rate.bnbRate : rate.usdtRate
            }
            wallet={wallet}
            onBuy={() => handleBuyIco(GoldenStarBalm)}
          />
        ))}
      </SimpleGrid>

      <SuccessModal
        isOpen={isOpen}
        onClose={onClose}
        hash={txHash}
        title="Buy GSB"
      />
    </Flex>
  );
};

export default InvestView;
