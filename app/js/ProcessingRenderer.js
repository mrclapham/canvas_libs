/*
    Move this class to another js file.
 */

var OLS = (function(data){
//-- callbacks for the methods...
    var calculate = function(data){
        var xMean, yMean, n, alpha, beta, sXiSquared, sXiYi, resXi;
        n = data.length;
        xMean = 0;
        yMean = 0;
        sXiSquared=0;
        sXiYi = 0;
        for(var i=0; i<data.length; i++){
            xMean += data[i].x;
            sXiSquared += Math.pow(data[i].x,2);
            sXiYi += data[i].x*data[i].y;
            yMean += data[i].y;
        }
        xMean = xMean/n;
        yMean = yMean/n;

        beta = (sXiYi - n*xMean*yMean)/(sXiSquared-n*Math.pow(xMean,2));
        alpha = yMean - beta*xMean;

        return {alpha:alpha, beta:beta}
    }
    //////////

    /////////
    var _scope = function(data) {
        this._data = data || {};
    }
        _scope.prototype = {
            setData : function(value){
                this._data = value;
            calculate.call(this, this._data);
            },
            getData : function(){
                return this._data;
            },
            getAlphaBeta : function(){
                return calculate.call(this, this._data) || null;
            },
            getYHat : function(){
                var _yHat = [];
                var _residuals = [];
                var ab = calculate.call(this, this._data);

                for(var i=0;i<this.getData().length; i++){
                    //console.log( ab.alpha + (ab.beta*this.getData()[i].x) )
                    _yHat[i] = ab.alpha + (ab.beta*this.getData()[i].x)
                    _residuals[i] = this.getData()[i].y - _yHat[i];
                    console.log(_residuals[i])
                }
                return {yhat:_yHat, residuals:_residuals}
            }
        }
    return  _scope;
})();

