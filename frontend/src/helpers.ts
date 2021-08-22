export const joinClasses = (...classes: string[]) => {
  return classes.join(" ");
};

export const networkNameFromId = {
  1: "Mainnet",
  3: "Ropsten",
  4: "Rinkeby",
  5: "Gorli",
  42: "Kovan",
};

export const getTruncatedAddress = (address: string = "") => {
  return `${address.slice(0, 4)}...${address.slice(address.length - 2)}`;
};

export const getRPSGameFactoryAddress = () => {
  // Rinkeby Address
  return "0xD108ae5384de2e2DC0f3855e75cB882E39929c82";
  // Localhost
  // return "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
};
