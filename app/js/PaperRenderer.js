/**
 * Created by grahamclapham on 04/12/2014.
 */
// create a global paperScope var

if(!_paper) var _paper =  new paper.PaperScope();
var defaultFontStyle = {
                        fontSize: 10,
                        fillColor: '#ffffff',
                        //justification: "left",
                        fontFamily: "'Special Elite', cursive"
                        };
// A paper renderer - extaendin the BaseChart
function PaperRenderer(target, opt_data, opt_config){
    if(opt_config){
        opt_config.createCanvas = false;
        opt_config.canvasId = target;
    }else{
        opt_config = {createCanvas:false, canvasId:target};
    }
    //The vars
    this.backgroundColour   = "rgba(19,19,19,1)"
    this.fillColour1        = "rgba(226,114,43,1)"
    this.fillColour2        = "rgba(226,114,43,0)"
    this.gridLineStyle      = {
                                strokeColor: 'rgba(255,255,255,1)',
                                strokeWidth: 1
                                // dashArray: [2, 2], uncomment this if you want to see a dashed array...
                                };

    this.dotColor = "red";
    this.style = opt_config.fontStyle || defaultFontStyle;
    BaseChart.call(this, target, opt_data, opt_config); // call super constructor.
};

PaperRenderer.prototype             = Object.create(BaseChart.prototype);
PaperRenderer.prototype.constructor = PaperRenderer;

PaperRenderer.prototype.postInit    = function(){
    this.setPlaying(false);

    var _canv = document.getElementById(this.getCanvasId());
    if(!_canv){
        throw new Error(this.getCanvasId()+ " cannot be found.");
    }else{
        this.setCanvas(_canv);
    }

    _paper.setup(_canv);
    //this._circle = new paper.Path.Circle(new paper.Point(80, 50), 10);
    this. pointArray        = [];
    this._circleArray       = [];
    this._yLineArray        = [];
    this._dynamicDotArray   = [];

// Pass a color name to the fillColor property, which is internally
// converted to a Color.
    this._layer2            = new _paper.Layer();
    this._path              = new _paper.Path();
    this._start             = new _paper.Point(100, 100);
    this._path.moveTo(this._start);

    var _this = this;

    _drawBackground.call(this);
    _drawAreaChart.call(this);
    _drawYlines.call(this);

    _paper.view.onFrame = function(e){
        _onFrame.call(_this);
    }
}

PaperRenderer.prototype.activate = function(opt_layer){
    if(opt_layer && this[opt_layer]){
        try{
            this._view = this[opt_layer];
            this._view.activate();
        }catch(e){
            console.log(e);
        }
    }else{
        this._view =  _paper.View._viewsById[ this.getCanvasId() ];
        this._view._project.activate();
    }
    return this._view;
}

PaperRenderer.prototype.getTooltip = function() {
    return this._tooltipelement;
}

var _drawBackground = function(){
    //this.activate()
    var layer = this.activate('_layer2');
    var __point = new _paper.Point(0, 0);
    var _size = new _paper.Point(this.getWidth(), this.getHeight());
    this._background = new _paper.Shape.Rectangle(__point, _size);
    this._background.fillColor = this.backgroundColour;
}