var s = function( sketch ) {
    //sketch.frameRate(16);
    sketch._xp = 0;
    sketch._bg_r = 60;
    sketch._bg_g = 60;
    sketch._bg_b = 60;
    sketch._bg_a = 255;
    sketch._color = null;
    sketch.dotArray = [];
    sketch.yHatArray = [];
    sketch.data = {};
    sketch._width = 900;
    sketch._height = 300;
    sketch._leftOffset = 45;
    sketch._rightOffset = 45;
    sketch._topOffset = 60;
    sketch._bottomOffset = 60;
    sketch._alphaBeta = null;
    sketch.yGridInterval = 1 // the default spacing oth the yGrid lines
    sketch._scaleX;
    sketch._scaleY;
    sketch.scale = null;   // there is a scale function in the base class but, due to the way p5 works it doesn't inherit that easily. It is a seperat util - so no biggie.

    sketch.setup = function() {
        sketch._canvas = sketch.createCanvas(sketch._width, sketch._height);
        sketch.background(0,0,0, 255);
    };

    sketch.calculateYDivisions = function(range){

        var _divisions = 1;

        if(range <= 10){_divisions = 10}
        if(range >= 100){_divisions = 100}
        if(range >= 1000){_divisions = 100}
        if(range >= 10000){_divisions = 1000}
        if(range >= 100000){_divisions = 1000}
        if(range > 1000000){_divisions = 10000}
        return _divisions;
    }

    sketch.drawGridLines = function(){
        sketch.stroke(255,255,255,80);
        sketch.strokeWeight(.25);
        for(var ii=0; ii<sketch.dotArray.length; ii++){
            sketch.line(sketch.dotArray[ii]._currentPosition.x, sketch._topOffset, sketch.dotArray[ii]._currentPosition.x, sketch._height-sketch._bottomOffset );
        }
        //console.log("Grid lines are being drawn ")
        if(sketch.maxY && sketch.minY && sketch.maxY.y && sketch.minY.y){
            var range = sketch.maxY.y - sketch.minY.y;
            var division = sketch.calculateYDivisions(range);
            console.log(range, division);
            for(var i = sketch.minY.y; i<sketch.maxY.y; i+=division){
                var yPos = sketch._height - sketch.getScaleY().map(i)
                sketch.line(sketch._leftOffset, yPos, sketch._width-sketch._rightOffset,  yPos);
            }
        }
    }

    sketch.draw = function() {
        sketch.background(sketch._bg_r,sketch._bg_g,sketch._bg_b,sketch._bg_a);

        var _context = sketch.drawingContext;
        var grd = _context.createLinearGradient(0, 0, 0, 200);

        // light blue
        grd.addColorStop(0, 'rgba(255,128,0,1)');
       // grd.addColorStop(.7, 'rgba(255,128,0,50)');
        grd.addColorStop(1, 'rgba(255,128,0,0.2)');
        _context.fillStyle = grd;
        _context.fill();

        sketch.drawGridLines()
        sketch.stroke(200,255,200,100);
        sketch.beginShape();
        for(var ii=0; ii<sketch.dotArray.length; ii++){
            sketch.vertex(sketch.dotArray[ii]._currentPosition.x, sketch.dotArray[ii]._currentPosition.y);
        }
        sketch.vertex(sketch._width - sketch._rightOffset, sketch._height-sketch._bottomOffset);
        sketch.vertex(sketch._leftOffset, sketch._height-sketch._bottomOffset);
        sketch.endShape(sketch.CLOSE);


        //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

        sketch.beginShape();
        for(var n =0; n < sketch.yHatArray.length; n++){
            var start, end;
            start = sketch.dotArray[n]._currentPosition.x;
            end = sketch.getHeight() - sketch.getScaleY().map(sketch.yHatArray[n]);
            sketch.stroke('rgba(255,128,0,30)');
            sketch.strokeWeight(2);
           // sketch.ellipse(start, end, 6,6)
            sketch.vertex(start, end)
        }

        sketch.endShape();

        for(var n =0; n < sketch.yHatArray.length; n++){
            sketch.fill(255,0,100, 255);
            var start, end;
            start = sketch.dotArray[n]._currentPosition.x;
            end = sketch.getHeight() - sketch.getScaleY().map(sketch.yHatArray[n]);
            sketch.stroke('rgba(255,128,0,30)');
            sketch.strokeWeight(2);
            sketch.ellipse(start, end, 6,6)
        }

        //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

        for(var i=0; i<sketch.dotArray.length; i++){
            sketch.smooth();
            sketch.dotArray[i].render(sketch);
        }
        //sketch.createAlphaBetaCurve()
    }

    sketch.createAlphaBetaCurve = function(){
        var _ols = new OLS(sketch.data);

        try{
            var _alphaBeta = _ols.getAlphaBeta();
            sketch.yHatArray  = _ols.getYHat().yhat

        }catch(e){
            //
            console.log(e)
        }
    }

    sketch.setWidth = function(value){
       if(sketch._width != value){
           sketch._width = value;
           sketch.onSizeChanged();
       }
    }
    sketch.getWidth = function(){
        return sketch._width;
    }
    sketch.setHeight = function(value){
        if(sketch._height != value){
            sketch._height = value;
            sketch.onSizeChanged();
        }
    }
    sketch.getHeight = function(){
        return sketch._height;
    }
    sketch.onSizeChanged = function(){
        sketch.resizeCanvas( sketch.getWidth(), sketch.getHeight() );
    }
/////////////////////
    sketch.mousePressed = function() {
       // sketch.background(255,0,0);
    }
/////////////////////
    sketch.mouseDown = function() {
        //sketch.background(0,255,0);
    }
/////////////////////
    sketch.setData = function(value){
        sketch.data = value;
        sketch.onDataSet();
    }

    sketch._createScale = function(){
        sketch.maxX = Scale.max(sketch.data, 'x');
        sketch.minX = Scale.min(sketch.data, 'x');
        sketch.maxY = Scale.max(sketch.data, 'y');
        sketch.minY = Scale.min(sketch.data, 'y');
        sketch._scaleX = new Scale([sketch.minX.x, sketch.maxX.x],[sketch._leftOffset, sketch.getWidth()-sketch._rightOffset]);
        sketch._scaleY = new Scale([sketch.minY.y, sketch.maxY.y],[sketch._bottomOffset, sketch.getHeight()-sketch._topOffset]);
    }
    sketch.getScaleX = function(){
        return sketch._scaleX
    }
    sketch.getScaleY = function(){
        return sketch._scaleY
    }

///////////////////////
    sketch.onDataSet = function(){
        sketch._createScale();

        var sx = sketch._scaleX;
        var sy = sketch._scaleY;

        if (sketch.dotArray && sketch.dotArray.length == sketch.data.length){
            for(var i=0; i<sketch.data.length; i++){
                sketch.dotArray[i].setPosition( sx.map(sketch.data[i].x), sketch.getHeight() - sy.map(sketch.data[i].y) );
            }
        }else{
            sketch.dotArray = [];
            for(var i=0; i<sketch.data.length; i++){
                sketch.createDot(i)
                sketch.dotArray[i].setPosition( sx.map(sketch.data[i].x), sketch.getHeight() - sy.map(sketch.data[i].y) );
            }
        }
        sketch.createAlphaBetaCurve()

    }
    // Adding a function to return the dot to keep it dry
    sketch.createDot = function(i){
        sketch.dotArray[i]=new ChartDot( sketch.data[i].x, sketch.data[i].y );
        sketch.dotArray[i].setData( sketch.data[i] );
    }
    // API
    sketch.getr = function(){
        return sketch._color;
    }
    sketch.setColor = function(value){
        var _passed = true;
        if(value.length < 4 ) _passed = false;
        for(var num in value){
            if( isNaN(parseFloat( value[num]) ) ){
                _passed= false
            }
        }
        if(!_passed) throw new Error("setColor requites an array of four numbers, all between 0 and 255")
        sketch._color = value;
    }

    sketch.getColor = function(){
        return sketch._color;
    }

    sketch.setSuperClass = function(value){
        sketch._superClass = value;
    }

    return sketch;
};
//////////////////////////////

