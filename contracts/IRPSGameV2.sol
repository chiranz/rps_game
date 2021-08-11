//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IRPSGameV2 {
    enum Move {
        None,
        Rock,
        Paper,
        Scissors
    }
    enum GameState {
        Initialized,
        Open,
        Progress
    }
    struct Player {
        address addr;
        uint256 balance;
        bytes32 move;
        bool revealed;
    }
    struct Game {
        Player playerA;
        Player playerB;
        address winner;
        GameState gameState;
        uint256 betAmount;
    }
    event Draw();
    event Challenge(address indexed _from, address indexed _to);
    event DepositSuccess(address indexed _from, uint256 value);
    event ResetGame();
    event Replay(address indexed challanger, address indexed _player);
    event AcceptChallenge(address indexed _challenger);
    event GameStarted(address indexed player1, address indexed player2);
    event GameEnded(address indexed _winner);

    function depositBet() external payable;

    // Should move submitted be bytes 32 hash of signed message?
    function submitMove(bytes32 _moveHash) external;

    function revealMove(Move _move, string memory salt) external;

    function challenge() external;

    function withdrawFund() external;

    // Internal function
    function resetGame() external;

    function getWinner() external view returns (address);

    function announceWinner() external;

    function icentivize() external;
}
