import { assert } from "chai";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { RPSGameFactory, RPSGameFactory__factory } from "../typechain/index";

let RPSGameFactory_: RPSGameFactory__factory;
let rpsGameFactoryContract: RPSGameFactory;
const BET_AMOUNT = "0.1";
let signerA: SignerWithAddress;
let signerB: SignerWithAddress;

describe("RPSGameFactory", async function () {
  before(async () => {
    [signerA, signerB] = await ethers.getSigners();
    RPSGameFactory_ = (await ethers.getContractFactory(
      "RPSGameFactory"
    )) as unknown as RPSGameFactory__factory;
    rpsGameFactoryContract = await RPSGameFactory_.deploy();
    await rpsGameFactoryContract.deployed();
  });
  it("Should give empty list of deployed campaigns", async () => {
    const deployedContracts = await rpsGameFactoryContract.getDeployedGames();
    assert.equal(deployedContracts.length, 0);
  });
  it("should deploy a RPSGame contract", async () => {
    await rpsGameFactoryContract.createGame(
      ethers.utils.parseEther(BET_AMOUNT),
      signerB.address
    );
    const deployedContracts = await rpsGameFactoryContract.getDeployedGames();
    assert.equal(deployedContracts.length, 1);
  });
  it("should emit RPSGameCreated event", async () => {
    await rpsGameFactoryContract.createGame(
      ethers.utils.parseEther(BET_AMOUNT),
      signerB.address
    );
    rpsGameFactoryContract.on("RPSGameCreated", () => {
      console.log("Event emitted");
    });
  });
});
