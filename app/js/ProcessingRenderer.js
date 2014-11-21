function ProcessingRenderer(target, opt_data, opt_config) {
    BaseChart.call(this, target, opt_data, opt_config); // call super constructor.
}

ProcessingRenderer.prototype = Object.create(BaseChart.prototype);
ProcessingRenderer.prototype.constructor = ProcessingRenderer;

function ProcessingRenderer(target, opt_data, opt_config) {
    BaseChart.call(this, target, opt_data, opt_config); // call super constructor.

    var s = function( sketch ) {

        var gray = "0xff00ff";

        sketch.setup = function() {
            sketch.createCanvas(600, 400);
            sketch.background(255,244,0);
        };

        sketch.draw = function() {
            sketch.background(255,244,0);

            sketch.rect(sketch.width/2, sketch.height/2, 100, 200);
            ellipse(50, 50, 80, 80);
        }

        sketch.mousePressed = function() {
            sketch.background(255,0,0);
        }

        sketch.mouseDown = function() {
            sketch.background(0,255,0);
        }

        return sketch;
    };

    var _p5 = new p5(s);


}


ProcessingRenderer.prototype.postInit = function() {
    this.setPlaying(false);
}



ProcessingRenderer.prototype.render = function(){
    console.log("Rendering...")
}
