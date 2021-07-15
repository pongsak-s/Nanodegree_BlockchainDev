
var sampleToken = artifacts.require("sampleToken");

module.exports = function (deployer) {
  deployer.deploy(sampleToken);
};