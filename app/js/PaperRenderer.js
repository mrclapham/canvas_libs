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

    // --  this.setPlaying(false)
    this. pointArray = [];
    var _canv = document.getElementById(this.getCanvasId())
    if(!_canv){
        throw new Error(this.getCanvasId()+ " cannot be found.")
    }else{
        this.setCanvas(_canv)
    }
    this._paper = paper.setup(_canv);

    this._circle = new this._paper.Path.Circle(new this._paper.Point(80, 50), 10);

// Pass a color name to the fillColor property, which is internally
// converted to a Color.
    this._circle.fillColor = this.dotColor;

    //this._int = setInterval(function(){
    //    //
    //    // Give the stroke a color
    //    path.strokeColor = 'black';
    //    var start = new paper.Point(100, 100);
    //    // Move to start and draw a line from there
    //    path.moveTo(start);
    //    // Note that the plus operator on Point objects does not work
    //    // in JavaScript. Instead, we need to call the add() function:
    //    path.lineTo(start.add([ Math.random()*300, Math.random()*300 ]));
    //    // Draw the view now:
    //    __paper.view.draw();
    //    //_paper2.view.draw();
    //    __circle.position = Math.random()*300, Math.random()*300;
    //
    //}, 1000)

    this._path = new this._paper.Path();
    this._start = new this._paper.Point(100, 100);
    this._path.moveTo(this._start);
    var _this = this

    _this.myPath = new _this._paper.Path();
    _this.myPath.add(new _this._paper.Point(0, 0));
    _this.myPath.strokeColor = _this.dotColor;
    for(var i =0; i<_this.getData().length; i++){
        // console.log("DATUM ",this.getData()[i].x)
        _this.myPath.add(new _this._paper.Point(_this.getData()[i].x, _this.getData()[i].y));
        _this._paper.view.draw();
    }

    this._paper.view.onFrame = function(e){
        _this._path.strokeColor = '#cccccc';
        // Move to start and draw a line from there
        // Note that the plus operator on Point objects does not work
        // in JavaScript. Instead, we need to call the add() function:
        _this._path.lineTo(_this._start.add([ Math.random()*300, Math.random()*300 ]));
        _this._path.smooth();

        // Draw the view now:
        //_paper2.view.draw();
        //_this._circle.position = Math.random()*300, Math.random()*300;
        //this._paper.remove( this._circle );
        _this._paper.view.draw();
       // _this.render()

        for(var i =0; i<_this.getData().length; i++){


            if(_this.myPath.segments[i]){

                var currentPos = new _this._paper.Point(_this.myPath.segments[i].getPoint().x , _this.myPath.segments[i].getPoint().y)
                var desiredPos = new _this._paper.Point(_this.getData()[i].x, _this.getData()[i].y)

                //var diff = new  this._paper.Point(xp.x - xp.x, 35);
                var diff = desiredPos.subtract(currentPos);
                //console.log("Diff 1",diff)

                //var currentPos2 = new _this._paper.Point(20, 30)
                //var desiredPos2 = new _this._paper.Point(10, 10)
                //var diff2 = desiredPos2.subtract(currentPos2)
                //diff3 = diff2.divide(2)
                //console.log("Diff 2",diff3)


                var velocity = diff.divide(12)
                // var diff = new paper.Point(currentPos.x - desiredPos.x, currentPos.y - desiredPos.y);
                //currentPos.add(diff);

                var se = _this.myPath.segments[i]
                //console.log(se.getPoint().y)
                var newpos = currentPos.add(velocity); //new _this._paper.Point(_this.getData()[i].x, _this.getData()[i].y)
                se.setPoint( newpos )
            }

            //this.myPath.segments[i]
        }
    }

}



PaperRenderer.prototype.render = function(){
    console.log("RENDER")
    // if(this.pointArray.length<)
    //this._path.strokeColor = 'black';

    // Move to start and draw a line from there
    // Note that the plus operator on Point objects does not work
    // in JavaScript. Instead, we need to call the add() function:
    this._path.lineTo(this._start.add([ Math.random()*300, Math.random()*300 ]));
    // Draw the view now:
    this._paper.view.draw();
    //_paper2.view.draw();
    this._circle.position = Math.random()*300, Math.random()*300;
    //this._paper.remove( this._circle );

   // this.myPath.fullySelected = true;
    this.myPath.smooth();
}
