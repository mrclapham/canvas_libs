/**
 * Created by grahamclapham on 30/09/2014.
 */
function DateScale(dmain, range){
    this.domain = domain || [0,1];
    this.range = range || [0,1];
}

DateScale.division.MONTH    = "month";
DateScale.division.YEAR     = "year";
DateScale.division.DAY      = "day";
DateScale.division.HOUR     = "hour";
