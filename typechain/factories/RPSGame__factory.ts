/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import {
  Contract,
  ContractFactory,
  PayableOverrides,
} from "@ethersproject/contracts";

import type { RPSGame } from "../RPSGame";

export class RPSGame__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _betAmount: BigNumberish,
    _player: string,
    _opponent: string,
    overrides?: PayableOverrides
  ): Promise<RPSGame> {
    return super.deploy(
      _betAmount,
      _player,
      _opponent,
      overrides || {}
    ) as Promise<RPSGame>;
  }
  getDeployTransaction(
    _betAmount: BigNumberish,
    _player: string,
    _opponent: string,
    overrides?: PayableOverrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      _betAmount,
      _player,
      _opponent,
      overrides || {}
    );
  }
  attach(address: string): RPSGame {
    return super.attach(address) as RPSGame;
  }
  connect(signer: Signer): RPSGame__factory {
    return super.connect(signer) as RPSGame__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RPSGame {
    return new Contract(address, _abi, signerOrProvider) as RPSGame;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_betAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_player",
        type: "address",
      },
      {
        internalType: "address",
        name: "_opponent",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "depositor",
        type: "address",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "GameComplete",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "enum RPSGame.GameStage",
        name: "gameStage",
        type: "uint8",
      },
    ],
    name: "GameStageChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "ResetGame",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "RevealMove",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "SubmitMove",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_winner",
        type: "address",
      },
    ],
    name: "Winner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "betAmount",
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
    inputs: [],
    name: "depositBet",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "gameStage",
    outputs: [
      {
        internalType: "enum RPSGame.GameStage",
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
        name: "_player",
        type: "address",
      },
    ],
    name: "getPlayer",
    outputs: [
      {
        components: [
          {
            internalType: "enum RPSGame.Move",
            name: "move",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "hashedMove",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "balance",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "addr",
            type: "address",
          },
          {
            internalType: "bool",
            name: "submitted",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "revealed",
            type: "bool",
          },
        ],
        internalType: "struct RPSGame.Player",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "playerA",
    outputs: [
      {
        internalType: "enum RPSGame.Move",
        name: "move",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "hashedMove",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "bool",
        name: "submitted",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "revealed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "playerB",
    outputs: [
      {
        internalType: "enum RPSGame.Move",
        name: "move",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "hashedMove",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "bool",
        name: "submitted",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "revealed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "resetGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_move",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "_salt",
        type: "bytes32",
      },
    ],
    name: "revealMove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_hashedMove",
        type: "bytes32",
      },
    ],
    name: "submitMove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "winner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawFund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052604051620013ba380380620013ba833981016040819052610024916100b2565b806001600160a01b0316826001600160a01b0316141561005f5760405162461bcd60e51b8152600401610056906100ed565b60405180910390fd5b600892909255600380546001600160a01b039283166001600160a01b03199182161790915560078054929093169116179055610122565b80516001600160a01b03811681146100ad57600080fd5b919050565b6000806000606084860312156100c6578283fd5b835192506100d660208501610096565b91506100e460408501610096565b90509250925092565b6020808252818101527f596f752063616e6e6f7420706c617920616761696e737420796f757273656c66604082015260600190565b61128880620001326000396000f3fe60806040526004361061008c5760003560e01c806311bb1537146100915780632932a4c8146100c15780633fe34727146100e357806350c5685b146100eb5780635c12cd4b1461010d578063a285c54a1461013a578063a8f7d4421461014f578063bb4722191461016f578063d24257c014610184578063dfbf53ae146101a6578063e07fa3c1146101c8575b600080fd5b34801561009d57600080fd5b506100a66101dd565b6040516100b896959493929190610e7b565b60405180910390f35b3480156100cd57600080fd5b506100e16100dc366004610dd4565b610210565b005b6100e16103af565b3480156100f757600080fd5b506101006104f0565b6040516100b89190610e61565b34801561011957600080fd5b5061012d610128366004610da6565b6104f9565b6040516100b89190611197565b34801561014657600080fd5b506100a66105f6565b34801561015b57600080fd5b506100e161016a366004610dec565b610629565b34801561017b57600080fd5b506100e161081f565b34801561019057600080fd5b506101996108e6565b6040516100b891906111ee565b3480156101b257600080fd5b506101bb6108ec565b6040516100b89190610e4d565b3480156101d457600080fd5b506100e1610900565b60045460055460065460075460ff938416936001600160a01b03821691600160a01b8104821691600160a81b9091041686565b6003546001600160a01b031633148061023357506007546001600160a01b031633145b6102585760405162461bcd60e51b815260040161024f90611114565b60405180910390fd5b600160095460ff16600481111561027f57634e487b7160e01b600052602160045260246000fd5b1461029c5760405162461bcd60e51b815260040161024f906110df565b6003546000906001600160a01b031633146102b85760046102bb565b60005b6003810154909150600160a01b900460ff16156102ea5760405162461bcd60e51b815260040161024f90610f81565b6001810182905560038101805460ff60a01b1916600160a01b17908190556040516001600160a01b03909116907fac7c6016acea60f1964e343e2b22ae9e5b68968d1584a0c06171cb473af6607890600090a2600354600160a01b900460ff16801561035f5750600754600160a01b900460ff165b156103ab576009805460ff191660029081179091556040517f822057341a67f757f228faa0e81e193456f287ce1fab94eea8422865716796ba916103a291610e61565b60405180910390a15b5050565b6003546001600160a01b03163314806103d257506007546001600160a01b031633145b6103ee5760405162461bcd60e51b815260040161024f90611114565b6008543410156104105760405162461bcd60e51b815260040161024f9061105d565b6003546001600160a01b0316331461044257346004600201600082825461043791906111f7565b92505081905561045e565b346000600201600082825461045791906111f7565b9250508190555b5060405133907f8ce0bd46ec50cf39f0d0ea8686a686eb226af5796dcda4231b26fb84b5ef123490600090a2600854600254108015906104a2575060085460065410155b156104ee576009805460ff191660019081179091556040517f822057341a67f757f228faa0e81e193456f287ce1fab94eea8422865716796ba916104e591610e61565b60405180910390a15b565b60095460ff1681565b610501610d6f565b6003546001600160a01b03838116911614156105be576040805160c0810190915260008054829060ff16600381111561054a57634e487b7160e01b600052602160045260246000fd5b600381111561056957634e487b7160e01b600052602160045260246000fd5b815260018201546020820152600282015460408201526003909101546001600160a01b038116606083015260ff600160a01b8204811615156080840152600160a81b90910416151560a09091015290506105f1565b6040805160c0810190915260048054829060ff16600381111561054a57634e487b7160e01b600052602160045260246000fd5b919050565b60005460015460025460035460ff938416936001600160a01b03821691600160a01b8104821691600160a81b9091041686565b6003546001600160a01b031633148061064c57506007546001600160a01b031633145b6106685760405162461bcd60e51b815260040161024f90611114565b600260095460ff16600481111561068f57634e487b7160e01b600052602160045260246000fd5b146106ac5760405162461bcd60e51b815260040161024f90610f2f565b6003546000906001600160a01b031633146106c85760046106cb565b60005b9050600083836040516020016106e2929190610e30565b6040516020818303038152906040528051906020012090508160030160159054906101000a900460ff16156107295760405162461bcd60e51b815260040161024f9061101a565b8160010154811461074c5760405162461bcd60e51b815260040161024f90610ebe565b8360ff16600381111561076f57634e487b7160e01b600052602160045260246000fd5b8254839060ff1916600183600381111561079957634e487b7160e01b600052602160045260246000fd5b021790555060038201805460ff60a81b1916600160a81b17908190556040516001600160a01b03909116907f5b28e501a1ff0e8e303a6fb5b8fef018dab5fb5fbd44212d19b777f0a0335d2090600090a2600354600160a81b900460ff16801561080c5750600754600160a81b900460ff165b1561081957610819610a90565b50505050565b600460095460ff16600481111561084657634e487b7160e01b600052602160045260246000fd5b1461085057600080fd5b6000805460ff199081169091556003805461ffff60a01b199081169091556004805490921690915560078054909116905560085460025410801590610899575060085460065410155b156108b0576009805460ff191660011790556108bb565b6009805460ff191690555b6040517fc41db7bf93b2ffacecac5d21bb880bf7435f8e756b583a2434d667ebd52516d690600090a1565b60085481565b60095461010090046001600160a01b031681565b6003546001600160a01b031633148061092357506007546001600160a01b031633145b61093f5760405162461bcd60e51b815260040161024f90611114565b600260095460ff16600481111561096657634e487b7160e01b600052602160045260246000fd5b141580156109995750600160095460ff16600481111561099657634e487b7160e01b600052602160045260246000fd5b14155b6109b55760405162461bcd60e51b815260040161024f906110a8565b6003546000906001600160a01b031633146109d15760046109d4565b60005b905060008160020154116109fa5760405162461bcd60e51b815260040161024f90610fcd565b600281015460038201546040516001600160a01b039091169082156108fc029083906000818181858888f19350505050158015610a3b573d6000803e3d6000fd5b506000600283015560038201546040516001600160a01b03909116907f884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a942436490610a849084906111ee565b60405180910390a25050565b600354600160a01b900460ff168015610ab25750600754600160a01b900460ff165b610ace5760405162461bcd60e51b815260040161024f90611149565b6000610ad8610b51565b90506001600160a01b03811615610b4e5760098054610100600160a81b0319166101006001600160a01b038416908102919091179091556040517f745c90b656b4aafe296c8ca35aeacfe56cb96c90e1d320e5da643fff1051b6c090600090a26009805460ff19166004179055610b4e81610ce8565b50565b60045460009060ff166003811115610b7957634e487b7160e01b600052602160045260246000fd5b60005460ff166003811115610b9e57634e487b7160e01b600052602160045260246000fd5b1415610bac57506000610ce5565b600160005460ff166003811115610bd357634e487b7160e01b600052602160045260246000fd5b148015610c045750600360045460ff166003811115610c0257634e487b7160e01b600052602160045260246000fd5b145b80610c625750600260005460ff166003811115610c3157634e487b7160e01b600052602160045260246000fd5b148015610c625750600160045460ff166003811115610c6057634e487b7160e01b600052602160045260246000fd5b145b80610cc05750600360005460ff166003811115610c8f57634e487b7160e01b600052602160045260246000fd5b148015610cc05750600260045460ff166003811115610cbe57634e487b7160e01b600052602160045260246000fd5b145b15610cd757506003546001600160a01b0316610ce5565b506007546001600160a01b03165b90565b6003546001600160a01b0382811691161415610d385760085460028054600090610d139084906111f7565b909155505060085460068054600090610d2d90849061120f565b90915550610b4e9050565b60085460068054600090610d4d9084906111f7565b909155505060085460028054600090610d6790849061120f565b909155505050565b6040805160c08101909152806000815260006020820181905260408201819052606082018190526080820181905260a09091015290565b600060208284031215610db7578081fd5b81356001600160a01b0381168114610dcd578182fd5b9392505050565b600060208284031215610de5578081fd5b5035919050565b60008060408385031215610dfe578081fd5b823560ff81168114610e0e578182fd5b946020939093013593505050565b60048110610e2c57610e2c61123c565b9052565b60f89290921b6001600160f81b0319168252600182015260210190565b6001600160a01b0391909116815260200190565b6020810160058310610e7557610e7561123c565b91905290565b60c08101610e898289610e1c565b602082019690965260408101949094526001600160a01b0392909216606084015215156080830152151560a090910152919050565b6020808252604b908201527f52505347616d653a2045697468657220796f75722073616c74206f72206d6f7660408201527f65206973206e6f742073616d6520617320796f7572207375626d69747465642060608201526a686173686564206d6f766560a81b608082015260a00190565b60208082526032908201527f52505347616d653a20626f746820706c61796572732068617665206e6f7420736040820152713ab136b4ba3a32b21036b7bb32903cb2ba1760711b606082015260800190565b6020808252602c908201527f52505347616d653a20796f75206861766520616c7265616479207375626d697460408201526b74656420746865206d6f766560a01b606082015260800190565b6020808252602d908201527f52505347616d653a20596f7520646f6e2774206861766520616e797468696e6760408201526c20746f2077697468647261772160981b606082015260800190565b60208082526023908201527f596f75206861766520616c72656164792072657665616c656420796f7572206d6040820152626f766560e81b606082015260800190565b6020808252602b908201527f52505347616d653a2042616c616e6365206e6f7420656e6f7567682c2053656e60408201526a19081b5bdc9948199d5b9960aa1b606082015260800190565b6020808252601c908201527f52505347616d653a2047616d6520756e6465722070726f677265737300000000604082015260600190565b6020808252818101527f52505347616d653a2067616d65206e6f7420756e6465722070726f6772657373604082015260600190565b6020808252601b908201527a292829a3b0b6b29d102737ba1030903b30b634b210383630bcb2b960291b604082015260600190565b6020808252602e908201527f52505347616d653a20506c61796572732068617665206e6f74207375626d697460408201526d746564207468656972206d6f766560901b606082015260800190565b600060c0820190506111aa828451610e1c565b602083015160208301526040830151604083015260018060a01b03606084015116606083015260808301511515608083015260a0830151151560a083015292915050565b90815260200190565b6000821982111561120a5761120a611226565b500190565b60008282101561122157611221611226565b500390565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052602160045260246000fdfea2646970667358221220d78d7c361342dc576ab19b24730bdf1aed22db8616a3cbeb282b249c093bc02264736f6c63430008000033";
