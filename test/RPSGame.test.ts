import { assert } from "chai";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { RPSGame, RPSGame__factory } from "../typechain/index";

enum GameState {
  Open,
  Initialized,
  Progress,
  Complete,
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
let deployer: SignerWithAddress;
let signers: SignerWithAddress[];

describe("RPS Game", function () {
  before(async () => {
    [deployer, ...signers] = await ethers.getSigners();
    RPSGameFactory = (await ethers.getContractFactory(
      "RPSGame"
    )) as unknown as RPSGame__factory;
    rpsGameContract = await RPSGameFactory.deploy(
      ethers.utils.parseEther(BET_AMOUNT)
    );
    await rpsGameContract.deployed();
  });
  it(`should set bet amount as ${BET_AMOUNT} ETH`, async function () {
    let betAmount = await rpsGameContract.betAmount();
    assert.equal(ethers.utils.formatEther(betAmount), BET_AMOUNT);
  });

  it("Should set deployer as player A with 0 balance", async function () {
    const player = await rpsGameContract.playerA();
    assert.equal(deployer.address, player.addr);
    assert.equal(player.balance.toNumber(), 0);
  });

  it("Should allow deployer to deposit bet and update gameState to initialized", async function () {
    await rpsGameContract.depositBet({
      value: ethers.utils.parseEther(BET_AMOUNT),
    });
    const player = await rpsGameContract.playerA();
    assert.equal(ethers.utils.formatEther(player.balance), BET_AMOUNT);

    // When player A deposits bet Gamestate should update to initialized
    const gameState = await rpsGameContract.gameState();
    assert.equal(gameState, GameState.Initialized);
  });
  it("Should allow player B to deposit bet and update gamestate to progress", async function () {
    await rpsGameContract.connect(signers[0]).depositBet({
      value: ethers.utils.parseEther(BET_AMOUNT),
    });
    const player = await rpsGameContract.playerB();
    assert.equal(ethers.utils.formatEther(player.balance), BET_AMOUNT);
    assert.equal(player.addr, signers[0].address);

    // When player B deposits bet Gamestate should update to Progress
    const gameState = await rpsGameContract.gameState();
    assert.equal(gameState, GameState.Progress);
  });
  it("should check if player A and player B are different accounts", async function () {
    const playerA = await rpsGameContract.playerA();
    const playerB = await rpsGameContract.playerB();
    assert.notEqual(playerA.addr, playerB.addr);
  });
  it("should not allow other's to join once game is under progress", async function () {
    const gameState = await rpsGameContract.gameState();
    assert.equal(gameState, GameState.Progress);
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
    await rpsGameContract.submitMove(Move.Paper);
    const playerA = await rpsGameContract.playerA();

    assert.isTrue(playerA.submitted);
    assert.equal(playerA.move, Move.Paper);
  });
  it("should fail if pick winner is called before game completes", async function () {
    try {
      await rpsGameContract.pickWinner();
      assert(true);
    } catch (err) {
      assert.ok(err);
    }
  });
  it("should allow player B to submit move", async function () {
    // Player b submits move
    await rpsGameContract.connect(signers[0]).submitMove(Move.Scissors);
    const playerB = await rpsGameContract.playerB();

    assert.isTrue(playerB.submitted);
    assert.equal(playerB.move, Move.Scissors);
  });
  it("should fail if player tries to submit move twice", async function () {
    try {
      await rpsGameContract.submitMove(Move.Paper);
      assert(true);
    } catch (err) {
      assert.ok(err);
    }
    try {
      await rpsGameContract.connect(signers[0]).submitMove(Move.Paper);
      assert(true);
    } catch (err) {
      assert.ok(err);
    }
  });
  it("should pick the right winner and update balance", async function () {
    await rpsGameContract.pickWinner();
    rpsGameContract.on("Winner", (address) => {
      assert.equal(address, signers[0].address);
    });

    const playerB = await rpsGameContract.playerB();
    const playerA = await rpsGameContract.playerA();

    assert.equal(ethers.utils.formatEther(playerB.balance), "0.2");
    assert.equal(ethers.utils.formatEther(playerA.balance), "0.0");
  });
});
