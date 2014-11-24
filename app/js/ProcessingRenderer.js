var s = function( sketch ) {

    sketch._xp = 0;
    sketch._bg_r = 0;
    sketch._bg_g = 255;
    sketch._bg_b = 100;
    sketch._bg_a = 10;
    sketch._color = null;
    sketch.dotArray = [];
    sketch.data = {};
    sketch.dCount = 0;
    sketch.setup = function() {
        sketch._canvas = sketch.createCanvas(600, 400);
        sketch.background(255,244,0);
        for(var i=0; i<4; i++){
            sketch.dotArray[i] = new ChartDot(Math.random()*200, Math.random()*200)
        }
    };

    sketch.draw = function() {
        sketch.background(sketch._bg_r,sketch._bg_g,sketch._bg_b,sketch._bg_a);
        sketch.rect(sketch.width/2, sketch.height/2, 100, 200);
        sketch.ellipse(sketch._xp, 50, 80, 80);
        sketch._xp++;

        for(var i=0; i<sketch.dotArray.length; i++){
            sketch.dCount++
            if(sketch.dCount<3)console.log(sketch.dotArray[i])
            sketch.smooth();

            sketch.dotArray[i].render(sketch);
        }
    }

    sketch.mousePressed = function() {
        sketch.background(255,0,0);
    }

    sketch.mouseDown = function() {
        sketch.background(0,255,0);
    }

    sketch.onDataSet = function(){
        sketch.dotArray = [];
        for(var i=0; i<sketch.data.length; i++){
            sketch.dotArray[i]
        }
    }
    // API
    sketch.getr = function(){
        return sketch._color;
    }
    sketch.setColor = function(value){
        var _passed = true;
        if(value.length != 4 ) _passed = false;

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

//--- sub classes for the sketch

var ChartDot = (function(x,y){
    var _scope = function(x,y){
        this._width = 10;
        this._x = x;
        this._y = y;
        this._position = new p5.Vector(this._x, this._y)
        this._r = 100;
        this._g = 200;
        this._b = 0;
        this._alpha = 200;
        this._strokWeight = 1;

    }

    _scope.prototype = {
        getColor:function(){
            return {    r:this._r,
                g:this._g,
                b:this._b,
                a:this._alpha
            }
        },
        render:function(targ){
          //  console.log(this)
            targ.stroke( 0 );
            targ.strokeWeight( this._strokWeight );
            targ.fill( this._r,
                this._g,
                this._b,
                this._alpha);
            targ.ellipse(this._position.x, this._position.y, 12, 12);
            console.log(this._position.x, this._position.y);
        }
    }
    return _scope;

})();



function ProcessingRenderer(target, opt_data, opt_config) {
    BaseChart.call(this, target, opt_data, opt_config); // call super constructor.
}

ProcessingRenderer.prototype = Object.create(BaseChart.prototype);
ProcessingRenderer.prototype.constructor = ProcessingRenderer;


ProcessingRenderer.prototype.postInit = function() {
    this.setPlaying(false);
    this._p5 = new p5(s, this.getTarget());
    this._p5.background(0,244,0);
}


ProcessingRenderer.prototype.render = function(){
    console.log("Rendering...")
}