var _createLine = (function(from, to, displayValue, opt_config){
    var _scope = function(from, to, displayValue, opt_config){
        this.config = opt_config || {};
        for(var prop in this.config){
            this[prop] = this.config[prop];
        }
        this.style          = this.config.style || { strokeWeight : 0.5, strokeColor: "rgba(255,0,255, 1)"}
        this.from           = from;
        this.to             = to;
        this.displayValue   = displayValue;
        this._parent        = parent;
        this._lineGroup     = null;
        this._position      = null;
        this._textField     = null;
        this.line           = new _paper.Path.Line(from,to);
        this.line.style     = this.style;
        this.ptPosition     = null;
        _lineInit.call(this);
    }
    var _lineInit = function(){
        if(!this._position) this._position  = new _paper.Point(100, 100);
        this.ptPosition                     = new _paper.Point(this.from.x-10, this.from.y);
        this._textField                     = new _paper.PointText(defaultFontStyle);
        this._textField.content             = this.displayValue;
        this._textField.position            = this.ptPosition;
        this._textField.justification       = "center";
        this._lineGroup                     = new _paper.Group([this.line, this._textField]);
    }
    _scope.prototype = {
        setPosition:function(){
            this._position = value;
        },
        getPosition:function(){
            return this._position;
        },
        remove:function(){
            console.log("Text Field = ",this._textField);
            try{this.line.remove()}catch(e){ console.log(e) }
            try{this._textField.remove()}catch(e){ console.log(e) }
            try{this._lineGroup.remove()}catch(e){ console.log(e) }
        }
    }
    return _scope;
})();

var _drawYlines = function(){
    this.activate();
    if(this.maxY && this.minY && this.maxY.y && this.minY.y){
        var range = this.maxY.y - this.minY.y;
        var steps = Math.ceil((this._roundedYValues.max-this._roundedYValues.min) / this._roundedYValues.division);

            for(var i=0; i<this._yLineArray.length; i++){
                this._yLineArray[i].remove();
            }
            this._yLineArray = [];

        for(var i = 0; i<steps; i++){
            var displayValue    = i*this._roundedYValues.division;
            var yPos            = Math.round( this.getYscale().map(displayValue) );
            var from            = new _paper.Point(this.leftMargin, yPos);
            var to              = new _paper.Point(this.getWidth()-this.rightMargin, yPos);
            this.activate();
            var lyn             = new _createLine(from,to,displayValue, {style:this.gridLineStyle});
            this._yLineArray[i] = lyn;
        }
    }
}
// THE TOOLTIP CLASS
var Tooltip = (function(parent){
    var _scope = function(parent){
        this._text = "default text"
        this._tolltipBackground = null;
        this._position      = null;
        this._group         = null;
        this._parent        = parent;
        this._show          = true;
        this._currentAlpha  = 0;
        this._targetAlpha   = 1
        this.bottomMargin   = 16;
        this._fontStyle = {
                            fontSize: 10,
                            fillColor: '#00ffff',
                            justification: "left",
                            fontFamily: "'Special Elite', cursive"
                            };
        _init.call(this);
    }

    var _init = function(){
        console.log("Making the tooltip");
        if(!this._position ) this._position =  new _paper.Point(10, 10);
        var _from                           = new _paper.Point(0,0);
        var _to                             = new _paper.Point(50,15);
        this._tolltipBackground             = _paper.Shape.Rectangle(_from, _to);
        this._tolltipBackground.fillColor   = "rgba(0,0,0,.9)";
        this._toolTipTextElement            = new _paper.PointText( this._position );
        //this._toolTipTextElement.fillColor = '#ff00ff';
        this._toolTipTextElement.style      = this._fontStyle;
        this._group                         = new _paper.Group([this._tolltipBackground , this._toolTipTextElement]);
        this._group.opacity                 = this._currentAlpha;
        _onTextChanged.call(this);
    }

    var _onPositionChanged = function(){
        //this._toolTipTextElement.position = this._position;
        this._position.y -= this.bottomMargin;
        this._group.position = this._position;
        this._group.bringToFront();
    }

    var _onTextChanged = function(){
        if(!isNaN(this._text)) this._text = this._text.toFixed(2);
        this._toolTipTextElement.content = this._text;
    }

    var _onShowChanged = function(){
        this._show ? this._targetAlpha = 1 : this._targetAlpha = 0;
        var _this   = this;
        this._int   = setInterval(function(){_animateFade.call(_this)}, 50);
    }

    var _animateFade = function(){
        var _step = 12;
        var _diff = this._targetAlpha - this._currentAlpha;
        this._currentAlpha += _diff/_step;
        this._group.opacity = this._currentAlpha;
    }

    _scope.prototype = {
        setPosition:function(value){
            this._position = value;
            _onPositionChanged.call(this);
        },
        getPosition:function(){
            return this._position
        },
        setText:function(value){
            this._text = value;
            _onTextChanged.call(this);
        },
        getText:function(){
            return this._text;
        },
        show:function(value){
            if(value != this._show){
                this._show = value;
                _onShowChanged.call(this);
            };
        }
    }
    return _scope;
})();

