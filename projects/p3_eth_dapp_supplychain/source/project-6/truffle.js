const HDWalletProvider = require('truffle-hdwallet-provider');
const infuraKey = "key was here";

const mnemonic = "key was here";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
        network_id: 4,       // rinkeby's id
        gas: 4500000,        // rinkeby has a lower block limit than mainnet
        gasPrice: 10000000000
    },
  }
};


/*

MIGRATE RESULT

 ~ truffle migrate --network rinkeby --reset

Using network 'rinkeby'.

Running migration: 1_initial_migration.js
  Replacing Migrations...
  ... 0x56a5b4961bf56a7a757741568f2a01da0cfcf3d27e0e5ca5996e265293924822
  Migrations: 0x135c9c866374eca26525a7323b39b7ab7f956acf
Saving successful migration to network...
  ... 0x6d5aed23be7ed2ae2cc4b088edfecabfabd66d134031088f4945d805434d369e
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Replacing FarmerRole...
  ... 0x163db51b5fddc79f1c0d3c589737b5c59d0f65b3f6a6edfff2a3d9c5cac135fc
  FarmerRole: 0x717fea1d46a659b4f7a20f1b0d7b7328ba02abd3
  Replacing DistributorRole...
  ... 0x2c71fef4044753daca62afc740398afc64e8c4f57495e31ddcd628cf8e06ad4d
  DistributorRole: 0xaddba87343f6bdb9df81d1f9c00bd4acf77fed4c
  Replacing RetailerRole...
  ... 0x6441f6345e21477fc47159f98d97c58d7c3c5d3ea55dc1d3fb64f8e27086ecfc
  RetailerRole: 0x170fc51f9c4e9f39794f4debc36fe388f5f1edde
  Replacing ConsumerRole...
  ... 0x1b0fe998011eb7cdf665483a41cc4092ae172d42b04d7f1563362c8a4410d01c
  ConsumerRole: 0x8d94497cecc47dbee8057865fccc017fe571e3ae
  Replacing SupplyChain...
  ... 0x1e7bab9ff36df957ed24a699dc301e18e7398d38d6c47bb06617855e46f366b8
  SupplyChain: 0x5927745365f6a629f12f05b962e5fc4948dfd75e
Saving successful migration to network...
  ... 0x3b1674c6a0b30ddf656d27030a5b4143c0b73d3fa5f165238338d76834d70205
Saving artifacts...
 

*/