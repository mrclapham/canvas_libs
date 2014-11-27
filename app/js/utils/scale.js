function Scale (domain, range) {
	this.domain = domain || [0,1];
	this.range = range || [0,1];
}
Scale.prototype.range = function (range) {
	if (typeof range === 'undefined') { return this.range; }
	this.range = range;
	return this;
};
Scale.prototype.domain = function (domain) {
	if (typeof domain === 'undefined') { return this.domain; }
	this.domain = domain;
	return this;
};
Scale.prototype.map = function (x) {
	if (typeof x === 'undefined') { return this.domain; }
	var range = this.range, domain = this.domain;
	var factor = (range[1]-range[0])/(domain[1]-domain[0])
    factor = _.isFinite(factor) ? factor : 0;
	return range[0]+factor*(x-domain[0])
};
Scale.prototype.invert = function (y) {
	if (typeof y === 'undefined' ) { return new Scale(this.range,this.domain); }
	var range = this.range, domain = this.domain;
	var factor = (range[1]-range[0])/(domain[1]-domain[0])
	return domain[0]+(y-range[0])/factor
};
Scale.prototype.scaleDomain = function (factor) {
	var domain = this.domain;
	this.domain([domain[0]*factor,domain[1]*factor]);
	return this;
}
Scale.prototype.scaleRange = function (factor) {
	var range = this.range;
	this.range([range[0]*factor,range[1]*factor]);
	return this;
}
/*
This is just syntactical sugar. They are the underscore functions.
It seemed more convenient to have them as a static function of Scale.
 */

Scale.min = function(value){
    return _.min(value);
}

Scale.max = function(value){
    return _.max(value);
}
