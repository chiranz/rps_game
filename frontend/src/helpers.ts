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
  // OLD ADDRESS Rinkeby
  // return "0x5Fbe122e6a6D4FC42343A9f654B8ea606D1FdE14";
  // return "0xe8C9AadB051DB86E463D7323007C68b67D91CbF4";
  // LOCALHOST
  // return "0x5FbDB2315678afecb367f032d93F642f64180aa3"; //localhost address collision on mainnet/rinkeby
  return "0x5FbDB2315678afecb367f032d93F642f64180aa3";
};
