// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Membership is ERC721Upgradeable, OwnableUpgradeable {
  using Counters for Counters.Counter;
  Counters.Counter private tokenIdCounter;
  using StringsUpgradeable for uint256;
  
  string private tokenBaseURI;
  uint256[] private membershipIds;
  mapping(uint256 => uint256) private membershipTokens;
  mapping(uint256 => uint256) private membershipPrices;

  event Mint(address owner, uint256 tokenId);

  function initialize() initializer public {
    __ERC721_init("EthosMemberShip", "EMS");
    __Ownable_init();
  }

  function setTokenBaseURI(string memory __newBaseURI) public onlyOwner {
    tokenBaseURI = __newBaseURI;
  }

  function setMembershipPrice(uint256 __membershipId, uint256 __price) public onlyOwner {
    membershipPrices[__membershipId] = __price;
    membershipIds.push(__membershipId);
  }
  
  function mint(uint256 __membershipId) external payable returns (uint256) {
    require(isMembershipId(__membershipId), "NFT: invalid membership id");
    require(membershipPrices[__membershipId] == msg.value, "NFT: invalid price");
    tokenIdCounter.increment();
    uint256 _tokenId = tokenIdCounter.current();
    _safeMint(msg.sender, _tokenId);
    membershipTokens[_tokenId] = __membershipId;
    emit Mint(msg.sender, _tokenId);
    return _tokenId;
  }

  function tokenURI(uint256 __tokenID) public view override returns (string memory) {
    require(_exists(__tokenID), "ERC721Metadata: URI query for nonexistent token");
    return string(abi.encodePacked(tokenBaseURI, "/", membershipTokens[__tokenID].toString(), ".json"));
  }

  function isMembershipId(uint256 __membershipId) public view returns (bool) {
    for (uint256 i = 0; i < membershipIds.length; i++) {
      if (membershipIds[i] == __membershipId) {
        return true;
      }
    }
    return false;
  }

}
