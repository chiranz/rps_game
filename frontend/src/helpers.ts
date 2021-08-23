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
  return "0x1014318fF8ccB7AE34293a9ff1Ca39c617820c1e";
};
