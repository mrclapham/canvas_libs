/**
 * Created by grahamclapham on 30/09/2014.
 */
ColourRamp  = function(){


}

ColourRamp.getColour = function(value){

    var r, g, b, ramp;

    ramp = 127;
    b = ramp;

    if(value > 0){
        g = ramp + parseInt(value*ramp);
        r = ramp;
    }else{
        r = ramp-parseInt(value*ramp);
        g = ramp;
    }

    return "rgba("+r+","+g+","+b+",1)"

}