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

export const getContractAddress = (networkId?: number) => {
  // OLD ADDRESS
  // return "0x5Fbe122e6a6D4FC42343A9f654B8ea606D1FdE14";
  return "0xe8C9AadB051DB86E463D7323007C68b67D91CbF4";
};
