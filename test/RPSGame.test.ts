import { assert } from "chai";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { RPSGame, RPSGame__factory } from "../typechain/index";

enum GameStage {
  Open,
  BetsDeposited,
  MovesSubmitted,
  MoveRevealed,
  Completed,
}

enum Move {
  None,
  Rock,
  Paper,
  Scissors,
}

let RPSGameFactory: RPSGame__factory;
let rpsGameContract: RPSGame;
const BET_AMOUNT = "0.1";
let signerA: SignerWithAddress;
let signerB: SignerWithAddress;
const saltA = ethers.utils.id("saltA");
const saltB = ethers.utils.id("saltB");

const getHashedMove = (_move: Move, _salt: string) => {
  const hashedMove = ethers.utils.solidityKeccak256(
    ["uint8", "bytes32"],
    [_move, _salt]
  );
  return hashedMove;
};

let signers: SignerWithAddress[];

describe("RPS Game", function () {
  before(async () => {
    [signerA, signerB, ...signers] = await ethers.getSigners();
    RPSGameFactory = (await ethers.getContractFactory(
      "RPSGame"
    )) as unknown as RPSGame__factory;
    rpsGameContract = await RPSGameFactory.deploy(
      ethers.utils.parseEther(BET_AMOUNT),
      signerB.address
    );
    await rpsGameContract.deployed();
  });
  it(`should set bet amount as ${BET_AMOUNT} ETH`, async function () {
    let betAmount = await rpsGameContract.betAmount();
    assert.equal(ethers.utils.formatEther(betAmount), BET_AMOUNT);
  });
  it("should fetch both players", async function () {
    const playerA = await rpsGameContract.getPlayer(signerA.address);
    const playerB = await rpsGameContract.getPlayer(signerB.address);
    assert.equal(playerA.addr, signerA.address);
    assert.equal(playerB.addr, signerB.address);
  });

  it("Should set deployer as player A with 0 balance", async function () {
    const player = await rpsGameContract.playerA();
    assert.equal(signerA.address, player.addr);
    assert.equal(player.balance.toNumber(), 0);
  });

  it("Should allow deployer to deposit bet", async function () {
    await rpsGameContract.depositBet({
      value: ethers.utils.parseEther(BET_AMOUNT),
    });
    const player = await rpsGameContract.playerA();
    assert.equal(ethers.utils.formatEther(player.balance), BET_AMOUNT);

    // When player A deposits bet Gamestate should update to open
    const gameStage = await rpsGameContract.gameStage();
    assert.equal(gameStage, GameStage.Open);
  });
  it("should allow player B to deposit fund", async function () {
    await rpsGameContract.connect(signerB).depositBet({
      value: ethers.utils.parseEther(BET_AMOUNT),
    });
    const player = await rpsGameContract.playerB();
    assert.equal(ethers.utils.formatEther(player.balance), BET_AMOUNT);
    assert.equal(player.addr, signerB.address);

    // When player B deposits bet Gamestate should update to Progress
  });
  it("should update game state to bet deposited once both players deposit bet", async function () {
    const gameStage = await rpsGameContract.gameStage();
    assert.equal(gameStage, GameStage.BetsDeposited);
  });
  it("should check if player A and player B are different accounts", async function () {
    const playerA = await rpsGameContract.playerA();
    const playerB = await rpsGameContract.playerB();
    assert.notEqual(playerA.addr, playerB.addr);
  });
  it("should not allow anyone beside players to deposit bet", async function () {
    try {
      await rpsGameContract.connect(signers[1]).depositBet({
        value: ethers.utils.parseEther(BET_AMOUNT),
      });
      assert(true);
    } catch (err) {
      assert.ok(err);
    }
  });

  it("should allow player A to submit move", async function () {
    // Player a submits move
    const _hashedMove = getHashedMove(Move.Paper, saltA);
    await rpsGameContract.submitMove(_hashedMove);
    const playerA = await rpsGameContract.playerA();

    assert.isTrue(playerA.submitted);
    assert.equal(playerA.hashedMove, _hashedMove);
  });

  it("should allow player B to submit move", async function () {
    // Player b submits move
    const _hashedMove = getHashedMove(Move.Rock, saltB);
    await rpsGameContract.connect(signerB).submitMove(_hashedMove);
    const playerB = await rpsGameContract.playerB();

    assert.isTrue(playerB.submitted);
    assert.equal(playerB.hashedMove, _hashedMove);
  });
  it("should fail if player tries to submit move twice", async function () {
    try {
      const _hashedMove = getHashedMove(Move.Paper, saltA);
      await rpsGameContract.submitMove(_hashedMove);
      assert(true);
    } catch (err) {
      assert.ok(err);
    }
    try {
      const _hashedMove = getHashedMove(Move.Rock, saltB);
      await rpsGameContract.connect(signerB).submitMove(_hashedMove);
      assert(true);
    } catch (err) {
      assert.ok(err);
    }
  });
  it("should update the gamestate to moves submitted", async function () {
    const gameStage = await rpsGameContract.gameStage();
    assert.equal(gameStage, GameStage.MovesSubmitted);
  });
  it("should revert if wrong move or salt is passed to revealMove", async function () {
    try {
      await rpsGameContract.revealMove(Move.Rock, saltA);
      assert(true);
    } catch (err) {
      assert.ok(err);
    }
  });
  it("should set revealed of a player to true and save revealed move", async function () {
    // Player A
    await rpsGameContract.revealMove(Move.Paper, saltA);
    const playerA = await rpsGameContract.playerA();
    assert.isTrue(playerA.revealed);
    assert.equal(playerA.move, Move.Paper);
  });
  it("should pick the right winner and update balance", async function () {
    // Player B
    await rpsGameContract.connect(signerB).revealMove(Move.Rock, saltB);
    rpsGameContract.on("Winner", (address) => {
      assert.equal(address, signerA.address);
    });

    const playerA = await rpsGameContract.playerA();
    assert.equal(ethers.utils.formatEther(playerA.balance), "0.2");
  });
  it("Should reset the game.", async function () {
    const gameStage = await rpsGameContract.gameStage();
    const playerA = await rpsGameContract.playerA();
    const playerB = await rpsGameContract.playerB();
    assert.equal(playerA.move, Move.None);
    assert.equal(playerB.move, Move.None);
    assert.equal(playerA.submitted, false);
    assert.equal(playerB.submitted, false);
    assert.equal(playerA.revealed, false);
    assert.equal(playerB.revealed, false);
    assert.equal(gameStage, GameStage.Open);
  });
});
