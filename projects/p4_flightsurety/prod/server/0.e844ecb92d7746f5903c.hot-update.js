exports.id=0,exports.modules={"./src/server/server.js":function(e,o,s){"use strict";s.r(o);var r=s("./build/contracts/FlightSuretyApp.json"),t=s("./src/server/config.json"),c=s("web3"),n=s.n(c),a=s("express"),l=s.n(a),u=t.localhost;console.log("config.url",u.url);var p=new n.a(new n.a.providers.WebsocketProvider(u.url.replace("http","ws")));p.eth.defaultAccount=p.eth.accounts[0],console.log("web3.eth.accounts",p.eth.accounts);var i=new p.eth.Contract(r.abi,u.appAddress);console.log("config.appAddress",u.appAddress),i.events.OracleRequest({fromBlock:0},(function(e,o){e&&console.log(e),console.log(o)}));var d=l()();d.get("/api",(function(e,o){o.send({message:"An API for use with your Dapp!"})})),o.default=d}};