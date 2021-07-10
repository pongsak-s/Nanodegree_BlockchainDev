

var TutorialToken = artifacts.require("TutorialToken");
var Message = artifacts.require("Message");

module.exports = function(deployer) {
	deployer.deploy(Message);
	deployer.deploy(TutorialToken);
}