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

interface TailwindColorClassProps {
  color: string;
  weight?: number;
  type: string;
}

export const getTailwindColorClass = ({
  color,
  weight = 500,
  type,
}: TailwindColorClassProps) => {
  return `${type}-${color}-${weight}`;
};
