
var Web3 = require("web3");
var web3 = new Web3("HTTP://127.0.0.1:7545");

web3.eth.getTransactionCount('0x02C813449ca27Fa0fE5956A0E097F920CFD90925').then(console.log);


