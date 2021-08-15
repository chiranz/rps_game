import { config } from "dotenv";

config();

export const getInfuraKey = () => {
  return process.env.INFURA_KEY;
};

export const getPrivateKey = () => {
  return `0x${process.env.PRIVATE_KEY}`;
};
export const getEtherScanKey = () => {
  return process.env.ETHERSCAN_KEY;
};

export const getMaticKey = () => {
  return process.env.MATIC_KEY;
};
