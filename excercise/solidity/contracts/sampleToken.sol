pragma solidity >=0.4.22 <=0.8.0;


import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract sampleToken is ERC20 {

	/*string public name = "SampleToken";
	string public symbol = "EGT";
	uint public decimals = 18;
	uint public INITIAL_SUPPLY = 1000 * (10 ** decimals);

	constructor() public {
		_mint(msg.sender, INITIAL_SUPPLY);
	}*/


	string public name = "sampleToken";
	string public symbol = "TT";
	uint8 public decimals = 2;
	uint public INITIAL_SUPPLY = 12000;

	constructor() public {
		_mint(msg.sender, INITIAL_SUPPLY);
	}
}