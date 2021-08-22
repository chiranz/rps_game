require("@nomiclabs/hardhat-ethers");
const hre = require("hardhat");

async function main() {
  const RPSGameFactory = await hre.ethers.getContractFactory("RPSGameFactory");
  const rpsGameFactory = await RPSGameFactory.deploy();

  await rpsGameFactory.deployed();

  console.log("RPS Game Factory deployed to:", rpsGameFactory.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
