/**
 * Created by grahamclapham on 03/09/2014.
 */

function EasleRenderer(target, opt_data, opt_config) {
    BaseChart.call(this, target, opt_data, opt_config); // call super constructor.
}

EasleRenderer.prototype = Object.create(BaseChart.prototype);
EasleRenderer.prototype.constructor = EasleRenderer;

EasleRenderer.prototype.postInit = function(){
    this.setPlaying(false);

    this._dotArray = [];
    this._curveRadius = 24;
    //Create a stage by getting a reference to the canvas

    this.stage = new createjs.Stage("easleCanvas");
    //console.log(this.stage.canvas)
    this.setCanvas( this.stage.canvas )
    this.stage.width = this.getWidth();
    this.stage.height = this.getHeight();
    this.stage.enableMouseOver(10);

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

    //tooltip
    this.tooltip = new createjs.Container();
    //this.stage.addChild(this.tooltip)

    this.tooltip.x = 100;
    this.tooltip.y = 100

    // this is added as a visual test for the bezier curve
    this.bezierContainer = new createjs.Container();
   // this.stage.addChild(this.bezierContainer)
    this.bezLine = new createjs.Shape();
    this.bezierContainer.addChild(this.bezLine);
    renderTooltip.call(this);
    //Update stage will render next frame
    //this.stage.update();

//
//    this.stage.on("stagemousemove", function(evt) {
//        console.log("stageX/Y: "+evt.stageX+","+evt.stageY); // always in bounds
//        console.log("rawX/Y: "+evt.rawX+","+evt.rawY); // could be < 0, or > width/height
//    });
}

EasleRenderer.prototype.clearContainer = function(container){
    //TODO:
}


EasleRenderer.prototype.render = function(){
    this.BackgroundStripeArray = [];
    this._dotArray = []
    var _cols = ["red", "green", "blue"]
    var _this = this;
    if( this.getData() ){
        for(var i=0; i<this.getData().length; i++){
            var __circle = new createjs.Shape();
            __circle.graphics.beginFill(    _cols[Math.floor(Math.random()*3)]  ).drawCircle(0, 0, 8);
            __circle.x = this.getData()[i].x;
            __circle.y = this.getData()[i].y;
            __circle.dataIndex = i;
            __circle.cursor = "pointer";
            __circle.addEventListener("click", function(e){ onClicked.call(_this, e) });
            __circle.addEventListener("rollover", function(e){ onRolled.call(_this, e) });
            this.dotContainer.addChild(__circle);
            this._dotArray.push(__circle)
        }
        //Update stage will render next frame
        //onChange.call(_this, {})
        updateLine.call(this);
        drawBezier.call(this);
        updateBackground.call(this);
        this.stage.update();
    }

    //---
    EasleRenderer.prototype.addToolTip = function(){
        console.log("tool tip added ")
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

var onRolled = function(e){

    console.log("onRolled", e.target.dataIndex)
    var index = e.target.dataIndex
    showTooltip.call(this, index, e)
}

var renderTooltip = function(){
    this._toolTipHtml = document.createElement('div')
    this.p=document.createElement("p")
    this.tollText=document.createTextNode("Hello World");
    this.p.appendChild(this.tollText);
    this._toolTipHtml.appendChild(this.p);
    this.toolTipSpeed = .2
    this._toolTipHtml.style.cssText = 'position:absolute;' +
        'top:30px;' +
        'left:30px;' +
        'width:auto;' +
        'height:auto;' +
        'padding:5px;' +
        '-webkit-transition: '+this.toolTipSpeed+'s ease-out;'+
        '-moz-transition: '+this.toolTipSpeed+'s ease-out;'+
        '-o-transition: '+this.toolTipSpeed+'s ease-out;'+
        'transition: '+this.toolTipSpeed+'s ease-out;'+
        '-moz-border-radius:100px;' +
        'border:1px  solid #ddd;' +
        'background-color:rgba(0,0,0,.5);'+
        'display: block;'+
        '-webkit-margin-before: 0px;'+
        '-webkit-margin-after: 0px;'+
        '-webkit-margin-start: 0px;'+
        '-webkit-margin-end: 0px;'+
        '-moz-box-shadow: 0px 0px 8px  #fff;'
    ;
    this.p.style.cssText = '-webkit-margin-before: 0px;'+
                    '-webkit-margin-after: 0px;'+
                    '-webkit-margin-start: 0px;'+
                    '-webkit-margin-end: 0px;'+
                    'color: #ff00ff'


    this.getTarget().appendChild(this._toolTipHtml)
    this.stage.update();

}



var showTooltip = function(index, e){
    var point = e.target.localToGlobal(100, 100);
    console.log("PONINT ",point.y)
    console.log("TARG Y ",e.target.y)



    this._toolTipHtml.style.left=  e.target.x+"px";
    this._toolTipHtml.style.top=  e.target.y+"px";

    this._toolTipHtml.innerHTML = "<p style='-webkit-margin-before: 0px; -webkit-margin-after: 0px; -webkit-margin-start: 0px; -webkit-margin-end: 0px; color: rgb(255, 255, 255);'> the y value is "+this.getData()[index].y+"</p>"



    this.tooltip.removeAllChildren();
    var _background = new createjs.Shape()
        _background.graphics.beginFill("#ff0000").drawRoundRect( 0, 0, 100, 50,  5 )
    this.tooltip.addChild(_background);
//font-family: 'Special Elite', cursive;
    var text = new createjs.Text(String(this.getData()[index].x), "20px 'Special Elite'", "#ff7700"); text.x = 10; text.textBaseline = "alphabetic";
    this.tooltip.addChild(text);

   // console.log(this.getData()[index], this.tooltip);
    this.stage.update();

}

var onClicked = function(e){
    console.log("onClicked", e);
}

var onChange = function(){
    updateLine.call(this);
    this.stage.update();
}

var initalRender = function(){
    console.log("INITIAL RENDER", this);

}//----
var updateLine = function(){
    this.lineGraph.graphics.clear();
    this.lineGraph.graphics.moveTo(0, this.getHeight());
    //this.lineGraph.graphics.beginFill("#454545");
    this.lineGraph.graphics.beginLinearGradientFill(["#ff9933","#000000"], [0.1, 0.9], 0, 50, 0, this.getHeight())


    this.lineGraph.alpha = .4;
    for(var i=0;i<this._dotArray.length; i++){
       this.lineGraph.graphics.lineTo(this._dotArray[i].x, this._dotArray[i].y);
       // this.lineGraph.graphics.bezierCurveTo(this._dotArray[i].x-this._curveRadius, this._dotArray[i].y, this._dotArray[i].x+this._curveRadius, this._dotArray[i].y, this._dotArray[i].x, this._dotArray[i].y);
    }
    this.lineGraph.graphics.lineTo(this._dotArray[ this._dotArray.length -1].x, this.getHeight());
    this.lineGraph.graphics.lineTo(0, this.getHeight());

}

var updateBackground = function(){
    this.backGroundContainer.removeAllChildren();

    this.backgroundFill = new createjs.Shape()
    this.backgroundFill.graphics.beginFill(  "#000000"  ).drawRect(0, 0, this.getWidth(), this.getHeight());
    this.backGroundContainer.addChild(this.backgroundFill)
}


//---------
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
        cx1 = __points[i].x //+ (2 * this._curveRadius);
        cx2 = __points[i].x //- this._curveRadius;
        cy1 = __points[i].y - (2 * this._curveRadius);
        cy2 = __points[i].y + this._curveRadius;
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

