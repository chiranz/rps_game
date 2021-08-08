import { assert } from "chai";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { RPSToken, RPSToken__factory } from "../typechain/index";

let RPSTokenContract: RPSToken__factory;
let rpsTokenContract: RPSToken;

let deployer: SignerWithAddress;
let signers: SignerWithAddress[];

beforeEach(async () => {
  [deployer, ...signers] = await ethers.getSigners();
  RPSTokenContract = (await ethers.getContractFactory(
    "RPSToken"
  )) as unknown as RPSToken__factory;
  rpsTokenContract = await RPSTokenContract.deploy("RPSToken", "RPST");
  await rpsTokenContract.deployed();
});

describe("RPS Token", function () {
  it("should mint tokens for the deployer", async function () {
    const deployerBalance = await rpsTokenContract.balanceOf(deployer.address);
    assert.equal(ethers.utils.formatEther(deployerBalance), "100.0");
  });

  it("should mint token for different minters", async () => {
    const [minter1, minter2] = signers;

    await rpsTokenContract.connect(minter1).mint();
    const minter1Balance = await rpsTokenContract.balanceOf(minter1.address);
    assert.equal(ethers.utils.formatEther(minter1Balance), "100.0");

    await rpsTokenContract.connect(minter2).mint();
    const minter2Balance = await rpsTokenContract.balanceOf(minter2.address);
    assert.equal(ethers.utils.formatEther(minter2Balance), "100.0");
  });
});
