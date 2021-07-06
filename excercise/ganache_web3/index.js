

// 1. create web3 on ganache
var Web3 = require('web3');
var EthereumTransaction = require('ethereumjs-tx').Transaction;
var web3 = new Web3('HTTP://127.0.0.1:8545');
//web3.eth.getAccounts().then( results => console.log(results) );

// 2. define sending/receiving address from ganache
var sendingAddress = '0xA4dFEF48d7C41C8D656275FD93d2c7870a79e8Db';
var receivingAddress = '0xde7dE341D49A918AE0F55f17853f16960156C1fF';

// 3. check balance
web3.eth.getBalance(sendingAddress).then(console.log);
web3.eth.getBalance(receivingAddress).then(console.log);

// 4. create eth raw transaction
var rawTransaction = {
	nonce: web3.utils.toHex(2),
	to: receivingAddress,
	gasPrice: web3.utils.toHex(20000000),
	gasLimit: web3.utils.toHex(30000),
	value: web3.utils.toHex(9999999579919999900),
	data: web3.utils.toHex("")
}

// 5. sign raw transaction with sender private key
//var privateKeySender = "136606b904e393bb1609f76645140d5a4bf3fb6fd0f5a32a08adf313417056f3";
var privateKeySender = "e211e592e8e5e6ff7b84a22b2021897f1d3d776a6c71a50dfe4861c7aad9ba54";

var privateKeySenderHex = new Buffer.from(privateKeySender, 'hex');
var transaction = new EthereumTransaction(rawTransaction);
transaction.sign(privateKeySenderHex);

// 6. send transaction to network
var serializedTransaction = transaction.serialize();
web3.eth.sendSignedTransaction(serializedTransaction);