//------------------------------------------------------------------------------
var _createToolTip = function(){
    this.activate();
    if(!this._tooltipelement ) this._tooltipelement = new Tooltip(this);
    console.log(this._tooltipelement);
}

var _drawAreaChart = function(){
    this.myPath = new _paper.Path();
    this.myPath.add(new _paper.Point(0, 0));
    this.myPath.strokeColor = this.dotColor;
}

///-- class for the dots
var Dot = (function(parent, position, data){
    var _scope = function(parent, position, data){
        this._position              = position;
        this.parent                 = parent;
        this.data                   = data;
        this._unselectedOuterColour = "rgba(255, 0, 255, 1)";
        this._outerRadius           = 12;
        this._innerGraphic;
        this._outerGraphic;
        this._group;

        _init.call(this);
    }
    _scope.prototype = {
        remove:function(){
           if( this._innerGraphic ) this._innerGraphic.remove();
           if( this._outerGraphic ) this._outerGraphic.remove();
        },
        setPosition:function(value){
            this._position = value;
            _onPositionChanged.call(this);
        },
        getPosition:function(){
            return this._position;
        },
        setData:function(value){
            if(this.data != value) this.data = value;
        }
    }

    var _init = function(){
        this._innerGraphic              = new _paper.Path.Circle(this._position,  this._outerRadius);
        this._innerGraphic.fillColor    = this._unselectedOuterColour;
        this._innerGraphic.blendMode    = 'multiply';
        this._outerGraphic              = new _paper.Path.Circle(this._position,  this._outerRadius/2);
        this._outerGraphic.fillColor    = "rgba(0,255,255,1)";
        //this._outerGraphic.blendMode = 'multiply';
        this._group                     = new _paper.Group([this._innerGraphic, this._outerGraphic])
        var _this = this
        this._group .on('mouseenter', function(e){
            _this.parent.getTooltip().setText(_this.data.y);
            _this.parent.getTooltip().setPosition(_this._position);
            _this.parent.getTooltip().show(true);
        })

        this._group.on('mouseleave', function(e){
            _this.parent.getTooltip().show(false);
        })
    }

    var _onPositionChanged = function(){
        this._group.setPosition( this._position );
    }
    return _scope;
})();

var _drawDynamicDots = function(){
    var diff;
    if(this._dynamicDotArray.length != this.getData().length){
        diff =  this.getData().length - this._dynamicDotArray.length;
    }
    ///////////////
    if(diff>0){
        for(var i=0; i<diff; i++){
            this.activate();
            var _circle = new Dot(this, new _paper.Point(this.getData()[i].x, this.getData()[i].y), this.getData()[i]);
            this._dynamicDotArray.push(_circle);
        }
    }
    ////////////
    if(diff<0){
        var _removealArray = this._dynamicDotArray.splice(this._dynamicDotArray.length+diff,  0-diff )

        for(var i=0; i<_removealArray.length; i++){
            this.activate();
            var toDelete = _removealArray[i];
            try{
                toDelete.remove();
                delete toDelete;
            }catch(e){
                ///---
            }
        }
    }

    for(var i=0; i<this._dynamicDotArray.length; i++){
        this._dynamicDotArray[i].setData(this.getData()[i]);
    }
}

