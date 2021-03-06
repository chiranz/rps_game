require("@nomiclabs/hardhat-ethers");
const hre = require("hardhat");

async function main() {
  const RPSGame = await hre.ethers.getContractFactory("RPSGame");
  const rpsGame = await RPSGame.deploy(
    hre.ethers.utils.parseEther("0.1"),
    // LOCALHOST
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
    // RINKEBY
    // "0x9bD9b811cD100a5BFD552dFf011b4aB5c60BE100",
    // "0x201E63233530298b5e616bfec0546A345AAEa008"
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
