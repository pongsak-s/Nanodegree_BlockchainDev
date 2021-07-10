pragma solidity >=0.4.22 <0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Adoption.sol";

contract TestAdoption {

	Adoption adoption = Adoption(DeployedAddresses.Adoption());

	uint expectedPetId = 8;

	address expectedAdopter = address(this);

	function testUserCanAdoptPet() public {

		uint returnedID = adoption.adopt(expectedPetId);

		Assert.equal(returnedID, expectedPetId, "Adoption of the expected pet should match what is returned");
	}

	function testGetAdopterAddressByPetId() public {
		address adopter = adoption.adopters(expectedPetId);

		Assert.equal(adopter, expectedAdopter, "Onwer of the expected pet should be this contract");
	}

	function testGetAdopterAddressByPetIdInArray() public {
		address[16] memory adopters = adoption.getAdopters();

		Assert.equal(adopters[expectedPetId], expectedAdopter, "Onwer of the expected pet should be this contract");
	}
}
