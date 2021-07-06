

// 1. create web3 on ganache
var Web3 = require('web3');
var EthereumTransaction = require('ethereumjs-tx').Transaction;
var web3 = new Web3('HTTP://127.0.0.1:7545');
//web3.eth.getAccounts().then( results => console.log(results) );

// 2. define sending/receiving address from ganache
var sendingAddress = '0x02C813449ca27Fa0fE5956A0E097F920CFD90925';
var receivingAddress = '0xC9d1cEBe0A0BA0595e110dfac6f7AC165CE0C207';

// 3. check balance
web3.eth.getBalance(sendingAddress).then(console.log);
web3.eth.getBalance(receivingAddress).then(console.log);

// 4. create eth raw transaction
var rawTransaction = {
	nonce: web3.utils.toHex(0),
	to: receivingAddress,
	gasPrice: web3.utils.toHex(20000000),
	gasLimit: web3.utils.toHex(30000),
	value: web3.utils.toHex(100),
	data: web3.utils.toHex("")
}

// 5. sign raw transaction with sender private key
var privateKeySender = "136606b904e393bb1609f76645140d5a4bf3fb6fd0f5a32a08adf313417056f3";
var privateKeySenderHex = new Buffer.from(privateKeySender, 'hex');
var transaction = new EthereumTransaction(rawTransaction);
transaction.sign(privateKeySenderHex);

// 6. send transaction to network
var serializedTransaction = transaction.serialize();
web3.eth.sendSignedTransaction(serializedTransaction);

