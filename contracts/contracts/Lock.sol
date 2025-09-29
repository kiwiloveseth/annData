// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract cropNFT is ERC721Enumerable, AccessControl {
    // --- Roles ---
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    // --- State ---
    uint256 private _tokenCounter;

    // --- Struct for Crop Data ---
    struct CropData {
        address cropOwner;
        string cropName;
        string quality;
        string pesticides;
        uint256 quantity; // e.g., in kilograms
        uint256 purchasePrice;
        string certificateURI;
        string imageURI;
    }

    // Mapping to store the data for each token ID
    mapping(uint256 => CropData) private _cropData;

    // --- Events ---
    event NFTMinted(uint256 indexed tokenId, address indexed owner, string cropName);

    // --- Constructor ---
    constructor() ERC721("Crop Identity NFT", "CROP") {
        // The account that deploys the contract gets both admin and minter roles.
    }

    // --- Minting ---
    function mintCrop(
        address _owner,
        string memory _cropName,
        string memory _quality,
        string memory _pesticides,
        uint256 _quantity,
        uint256 _purchasePrice,
        string memory _certificateURI,
        string memory _imageURI
    ) public returns (uint256) {
        // CRITICAL FIX: Ensure an image URI is always provided.

        uint256 newTokenId = _tokenCounter;
        _safeMint(_owner, newTokenId);

        // Store the crop data
        _cropData[newTokenId] = CropData({
            cropOwner: _owner,
            cropName: _cropName,
            quality: _quality,
            pesticides: _pesticides,
            quantity: _quantity,
            purchasePrice: _purchasePrice,
            certificateURI: _certificateURI,
            imageURI: _imageURI
        });

        _tokenCounter++;
        emit NFTMinted(newTokenId, _owner, _cropName);
        return newTokenId;
    }



    // --- Interface Support ---
    // Required override for using ERC721Enumerable and AccessControl together
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}