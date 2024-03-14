//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract OurNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;
    string public constant PROJECT_IDENTIFIER = "KUBI_og_drop";

    constructor() ERC721("MyNFT", "NFT") Ownable(msg.sender) {}

    event Minted(
        uint256 indexed tokenId,
        string projectIdentifier,
        string tokenURI
    );

    function mintNFT(
        address recipient,
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        _tokenIds++;

        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        emit Minted(newItemId, PROJECT_IDENTIFIER, tokenURI);
        return newItemId;
    }
}
