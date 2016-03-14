var util = require("util");
var EventEmitter = require("events");


function Interval (ticks, tickOnStart, stopOnErrors, start, repeatTimes) { 
	EventEmitter.call(this);
	
	this.ticks = ticks || 0;
	this.tickOnStart = tickOnStart || false;
	this.stopOnErrors = stopOnErrors || false;
	this.timesToStop = repeatTimes || Infinity;
	
	this.init();
	
	if(start) 
		this.start();
}



Interval.prototype.init = function () { 
	this._interval = 0;
	this.times = 0;
	
	this.on("error", function () { 
		if(this.stopOnErrors) 
			this.stop();
	}.bind(this));
}

Interval.prototype.start = function () { 
	if(this.running) 
		return;
	
	this.running = true;
	
	this.setTicks();
	
	if(this.tickOnStart) 
		this.setNextTime(Date.now());
	
	this.emit("start");
};

Interval.prototype.stop = function () { 
	if(!this.running) 
		return;
	
	this.running = false;
	
	this.stopIntrval();
	
	this.emit("stop");
};

Interval.prototype.createInterval = function () { 
	if(!this.running) 
		return;
	
	this.stopInterval();
	
	this._interval = setTimeout(function () { 
		this.resetTicks();
		
		this.times++;
		
		this.emit("tick");
		
		if(this.times >= this.timesToStop) 
			this.stop();
	}.bind(this), this.nextTime - Date.now());
};

Interval.prototype.stopInterval = function () { 
	clearTimeout(this._interval);
};

Interval.prototype.setTicks = function (ticks) { 
	this.ticks = ticks || this.ticks;
	this.setNextTime(Date.now() + this.ticks);
};

Interval.prototype.setNextTime = function (nextTime) { 
	this.nextTime = nextTime;
	this.createInterval();
};

Interval.prototype.resetTicks = function () { 
	this.setTicks();
};

util.inherits(Interval, EventEmitter);

module.exports = Interval;