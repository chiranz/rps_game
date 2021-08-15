require("@nomiclabs/hardhat-ethers");
const hre = require("hardhat");

async function main() {
  const RPSGame = await hre.ethers.getContractFactory("RPSGame");
  const rpsGame = await RPSGame.deploy(
    hre.ethers.utils.parseEther("0.1"),
    "0x9bD9b811cD100a5BFD552dFf011b4aB5c60BE100"
  );

  await rpsGame.deployed();

  console.log("RPS Game deployed to:", rpsGame.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
