/**
 * Created by grahamclapham on 25/09/2014.
 */
TradeVizD3 = (function(targID){

    var _scope = function(targID){
        this._targID        = targID;
        this._target        = null;
        this.width          = 1200;
        this.height         = 300;
        this.backgroundColor     = "rgba(20,30,50, 10)";
        this._canvas        = null;
        this._data          = null;
        this._lines         = null;
        this._dots          = null;
        this._brush         = null;

        this._vScale        = null;
        this._vMin          = null;
        this._vMax          = null;
        this._vDomainMin    = null;
        this._vDomainMax    = null;

        this._xScale        = null;
        this._xMin          = null;
        this._xMax          = null;
        this._xDomainMin    = null;
        this._xDomainMax    = null;

        this._view          = {svg:null, _linesHolder:null};
        this.padding        = {left:10, right:20, top:50, bottom:60}

        _init.call(this);
    }
    //----

    _scope.prototype = {
        setData:function(value){
            this._data = value;
            _onDataSet.call(this);
        }
    };

    //-- callbacks
    var _init = function(){

       this._target = document.getElementById( this._targID );
        _initSVG.call(this);
    };

    var _initScale = function(){
       this._vScale = d3.scale.linear()
            .domain([this._vMin, this._vMax])
            .range([this._vDomainMin, this._vDomainMax]);
        return Math.ceil( vScale(value) )
    };

    var _initSVG = function(){
        this._view._svg = d3.select(this._target)
            .style('position', 'relative')
            .style('width', this.width+ "px")
            .style('height', this.height+ "px")
            .style('background-color',  this.backgroundColor)
            .append('svg:svg')
            .attr('width',this.width)
            .attr('height',this.height )
            .attr('class', "myClass")
            .attr('transform', "translate(" + this.padding.left + "," + this.padding.right  + ")");

        this._view._linesHolder = this._view._svg
              .append("g")
              .attr('class', 'lineHolder')
              .attr('transform', "translate(" + this.padding.left + "," + this.padding.right  + ")");
    };

    var _initTimeAxis = function(){
        var _this = this;
        this._view._xAxis = d3.svg.axis()
            .scale(this._xScale)
            .orient("bottom")
            .ticks(d3.time.months,1)

//

        var _this = this
        this._view._xAxisHolder = this._view._svg.append("g")
            .attr("transform","translate("+this.padding.left+"," + ( _this.height - _this.padding.bottom ) + ")")
            .attr("class","xTimeAxis")


        this._view._xTickHolder = this._view._svg.append("g")
            .attr("transform","translate("+this.padding.left+"," + ( _this.height - _this.padding.bottom ) + ")")
            .attr("class","xTimeAxisTicks")

        this._view._xAxisHolder
            .call(_this._view._xAxis);


        this._view._xAxisTicks =  this._view._xTickHolder.selectAll('.tickY')
            .data(_this._xScale.ticks(d3.time.months))

        console.log( _this._view._xAxisHolder)

        this._view._xAxisTicks
            .enter()
            .append("g")
            .attr('class', 'tickY')
            .append("svg:line")
            .attr("x1", _this._xScale)
            .attr("x2", _this._xScale)
            .attr("y1", -300)
            .attr("y2", 300 )
            .attr("class", "yTickLine" )


    }

    var _intBrush = function(){
        this._brush = new d3.svg.brush()
            .x(this._xScale)
            .on("brush", _brushFunction)

        this._view._svg
            .append("g")
            .attr("class", "x brush")
            .call(this._brush)
            .selectAll("rect")
            .attr("y", -6)
            .attr("height", 200);
    }

    var _brushFunction = function(){
        console.log("BRUSHED");
        /*

         x.domain(brush.empty() ? x2.domain() : brush.extent());
         focus.select(".area").attr("d", area);
         focus.select(".x.axis").call(xAxis);

         */
    }

    var _initCanavas = function(){
        this._canvas = document.createElement('canvas');
        console.log(this._canvas)
        console.log(this._target)
        this._target.appendChild(this._canvas);
    }

    var _onDataSet = function(){

        console.log("this._data.DATES" , this._data.DATES[0]);

        var clean = DataCleanerTradeViz(this._data);
        console.log("CLEAN DATA ++++++++++++++++ ",clean);
        for(var i = 0; i< clean.TICKS.length; i++){
            console.log( ColourRamp.getColour( clean.TICKS[i].volume) );
        }
//        for(var i=0; i<this._data.DATES.length; i++){
//            this._data.DATES[i]= TradeVizD3.stringToDate(this._data.DATES[i]);
//        }

        this._vDomainMin    = this._data.MINVOL;
        this._vDomainMax    = this._data.MAXVOL;
        this._vMin          = this.padding.left;
        this._vMax          = this.width-this.padding.right;

        this._xDomainMin    = this._data.MINVOL;
        this._xDomainMax    = this._data.MAXVOL;
        this._xMin          = this.padding.left;
        this._xMax          = this.width-this.padding.right;

        this._xScale        = d3.time.scale()
                                .domain([this._data.DATES[0], this._data.DATES[ this._data.DATES.length-1 ]])
                                .range([this.width - this.padding.left - this.padding.right, 0]);

        this._vScale        = d3.scale.linear()
                                        .domain([this._vDomainMin, this._vDomainMax])
                                        .range([this.height - this.padding.top - this.padding.bottom, 0]);

        console.log("================================ ", this._vScale(100) )

        //x = d3.scale.linear().domain([0, scope.model.dataLengthMax() - 1]).range([0, scope.model.sw()]);

        _draw.call(this);
    };
    var _draw = function(){
        console.log(this._data.MAXVOL, this._data.MINVOL);
        _drawLine.call(this);
        _initTimeAxis.call(this);
        _drawSentiment.call(this);
        _intBrush.call(this);

    };
    var _drawLine = function(){
        // The Volume line
    console.log("drawline called", this._data);
        var _this = this;
        var _area = d3.svg.area()
            .interpolate("cardinal")
            .x(function(d, i) {
               // console.log(" DATE ", _this._xScale(d.date) );
                return  _this._xScale(d.date) ;
            })
            .y0(function(d) {
                //console.log(d)
                return _this._vScale(d.volume);
            })
            .y1(function(d) {
                return _this.height-_this.padding.bottom;
            });

        var arr =   this._view._linesHolder.selectAll('path.areas')
                                            .data([this._data.VOLUME])
                                            .enter().append("path")
                                            .style("fill", '#cccccc')
                                            .attr("class", "areas")
                                            .attr("d", _area);

        }

        var _drawSentiment = function(){



         }


    return _scope;
})();

TradeVizD3.stringToDate = function(string){
    var _arr = string.split(":");
    _arr[2] = "20"+ _arr[2]
    var _date = new Date();
    _date.setDate(_arr[0])
    _date.setMonth(_arr[1])
    _date.setFullYear(_arr[2])

    return _date

}