//--
    var YHatDot = (function(x,y){
        var _scope = function(x,y){
            this._width = 10;
            this._x = x;
            this._y = y;
            this._currentPosition = null;
            this._desired_position = new p5.Vector(this._x, this._y);

            this._maxSpeed = 5;
            this._velocity = new p5.Vector(0,0);
            this._r = 100;
            this._g = 100;
            this._b = 100;
            this._alpha = 255;
            this._strokWeight = 1;
            this._radius = 12;
            int.call(this);
        }

        var int = function(){
            if(!this._currentPosition &&  this._desired_position){
                this._currentPosition = new p5.Vector(this._desired_position.x, this._desired_position.y);
            }else{
                this._currentPosition = new p5.Vector(0,0);
            }
        }

        _scope.prototype = {
            setPosition:function(value) {
                if (value.length > 1 && value[0] && !isNaN(value[0]) && value[1] && !isNaN(value[1])) {
                    //--
                    this._x = value[0];
                    this._y = value[1];
                    this._desired_position = new p5.Vector(this._x, this._y);
                }
            },
            getPositionVector : function(){
                return this._desired_position;
            }
        }
        return _scope;
    })();

//--- sub classes for the sketch
var ChartDot = (function(x,y){
    var _scope = function(x,y){
        this._p5Canvas = null;
        this._data = {};
        this._width = 10;
        this._x = x;
        this._y = y;
        this._currentPosition = null;
        this._desired_position = new p5.Vector(this._x, this._y);
        this._maxSpeed = 5;
        this._velocity = new p5.Vector(0,0);
        this._r = 100;
        this._g = 100;
        this._b = 100;
        this._alpha = 255;
        this._strokWeight = 1;
        this._radius = 12;
        int.call(this);
    }

    var int = function(){
        if(!this._currentPosition &&  this._desired_position){
            this._currentPosition = new p5.Vector(this._desired_position.x, this._desired_position.y);
        }else{
            this._currentPosition = new p5.Vector(0,0);
        }
    }

    _scope.prototype = {
        addLabel:function(){
            var leftPad = 10;
            var topPad = -10;
           this._p5Canvas.fill(0, 0, 0, 190);
          // this._p5Canvas.rect(100, 300, 100,100);
            this._p5Canvas.rect(leftPad+this.getCurrentPosition().x,topPad+this.getCurrentPosition().y, 60, 20);
            this._p5Canvas.fill(255);
            this._p5Canvas.noStroke();
            this._p5Canvas.text("x:"+this.getData().x+ "y:"+this.getData().y, leftPad+5+this.getCurrentPosition().x,topPad+15+this.getCurrentPosition().y);
        },

        setData:function(value){
            this._data = value;
        },
        getData:function(){
            return this._data;
        },
        setPosition:function(x,y){
            this._x = x;
            this._y = y;
            this._desired_position = new p5.Vector(this._x, this._y);
        },
        getColor:function(){
            return {
                r:this._r,
                g:this._g,
                b:this._b,
                a:this._alpha
            }
        },
        setRadius:function(value){
            this._radius = value;
        },
        getRadius:function(){
            return this._radius;
        },
        getCurrentPosition:function(){
            return this._currentPosition;
        },
        onMouseOver:function(){
            this._r = 255;
            this.addLabel();
        },
        onMouseOut:function(){
            this._r = 100;
        },
        hitTest:function(p5canvas, hitTarget){
            var left, right,  top, bottom, hit;

            left =  hitTarget.getCurrentPosition().x - ( hitTarget.getRadius()/2 );
            right =  hitTarget.getCurrentPosition().x + ( hitTarget.getRadius()/2 );
            top =  hitTarget.getCurrentPosition().y - ( hitTarget.getRadius()/2 );
            bottom =  hitTarget.getCurrentPosition().y + ( hitTarget.getRadius()/2 );

            p5canvas.mouseY > top && p5canvas.mouseY < bottom && p5canvas.mouseX > left && p5canvas.mouseX < right ? hit = true : hit =false;

            return hit;
        },

        render:function(targ){
            this._p5Canvas = targ;

            targ.stroke( 0 );
            targ.strokeWeight( this._strokWeight );
            targ.fill(
                this._r,
                this._g,
                this._b,
                this._alpha);
            this._velocity = new p5.Vector(this._desired_position.x, this._desired_position.y);
            this._velocity.sub(this._currentPosition);
            this._velocity.div(this._maxSpeed);

            if(isNaN( this._velocity.x ))  this._velocity.x = 0;
            if(isNaN( this._velocity.y ))  this._velocity.y = 0;
            if(isNaN(this._velocity.y)) console.log("VEL Y norm"+this._velocity.y);

            this._currentPosition.add(this._velocity);

            targ.ellipse(this._currentPosition.x, this._currentPosition.y, this._radius, this._radius);
            targ.line(this._currentPosition.x, this._currentPosition.y, this._desired_position.x, this._desired_position.y);
            targ.fill(255,0,0,255);
            targ.ellipse(this._desired_position.x, this._desired_position.y, this._radius/3, this._radius/3);

            this.hitTest(targ, this) ? this.onMouseOver() : this.onMouseOut();
        }
    }
    return _scope;
})();

function ProcessingRenderer(target, opt_data, opt_config) {
    opt_config ? opt_config.createCanvas = false : opt_config = {createCanvas:false};
    BaseChart.call(this, target, opt_data, opt_config); // call super constructor.
}

ProcessingRenderer.prototype = Object.create(BaseChart.prototype);
ProcessingRenderer.prototype.constructor = ProcessingRenderer;


ProcessingRenderer.prototype.postInit = function() {
    this.setPlaying(false);
    this._p5 = new p5(s, this.getTarget());
    this._p5.background(0,0,0);
    this._p5.setWidth(this.getWidth());
    this._p5.setHeight(this.getHeight());
}


ProcessingRenderer.prototype.render = function(){
    //console.log("Rendering...", this.getData())
    this._p5.setData( this.getData() );
}
