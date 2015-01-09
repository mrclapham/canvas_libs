/**
 * Purly for testing purposes - creates time base data
 * 'y' = the year (eg: 2013)
 * 'datespa' is how many months worth of data you want to generate.
 */
function Random365Data(y, dateSpan){
    var max          =   900;
    var min          =   10;
    var dateSpan     =   dateSpan
    var y            =   y;
    var months       =   [];
    var days         =   [];
    var monthLengths =   [];
    var leapYear = function(){
        var ly;
        y % 4 == 0 ? ly = true : ly = false;
        return ly;
    }
    var model = {
        max  :  100,
        min  : 10,
        y    : 2013,
        months  : [],
        days     : [],
        monthLengths : [],
        leapYear : function(){
            var ly;
            y % 4 == 0 ? ly = true : ly = false;
            return ly;
        }

    }

    var controller  =   {
        doRandom:function(){
            return min + (Math.random() *  max);
        } ,
        makeNode:function(y,m,d,val0,val1,days){
            return {date: new Date(y, m, d, 11, 45), value: [val0, val1], monthLength:days};
        },
        makeDayArray:function(node){
            var _finalValue

            try{
                _finalValue =  model.months[node+1].value[1];
            }catch(e){
                _finalValue = 0
            }

            var returnArray     =   [];                                                                                                                                                                                                   [];
            var dayLength       =   model.monthLengths[node];
            var startValue      =   model.months[node].value[1];
            var endValue        =   _finalValue // model.months[node+1].value[1];
            var currentValue    =   startValue;
            //var diff            =   function(){return endValue - currentValue};
            var diff            =   endValue - currentValue;
            var intemmediates   = [];
            for(var i=0; i<dayLength; i++){
                var mid = parseInt(dayLength/2)
                var fluctuation = 0;
                if (i<mid){
                    fluctuation =  (dayLength/100)*i
                }  else{
                    fluctuation =  (dayLength/100)/i
                }
                currentValue +=diff/dayLength +  fluctuation
                returnArray.push(controller.makeNode( model.y, node, i, node+i, currentValue, dayLength ));
            }
            return  returnArray;
        },
        makeSplicedArray:function(){
            var _retArray = [];
            for(var i=0; i<model.months.length; i++){
                var na =   controller.makeDayArray(i);
                _retArray = _retArray.concat(na);
            }

            return  _retArray;
        },
        makeMonths:function(){

        }

    }

    for(var i=0; i<dateSpan; i++){
        var monthLength =  31;
        if(i ==3 || i ==5 || i == 8 || i== 10){
            monthLength = 30;
        }
        if(i == 1){
            leapYear() ? monthLength = 29 : monthLength = 28;
        }
        model.months.push(controller.makeNode(y, i+1, 1, 10+(10*i), controller.doRandom(), monthLength ));
    }
    for( var atb in model.months){
        model.monthLengths.push( model.months[atb].monthLength );
    }
    return controller.makeSplicedArray();
}