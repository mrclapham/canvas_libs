var _fixture, _body, domholder, _tradeViz, dataConfig, data0, data1;


var dataConfig =  {
                    yMin : 0,
                    yMax: 100,
                    xStart: 0,
                    xEnd: 900,
                    steps : 12
                    }


 data0 = new data_model(dataConfig).getData();
 data1 = new data_model(dataConfig).getData();

beforeEach(function(){
    _fixture = document.createElement('div');
    _body =  document.getElementsByTagName('body');
    domholder = document.getElementById('dom-holder');
});
afterEach(function(){
    delete _fixture;
})

describe('Array', function(){
    describe('#indexOf()', function(){
        it('should return -1 when the value is not present', function(){
            [1,2,3].indexOf(5).should.equal(-1);
            [1,2,3].indexOf(0).should.equal(-1);
        })
    })
})

//---- Base class

var _BaseChart,_target, _opt_data, _opt_config, _baseFixture;
describe('Test the functionality of the base class', function(){
    beforeEach(function(){
        _baseFixture = document.createElement('div');
        _BaseChart = new BaseChart(_baseFixture);
        _opt_data =  {  yMin : 0,
            yMax: 100,
            xStart: 0,
            xEnd: 900,
            steps : 12
        }
    })
    afterEach(function(){
        delete _BaseChart;
        delete _opt_data;
        delete _baseFixture;
    });

    it("_BaseChart should not be null", function(){
        expect(_opt_data).not.to.be.null;
    });

    it("_BaseChart should not be null", function(){
        expect(_opt_data).not.to.be.null;
    });



})

////////////////////////////////////////////
describe("_tradeViz has been instatiated", function(){

    beforeEach(function() {
        _tradeViz = new TradeVizPulse("target");
    });

    afterEach(function() {
        delete _tradeViz;
    });

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
var _EasleRenderer;
describe("Tests for EasleRenderer", function(){
    beforeEach(function(){
        _EasleRenderer = new EasleRenderer(_fixture, data0, {createCanvas: false, canvasId:"easleCanvas"});
    });
    afterEach(function(){
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

    it("_sketch should not be null", function(){
        expect(_sketch).to.not.be.null;
    })

})

/////////////////////////////////////////////////

var  _sketch, _colourArray;
describe("Tests for Processing renderer", function(){
    beforeEach(function(){
        _sketch = new p5(s, _fixture);
    });
    afterEach(function(){
        delete _sketch;
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

    it("_sketch instance should not be null", function(){
        expect(_sketch).to.not.be.null;
    });

//////// API ON PROCESSING
    describe("_sketch's api calls", function(){
        //beforeEach(function(){
        //    _sketch = new p5(s, _fixture);
            _colourArray = [200,200,100,44];

        //});
        //afterEach(function(){
        //    delete _sketch;
            delete  _colourArray;
        //})

        it("'_fixture' should not be null", function(){
            expect( _fixture ).to.not.be.null;
        });

        it("_sketch should not be null", function(){
            expect(_sketch).to.not.be.null;
        })

        it("_sketch should have method '.setColor'", function(){
            expect(_sketch.setColor).to.be.a('function');
        })
        it("_sketch should have method '.getColor'", function(){
            expect(_sketch.getColor).to.be.a('function');
        })

        it("_colourArray should not be null", function(){
            expect(_colourArray).to.not.be.null;
        })

        it("_sketch.getColor to be the same as the colour set", function(){
            _sketch.setColor(_colourArray)
            expect(_sketch.getColor()).to.equal(_colourArray);
        })


        it("_sketch.setColor([100,200,200]) should throw an Error", function(){
s
            expect( _sketch.setColor(_colourArray) ).to.not.be.null;
        })



        //
        //it("_sketch.getColor to be the same as the colour set", function(){
        //    _sketch.setColor([200,200,100,44])
        //
        //    expect(_sketch.getColor().to.equal(_colourArray));
        //})
    })



})
