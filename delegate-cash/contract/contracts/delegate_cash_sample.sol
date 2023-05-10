// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

interface DelegateCash {
  function checkDelegateForAll(address delegate, address vault) external view returns (bool);
}

contract DelegateCashSample is ERC721Upgradeable, OwnableUpgradeable {
  using Counters for Counters.Counter;
  Counters.Counter private tokenIdCounter;
  using StringsUpgradeable for uint256;
  
  address constant public DELEGATE_CONTRACT = 0x00000000000076A84feF008CDAbe6409d2FE638B;

  string private tokenBaseURI;

  event Mint(address owner, uint256 tokenId);

  function initialize() initializer public {
    __ERC721_init("DelegateCashSample", "DCS");
    __Ownable_init();
  }

  function setTokenBaseURI(string memory __newBaseURI) public onlyOwner {
    tokenBaseURI = __newBaseURI;
  }

  function claim(address _vault) public returns (uint256 tokenId) {
    address requester = msg.sender;
    if (_vault != address(0)) {
      DelegateCash dc = DelegateCash(DELEGATE_CONTRACT);
      bool isDelegateValid = dc.checkDelegateForAll(msg.sender, _vault);
      require(isDelegateValid, "invalid delegate-vault pairing");
      requester = _vault;
    }
    
    tokenIdCounter.increment();
    uint256 _tokenId = tokenIdCounter.current();
    _safeMint(requester, _tokenId);
    emit Mint(requester, _tokenId);
    return _tokenId;
  }

  function tokenURI(uint256 __tokenID) public view override returns (string memory) {
    require(_exists(__tokenID), "ERC721Metadata: URI query for nonexistent token");
    return string(abi.encodePacked(tokenBaseURI, "/", __tokenID.toString()));
  }

}
