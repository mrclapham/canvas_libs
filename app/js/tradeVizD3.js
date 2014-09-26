/**
 * Created by grahamclapham on 25/09/2014.
 */
TradeVizD3 = (function(targID){

    var _scope = function(targID){
        this._targID        = targID;
        this._target        = null;
        this.width          = 800;
        this.height         = 500;
        this._canvas        = null;
        this._data          = null;
        this._lines         = null;
        this._dots          = null;

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
        this.padding        = {left:10, right:10, top:10, bottom:10}

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
            .style('background-color',  '#ff0000')
            .append('svg:svg')
            .attr('width',this.width)
            .attr('height',this.height )
            .attr('class', "myClass")
            .attr('transform', "translate(" + this.padding.left + "," + this.padding.right  + ")");

        this._view._linesHolder = this._view._svg
                    .append("g")
            .attr('class', 'lineHolder');
    };

    var _initCanavas = function(){
        this._canvas = document.createElement('canvas');
        console.log(this._canvas)
        console.log(this._target)
        this._target.appendChild(this._canvas);
    }

    var _onDataSet = function(){

        console.log("this._data.DATES" , this._data.DATES[0]);

        for(var i=0; i<this._data.DATES.length; i++){
            this._data.DATES[i]= TradeVizD3.stringToDate(this._data.DATES[i]);
        }


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
                                .range([0, this.width-this.padding.left -  this.padding.right]);



        this._vScale        = d3.scale.linear()
                                        .domain([this._vDomainMin, this._vDomainMax])
                                        .range([this.height - this.padding.top - this.padding.bottom, 0]);

        console.log("================================ ", this._vScale(100) )

        //x = d3.scale.linear().domain([0, scope.model.dataLengthMax() - 1]).range([0, scope.model.sw()]);

        _draw.call(this);
    };
    var _draw = function(){
        console.log(this._data.MAXVOL, this._data.MINVOL)
        _drawLine.call(this);

    };
    var _drawLine = function(){
        // The Volume line
    console.log("drawline called",this._data)
        var _this = this;
        var _area = d3.svg.area()
            .interpolate("cardinal")
            .x(function(d, i, x) {
                return  i ;
            })
            .y0(function(d) {

                console.log(d)
                return _this._vScale(d);
            })
            .y1(function(d) {
                return 55   0;
            });

        var arr =   this._view._linesHolder.selectAll('path.areas')
                                            .data([this._data.VOLUME])
                                            .enter().append("path")
                                            .style("fill", '#cccccc')
                                            .attr("class", "areas")
                                            .attr("d", _area);


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