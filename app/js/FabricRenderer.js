/**
 * Created by grahamclapham on 02/12/2014.
 */
var defaultCanvasConfig = {
    backgroundColor: 'rgb(200,200,200)',
        selectionColor: '#cccccc',
        selectionLineWidth: 2
    // ...
}

function FabricRendererer(target, opt_data, opt_config) {
    //opt_config ? opt_config.createCanvas = false : opt_config = {createCanvas:false};
    BaseChart.call(this, target, opt_data, opt_config); // call super constructor.
    this._dotArray = [];
    this.backgroundColor = "rgb(200,200,200)"
    this.dotdColor = "rgb(200,200,200)"
    this.fillGradient = "rgb(200,0,200)"
    this.areaChartArray = [];
    this.areaChart = null;
}

FabricRendererer.prototype = Object.create(BaseChart.prototype);
FabricRendererer.prototype.constructor = FabricRendererer;

/*
  API GETTERS AND SETTERS
*/

FabricRendererer.prototype.getBackgroundColour = function(){
    return this.backgroundColor;
}

FabricRendererer.prototype.setBackgroundColour = function(value){
    this.backgroundColor = value;
}

FabricRendererer.prototype.postInit = function() {
    this.setPlaying(false);
    this.setCanvas( new fabric.Canvas("chartHolder_fab", defaultCanvasConfig) );
}

FabricRendererer.prototype.animatePoint = function(i, prop, endPoints, polygon) {
    var _this = this
    fabric.util.animate({
        startValue: polygon.points[i][prop],
        endValue: endPoints[i][prop],
        duration: 1000,
        onChange: function(value) {
            console.log("CHANGED")
            polygon.points[i][prop] = value;
            // only render once
            if (i === polygon.points.length - 1 && prop === 'y') {
                _this.getCanvas().renderAll();
            }
        },
        onComplete: function() {
            polygon.setCoords();
            polygon.set( {fill: "rgba(100, 90,0, 0.01)"} )
            // only start animation once

        }
    });
}

FabricRendererer.prototype.render = function(){
    if(this.getData()){
        this.renderAreaChart();
        this.renderDotChart();
    }
//////////////////
    this.getCanvas().renderAll();

}


FabricRendererer.prototype.renderAreaChart = function(){

    //===
    this.areaChartArray = [];

    for(var i=0;i<this.getData().length; i++){

        for(var ii=0; ii<this.getData().length; ii++){
            this.areaChartArray[ii] = this.getData()[ii];
            //console.log(" - - - -",this.areaChartArray[ii])
        }
        this.areaChartArray.push( {x:this.getWidth(), y:this.getHeight()} );
        this.areaChartArray.push( {x:0, y:this.getHeight()} );

        //TODO: cull any extra items id the array is shorter
    }

    if(!this.areaChart) {
        console.log("There is no ");
        this.areaChart = new fabric.Polygon([this.getData()],
            {
                originX: 'left',
                originY: 'top',
                fill: "rgba(200, 0,100, 0.01)",
                selectable: true,
                centeredRotation: false,
                centeredScaling: false
            }
        )

        this.areaChart.set({points:this.areaChartArray});

        try{
            this.getCanvas().add(this.areaChart);
            console.log("Adding new areaChart to canvas")
        }catch(e){
            console.log(e)
        }
    }


    for(var i=0; i<this.areaChart.points.length; i++){
        this.animatePoint(i, 'y', this.areaChartArray, this.areaChart)
        this.animatePoint(i, 'x', this.areaChartArray, this.areaChart)
        // console.log("FIOUND A POINT")
    }

};

////////////////////////////////////////////

FabricRendererer.prototype.renderDotChart = function(){

    for(var dot in this._dotArray){
        this._dotArray[dot].remove()
    }
    this._dotArray =[]

    for(var i=0;i<this.getData().length; i++){
        if(!this._dotArray[i]){
            this._dotArray[i] = new fabric.Circle({
                radius: 6,
                fill: 'rgb(0, 255,200)',
                left: this.getData()[i].x,
                top: this.getData()[i].y,
                selectable: false
            });
            this.getCanvas().add(this._dotArray[i]);
        }
        try{
            this.getCanvas().add(this.areaChart);
        }catch(e){
            console.log(e)
        }
        //--
        this._dotArray[i].set(
            {
                radius: 6,
                fill: 'rgba(255, 0,200, 0.4)',
                left: this.getData()[i].x,
                top: this.getData()[i].y,
                selectable: false
            }
        );
        //TODO: cull any extra items id the array is shorter
        this._dotArray[i].set(
            {
                radius: 6,
                fill: 'rgba(255, 0,200, 0.4)',
                left: this.getData()[i].x,
                top: this.getData()[i].y,
                selectable: false
            }
        );
    }
};
