/**
 * Created by grahamclapham on 25/09/2014.
 */

JsonLoader  = (function(path){
    var _scope = function(){
    this._dispatcher = document.createElement('div');
    this._path = null;
    this._data = null;
    this.oReq = new XMLHttpRequest();
    };
    // create and dispatch the event
    _scope.prototype = {
        dispatchEvt:function(name, payload){
        this._event = new CustomEvent(name, {"detail":payload});
        this._dispatcher.dispatchEvent(this._event);
        },
        listen:function(name, func){
            this._dispatcher.addEventListener(name, func)
        },
        onLoaded:function(){

        },
        setPath:function(value){
            this._path = value
            _onPathSet.call(this);
        }

    }

        //-- callbacks

        var _onPathSet = function(){
            var _this = this
            this.oReq.onload = function(e){reqListener.call(_this, e)};
            this.oReq.onError = function(){
                //TODO: add an error handler.
            }
            this.oReq.open("get", this._path, true);
            this.oReq.send();
        }

        var _onSuccess = function(){
            console.log("On loaded");
        }


    var reqListener =  function (e) {
        this._data = e.target.responseText;
        this.dispatchEvt(JsonLoader.LOAD_COMPLETE, {data:JSON.parse(this._data)} )
        return e.target.responseText;
    }


return _scope;

})();


JsonLoader.LOAD_COMPLETE = "loadComplete";
JsonLoader.LOAD_ERROR = "loadError";
