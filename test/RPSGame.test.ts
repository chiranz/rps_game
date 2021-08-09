import { assert } from "chai";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { RPSGame, RPSGame__factory } from "../typechain/index";

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

  it("Should allow deployer to deposit bet and update balance", async function () {
    await rpsGameContract.submitBet({
      value: ethers.utils.parseEther(BET_AMOUNT),
    });
    const player = await rpsGameContract.playerA();
    assert.equal(ethers.utils.formatEther(player.balance), BET_AMOUNT);

    // When player A deposits bet Gamestate should update to initialized
    const gameState = await rpsGameContract.gameState();
    assert.equal(gameState, 1);
  });
  it("Should allow player B to deposit bet and update balance", async function () {
    await rpsGameContract.connect(signers[0]).submitBet({
      value: ethers.utils.parseEther(BET_AMOUNT),
    });
    const player = await rpsGameContract.playerB();
    assert.equal(ethers.utils.formatEther(player.balance), BET_AMOUNT);

    // When player B deposits bet Gamestate should update to Progress
    const gameState = await rpsGameContract.gameState();
    assert.equal(gameState, 2);
  });
});
