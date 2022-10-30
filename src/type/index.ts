export interface IWallet {
  address?: string;
  amount: number;
}

export interface IRate {
  usdtRate: number;
  bnbRate: number;
}

export enum Token {
  BNB = "BNB",
  USDT = "USDT",
}

export interface IPackage {
  key: string;
  name: string;
  amount: number;
  icon: string;
  bg: string;
  token: string;
}
