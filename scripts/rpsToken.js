const hre = require("hardhat");

async function main() {
  const RPSToken = await hre.ethers.getContractFactory("RPSToken");
  const rpsToken = await RPSToken.deploy("RPS Token", "RPST");

  await rpsToken.deployed();

  console.log("RPS Token deployed to:", rpsToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
