
let Web3 = require('web3');

let web3 = new Web3('HTTP://127.0.0.1:7545');

web3.eth.getAccounts().then( results => console.log(results) );

