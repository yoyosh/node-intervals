var Interval = require("../interval");


var interval = Interval(5000, true, false, true);

interval.on("start", function () { 
	console.log("Interval started!");
});

interval.on("error", function (err) { 
	console.log("Interval error!");
	console.log(err);
});

interval.on("stop", function () { 
	console.log("Interval stopped!");
});

interval.on("tick", function () { 
	console.log("5 seconds!");
});

interval.on("tick", function () { 
	throw new Error();
});