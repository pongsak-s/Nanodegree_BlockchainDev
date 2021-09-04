
var Test = require('../config/testConfig.js');
var BigNumber = require('bignumber.js');

contract('Flight Surety Tests', async (accounts) => {

  var config;
  before('setup contract', async () => {
    config = await Test.Config(accounts);
    //await config.flightSuretyData.authorizeCaller(config.flightSuretyApp.address);
  });

  /****************************************************************************************/
  /* Operations and Settings                                                              */
  /****************************************************************************************/

  it(`first airline gets inited`, async function () {

    let boolresult = await config.flightSuretyData.isAirlineRegistered.call(accounts[1]);
    let totalRegisteredAirlines = await config.flightSuretyData.getTotalRegisteredAirlines.call();
    //console.log('boolresult',boolresult);

    assert.equal(boolresult, 1, 'first airline must be inited');
    assert.equal(totalRegisteredAirlines, 1, 'total airline is one');



  });

  it(`(multiparty) has correct initial isOperational() value`, async function () {

    // Get operating status
    let status = await config.flightSuretyData.isOperational.call();
    assert.equal(status, true, "Incorrect initial operating status value");

  });

  it(`(multiparty) can block access to setOperatingStatus() for non-Contract Owner account`, async function () {

      // Ensure that access is denied for non-Contract Owner account
      let accessDenied = false;
      try 
      {
          await config.flightSuretyData.setOperatingStatus(false, { from: config.testAddresses[2] });
      }
      catch(e) {
          accessDenied = true;
      }
      assert.equal(accessDenied, true, "Access not restricted to Contract Owner");
            
  });

  it(`(multiparty) can allow access to setOperatingStatus() for Contract Owner account`, async function () {

      // Ensure that access is allowed for Contract Owner account
      let accessDenied = false;
      try 
      {
          await config.flightSuretyData.setOperatingStatus(false);
      }
      catch(e) {
          accessDenied = true;
      }
      assert.equal(accessDenied, false, "Access not restricted to Contract Owner");
      
  });

  it(`(multiparty) can block access to functions using requireIsOperational when operating status is false`, async function () {

      await config.flightSuretyData.setOperatingStatus(false);

      let reverted = false;
      try 
      {
          await config.flightSurety.setTestingMode(true);
      }
      catch(e) {
          reverted = true;
      }
      assert.equal(reverted, true, "Access not blocked for requireIsOperational");      

      // Set it back for other tests to work
      await config.flightSuretyData.setOperatingStatus(true);

  });

  it('(airline) cannot register new airline if from not registered airlines #2', async () => {
    
    let newAirline = accounts[2];
    let reverted = false;
    try 
    {
      await config.flightSuretyApp.registerAirline(newAirline, {from: accounts[3]}); 
    }
    catch(e) {
        reverted = true;
    }
    assert.equal(reverted, true, "Access not blocked correctly"); 
  });

  it('(airline) can register new airline #2', async () => {
    let newAirline = accounts[2];
    await config.flightSuretyApp.registerAirline(newAirline, {from: accounts[1]});
    let result = await config.flightSuretyData.isAirlineRegistered.call(newAirline);
    let totalRegisteredAirlines = await config.flightSuretyData.getTotalRegisteredAirlines.call();
    assert.equal(result, true, "airline registered");
    assert.equal(totalRegisteredAirlines, 2, "airline#2 count correctly");

  });

  it('(airline) can register new airline #3', async () => {
    let newAirline = accounts[3];
    await config.flightSuretyApp.registerAirline(newAirline, {from: accounts[2]});
    let result = await config.flightSuretyData.isAirlineRegistered.call(newAirline);
    let totalRegisteredAirlines = await config.flightSuretyData.getTotalRegisteredAirlines.call();
    assert.equal(result, true, "airline registered");
    assert.equal(totalRegisteredAirlines, 3, "airline#3 count correctly");

  });

  it('(airline) can register new airline #4', async () => {
    let newAirline = accounts[4];
    await config.flightSuretyApp.registerAirline(newAirline, {from: accounts[2]});
    let result = await config.flightSuretyData.isAirlineRegistered.call(newAirline);
    let totalRegisteredAirlines = await config.flightSuretyData.getTotalRegisteredAirlines.call();
    assert.equal(result, true, "airline registered");
    assert.equal(totalRegisteredAirlines, 4, "airline#4 count correctly");

  });

  it('(airline) cannot register new airline #5 if not enough vote', async () => {

    let newAirline = accounts[5];
    await config.flightSuretyApp.registerAirline(newAirline, {from: accounts[1]});
    let result = await config.flightSuretyData.isAirlineRegistered.call(newAirline);
    let totalRegisteredAirlines = await config.flightSuretyData.getTotalRegisteredAirlines.call();
    let voters = await config.flightSuretyData.getVoters.call(newAirline);
    //console.log('voters', voters);
    //console.log('totalRegisteredAirlines',totalRegisteredAirlines);
    assert.equal(voters.length, 1, "airline voters 2");
    assert.equal(totalRegisteredAirlines, 4, "airline#5 count correctly");
    assert.equal(result, false, "should not register yet");

  });

  it('(airline) can register new airline #5 when enough vote', async () => {

    let newAirline = accounts[5];
    await config.flightSuretyApp.registerAirline(newAirline, {from: accounts[1]});
    await config.flightSuretyApp.registerAirline(newAirline, {from: accounts[2]});
    await config.flightSuretyApp.registerAirline(newAirline, {from: accounts[4]});
    let result = await config.flightSuretyData.isAirlineRegistered.call(newAirline);
    let totalRegisteredAirlines = await config.flightSuretyData.getTotalRegisteredAirlines.call();
    let voters = await config.flightSuretyData.getVoters.call(newAirline);
    // console.log('voters', voters);
    // console.log('totalRegisteredAirlines',totalRegisteredAirlines);
    // console.log('result',result);
    assert.equal(voters.length, 3, "airline voters 3");
    assert.equal(totalRegisteredAirlines, 5, "airline#5 count correctly");
    assert.equal(result, true, "should now register as sufficient voters");

  });

  it('(airline) can participate when funded', async () => {

    let newAirline = accounts[5];
    await config.flightSuretyData.fund(newAirline, {from: newAirline, value: web3.utils.toWei('10', 'ether')});

    let result = await config.flightSuretyData.isAirlineFunded.call(newAirline);
    //console.log('result',result);
    assert.equal(result, true, "should now register as sufficient voters");

  });

  it('(flight) can register new flight', async () => {

    let flightCode = "485784";
    let timestamp = Date.now();

    let newAirline = accounts[5];
    await config.flightSuretyApp.registerFlight(flightCode, timestamp, {from: newAirline});

    let result = await config.flightSuretyData.isFlightRegistered.call(newAirline, flightCode, timestamp);
    let count = await config.flightSuretyData.getTotalRegisteredFlights.call();
    //console.log('result',result);
    assert.equal(result, true, "flight is not yet registered");
    assert.equal(count, 1, "flight is not yet registered");

  });

  it('(passenger) can buy insurance', async () => {

    let flightCode = "485785";
    let timestamp = Date.now();
    let insuree = accounts[7];
    let newAirline = accounts[5];


    await config.flightSuretyApp.registerFlight(flightCode, timestamp, {from: newAirline});

    await config.flightSuretyApp.buyInsurance(newAirline, flightCode, timestamp, {from: insuree, value: web3.utils.toWei('1', 'ether')});

    let result = await config.flightSuretyData.getInsuranceState.call(newAirline, flightCode, insuree, web3.utils.toWei('1', 'ether'));
    let result2 = await config.flightSuretyData.getInsuranceIDs.call();
    assert.equal(result, 1, "insurance bought");
    assert.equal(result2.length, 1, "insurance bought");

  });
 
 

});
