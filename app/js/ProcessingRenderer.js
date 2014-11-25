var s = function( sketch ) {
    sketch.frameRate(16);
    sketch._xp = 0;
    sketch._bg_r = 60;
    sketch._bg_g = 65;
    sketch._bg_b = 60;
    sketch._bg_a = 200;
    sketch._color = null;
    sketch.dotArray = [];
    sketch.data = {};
    sketch._width = 900;
    sketch._height = 300;
    sketch._leftOffset = 15;

    sketch.setup = function() {
        sketch._canvas = sketch.createCanvas(sketch._width, sketch._height);
        sketch.background(255,244,0);
        for(var i=0; i<4; i++){
            sketch.dotArray[i] = new ChartDot(Math.random()*200, Math.random()*200)
        }
    };

    sketch.draw = function() {
        sketch.background(sketch._bg_r,sketch._bg_g,sketch._bg_b,sketch._bg_a);
        //sketch.rect(sketch.width/2, sketch.height/2, 100, 200);
        //sketch.ellipse(sketch._xp, 50, 80, 80);
        //sketch._xp++;
        sketch.fill(255, 0, 0, 200);
        sketch.stroke(0,255,0,200);
        sketch.beginShape();
        for(var ii=0; ii<sketch.dotArray.length; ii++){
            sketch.vertex(sketch.dotArray[ii]._currentPosition.x, sketch.dotArray[ii]._currentPosition.y);
        }
        sketch.vertex(sketch._width, sketch._height);
        sketch.vertex(0, sketch._height);
        sketch.endShape(sketch.CLOSE);

        for(var i=0; i<sketch.dotArray.length; i++){
            sketch.smooth();
            sketch.dotArray[i].render(sketch);
        }




    }
/////////////////////
    sketch.mousePressed = function() {
        sketch.background(255,0,0);
    }
/////////////////////
    sketch.mouseDown = function() {
        sketch.background(0,255,0);
    }
/////////////////////
    sketch.setData = function(value){
        sketch.data = value;
        sketch.onDataSet();
    }
///////////////////////
    sketch.onDataSet = function(){
        if (sketch.dotArray && sketch.dotArray.length == sketch.data.length){
            console.log("Pos changed")
            for(var i=0; i<sketch.data.length; i++){
                sketch.dotArray[i].setPosition(sketch.data[i].x, sketch.data[i].y)
            }
        }else{
            console.log("New array made ");
            sketch.dotArray = [];
            for(var i=0; i<sketch.data.length; i++){
                sketch.dotArray[i]=new ChartDot(sketch.data[i].x, sketch.data[i].y)
            }
        }
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
//--- sub classes for the sketch
var ChartDot = (function(x,y){
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
        int.call(this);
    }

    var int = function(){
        if(!this._currentPosition &&  this._desired_position){
            this._currentPosition = new p5.Vector(this._desired_position.x, this._desired_position.y)
        }else{
            this._currentPosition = new p5.Vector(0,0)
        }
    }

    _scope.prototype = {
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
        render:function(targ){
          //  console.log(this)
            targ.stroke( 0 );
            targ.strokeWeight( this._strokWeight );
            targ.fill( this._r,
                this._g,
                this._b,
                this._alpha);
            this._velocity = new p5.Vector(this._desired_position.x, this._desired_position.y);
            this._velocity.sub(this._currentPosition);
            //console.log("VEL X "+this._velocity.x)
            //console.log("VEL Y "+this._velocity.y)
            //this._velocity.normalize();
            this._velocity.div(this._maxSpeed);

            if(isNaN( this._velocity.x ))  this._velocity.x = 0;
            if(isNaN( this._velocity.y ))  this._velocity.y = 0;
            if(isNaN(this._velocity.y)) console.log("VEL Y norm"+this._velocity.y)

            this._currentPosition.add(this._velocity);

            targ.ellipse(this._currentPosition.x, this._currentPosition.y, 12, 12);
            targ.line(this._currentPosition.x, this._currentPosition.y, this._desired_position.x, this._desired_position.y)
            targ.fill(255,0,0,255);
            targ.ellipse(this._desired_position.x, this._desired_position.y, 4, 4);
            //console.log(this._desired_position.x, this._desired_position.y);
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
    //console.log("Rendering...", this.getData())
    this._p5.setData( this.getData() );
}
