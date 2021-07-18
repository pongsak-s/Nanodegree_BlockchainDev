// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract StarNotary is ERC721 {

	struct Star {
		string name;
	}


	mapping(uint256 => Star) public tokenIdToStarInfo;
	mapping(uint256 => uint256) public starForSale;

	constructor() ERC721("StarNotaryV2","SVT") { 
		// do nothing
	}


    function createStar(string memory _name, uint256 _tokenId) public { 
        Star memory newStar = Star(_name); 
        tokenIdToStarInfo[_tokenId] = newStar; 
        _mint(msg.sender, _tokenId); 
    }


    function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
    	require( msg.sender == ownerOf(_tokenId));
    	starForSale[_tokenId] = _price;
    }

	// Function that allows you to convert an address into a payable address
    // function _make_payable(address x) internal pure returns (address payable){
    // 	return address(uint160(x));
    // }

    function buyStar(uint256 _tokenId) public payable {
    	require(starForSale[_tokenId] > 0, "the star is not yet up for sale");

    	uint256 starCost = starForSale[_tokenId];
    	address starOwner = ownerOf(_tokenId);

    	require(msg.value >= starCost, "you need to have enough Ether");
    	transferFrom(starOwner, msg.sender, _tokenId);
    	address payable ownerAddressPayable = payable(starOwner);
    	// address payable ownerAddressPayable = _make_payable(starOwner);
    	ownerAddressPayable.transfer(starCost);
    	if(msg.value > starCost){
    		address payable senderAddressPayable = payable(msg.sender);
    		senderAddressPayable.transfer(msg.value - starCost);
    	}

    	starForSale[_tokenId] = 0;


    }

}