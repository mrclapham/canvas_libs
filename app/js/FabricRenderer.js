/**
 * Created by grahamclapham on 02/12/2014.
 */
var defaultCanvasConfig = {
    backgroundColor: 'rgb(20,20,20)',
        selectionColor: '#cccccc',
        selectionLineWidth: 2
    // ...
}

function FabricRendererer(target, opt_data, opt_config) {
    //opt_config ? opt_config.createCanvas = false : opt_config = {createCanvas:false};
    BaseChart.call(this, target, opt_data, opt_config); // call super constructor.
    this._dotArray = [];
    this.backgroundColor = "rgb(20,20,20)"
    this.dotdColor = "rgb(200,200,200)"
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
            polygon.points[i][prop] = value;
            polygon.set( {fill: "rgba(0, 255,0, 0.1)"} )

            polygon.setGradient('fill', {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: _this.height,
                colorStops: {
                    0: 'rgba(255, 153, 0, 0.2)',
                    1: 'rgba(0, 0, 0, 0.2)'
                },
                opacity: 0.05
            })
           // _this.getCanvas().renderAll();

            // only render once
            if (i === polygon.points.length - 1 && prop === 'y') {
                _this.getCanvas().renderAll();
            }
        },
        onComplete: function() {
            polygon.setCoords();
            _this.renderDotChart();

            console.log("AniamationFinished")
            // only start animation once
        }
    });
}

FabricRendererer.prototype.render = function(){
    if(this.getData() && this.getData().length>1){
        this.renderDotChart();
        this.renderAreaChart();

    }
//////////////////
    this.getCanvas().renderAll();
}


FabricRendererer.prototype.renderAreaChart = function(){
    //===
    //console.log("Render area chart ",this.getData())

//------------
    this.areaChartArray = [];
    this.oldPositions = [];
 //   for(var i=0;i<this.getData().length; i++){
        for(var ii=0; ii<this.getData().length; ii++){
            var __yVal = this.getData()[ii].y
            var __xVal = this.getData()[ii].x
//            console.log("The Y val is ",this.getData()[ii].y);
//            console.log("The X val is ",this.getData()[ii].x);
            if( !isNaN(__yVal) && !isNaN(__xVal) ){
                this.areaChartArray.push( {x:__xVal, y:__yVal} );
            }
        }
        this.areaChartArray.push( {x:this.getWidth(), y:this.getHeight()} );
        this.areaChartArray.push( {x:0, y:this.getHeight()} )

    // Is there an Are chart? If not, create one.

    if(!this.areaChart) {
        console.log("There is no Area chart");
        this.areaChart = new fabric.Polygon([this.getData()],
            {
                originX: 'left',
                originY: 'top',
                //fill: "rgba(0, 0,100, 0.01)",
                selectable: true,
                centeredRotation: false,
                centeredScaling: false
            }
        )
        this.areaChart.set({points:this.areaChartArray});
        for(var i=0; i<this.areaChartArray.length; i++){
            this.oldPositions.push({x:this.areaChartArray[i].x, y:this.areaChartArray[i].y})
        }

        try{
            this.getCanvas().add(this.areaChart);
            console.log("Adding new areaChart to canvas")
        }catch(e){
            console.log(e)
        }
    }
        //TODO: cull any extra items id the array is shorter
    // Find out if we ahave too many or too few points

    var pointsMissmatch = this.areaChart.points.length - this.areaChartArray.length

    console.log("Points missmatch ", pointsMissmatch)
    console.log("There should be  ", this.areaChartArray.length, " points" )
    console.log("but there are   ", this.areaChart.points.length )


    if(pointsMissmatch>0){
        console.log("TOO MANY there are ",this.areaChart.points.length, " and should be ", this.areaChartArray.length)
        this.areaChart.points.splice( this.areaChartArray.length )
        console.log("REVISED NUMBER  ",this.areaChart.points.length)
    }

    if(pointsMissmatch<0){
        ///there are too many points in the polygon
        console.log("TOO FEW there are ",this.areaChart.points.length, " and should be ", this.areaChartArray.length)
        //this.areaChart.points.slice(0, this.areaChartArray.length-1)
        for(var i = this.areaChart.points.length; i < this.areaChartArray.length; i++ ){
           this.areaChart.points.push({x:100, y:100})
        }
        console.log("REVISED NUMBER  ",this.areaChart.points.length)
    }

        for(var i=0; i<this.oldPositions.length; i++){
            this.areaChart.points[i] = this.oldPositions[i];
        // console.log("FOUND A POINT ",this.this.areaChart.points.length[i].y)
        }
//    this.areaChart.set({ fill: 'rgba(0,255,0,0.1)', stroke: 'reg', opacity: 0.05 });
    var _this = this
    this.areaChart.setGradient('fill', {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: _this.height,
        colorStops: {
            0: 'rgba(255, 153, 0, 0.2)',
            1: 'rgba(0, 0, 0, 0.2)'
        },
        opacity: 0.05
    })
    for(var i=0; i<this.areaChart.points.length; i++){
       // this.animatePoint(i, 'y', this.areaChartArray, this.areaChart)
        //this.animatePoint(i, 'x', this.areaChartArray, this.areaChart)

     //   this.areaChart.points[i]set({x:this.areaChartArray[i].x, y:this.areaChartArray[i].y})
//       console.log(this.areaChartArray);


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
