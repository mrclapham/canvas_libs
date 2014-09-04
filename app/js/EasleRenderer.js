/**
 * Created by grahamclapham on 03/09/2014.
 */

function EasleRenderer(target, opt_data) {
    BaseChart.call(this, target, opt_data); // call super constructor.
}

EasleRenderer.prototype = Object.create(BaseChart.prototype);
EasleRenderer.prototype.constructor = EasleRenderer;

EasleRenderer.prototype.data = {width:700}
EasleRenderer.prototype.postInit = function(){
    console.log("I am the overidden POST INIT function from the easle version")

    var circle;

    console.log(createjs.Stage)
    //Create a stage by getting a reference to the canvas
    this.stage = new createjs.Stage("easleCanvas");

    //Create a Shape DisplayObject.
    circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 40);
    //Set position of Shape instance.
    circle.x = circle.y = 50;
    //Add Shape instance to stage display list.
    this.stage.addChild(circle);
    //Update stage will render next frame
    this.stage.update();
    this.setPlaying(false)
    this.render();

}

EasleRenderer.prototype.render= function(){
    console.log("Render called",this.getData() )
    if( this.getData() ){
        for(var i=0; i<this.getData().length; i++){
            var circle = new createjs.Shape();
            circle.graphics.beginFill("red").drawCircle(this.getData()[i].x, this.getData()[i].y, 4);
            //circle.graphics.beginFill("red").drawCircle(4*i, 5*i, 4);
            this.stage.addChild(circle);
            console.log("add")
        }
        //Update stage will render next frame
        this.stage.update();
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