//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract RPSGame {
    enum GameState {
        Open,
        Initialized,
        Progress,
        Complete
    }

    enum Move {
        None,
        Rock,
        Paper,
        Scissors
    }
    Player public playerA;
    Player public playerB;
    uint256 public betAmount;
    GameState public gameState;

    struct Player {
        Move move;
        uint256 balance;
        address addr;
        bool submitted;
    }

    constructor(uint256 _betAmount) payable {
        betAmount = _betAmount;
        playerA.addr = msg.sender;
    }

    event ResetGame();
    event Winner(address indexed _winner);
    event Draw();

    modifier isPlayer() {
        require(
            msg.sender == playerA.addr || msg.sender == playerB.addr,
            "RPSGame: Not a valid player"
        );
        _;
    }

    function depositBet() external payable {
        require(
            gameState != GameState.Progress,
            "RPSGame: Game under progress"
        );
        // Check if msg.sender is playerA?
        bool isPlayerA = msg.sender == playerA.addr;
        // If not initialize PlayerB
        if (!isPlayerA) {
            playerB.addr = msg.sender;
        }
        // adding balance such player may call function with less than bet amount
        // msg.value get's stuck in the contract
        isPlayerA ? playerA.balance += msg.value : playerB.balance += msg.value;
        // Check if value sent is more than bet amount
        uint256 balance = isPlayerA ? playerA.balance : playerB.balance;
        require(
            balance >= betAmount,
            "RPSGame: Balance not enough, Send more fund"
        );
        // If yes change gamestate [Initialized or Progress]
        if (isPlayerA) {
            gameState = GameState.Initialized;
        } else {
            gameState = GameState.Progress;
        }
    }

    function submitMove(Move _move) external isPlayer {
        require(
            gameState == GameState.Progress,
            "RPSGame: game not under progress"
        );
        Player storage player = playerA.addr == msg.sender ? playerA : playerB;

        require(
            !player.submitted,
            "RPSGame: you have already submitted the move"
        );
        player.move = Move(_move);
        player.submitted = true;
        if (playerA.submitted && playerB.submitted) {
            gameState = GameState.Complete;
        }
    }

    function pickWinner() external isPlayer {
        require(
            playerA.submitted && playerB.submitted,
            "RPSGame: Players have not submitted their move"
        );
        gameState = GameState.Complete;
        address _winner = getWinner();
        if (_winner != address(0)) {
            emit Winner(_winner);
            incentivize(_winner);
        } else {
            emit Draw();
        }

        resetGame();
    }

    function incentivize(address _winner) internal {
        // Update contract balances of winners and loosers
        if (_winner == playerA.addr) {
            playerA.balance += betAmount;
            playerB.balance -= betAmount;
        } else {
            playerB.balance += betAmount;
            playerA.balance -= betAmount;
        }
    }

    function withdrawFund() external isPlayer {
        Player storage player = msg.sender == playerA.addr ? playerA : playerB;
        require(
            player.balance > 0,
            "RPSGame: You don't have anything to withdraw!"
        );
        require(
            !(gameState == GameState.Progress),
            "RPSGame: You cannot withdraw fund while game is under progress"
        );
        payable(player.addr).transfer(player.balance);
    }

    function getWinner() internal view returns (address) {
        if (playerA.move == playerB.move) return address(0);
        if (
            (playerA.move == Move.Rock && playerB.move == Move.Scissors) ||
            (playerA.move == Move.Paper && playerB.move == Move.Rock) ||
            (playerA.move == Move.Scissors && playerB.move == Move.Paper)
        ) {
            return playerA.addr;
        }
        return playerB.addr;
    }

    function resetGame() internal {
        playerA.move = Move.None;
        playerA.submitted = false;
        playerB.move = Move.None;
        playerB.submitted = false;
        emit ResetGame();
    }
}
