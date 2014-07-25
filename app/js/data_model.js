/*   A random dater faker.  */

data_model = (function(opt_config){
    var _scope = function(){
       this._private = {
            yMin : 0,
            yMax: 400,
            xStart: 0,
            xEnd: 800,
            steps : 50
        }
        _init.call(this);
    }
    //
    var _init =function(){
        console.log("INIT", this._private.yMax);
    }
    //
    _scope.prototype.getData = function(){
        var _data = [];
        var stepsize = (this._private.xEnd - this._private.xStart) / this._private.steps;
        for(var i=0; i<this._private.steps; i++){
            _data.push({x:stepsize*i, y:this._private.yMin+Math.random()*this._private.yMax});
        }
        return _data;
    }
    return _scope;
})();