var _drawDots =function(){
    var diff;
    if(this._circleArray.length != this.getData().length){
         diff = this.getData().length - this._circleArray.length;
    }
    ///////////////
    if(diff>0){
        for(var i=0; i<diff; i++){
            this.activate();
            var _circle = new _paper.Path.Circle(new _paper.Point(this.getData()[i].x, this.getData()[i].y), 6);
            _circle.data = this.getData()[i];
            _circle.data.index=i;
            _circle.data.parent=this;

            _circle.on('mouseenter', function(e){
                this.data.parent.getTooltip().setText(this.data.y);
            });
            this._circleArray.push(_circle);
            _circle.fillColor = this.dotColor;
        }
    }
    ////////////
    if(diff<0){
        var _removealArray = this._circleArray.splice(this._circleArray.length+diff,  0-diff );
        for(var i=0; i<_removealArray.length; i++){
            this.activate();
            var toDelete = _removealArray[i];
            try{
                toDelete.remove();
                delete toDelete;
            }catch(e){
                ///---
            }
        }
    }
}
//---------------------------
var _drawLine = function(){
    if( this.myPath.segments.length < this.getData().length){
        for(var i=this.myPath.segments.length; i<this.getData().length; i++){
            this.myPath.add(new _paper.Point(0, 0));
        }
    }
    if( this.myPath.segments.length > this.getData().length){
        console.log(this.myPath.segments.length, this.getData().length);
        this.myPath.removeSegments(this.getData().length-1, this.myPath.segments.length-1);
    }
}
var _onFrame = function(){
    for(var i = 0; i<this.getData().length; i++){
        if(this.myPath.segments[i]){
            var currentPos  = new _paper.Point(this.myPath.segments[i].getPoint().x , this.myPath.segments[i].getPoint().y);
            var xp          = this.getXscale()  ? this.getXscale().map( this.getData()[i].x ) : this.getData()[i].x;
            var yp          = this.getYscale()  ? this.getYscale().map( this.getData()[i].y ) : this.getData()[i].y;
            var desiredPos  = new _paper.Point( xp, yp );
            var diff        = desiredPos.subtract(currentPos);
            var velocity    = diff.divide(6);
            var se          = this.myPath.segments[i];
            var newpos      = currentPos.add(velocity); //new __paper.Point(_this.getData()[i].x, _this.getData()[i].y)
            se.setPoint( newpos );
            if(this._circleArray[i]) this._circleArray[i].position = newpos;
            if(this._dynamicDotArray[i]) this._dynamicDotArray[i].setPosition( newpos );
        }
    }
    this.myPath.insert(this.getData().length, new _paper.Point(this.getWidth()-this.rightMargin, this.getYscale().map(0)));
    this.myPath.insert(this.getData().length+1, new _paper.Point(this.leftMargin, this.getYscale().map(0)));
    this.myPath.closed = true;
    this.myPath.fillColor = {
        gradient: {
            stops: [this.fillColour1, this.fillColour2]
        },
        origin: [0,this.getHeight()/2],
        destination: [0,this.getHeight()]
    }
}

var _scribble = function(){
    this._path.strokeColor = '#cccccc';
    this._path.lineTo(this._start.add([ Math.random()*300, Math.random()*300 ]));
    this._path.smooth();
    this._path.dashArray = [10, 4];
    _paper.view.draw();
}

PaperRenderer.prototype.render = function(){
    this.initScale();
    console.log("RENDER: ",this.getYscale() )
    _drawLine.call(this);
    _drawDots.call(this);
    _drawYlines.call(this);
    _drawDynamicDots.call(this);
    _createToolTip.call(this);

    //this._path.lineTo(this._start.add([ Math.random()*300, Math.random()*300 ]));
    // Draw the view now:
    //_paper.view.draw();
    //_paper2.view.draw();
    //_paper.remove( this._circle );
   // this.myPath.fullySelected = true;
    //this.myPath.smooth();
    _paper.view.draw();
}
