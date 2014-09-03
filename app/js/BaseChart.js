/**
 * Created by grahamclapham on 03/09/2014.
 */
BaseChart= (function(target, opt_data){
    var _scope = function(target, opt_data){
        this.target = target,
        this._width = 300,
        this._height = 200,
        this.data = opt_data || {name:"genericData"};
    }

    var _onDataSet = function(){
        console.log("Base Data Set", this);
        this.render();
    }

    _scope.prototype = {
        getData:function(){
            return this.data;
        },
        setData:function(value){
            this.data = value;
            _onDataSet.call(this);
        },
        getHeight:function(){
           return this._height;
        },
        setHeight:function(value){
            this._height = value;
            this.render();
        },
        getWidth:function(){
            return this._width;
        },
        setWidth:function(value){
            this._width = value;
            this.render();
        },
        render:function(){
            console.log("I am the base class and my renderer needs to be extended");
        }
    }

    return _scope;

})();