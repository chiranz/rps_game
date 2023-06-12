export const joinClasses = (...classes: string[]) => {
  return classes.join(" ");
};

export const networkNameFromId = {
  1: "Mainnet",
  3: "Ropsten",
  4: "Rinkeby",
  5: "Goerli",
  42: "Kovan",
};

export const getTruncatedAddress = (address: string = "") => {
  return `${address.slice(0, 4)}...${address.slice(address.length - 2)}`;
};

export const getRPSGameFactoryAddress = () => {
  // goerli address
  return "0x895c6eBcf228F08436d80EdB6d6981dF0D3E3Ce3";
  // Rinkeby Address
  // return "0xb0f9Dfb7c06E2e9b9BaC5Ac397D686C64be87e7B";
  // Old
  // return "0xD108ae5384de2e2DC0f3855e75cB882E39929c82";
  // Localhost
  // return "0x5FbDB2315678afecb367f032d93F642f64180aa3";
};
