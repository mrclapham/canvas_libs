/**
 * Created by grahamclapham on 15/10/2014.
 */
 TradeVizPulse = (function(targetID){
     ///////////////////////////////////

     var _scope = function(targetID){
         this._private = {
             targetID: targetID,
             target:null,
             // view elements
             _axisHolderX:null,
             _axisHolderY:null,
             _mainHolder:null,
             _brusHolder:null,
             // data
             _data: null
            }
         // -- private vars end
         _init.call(this);
     }

     // -- methods
     _scope.prototype = {
         setData:function(value){
             this._private._data = value;
         },
         getData:function(){
             console.log(this._private)
             return this._private._data
         }
     }

     // -- private functions
     var _init = function(){
         _drawElements.call(this);
     }

     //-- draw the elements

     var _drawSvg = function(){}
     var _drawAxisXholder = function(){}
     var _drawAxisYholder = function(){}
     var _drawBrushHolder = function(){}

     var _drawElements = function(){
         _drawSvg.call(this);
         _drawAxisXholder.call(this);
         _drawAxisYholder.call(this);
         _drawBrushHolder.call(this);

     }



     ///////////////////////////////////



     return _scope

 })();