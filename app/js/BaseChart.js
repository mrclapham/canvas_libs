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
        this.width = 900,
        this.height = 400,
        this.data = opt_data || {name:"genericName"};
        this._playing = true;
        this.canvasId = "chartCanvas_"+Math.ceil(Math.random()*1000);
        this._scale = null;
        this.leftMargin =20;
        this.rightMargin = 20;
        this.topMargin = 40;
        this.bottomMargin = 50;
        this._scaleX;
        this._scaleY;
        //this.canvasId = null;
        _init.call(this);
    }

    var _init = function(opt_config){
        if(this.opt_config) _onConfigSet.call(this, this.opt_config);
        if(this.createCanvas) _onTargetSet.call(this);
        _initAnimation.call(this);

        try{
            this.initScale();
        }catch(e){
            //--
        }
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

    var _createScale = function(){
        console.log("_createScale called")
        this.maxX = Scale.max(this.getData(), 'x');
        this.minX = Scale.min(this.getData(), 'x');
        this.maxY = Scale.max(this.getData(), 'y');
        this.minY = Scale.min(this.getData(), 'y');
        this._roundedYValues = _roundValues(this.minY.y, this.maxY.y);
        this._scaleX = new Scale([this.minX.x, this.maxX.x],[this.leftMargin, this.getWidth()-this.rightMargin]);
        this._scaleY = new Scale([this._roundedYValues.min, this._roundedYValues.max],[this.getHeight()-this.topMargin, this.bottomMargin]);
    }

    var _calculateYDivisions = function(range){
        //console.log("_calculateYDivisions called ", range)
        var _divisions = 20;
        if(range <= 10){_divisions = 10}
        if(range <= 100 && range >= 10){_divisions = 10}
        if(range >= 100){_divisions = 10}
        if(range >= 1000){_divisions = 100}
        if(range >= 10000){_divisions = 1000}
        if(range >= 100000){_divisions = 10000}
        if(range >= 1000000){_divisions = 100000}
        //console.log("_calculateYDivisions called END", _divisions)

        return _divisions;
    }

    var _roundValues = function(min, max){
        //console.log("_roundValues caled ",max,min);
        var _min=parseInt(min), _max=parseInt(max);
        var _range = max-min;
        var division = _calculateYDivisions(_range);
        _min<0 ? _min -=division : _min = 0;
        _max+=division;
        // now find the divider by turning the number to a string....
        var _numStringLengthMax = String(_max).length-2;
        var _numStringLengthMin = String(_min).length-2;

        var _dividerMax = "1", _dividerMin ="1", _primaryDivision;

        for(var i=0;i<_numStringLengthMax; i++){
            _dividerMax+="0";
        }
        for(var ii=0;ii<_numStringLengthMin; ii++){
            _dividerMin+="0";
        }

        _dividerMax = parseInt(_dividerMax);
        _dividerMin = parseInt(_dividerMin);
        _primaryDivision = _dividerMin<_dividerMax ? _dividerMax : _dividerMin;

        _max/=_primaryDivision;
        _max = Math.floor(_max);
        _max *= _primaryDivision;

        _min/=_primaryDivision;
        _min = Math.floor(_min);
        _min *= _primaryDivision;

        return {min:_min, max:_max, division:division}
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
           return this.height;
        },
        setHeight:function(value){
            this.height = value;
           // this.render();
        },
        getWidth:function(){
            return this.width;
        },
        setWidth:function(value){
            this.width = value;
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
        getXscale:function(){
            return this._scaleX;
        },
        getYscale:function(){
            return this._scaleY;
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
                //var ctx = this.getContext();
                //ctx.fillStyle = this.getBackgroundColour();
                //ctx.fillRect(0,0,100,150);
                //ctx.closePath();
            }
        },
        animate:function(){
            this.render();
            if( this.getPlaying() ) requestAnimationFrame(this.animate.bind(this));
        },
        initScale:function(){
            this._scale = new Scale([this.leftMargin, this.width - this.rightMargin],[Scale.min(this.getData()),Scale.max(this.getData()) ]);
            _createScale.call(this);
        },
        update:function(){
            this.initScale();
            _createScale.call(this);
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


