// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;
import "./Papa.sol";

contract Son is Papa {
    string private school;

    function setSchool(string memory _school) public {
        school = _school;
    }

    function getSchool() public view returns (string memory) {
        return school;
    }

}
