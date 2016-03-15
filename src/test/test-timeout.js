var Timeout = require("../timeout");

var timeout = Timeout(1000);

timeout.on("tick", function () { 
	console.log("tick!");
});

timeout.start();