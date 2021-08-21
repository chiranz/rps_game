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
  // Rinkeby
  // return "0x1a8C287ceCbc5bA0582fecB030591920dBC33349";
  // LOCALHOST
  return "0x5FbDB2315678afecb367f032d93F642f64180aa3"; //localhost address collision on mainnet/rinkeby
  // return "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  // return "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";
};
