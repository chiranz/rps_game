/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { RPSToken } from "../RPSToken";

export class RPSToken__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    name: string,
    symbol: string,
    overrides?: Overrides
  ): Promise<RPSToken> {
    return super.deploy(name, symbol, overrides || {}) as Promise<RPSToken>;
  }
  getDeployTransaction(
    name: string,
    symbol: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(name, symbol, overrides || {});
  }
  attach(address: string): RPSToken {
    return super.attach(address) as RPSToken;
  }
  connect(signer: Signer): RPSToken__factory {
    return super.connect(signer) as RPSToken__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RPSToken {
    return new Contract(address, _abi, signerOrProvider) as RPSToken;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "mint",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620011ba380380620011ba833981810160405260408110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b9083019060208201858111156200006e57600080fd5b82516401000000008111828201881017156200008957600080fd5b82525081516020918201929091019080838360005b83811015620000b85781810151838201526020016200009e565b50505050905090810190601f168015620000e65780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200010a57600080fd5b9083019060208201858111156200012057600080fd5b82516401000000008111828201881017156200013b57600080fd5b82525081516020918201929091019080838360005b838110156200016a57818101518382015260200162000150565b50505050905090810190601f168015620001985780820380516001836020036101000a031916815260200191505b50604052505082518391508290620001b8906003906020850190620003a3565b508051620001ce906004906020840190620003a3565b50506005805460ff19166012179055506200020233620001ed62000224565b60ff16600a0a6064026200022d60201b60201c565b5050336000908152600660205260409020805460ff191660011790556200044f565b60055460ff1690565b6001600160a01b03821662000289576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b62000297600083836200033c565b620002b3816002546200034160201b6200063c1790919060201c565b6002556001600160a01b03821660009081526020818152604090912054620002e69183906200063c62000341821b17901c565b6001600160a01b0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b505050565b6000828201838110156200039c576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282620003db576000855562000426565b82601f10620003f657805160ff191683800117855562000426565b8280016001018555821562000426579182015b828111156200042657825182559160200191906001019062000409565b506200043492915062000438565b5090565b5b8082111562000434576000815560010162000439565b610d5b806200045f6000396000f3fe608060405234801561001057600080fd5b50600436106100af5760003560e01c806306fdde03146100b4578063095ea7b3146101315780631249c58b1461017157806318160ddd1461017957806323b872dd14610193578063313ce567146101c957806339509351146101e757806342966c681461021357806370a082311461023057806395d89b4114610256578063a457c2d71461025e578063a9059cbb1461028a578063dd62ed3e146102b6575b600080fd5b6100bc6102e4565b6040805160208082528351818301528351919283929083019185019080838360005b838110156100f65781810151838201526020016100de565b50505050905090810190601f1680156101235780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61015d6004803603604081101561014757600080fd5b506001600160a01b03813516906020013561037a565b604080519115158252519081900360200190f35b61015d610397565b610181610421565b60408051918252519081900360200190f35b61015d600480360360608110156101a957600080fd5b506001600160a01b03813581169160208101359091169060400135610427565b6101d16104ae565b6040805160ff9092168252519081900360200190f35b61015d600480360360408110156101fd57600080fd5b506001600160a01b0381351690602001356104b7565b61015d6004803603602081101561022957600080fd5b5035610505565b6101816004803603602081101561024657600080fd5b50356001600160a01b0316610519565b6100bc610534565b61015d6004803603604081101561027457600080fd5b506001600160a01b038135169060200135610595565b61015d600480360360408110156102a057600080fd5b506001600160a01b0381351690602001356105fd565b610181600480360360408110156102cc57600080fd5b506001600160a01b0381358116916020013516610611565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156103705780601f1061034557610100808354040283529160200191610370565b820191906000526020600020905b81548152906001019060200180831161035357829003601f168201915b5050505050905090565b600061038e61038761069b565b848461069f565b50600192915050565b3360009081526006602052604081205460ff16156103e65760405162461bcd60e51b815260040180806020018281038252602c815260200180610cd5602c913960400191505060405180910390fd5b610400336103f26104ae565b60ff16600a0a60640261078b565b50336000908152600660205260409020805460ff1916600190811790915590565b60025490565b6000610434848484610869565b6104a48461044061069b565b61049f85604051806060016040528060288152602001610c23602891396001600160a01b038a1660009081526001602052604081209061047e61069b565b6001600160a01b0316815260208101919091526040016000205491906109b2565b61069f565b5060019392505050565b60055460ff1690565b600061038e6104c461069b565b8461049f85600160006104d561069b565b6001600160a01b03908116825260208083019390935260409182016000908120918c16815292529020549061063c565b60006105113383610a49565b506001919050565b6001600160a01b031660009081526020819052604090205490565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156103705780601f1061034557610100808354040283529160200191610370565b600061038e6105a261069b565b8461049f85604051806060016040528060258152602001610d0160259139600160006105cc61069b565b6001600160a01b03908116825260208083019390935260409182016000908120918d168152925290205491906109b2565b600061038e61060a61069b565b8484610869565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b600082820183811015610694576040805162461bcd60e51b815260206004820152601b60248201527a536166654d6174683a206164646974696f6e206f766572666c6f7760281b604482015290519081900360640190fd5b9392505050565b3390565b6001600160a01b0383166106e45760405162461bcd60e51b8152600401808060200182810382526024815260200180610cb16024913960400191505060405180910390fd5b6001600160a01b0382166107295760405162461bcd60e51b8152600401808060200182810382526022815260200180610bdb6022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6001600160a01b0382166107e6576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b6107f260008383610b33565b6002546107ff908261063c565b6002556001600160a01b038216600090815260208190526040902054610825908261063c565b6001600160a01b038316600081815260208181526040808320949094558351858152935192939192600080516020610c4b8339815191529281900390910190a35050565b6001600160a01b0383166108ae5760405162461bcd60e51b8152600401808060200182810382526025815260200180610c8c6025913960400191505060405180910390fd5b6001600160a01b0382166108f35760405162461bcd60e51b8152600401808060200182810382526023815260200180610b966023913960400191505060405180910390fd5b6108fe838383610b33565b61093b81604051806060016040528060268152602001610bfd602691396001600160a01b03861660009081526020819052604090205491906109b2565b6001600160a01b03808516600090815260208190526040808220939093559084168152205461096a908261063c565b6001600160a01b03808416600081815260208181526040918290209490945580518581529051919392871692600080516020610c4b83398151915292918290030190a3505050565b60008184841115610a415760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610a065781810151838201526020016109ee565b50505050905090810190601f168015610a335780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6001600160a01b038216610a8e5760405162461bcd60e51b8152600401808060200182810382526021815260200180610c6b6021913960400191505060405180910390fd5b610a9a82600083610b33565b610ad781604051806060016040528060228152602001610bb9602291396001600160a01b03851660009081526020819052604090205491906109b2565b6001600160a01b038316600090815260208190526040902055600254610afd9082610b38565b6002556040805182815290516000916001600160a01b03851691600080516020610c4b8339815191529181900360200190a35050565b505050565b600082821115610b8f576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b5090039056fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e636545524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e6365ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef45524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f2061646472657373525053546f6b656e3a20596f75206861766520616c7265616479206d696e74656420796f757220736861726545524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa2646970667358221220109a30b77ba42e5662c3df3f39425386f9c2a1d9a26530a7b20195f9bdb0627c64736f6c63430007060033";
