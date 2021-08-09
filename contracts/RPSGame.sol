//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.6;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RPSGame {
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

    event ResetGame();
    event Winner(address indexed _winner);

    modifier isPlayer() {
        require(
            msg.sender == playerA.addr || msg.sender == playerB.addr,
            "RPSGame: Not a valid player"
        );
        _;
    }

    function submitBet() external payable {
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
        player.move = _move;
        player.submitted = true;
        if (playerA.submitted && playerB.submitted) {
            gameState = GameState.Complete;
            address _winner = getWinner();
            if (_winner != address(0)) {
                emit Winner(_winner);

                payWinner(_winner);
            }
            resetGame();
        }
    }

    function payWinner(address _winner) internal {
        // Update contract balances of winners and loosers
        payable(_winner).transfer(betAmount * 2);
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
