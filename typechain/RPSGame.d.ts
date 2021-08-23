/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface RPSGameInterface extends ethers.utils.Interface {
  functions: {
    "betAmount()": FunctionFragment;
    "gameStage()": FunctionFragment;
    "getPlayer(address)": FunctionFragment;
    "playerA()": FunctionFragment;
    "playerB()": FunctionFragment;
    "resetGame()": FunctionFragment;
    "revealMove(uint8,bytes32)": FunctionFragment;
    "submitMove(bytes32)": FunctionFragment;
    "winner()": FunctionFragment;
    "withdrawFund()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "betAmount", values?: undefined): string;
  encodeFunctionData(functionFragment: "gameStage", values?: undefined): string;
  encodeFunctionData(functionFragment: "getPlayer", values: [string]): string;
  encodeFunctionData(functionFragment: "playerA", values?: undefined): string;
  encodeFunctionData(functionFragment: "playerB", values?: undefined): string;
  encodeFunctionData(functionFragment: "resetGame", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "revealMove",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "submitMove",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "winner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdrawFund",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "betAmount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "gameStage", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getPlayer", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "playerA", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "playerB", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "resetGame", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "revealMove", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "submitMove", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "winner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawFund",
    data: BytesLike
  ): Result;

  events: {
    "Deposit(address)": EventFragment;
    "GameComplete()": EventFragment;
    "GameStageChanged(uint8)": EventFragment;
    "ResetGame()": EventFragment;
    "RevealMove(address)": EventFragment;
    "SubmitMove(address)": EventFragment;
    "Winner(address)": EventFragment;
    "Withdraw(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GameComplete"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GameStageChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ResetGame"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RevealMove"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SubmitMove"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Winner"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdraw"): EventFragment;
}

export class RPSGame extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: RPSGameInterface;

  functions: {
    betAmount(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    "betAmount()"(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    gameStage(overrides?: CallOverrides): Promise<{
      0: number;
    }>;

    "gameStage()"(overrides?: CallOverrides): Promise<{
      0: number;
    }>;

    getPlayer(
      _player: string,
      overrides?: CallOverrides
    ): Promise<{
      0: {
        move: number;
        hashedMove: string;
        balance: BigNumber;
        addr: string;
        submitted: boolean;
        revealed: boolean;
        0: number;
        1: string;
        2: BigNumber;
        3: string;
        4: boolean;
        5: boolean;
      };
    }>;

    "getPlayer(address)"(
      _player: string,
      overrides?: CallOverrides
    ): Promise<{
      0: {
        move: number;
        hashedMove: string;
        balance: BigNumber;
        addr: string;
        submitted: boolean;
        revealed: boolean;
        0: number;
        1: string;
        2: BigNumber;
        3: string;
        4: boolean;
        5: boolean;
      };
    }>;

    playerA(overrides?: CallOverrides): Promise<{
      move: number;
      hashedMove: string;
      balance: BigNumber;
      addr: string;
      submitted: boolean;
      revealed: boolean;
      0: number;
      1: string;
      2: BigNumber;
      3: string;
      4: boolean;
      5: boolean;
    }>;

    "playerA()"(overrides?: CallOverrides): Promise<{
      move: number;
      hashedMove: string;
      balance: BigNumber;
      addr: string;
      submitted: boolean;
      revealed: boolean;
      0: number;
      1: string;
      2: BigNumber;
      3: string;
      4: boolean;
      5: boolean;
    }>;

    playerB(overrides?: CallOverrides): Promise<{
      move: number;
      hashedMove: string;
      balance: BigNumber;
      addr: string;
      submitted: boolean;
      revealed: boolean;
      0: number;
      1: string;
      2: BigNumber;
      3: string;
      4: boolean;
      5: boolean;
    }>;

    "playerB()"(overrides?: CallOverrides): Promise<{
      move: number;
      hashedMove: string;
      balance: BigNumber;
      addr: string;
      submitted: boolean;
      revealed: boolean;
      0: number;
      1: string;
      2: BigNumber;
      3: string;
      4: boolean;
      5: boolean;
    }>;

    resetGame(overrides?: Overrides): Promise<ContractTransaction>;

    "resetGame()"(overrides?: Overrides): Promise<ContractTransaction>;

    revealMove(
      _move: BigNumberish,
      _salt: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "revealMove(uint8,bytes32)"(
      _move: BigNumberish,
      _salt: BytesLike,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    submitMove(
      _hashedMove: BytesLike,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    "submitMove(bytes32)"(
      _hashedMove: BytesLike,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    winner(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    "winner()"(overrides?: CallOverrides): Promise<{
      0: string;
    }>;

    withdrawFund(overrides?: Overrides): Promise<ContractTransaction>;

    "withdrawFund()"(overrides?: Overrides): Promise<ContractTransaction>;
  };

  betAmount(overrides?: CallOverrides): Promise<BigNumber>;

  "betAmount()"(overrides?: CallOverrides): Promise<BigNumber>;

  gameStage(overrides?: CallOverrides): Promise<number>;

  "gameStage()"(overrides?: CallOverrides): Promise<number>;

  getPlayer(
    _player: string,
    overrides?: CallOverrides
  ): Promise<{
    move: number;
    hashedMove: string;
    balance: BigNumber;
    addr: string;
    submitted: boolean;
    revealed: boolean;
    0: number;
    1: string;
    2: BigNumber;
    3: string;
    4: boolean;
    5: boolean;
  }>;

  "getPlayer(address)"(
    _player: string,
    overrides?: CallOverrides
  ): Promise<{
    move: number;
    hashedMove: string;
    balance: BigNumber;
    addr: string;
    submitted: boolean;
    revealed: boolean;
    0: number;
    1: string;
    2: BigNumber;
    3: string;
    4: boolean;
    5: boolean;
  }>;

  playerA(overrides?: CallOverrides): Promise<{
    move: number;
    hashedMove: string;
    balance: BigNumber;
    addr: string;
    submitted: boolean;
    revealed: boolean;
    0: number;
    1: string;
    2: BigNumber;
    3: string;
    4: boolean;
    5: boolean;
  }>;

  "playerA()"(overrides?: CallOverrides): Promise<{
    move: number;
    hashedMove: string;
    balance: BigNumber;
    addr: string;
    submitted: boolean;
    revealed: boolean;
    0: number;
    1: string;
    2: BigNumber;
    3: string;
    4: boolean;
    5: boolean;
  }>;

  playerB(overrides?: CallOverrides): Promise<{
    move: number;
    hashedMove: string;
    balance: BigNumber;
    addr: string;
    submitted: boolean;
    revealed: boolean;
    0: number;
    1: string;
    2: BigNumber;
    3: string;
    4: boolean;
    5: boolean;
  }>;

  "playerB()"(overrides?: CallOverrides): Promise<{
    move: number;
    hashedMove: string;
    balance: BigNumber;
    addr: string;
    submitted: boolean;
    revealed: boolean;
    0: number;
    1: string;
    2: BigNumber;
    3: string;
    4: boolean;
    5: boolean;
  }>;

  resetGame(overrides?: Overrides): Promise<ContractTransaction>;

  "resetGame()"(overrides?: Overrides): Promise<ContractTransaction>;

  revealMove(
    _move: BigNumberish,
    _salt: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "revealMove(uint8,bytes32)"(
    _move: BigNumberish,
    _salt: BytesLike,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  submitMove(
    _hashedMove: BytesLike,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  "submitMove(bytes32)"(
    _hashedMove: BytesLike,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  winner(overrides?: CallOverrides): Promise<string>;

  "winner()"(overrides?: CallOverrides): Promise<string>;

  withdrawFund(overrides?: Overrides): Promise<ContractTransaction>;

  "withdrawFund()"(overrides?: Overrides): Promise<ContractTransaction>;

  callStatic: {
    betAmount(overrides?: CallOverrides): Promise<BigNumber>;

    "betAmount()"(overrides?: CallOverrides): Promise<BigNumber>;

    gameStage(overrides?: CallOverrides): Promise<number>;

    "gameStage()"(overrides?: CallOverrides): Promise<number>;

    getPlayer(
      _player: string,
      overrides?: CallOverrides
    ): Promise<{
      move: number;
      hashedMove: string;
      balance: BigNumber;
      addr: string;
      submitted: boolean;
      revealed: boolean;
      0: number;
      1: string;
      2: BigNumber;
      3: string;
      4: boolean;
      5: boolean;
    }>;

    "getPlayer(address)"(
      _player: string,
      overrides?: CallOverrides
    ): Promise<{
      move: number;
      hashedMove: string;
      balance: BigNumber;
      addr: string;
      submitted: boolean;
      revealed: boolean;
      0: number;
      1: string;
      2: BigNumber;
      3: string;
      4: boolean;
      5: boolean;
    }>;

    playerA(overrides?: CallOverrides): Promise<{
      move: number;
      hashedMove: string;
      balance: BigNumber;
      addr: string;
      submitted: boolean;
      revealed: boolean;
      0: number;
      1: string;
      2: BigNumber;
      3: string;
      4: boolean;
      5: boolean;
    }>;

    "playerA()"(overrides?: CallOverrides): Promise<{
      move: number;
      hashedMove: string;
      balance: BigNumber;
      addr: string;
      submitted: boolean;
      revealed: boolean;
      0: number;
      1: string;
      2: BigNumber;
      3: string;
      4: boolean;
      5: boolean;
    }>;

    playerB(overrides?: CallOverrides): Promise<{
      move: number;
      hashedMove: string;
      balance: BigNumber;
      addr: string;
      submitted: boolean;
      revealed: boolean;
      0: number;
      1: string;
      2: BigNumber;
      3: string;
      4: boolean;
      5: boolean;
    }>;

    "playerB()"(overrides?: CallOverrides): Promise<{
      move: number;
      hashedMove: string;
      balance: BigNumber;
      addr: string;
      submitted: boolean;
      revealed: boolean;
      0: number;
      1: string;
      2: BigNumber;
      3: string;
      4: boolean;
      5: boolean;
    }>;

    resetGame(overrides?: CallOverrides): Promise<void>;

    "resetGame()"(overrides?: CallOverrides): Promise<void>;

    revealMove(
      _move: BigNumberish,
      _salt: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "revealMove(uint8,bytes32)"(
      _move: BigNumberish,
      _salt: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    submitMove(
      _hashedMove: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "submitMove(bytes32)"(
      _hashedMove: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    winner(overrides?: CallOverrides): Promise<string>;

    "winner()"(overrides?: CallOverrides): Promise<string>;

    withdrawFund(overrides?: CallOverrides): Promise<void>;

    "withdrawFund()"(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    Deposit(depositor: string | null): EventFilter;

    GameComplete(): EventFilter;

    GameStageChanged(gameStage: null): EventFilter;

    ResetGame(): EventFilter;

    RevealMove(player: string | null): EventFilter;

    SubmitMove(player: string | null): EventFilter;

    Winner(_winner: string | null): EventFilter;

    Withdraw(player: string | null, amount: null): EventFilter;
  };

  estimateGas: {
    betAmount(overrides?: CallOverrides): Promise<BigNumber>;

    "betAmount()"(overrides?: CallOverrides): Promise<BigNumber>;

    gameStage(overrides?: CallOverrides): Promise<BigNumber>;

    "gameStage()"(overrides?: CallOverrides): Promise<BigNumber>;

    getPlayer(_player: string, overrides?: CallOverrides): Promise<BigNumber>;

    "getPlayer(address)"(
      _player: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    playerA(overrides?: CallOverrides): Promise<BigNumber>;

    "playerA()"(overrides?: CallOverrides): Promise<BigNumber>;

    playerB(overrides?: CallOverrides): Promise<BigNumber>;

    "playerB()"(overrides?: CallOverrides): Promise<BigNumber>;

    resetGame(overrides?: Overrides): Promise<BigNumber>;

    "resetGame()"(overrides?: Overrides): Promise<BigNumber>;

    revealMove(
      _move: BigNumberish,
      _salt: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "revealMove(uint8,bytes32)"(
      _move: BigNumberish,
      _salt: BytesLike,
      overrides?: Overrides
    ): Promise<BigNumber>;

    submitMove(
      _hashedMove: BytesLike,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    "submitMove(bytes32)"(
      _hashedMove: BytesLike,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    winner(overrides?: CallOverrides): Promise<BigNumber>;

    "winner()"(overrides?: CallOverrides): Promise<BigNumber>;

    withdrawFund(overrides?: Overrides): Promise<BigNumber>;

    "withdrawFund()"(overrides?: Overrides): Promise<BigNumber>;
  };

  populateTransaction: {
    betAmount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "betAmount()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    gameStage(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "gameStage()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPlayer(
      _player: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getPlayer(address)"(
      _player: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    playerA(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "playerA()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    playerB(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "playerB()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    resetGame(overrides?: Overrides): Promise<PopulatedTransaction>;

    "resetGame()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    revealMove(
      _move: BigNumberish,
      _salt: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "revealMove(uint8,bytes32)"(
      _move: BigNumberish,
      _salt: BytesLike,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    submitMove(
      _hashedMove: BytesLike,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    "submitMove(bytes32)"(
      _hashedMove: BytesLike,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    winner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "winner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdrawFund(overrides?: Overrides): Promise<PopulatedTransaction>;

    "withdrawFund()"(overrides?: Overrides): Promise<PopulatedTransaction>;
  };
}
