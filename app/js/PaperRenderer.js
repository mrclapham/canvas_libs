/**
 * Created by grahamclapham on 04/12/2014.
 */
// create a global paperScope var

if(!_paper) var _paper =  new paper.PaperScope();

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

    var _canv = document.getElementById(this.getCanvasId())
    if(!_canv){
        throw new Error(this.getCanvasId()+ " cannot be found.")
    }else{
        this.setCanvas(_canv)
    }

    _paper.setup(_canv);
    this._circle = new paper.Path.Circle(new paper.Point(80, 50), 10);

    this. pointArray = [];
    this._circleArray =[]
    // this.circleLayer = new _paper.Layer();

// Pass a color name to the fillColor property, which is internally
// converted to a Color.

    this._circle.fillColor = this.dotColor;
    this._path = new _paper.Path();
    this._start = new _paper.Point(100, 100);
    this._path.moveTo(this._start);
    this.myPath = new _paper.Path();
    this.myPath.add(new _paper.Point(0, 0));
    this.myPath.strokeColor = this.dotColor;

    this._xSale = null;
    this._yScale = null;
    var _this = this;

    _paper.view.onFrame = function(e){
        _onFrame.call(_this);
      //  _scribble.call(_this)
    }
}

PaperRenderer.prototype.activate = function(opt_layer){
    this._view =  _paper.View._viewsById[ this.getCanvasId() ];
    this._view._project.activate();
}

PaperRenderer.prototype.makeDot = function(x,y){
    this.activate();
    var _dot = new _paper.Shape.Circle(x,y, 6);
    _dot.fillColor = "rgba(100,200,89,1)";
    console.log("_dot ",_dot);
    return _dot;
}

var _drawDots =function(){

    var diff;
    if(this._circleArray.length != this.getData().length){
         diff =  this.getData().length - this._circleArray.length
        console.log("this._circleArray.length  diff ", diff)
    }
    ///////////////
    if(diff>0){
        for(var i=0; i<diff; i++){
            // var _dot = this.makeDot( this.getData()[i].x, this.getData()[i].y );
            //console.log("DOT>>>>>>>>>>>>> ",_dot)
            this.activate();
            var _circle = new _paper.Path.Circle(new _paper.Point(this.getData()[i].x, this.getData()[i].y), 6);
            this._circleArray.push(_circle)
            _circle.fillColor = this.dotColor;
        }
       // console.log(this._circleArray)
    }
    ////////////

    if(diff<0){

        var _removealArray = this._circleArray.splice(this._circleArray.length+diff,  0-diff )

        for(var i=0; i<_removealArray.length; i++){
            // var _dot = this.makeDot( this.getData()[i].x, this.getData()[i].y );
            this.activate();
            //var _circle = new _paper.Path.Circle(new _paper.Point(this.getData()[i].x, this.getData()[i].y), 6);
            var toDelete = _removealArray[i]
            console.log("DELETE :: ",toDelete)
            try{
                toDelete.remove();
                delete toDelete;
            }catch(e){
                ///---
            }
           // _circle.fillColor = this.dotColor;
        }
        console.log(this._circleArray)
    }


}

var _drawLine = function(){
    if( this.myPath.segments.length < this.getData().length){
        console.log("Adding segments...",this.myPath.segments.length)

        for(var i=this.myPath.segments.length; i<this.getData().length; i++){
            this.myPath.add(new _paper.Point(0, 0));
        }
    }

    if( this.myPath.segments.length > this.getData().length){
        //for(var i=this.getData().length ; i<this.myPath.segments.length; i++){
        //    this.myPath.add(new _paper.Point(0, 0));
        //}
        console.log(this.myPath.segments.length, this.getData().length)
        this.myPath.removeSegments(this.getData().length-1, this.myPath.segments.length-1)
        console.log("Removing segments...",this.myPath.segments.length);
    }
    this.myPath.selected = true;
}

        //this.myPath.selected = true;
var _onFrame = function(){
   // this.activate();


    for(var i =0; i<this.getData().length; i++){
        if(this.myPath.segments[i]){
            var currentPos = new _paper.Point(this.myPath.segments[i].getPoint().x , this.myPath.segments[i].getPoint().y);

            var xp =  this.getXscale()  ? this.getXscale().map( this.getData()[i].x ) : this.getData()[i].x;
            var yp =  this.getYscale()  ? this.getYscale().map( this.getData()[i].y ) : this.getData()[i].y;

            var desiredPos = new _paper.Point( xp, yp );
            var diff = desiredPos.subtract(currentPos);
            var velocity = diff.divide(6);
            var se = this.myPath.segments[i];
            var newpos = currentPos.add(velocity); //new __paper.Point(_this.getData()[i].x, _this.getData()[i].y)
            se.setPoint( newpos );
            if(this._circleArray[i]) this._circleArray[i].position = newpos;
        }
    }
    //this.myPath.smooth();
    this.myPath.add(new _paper.Point(this.getWidth(), 300));
    this.myPath.add(new _paper.Point(0, 300));
    this.myPath.closed = true;
    this.myPath.fillColor = "rgba(255,0,255,0.1)"
    //this.myPath.dashArray = [10, 4];
}


var _scribble = function(){
    this._path.strokeColor = '#cccccc';
    this._path.lineTo(this._start.add([ Math.random()*300, Math.random()*300 ]));
    this._path.smooth();
    this._path.dashArray = [10, 4];
    _paper.view.draw();
}

PaperRenderer.prototype.render = function(){
    console.log("RENDER: ",this.getYscale() )
    _drawLine.call(this);
    _drawDots.call(this);
    //this._path.lineTo(this._start.add([ Math.random()*300, Math.random()*300 ]));
    // Draw the view now:
    //_paper.view.draw();
    //_paper2.view.draw();
    this._circle.position = Math.random()*300, Math.random()*300;
    //_paper.remove( this._circle );
   // this.myPath.fullySelected = true;
    //this.myPath.smooth();
    _paper.view.draw();
}
