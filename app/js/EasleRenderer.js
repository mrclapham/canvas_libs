/**
 * Created by grahamclapham on 03/09/2014.
 */

function EasleRenderer(target) {
    BaseChart.call(this, target); // call super constructor.
}

EasleRenderer.prototype = Object.create(BaseChart.prototype);
EasleRenderer.prototype.constructor = EasleRenderer;

EasleRenderer.prototype.data = {width:700}

EasleRenderer.prototype.render= function(){
    if(!this.data.width){
        this.data.width = 800;
        console.log("no data")
    }
    this.clear();

    var ctx = this.getContext();
    ctx.fillStyle = "#ff0000";
    if(this.data.width&&this.data.width>6)this.data.width-=1;
    console.log(this.data.width)
    ctx.beginPath();
    ctx.rect(0,0,this.data.width,this.getHeight());
    ctx.fill();
    ctx.closePath();
}