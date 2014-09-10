/*   A random dater faker.  */

data_model = (function(opt_config){
    var _scope = function(opt_config){

       this._private = {
            yMin : 0,
            yMax: 100,
            xStart: 0,
            xEnd: 400,
            steps : 8
        }
        if(opt_config) _init.call(this, opt_config);

    }

    //===================

    //
    var _init =function(opt_config){
        //First, have you got a config object?
        // If so apply all the properies.
        if(opt_config && ( typeof opt_config == 'object') ){
            _onConfigSet.call(this, opt_config)
        }
    }

    var _onConfigSet = function(opt_config){
        console.log("_onConfigSet ", opt_config)

        for(var value in opt_config){
            console.log(value)
            //Underscore properties are not to be changed.

            if(String(value).charAt(0) != '_') this._private[value] = opt_config[value];

        }


    }
    //====================

    //
    _scope.prototype.getData = function(){
        var _data = [];
        var stepsize = (this._private.xEnd - this._private.xStart) / this._private.steps;
        for(var i=0; i<this._private.steps; i++){
            //_data.push({x:stepsize*i, y:this._private.yMin+Math.random()*this._private.yMax});
            _data.push({x:stepsize*i, y:this._private.yMin+Math.random()*this._private.yMax});
        }
        return _data;
    }
    //-- regular test data - non randomized
    _scope.prototype.getRegualaData = function(value){
        var _data = [];
        var stepsize = (this._private.xEnd - this._private.xStart) / this._private.steps;
        for(var i=0; i<this._private.steps; i++){
            //_data.push({x:stepsize*i, y:this._private.yMin+Math.random()*this._private.yMax});
            _data.push({x:stepsize*i, y:value*i});
        }
            return _data;
    }



    return _scope;
})();




