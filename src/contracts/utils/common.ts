export type AddressType = {
  97: string;
  56: string;
};
export enum CHAIN_ID {
  TESTNET = 97,
  MAINNET = 96,
}
export default function getChainIdFromEnv(): number {
  const env = process.env.NEXT_PUBLIC_CHAIN_ID;
  if (!env) {
    return 97;
  }
  return parseInt(env);
}

export const getRPC = () => {
  if (getChainIdFromEnv() === CHAIN_ID.MAINNET)
    return process.env.NEXT_PUBLIC_RPC_MAINNET;
  return process.env.NEXT_PUBLIC_RPC_TESTNET;
};

export const SMART_ADDRESS = {
  GBS_SALE: { 97: "0xef48e9acb9ab662c320f0bfd508ced16c3636249", 56: "" },
  USDT: { 97: "0xCB3367ba4A464FD9148E6f38201d2B9059EfbB6F", 56: "" },
};
