// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract Papa {
    string private name;
    string private age;      // 1 slot
    uint128 private height;  // 0.5 slot
    uint128 private weight;  // 0.5 slot
    uint256[48] __gap;       // uint256 32 bytes
    
    function setName(string memory _name) public {
        name = _name;
    }

    function getName() public view returns (string memory) {
        return name;
    }

}
