/**
 * Created by grahamclapham on 03/09/2014.
 */

function EasleRenderer(target) {
    BaseChart.call(this, target); // call super constructor.
}

EasleRenderer.prototype = Object.create(BaseChart.prototype);
EasleRenderer.prototype.constructor = EasleRenderer;
EasleRenderer.prototype.render= function(){
    console.log("Easle render")
}