//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RPSToken is ERC20 {
    mapping(address => bool) private claimed;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 100 * 10**decimals());
        claimed[msg.sender] = true;
    }

    function mint() external returns (bool) {
        require(
            !claimed[msg.sender],
            "RPSToken: You have already minted your share"
        );
        _mint(msg.sender, 100 * 10**decimals());
        claimed[msg.sender] = true;
        return true;
    }

    function burn(uint256 amount) external returns (bool) {
        _burn(msg.sender, amount);
        return true;
    }
}
