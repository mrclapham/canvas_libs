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

    //Update stage will render next frame
    this.stage.update();

    this.setPlaying(false)

}

EasleRenderer.prototype.clearContainer = function(container){
    //TODO:
}

EasleRenderer.prototype.render= function(){
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
    this.lineGraph.graphics.beginFill("#ff00ff");
    this.lineGraph.alpha = .4
    for(var i=0;i<this._dotArray.length; i++){
        this.lineGraph.graphics.lineTo(this._dotArray[i].x, this._dotArray[i].y);
    }
    this.lineGraph.graphics.lineTo(this._dotArray[ this._dotArray.length -1].x, this.getHeight());
    this.lineGraph.graphics.lineTo(0, this.getHeight());

}