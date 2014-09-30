/**
 * Created by grahamclapham on 30/09/2014.
 */
var startData = new Date()
startData.day = 0;
startData.month = 0;
startData.setYear(2013);

var endDate = new Date();
endDate.day = 0;
endDate.month = 0;
endDate.setYear(2014);


function DateScale(domain, range){
    this.domain     = domain || [startData,endDate];
    this.range      = range || [0,1];
    this.ticks      = DateScale.division.DAY;
    //--
    this.init();
}

DateScale.prototype.init = function(){
    this.dateDifference = this.domain[1] - this.domain[0] ;
    this.startYear = this.domain[0].getFullYear();
    this.endYear = this.domain[1].getFullYear();
    this.yearArray = [];
    // find which years are covered
    for(var i = this.startYear; i <= this.endYear; i++){
     this.yearArray. push({year:i})
    }
    // find out what the first month of the first year is
    this.startMonth = this.domain[0].getMonth();

    // find out what the last month of the last year is
    this.endMonth = this.domain[1].getMonth();

    var arrayLength = this.yearArray.length;

    //Is there only one year in the array?
    switch(arrayLength){
        case 0 :
            this.makeDatesLessThanOne();
        break;

        case 1 :
            this.makeDates1();
        break;

        case 2 :
            this.makeDates2();
        break;
        default :
            this.makeDatesOver2();
        break;

    }

    console.log("startYear  ", this.startYear );
    console.log("endYear  ", this.endYear );
    console.log("year Array  ", this.yearArray );
    console.log("startMonth ", this.startMonth);
    console.log("endMonth ", this.endMonth);
    console.log( "DateScale.timeDivision ", DateScale.timeDivision(this.dateDifference)  )
}

DateScale.prototype.makeDatesLessThanOne = function(){
    console.log("makeDatesLessThanOne");
    this.yearArray[0].months = DateScale.makeMonthArray(this.startMonth,this.endMonth);
}

DateScale.prototype.makeDates1 = function(){
    console.log("makeDates1");
    this.yearArray[0].months = DateScale.makeMonthArray(this.startMonth,this.endMonth);
}

DateScale.prototype.makeDates2 = function(){
    console.log("makeDates2");
    this.yearArray[0].months = DateScale.makeMonthArray(this.startMonth,11);
    this.yearArray[this.yearArray.length-1].months = DateScale.makeMonthArray(0,this.endMonth);
}

DateScale.prototype.makeDatesOver2 = function(){
    console.log("makeDates lots");
    this.yearArray[0].months = DateScale.makeMonthArray(this.startMonth,11);

    for(var i=1; i<this.yearArray.length-1; i++){
        this.yearArray[i].months = DateScale.makeMonthArray(0,11);
    }

    this.yearArray[this.yearArray.length-1].months = DateScale.makeMonthArray(0,this.endMonth);
}



DateScale.makeMonthArray = function(startMonth, endMonth){
    var returnArray = []
    for(var i = startMonth; i<=endMonth; i++){
        returnArray.push(i);
    }

    return returnArray;
}

DateScale.timeDivision=function(milliseconds){
    var returnObject =  {}
    var minutesPerDay = 60 * 24;
    var seconds = milliseconds / 1000;
    var totalMinutes = seconds / 60;
    var days = totalMinutes / minutesPerDay;

    returnObject.days = days;
    returnObject.fullDays = Math.floor(days);

    return returnObject;
}

DateScale.getMonthTicks = function(){
    var _ret = []


}


DateScale.division={};
DateScale.division.MONTH    = "month";
DateScale.division.YEAR     = "year";
DateScale.division.DAY      = "day";
DateScale.division.HOUR     = "hour";
