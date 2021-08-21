//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./RPSGame.sol";

contract RPSGameFactory {
    address[] public deployedRPSGames;

    function createGame(uint256 betAmount, address opponent) external {
        address newDeployedRPSGame = address(
            new RPSGame(betAmount, msg.sender, opponent)
        );
        deployedRPSGames.push(newDeployedRPSGame);
    }

    function getDeployedGames() external view returns (address[] memory) {
        return deployedRPSGames;
    }
}
