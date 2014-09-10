/**
 * Created by grahamclapham on 03/09/2014.
 */

function EasleRenderer(target, opt_data) {
    BaseChart.call(this, target, opt_data); // call super constructor.
}

EasleRenderer.prototype = Object.create(BaseChart.prototype);
EasleRenderer.prototype.constructor = EasleRenderer;

EasleRenderer.prototype.postInit = function(){

    this._dotArray = [];
    this._curveRadius = 24;
    //Create a stage by getting a reference to the canvas
    this.stage = new createjs.Stage("easleCanvas");

    //Background Container
    this.backGroundContainer = new createjs.Container();
    this.stage.addChild(this.backGroundContainer)

    //Line Container
    this.lineContainer = new createjs.Container();
    this.stage.addChild(this.lineContainer)
    this.lineGraph = new createjs.Shape();
    this.lineContainer.addChild(this.lineGraph);

    //Dot container
    this.dotContainer = new createjs.Container();
    this.stage.addChild(this.dotContainer)

    // this is added as a visual test for the bezier curve
    this.bezierContainer = new createjs.Container();
    this.stage.addChild(this.bezierContainer)
    this.bezLine = new createjs.Shape();
    this.bezierContainer.addChild(this.bezLine);

    //Update stage will render next frame
    this.stage.update();

    this.setPlaying(false)

}

EasleRenderer.prototype.clearContainer = function(container){
    //TODO:
}

EasleRenderer.prototype.render = function(){
    this.BackgroundStripeArray = [];
    this._dotArray = []
    var _cols = ["red", "green", "blue"]
    if( this.getData() ){
        for(var i=0; i<this.getData().length; i++){
            var __circle = new createjs.Shape();
            __circle.graphics.beginFill(    _cols[Math.floor(Math.random()*3)]  ).drawCircle(0, 0, 4);
            __circle.x = this.getData()[i].x;
            __circle.y = this.getData()[i].y;
            this.dotContainer.addChild(__circle);
            this._dotArray.push(__circle)
        }
        //Update stage will render next frame
        //onChange.call(_this, {})
        updateLine.call(this);
        drawBezier.call(this);
        this.stage.update();
    }

//----
EasleRenderer.prototype.update = function(){
    var _this = this;

    for(var i=0; i<this.getData().length; i++){
            var xp = this.getData()[i].x;
            var yp = this.getData()[i].y;
            this._tween = createjs.Tween.get(this._dotArray[i], {override:false, loop:false}).to({x:xp}, 200).to({y:yp}, 200);
            this._tween.addEventListener("change", function(e){ onChange.call(_this, e) });
        }
    }
}

var onChange = function(){
    updateLine.call(this);
    this.stage.update();
}

var initalRender = function(){
    console.log("INITIAL RENDER", this)

}//----
var updateLine = function(){
    this.lineGraph.graphics.clear();
    this.lineGraph.graphics.moveTo(0, this.getHeight());
    this.lineGraph.graphics.beginFill("#454545");
    this.lineGraph.alpha = .4
    for(var i=0;i<this._dotArray.length; i++){
       // this.lineGraph.graphics.lineTo(this._dotArray[i].x, this._dotArray[i].y);
        this.lineGraph.graphics.bezierCurveTo(this._dotArray[i].x-this._curveRadius, this._dotArray[i].y, this._dotArray[i].x+this._curveRadius, this._dotArray[i].y, this._dotArray[i].x, this._dotArray[i].y);
    }
    this.lineGraph.graphics.lineTo(this._dotArray[ this._dotArray.length -1].x, this.getHeight());
    this.lineGraph.graphics.lineTo(0, this.getHeight());
}
var drawBezier = function(){
    var __points = [{x:50, y:100}, {x:100, y:90}, {x:150, y:200}, {x:200, y:90}, {x:250, y:300}, {x:300, y:90}, {x:350, y:200}, {x:400, y:90} ]
    var xStep = 100

    var __points = [];
    for(var i = 0; i<20; i++){
        __points.push({x:i*xStep, y:Math.random()*600})
    }


    this.bezLine.graphics.clear();
    this.bezLine.graphics.moveTo(0, 0);
    this.bezLine.graphics.beginStroke("#00ffff");

    for(var i = 0; i< __points.length; i++){

        var _circle = new createjs.Shape();
        _circle.graphics.beginFill(  "#ff0000"  ).drawCircle(0, 0, 2);

        var cx1, cx2, cy1, cy2, xp, xp;
        cx1 = __points[i].x + (2 * this._curveRadius);
        cx2 = __points[i].x - this._curveRadius;
        cy1 = __points[i].y
        cy2 = __points[i].y
        xp  = __points[i].x
        yp  = __points[i].y

        _circle.x = __points[i].x;
        _circle.y = __points[i].y;

        _circCp1 = new createjs.Shape();
        _circCp1.graphics.beginFill(  "#000000"  ).drawCircle(0, 0, 2);

        _circCp1.x = cx1;
        _circCp1.y = cy1;

        _circCp2 = new createjs.Shape();
        _circCp2.graphics.beginFill(  "#ff88ff"  ).drawCircle(0, 0, 2);

        _circCp2.x = cx2;
        _circCp2.y = cy2;


        this.bezierContainer.addChild(_circle);
        this.bezierContainer.addChild(_circCp1);
        this.bezierContainer.addChild(_circCp2);
        this.bezLine.graphics.bezierCurveTo(cx1, cy1, cx2, cy2, xp, yp);
    }

}

