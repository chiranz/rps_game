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

export const getTruncatedAddress = (address: string) => {
  return `${address.slice(0, 4)}...${address.slice(address.length - 2)}`;
};

export const getContractAddress = (networkId?: number) => {
  return "0x5Fbe122e6a6D4FC42343A9f654B8ea606D1FdE14";
};
