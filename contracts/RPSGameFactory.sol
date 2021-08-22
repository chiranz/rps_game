//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./RPSGame.sol";

contract RPSGameFactory {
    struct Game {
        address gameAddress;
        address player;
        address opponent;
        uint256 betAmount;
    }
    Game[] deployedRPSGames;

    event RPSGameCreated(Game game);

    function createGame(uint256 betAmount, address opponent) external {
        address gameAddress = address(
            new RPSGame(betAmount, msg.sender, opponent)
        );
        Game memory newGame = Game(
            gameAddress,
            msg.sender,
            opponent,
            betAmount
        );
        deployedRPSGames.push(newGame);

        emit RPSGameCreated(newGame);
    }

    function getDeployedGames() external view returns (Game[] memory) {
        return deployedRPSGames;
    }
}
