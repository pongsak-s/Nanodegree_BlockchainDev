var HDWalletProvider = require("truffle-hdwallet-provider");

// Be sure to match this mnemonic with that in Ganache!
var mnemonic = "fabric blast globe wise cruise profit file sword bracket patch aunt rabbit";

module.exports = {
  networks: {
    development: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "http://127.0.0.1:9545/", 0, 10);
      },
      network_id: '*',
      gas: 9999999
    }
  }
};