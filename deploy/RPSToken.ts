module.exports = async ({
  getNamedAccounts,
  deployments,
  getChainId,
  getUnnamedAccounts,
}) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("RPSToken", {
    from: deployer,
    gas: 4000000,
    args: ["RPS Token", "RPST"],
  });
};
