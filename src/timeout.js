var Interval = require("./Interval");

function Timeout () { 
	var args = Array.prototype.slice.call(arguments, 0);
	args[4] = 1;
	
	args.unshift(Interval);
	
	return new (Interval.bind.apply(Interval, args))()
}

module.exports = Timeout;
