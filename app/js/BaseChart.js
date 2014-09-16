/**
 * Created by grahamclapham on 03/09/2014.
 */
BaseChart= (function(target, opt_data){
    var _scope = function(target, opt_data){
        this.target = target,
        this.createCanvas = false; // do you want an on the fly created canvas? It seems to cause problems with Easlejs.
        this._canvas = null,
        this._ctx = null,
        this._backgroundColour = "#cccccc",
        this._width = 900,
        this._height = 400,
        this.data = opt_data || {name:"genericName"};
        this._playing = true;
        this._canvasId = "chartCanvas_"+Math.ceil(Math.random()*1000);
        _init.call(this);
    }

    var _init = function(){
        if(this.createCanvas) _onTargetSet.call(this);
        _initAnimation.call(this);
        this.postInit();
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
        setPlaying:function(value){
            this._playing = value;
            this.onPlayingChanged();
        },
        getPlaying:function(){
           return this._playing;
        },
        onPlayingChanged:function(){
          //console.log("Playing changed to ",this.getPlaying())
            this.getPlaying() ? _initAnimation.call(this) : console.log("stopped");
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
            return this._canvasId
        },
        setCanvasId:function(value){
            this._canvasId = value;
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
            this.clear();
            this.render();
            //console.log("The update functions is to be overridden in the concrete implementation of the concrete implementation of the class")
        },
        getTarget:function(){
            return this.target;
        }
    }

    return _scope;

})();