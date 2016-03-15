var Interval = require("./interval");

function Timeout () { 
	if (!(this instanceof arguments.callee)) { 
		var args = Array.prototype.slice.call(arguments, 0);
		args.unshift(arguments.callee);
		return new (arguments.callee.bind.apply(arguments.callee, args))();
	}
	
	
	var args = Array.prototype.slice.call(arguments, 0);
	args[4] = 1;
	
	args.unshift(Interval);
	
	var interval = new (Interval.bind.apply(Interval, args))();
	
	this.__proto__ = interval;
}

module.exports = Timeout;
