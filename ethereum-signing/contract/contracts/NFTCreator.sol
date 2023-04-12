// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.8.10 <0.9.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol';

contract NFTCreator is Initializable {
	using ECDSAUpgradeable for bytes32;
	address public admin;

	function initialize() public initializer {
		admin = msg.sender;
	}

	function createNFT(bytes calldata signature) public view returns (bool) {
		require((getSigner(signature) == admin), 'invalid authorization signature');
		return true;
	}

	function getSigner(bytes calldata signature) public view returns (address) {
		require(admin != address(0), 'whitelist not enabled');

		string memory name = "CreateNFT";
		string memory version = "1";
		uint256 chainId = block.chainid;
		address verifyingContract = address(this);

		string memory contents = "Executor can create NFTs with this message";

		string memory EIP712_DOMAIN_TYPE = "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)";
		string memory CREATOR_TYPE = "Creator(address executor,string contents)";

		bytes32 DOMAIN_SEPARATOR = keccak256(
			abi.encode(
				keccak256(abi.encodePacked(EIP712_DOMAIN_TYPE)),
				keccak256(abi.encodePacked(name)),
				keccak256(abi.encodePacked(version)),
				chainId,
				verifyingContract
			)
		);
		bytes32 digest = keccak256(
			abi.encodePacked(
				"\x19\x01",
				DOMAIN_SEPARATOR,
				keccak256(
					abi.encode(
						keccak256(abi.encodePacked(CREATOR_TYPE)),
						msg.sender,
						keccak256(abi.encodePacked(contents))
					)
				)
			)
		);
		address recoveredAddress = digest.recover(signature);
		return recoveredAddress;
	}

	function setAdmin(address _newAdmin) external {
		require(admin == msg.sender, 'invalid authorization');
		admin = _newAdmin;
	}

}
