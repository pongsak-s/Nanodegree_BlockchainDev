
var Web3 = require('web3');
var EthereumTransaction = require('ethereumjs-tx').Transaction;
//var web3 = new Web3('HTTP://127.0.0.1:8545');
//var web3 = new Web3('https://rinkeby.infura.io/v3/ec21762a0e8c4cb8aa08fcfb4a2e2dea');

var url = 'https://mainnet.infura.io/v3/ec21762a0e8c4cb8aa08fcfb4a2e2dea';
var web3 = new Web3(url);

web3.eth.getGasPrice( console.log );
//web3.eth.getUncle(blockHashOrBlockNumber, uncleIndex [, returnTransactionObjects] [, callback])

web3.eth.getBlockTransactionCount('12787640').then(console.log)

web3.eth.getUncle(12787640, 0).then(console.log)