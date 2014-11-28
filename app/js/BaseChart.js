/**
 * Created by grahamclapham on 03/09/2014.
 * Dependencies - underscore (http://underscorejs.org/)
 */
BaseChart= (function(target, opt_data, opt_config){
    var _scope = function(target, opt_data, opt_config){
        this.target = target,
        this.opt_config = opt_config || {},
        this.createCanvas = true; // do you want an on the fly created canvas? It seems to cause problems with Easlejs.
        this._canvas = null,
        this._ctx = null,
        this._backgroundColour = "#cccccc",
        this._width = 900,
        this._height = 400,
        this.data = opt_data || {name:"genericName"};
        this._playing = true;
        this.canvasId = "chartCanvas_"+Math.ceil(Math.random()*1000);
        this._scale = null;
        this.leftMargin =20;
        this.rightMargin = 20;
        //this.canvasId = null;
        _init.call(this);
    }

    var _init = function(opt_config){
        if(this.opt_config) _onConfigSet.call(this, this.opt_config);
        //console.log("CREATE CANVAS "+this.createCanvas);
        if(this.createCanvas) _onTargetSet.call(this);
        _initAnimation.call(this);
        this.postInit();
    }

    var _onConfigSet = function(){

        for(var value in arguments[0]){
            //Underscore properties are not to be changed.
            if(String(value).charAt(0) != '_') this[value] = arguments[0][value];
        }
    }

    var _initAnimation = function(){
        requestAnimationFrame(this.animate.bind(this));
    }


    var _onTargetSet = function(){
        this._canvas = document.createElement('canvas');
        this._canvas.width = this.getWidth();
        this._canvas.height = this.getHeight();
        this._canvas.style.width = this.getWidth()+"px";
        this._canvas.style.height = this.getHeight()+"px";
        this._canvas.setAttribute("id", this.getCanvasId());
        this._ctx = this._canvas.getContext("2d");
        this.target.appendChild(this._canvas);
    }


    _scope.prototype = {
        postInit:function(){
            //console.log("I am the postInit function and I should be overridden in the concrete class. I am the class specific init function - called after the Super Class init")
        },
        getData:function(){
            return this.data;
        },
        setData:function(value){
            if(this.data !== value){
                this.data = value;
                this.update();
            }
        },
        getScale:function(){
            return this._scale;
        },
        setPlaying:function(value){
            this._playing = value;
            this.onPlayingChanged();
        },
        getPlaying:function(){
           return this._playing;
        },
        onPlayingChanged:function(){
          //console.log("Playing changed to ",this.getPlaying())
            this.getPlaying() ? _initAnimation.call(this) : null;
        },
        getHeight:function(){
           return this._height;
        },
        setHeight:function(value){
            this._height = value;
           // this.render();
        },
        getWidth:function(){
            return this._width;
        },
        setWidth:function(value){
            this._width = value;
           // this.render();
        },
        setCanvas:function(value){
             this._canvas = value;
        },
        getCanvas:function(){
            return this._canvas;
        },
        getCanvasId:function(){
            return this.canvasId
        },
        setCanvasId:function(value){
            this.canvasId = value;
            if(this.getCanvas()){
                this.getCanvas().setAttribute("id", this.getCanvasId())
            }
        },
        getContext:function(){
            return this._ctx;
        },
        getBackgroundColour:function(){
            return this._backgroundColour;
        },
        clear:function(){
          if(this.getContext())  this.getContext().clearRect(0,0,this.getWidth(), this.getHeight());
        },
        render:function(){
            if( this.getContext() ){
            this.clear();
                var ctx = this.getContext();
                ctx.fillStyle = this.getBackgroundColour();
                ctx.fillRect(0,0,100,150);
                ctx.closePath();
            }
        },
        animate:function(){
            this.render();
            if( this.getPlaying() ) requestAnimationFrame(this.animate.bind(this));
        },
        update:function(){
            this._scale = new Scale([this.leftMargin, this._width - this.rightMargin],[Scale.min(this.getData()),Scale.max(this.getData()) ]);
            this.clear();
            this.render();
            //console.log("The update functions is to be overridden in the concrete implementation of the concrete implementation of the class")
        },
        getTarget:function(){
            return this.target;
        },
        onConfigSet:function(){
            for(var value in arguments[0]){
                //Underscore properties are not to be changed.
                if(String(value).charAt(0) != '_') this._private[value] = arguments[0][value];
            }
        }
    }

    return _scope;

})();

// Static functions...

//BaseChart.importJSON = function(path){
//
//var oReq = new XMLHttpRequest();
//oReq.onload = function(e){reqListener(e)};
//oReq.open("get", path, true);
//oReq.send();
//
//var reqListener =  function (e) {
//    console.log(e.target)
//    console.log(e.responseText)
//    return e.target(e.responseText);
//    //return e.target;
//}
//
//
//}
