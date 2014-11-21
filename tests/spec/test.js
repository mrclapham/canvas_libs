var domholder, foo, _tradeViz, _processingRenderer, dataConfig, _EasleRenderer;



describe('Array', function(){
    describe('#indexOf()', function(){
        it('should return -1 when the value is not present', function(){
            [1,2,3].indexOf(5).should.equal(-1);
            [1,2,3].indexOf(0).should.equal(-1);
        })
    })
})


describe("_tradeViz has been instatiated", function(){

    beforeEach(function() {

        var dataConfig =  {  yMin : 0,
            yMax: 100,
            xStart: 0,
            xEnd: 900,
            steps : 12
        }

        _tradeViz = new TradeVizPulse("target");
        foo = "foo";
        ///_processingRenderer  = new ProcessingRenderer(domholder);
    });

    afterEach(function() {
        console.log("After");
        delete _tradeViz;
        delete dataConfig
        //delete _processingRenderer;
    });




it("Should be a string", function(){
    expect(foo).to.be.a('string');
})

    it("Should be a instatiated", function(){
        expect(_tradeViz).to.not.be.null;
    })

    it("Setting the data should return the same value when getting data", function(){
        var _data = {value:"helloWorld"}
        _tradeViz.setData(_data)
        expect(_tradeViz.getData()).to.equal(_data);
    })

})
////////////////////////

var _fixture, _body;
describe("ProcessingRenderer should be able to be instatiated", function(){
    beforeEach(function(){
        _fixture = document.createElement('div');
        _body =  document.getElementsByTagName('body');
        domholder = document.getElementById('dom-holder');
        _EasleRenderer = new EasleRenderer(_fixture, null, {createCanvas: false, canvasId:"easleCanvas"});
        //omholder.appendChild(_fixture);

    });
    afterEach(function(){
        delete _fixture;
        delete _EasleRenderer;
    })


    //_processingRenderer  = new ProcessingRenderer(domholder);


    it("dataConfig should not be null", function(){
        expect(dataConfig).to.not.be.null;
    });


    it("'_body' should not be null", function(){
        expect(_body).to.not.be.null;
    });

    it("'_fixture' should not be null", function(){
        expect( _fixture ).to.not.be.null;
    });



    it("'domholder' should not be null", function(){

        expect( domholder ).to.not.be.null;
    });

    it("ProcessingRenderer instance should not be null", function(){
        expect(_EasleRenderer).to.not.be.null;
    });



})
