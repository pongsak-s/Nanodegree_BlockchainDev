
const StarNotary = artifacts.require('StarNotary');

var accounts;
var owner;

contract('StarNotary', (accs) => {
	accounts = accs;
	owner = accounts[0];
});

it('has correct name', async () => {
	let instance = await StarNotary.deployed();
	let starName = await instance.starName.call();
	
	assert.equal(starName, 'Awesome Udacity Star');
});
