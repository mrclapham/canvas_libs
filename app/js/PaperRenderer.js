/**
 * Created by grahamclapham on 04/12/2014.
 */


function PaperRenderer(target, opt_data, opt_config){

    if(opt_config){
        opt_config.createCanvas = false;
        opt_config.canvasId = target;
    }else{
        opt_config = {createCanvas:false, canvasId:target};
    }
    this.dotColor = "red"
    BaseChart.call(this, target, opt_data, opt_config); // call super constructor.

};

PaperRenderer.prototype = Object.create(BaseChart.prototype);
PaperRenderer.prototype.constructor = PaperRenderer;
PaperRenderer.prototype.postInit = function(){
    this.setPlaying(false)
    this. pointArray = [];
    this._circleArray =[]
    var _canv = document.getElementById(this.getCanvasId())
    if(!_canv){
        throw new Error(this.getCanvasId()+ " cannot be found.")
    }else{
        this.setCanvas(_canv)
    }
    this._paper = new paper.PaperScope();
    this._paper.setup(_canv);
    this._circle = new paper.Path.Circle(new paper.Point(80, 50), 10);

// Pass a color name to the fillColor property, which is internally
// converted to a Color.
    this._circle.fillColor = this.dotColor;
    this._path = new this._paper.Path();
    this._start = new this._paper.Point(100, 100);
    this._path.moveTo(this._start);
    this.myPath = new this._paper.Path();
    this.myPath.add(new this._paper.Point(0, 0));
    this.myPath.strokeColor = this.dotColor;

    var _this = this;

    this._paper.view.onFrame = function(e){
        _onFrame.call(_this);
      //  _scribble.call(_this)
    }
}

PaperRenderer.prototype.makeDot = function(x,y){
    var _dot = new this._paper.Shape.Circle(x,y, 6);
    _dot.fillColor = "rgba(100,200,89,1)";

    return _dot;
}

var _drawDots =function(){
    this._paper.activate();
   // console.log( this._paper.getId() );
    for(var i=0; i<this.getData().length; i++){
       // var _dot = this.makeDot( this.getData()[i].x, this.getData()[i].y );
        //console.log("DOT>>>>>>>>>>>>> ",_dot)
        this._circle = new this._paper.Path.Circle(new this._paper.Point(this.getData()[i].x, this.getData()[i].y), 6);
        this._circle.fillColor = this.dotColor;
    }
}

var _drawLine = function(){
    if( this.myPath.segments.length < this.getData().length){
        console.log("Adding segments...",this.myPath.segments.length)

        for(var i=this.myPath.segments.length; i<this.getData().length; i++){
            this.myPath.add(new this._paper.Point(0, 0));
        }
    }

    if( this.myPath.segments.length > this.getData().length){
        //for(var i=this.getData().length ; i<this.myPath.segments.length; i++){
        //    this.myPath.add(new this._paper.Point(0, 0));
        //}
        console.log(this.myPath.segments.length, this.getData().length)
        this.myPath.removeSegments(this.getData().length-1, this.myPath.segments.length-1)
        console.log("Removing segments...",this.myPath.segments.length);
    }
    this.myPath.selected = true;
}

        //this.myPath.selected = true;

var _onFrame = function(){
    this._paper.activate(0);
console.log("ACTIVE PROJECT ", this._paper.project)
    for(var i =0; i<this.getData().length; i++){
        if(this.myPath.segments[i]){
            var currentPos = new this._paper.Point(this.myPath.segments[i].getPoint().x , this.myPath.segments[i].getPoint().y)
            var desiredPos = new this._paper.Point(this.getData()[i].x, this.getData()[i].y)
            var diff = desiredPos.subtract(currentPos);
            var velocity = diff.divide(12)
            var se = this.myPath.segments[i]
            var newpos = currentPos.add(velocity); //new _this._paper.Point(_this.getData()[i].x, _this.getData()[i].y)
            se.setPoint( newpos )
        }
    }

    //this.myPath.smooth();
    this.myPath.add(new this._paper.Point(this.getWidth(), 300));
    this.myPath.add(new this._paper.Point(0, 300));
    this.myPath.closed = true;
    this.myPath.fillColor = "rgba(255,0,255,0.1)"
    //this.myPath.dashArray = [10, 4];

}



var _scribble = function(){
    this._path.strokeColor = '#cccccc';
    this._path.lineTo(this._start.add([ Math.random()*300, Math.random()*300 ]));
    this._path.smooth();
    this._path.dashArray = [10, 4];
    this._paper.view.draw();
}

PaperRenderer.prototype.render = function(){
    console.log("RENDER")
    _drawLine.call(this);
    _drawDots.call(this);
    //this._path.lineTo(this._start.add([ Math.random()*300, Math.random()*300 ]));
    // Draw the view now:
    //this._paper.view.draw();
    //_paper2.view.draw();
    this._circle.position = Math.random()*300, Math.random()*300;
    //this._paper.remove( this._circle );
   // this.myPath.fullySelected = true;
    //this.myPath.smooth();
    this._paper.view.draw();

}
