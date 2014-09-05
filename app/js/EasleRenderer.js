/**
 * Created by grahamclapham on 03/09/2014.
 */

function EasleRenderer(target, opt_data) {
    BaseChart.call(this, target, opt_data); // call super constructor.
}

EasleRenderer.prototype = Object.create(BaseChart.prototype);
EasleRenderer.prototype.constructor = EasleRenderer;

EasleRenderer.prototype.postInit = function(){

    console.log("POST INT CALLED")
    this._dotArray = [];

    var circle;

    //Create a stage by getting a reference to the canvas
    this.stage = new createjs.Stage("easleCanvas");
    //Dot container
    this.dotContainer = new createjs.Container();
    this.stage.addChild(this.dotContainer)
    //Create a Shape DisplayObject.
    circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 40);
    //Set position of Shape instance.
    circle.x = circle.y = 50;
    //Add Shape instance to stage display list.
    this.dotContainer.addChild(circle);
    //Update stage will render next frame
    this.stage.update();
    this.setPlaying(false)

    //this.render();

}

EasleRenderer.prototype.clearContainer = function(container){

}

EasleRenderer.prototype.render= function(){
    console.log("Easle Render")
    this._dotArray = []
    var _cols = ["red", "green", "blue"]
    if( this.getData() ){
        for(var i=0; i<this.getData().length; i++){
            var __circle = new createjs.Shape();
            __circle.graphics.beginFill(    _cols[Math.floor(Math.random()*3)]  ).drawCircle(this.getData()[i].x, this.getData()[i].y, 4);
            //circle.graphics.beginFill("red").drawCircle(4*i, 5*i, 4);
            this.dotContainer.addChild(__circle);
            this._dotArray.push(__circle)
        }
        console.log("this._dotArray",this._dotArray)

        //Update stage will render next frame
        this.stage.update();
    }
EasleRenderer.prototype.update = function(){
    console.log("Easle Update: ",this.getData().length)
        for(var i=0; i<this.getData().length; i++){
            //console.log("_____ ",this._dotArray[i])
            var xp = this.getData()[i].x
            var yp = this.getData()[i].y
            createjs.Tween.get(this._dotArray[i], {override:true, loop:false}).to({x:xp}, 200).to({y:yp}, 200)
        }
    var _this = this
    // add a ticker to update the stage...
    createjs.Ticker.addEventListener('tick', function(e){ updateStage.call(_this, e) })
    this.stage.update();

}

    var updateStage = function(e){
        this.stage.update();
       // console.log(this)
    }




//    if(!this.data.width){
//        this.data.width = 800;
//        console.log("no data")
//    }
//    this.clear();
//
//    var ctx = this.getContext();
//    ctx.fillStyle = "#ff0000";
//    if(this.data.width&&this.data.width>6)this.data.width-=1;
////    console.log(this.data.width)
//    ctx.beginPath();
//    ctx.rect(0,0,this.data.width,this.getHeight());
//    ctx.fill();
//    ctx.closePath();
}