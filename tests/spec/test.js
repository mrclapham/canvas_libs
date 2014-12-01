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
        expect(_BaseChart).not.to.be.null;
    });

    it("_opt_data should not be null", function(){
        expect(_opt_data).not.to.be.null;
    });


    it("_BaseChart to have method 'setPlaying'.", function(){
        expect(_BaseChart.setPlaying).to.be.a("function");
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


        it("_sketch.setColor([100,200,200]) should throw an Error if the array is shorter than 3", function(){
            var fn1 = function(){_sketch.setColor([100,100]) }
            var fn2 = function(){_sketch.setColor([100]) }
            var fn3 = function(){_sketch.setColor([100,100,100,200]) }
            //var fn5 = function(){_sketch.setColor(["one","100","100","300"]) }
            expect( fn1 ).to.throw(Error);
            expect( fn2 ).to.throw(Error);
            //expect( fn3 ).to.throw(Error);
            //expect( fn5 ).to.throw(Error);
        })

        it("_sketch.setColor([100,200,200]) should throw an Error if arguments may not be parsed to an int", function(){
            var fn5 = function(){_sketch.setColor(["one","100","100","300"]) }
            expect( fn5 ).to.throw(Error);
        })

        it("_sketch.setColor([100,200,200]) should NOT throw an Error if arguments may not be parsed to an int", function(){
            var fn5 = function(){_sketch.setColor(["100","100","100","300"]) }
            expect( fn5 ).to.not.throw(Error);
        })


        it("_sketch.setColor([100,200,200]) should NOT throw an Error", function(){
            var fn0 = function(){_sketch.setColor([100,100,100]) }
            var fn4 = function(){_sketch.setColor([100,100,100,200]) }
            var fn6 = function(){_sketch.setColor(["100","100","100","300"]) }

            expect( fn0 ).to.throw(Error);
            expect( fn6 ).to.not.throw(Error);
            expect( fn4 ).to.not.throw(Error);

        })



        //
        //it("_sketch.getColor to be the same as the colour set", function(){
        //    _sketch.setColor([200,200,100,44])
        //
        //    expect(_sketch.getColor().to.equal(_colourArray));
        //})
    })


var test_data1 = [
    {x:0, y:100},
    {x:10, y:200},
    {x:20, y:300},
    {x:30, y:400},
    {x:40, y:500},
    {x:50, y:600},
    {x:60, y:700},
    {x:70, y:800},
    {x:90, y:900},
    {x:100, y:1000},
    {x:110, y:1100},
    {x:120, y:1200},
]
var _scale;

    beforeEach(function(){
        //
    })
describe("Tests for the Scale Domain utility" ,function(){
        it("Scale should instatiate", function(){
            expect(_scale).to.not.be.null;
        })

    it("_scale.map(3) should return '30' whan Scale([0,10],[0,100])", function(){
        _scale = new Scale([0,10],[0,100])
        expect(_scale.map(3)).to.equal(30);
    })

    it("_scale.map(15) should return '50' when Scale([0,30],[0,100])", function(){
        _scale = new Scale([0,30],[0,100])
        expect(_scale.map(15)).to.equal(50);
    })

    it("_scale.map(15) should return '50' when Scale([10,30],[0,100])", function(){
        _scale = new Scale([10,30],[0,100])
        expect(_scale.map(20)).to.equal(50);
    })


    it("1. _scale.map(20) should return '50' when Scale([100,500],[10,30])", function(){
        _scale = new Scale([100,500],[10,350])
        expect(_scale.map(100)).to.equal(10);
    })

    it("2. _scale.map(300) should return '180' when Scale([100,500],[10,30])", function(){
        _scale = new Scale([100,500],[10,350])
        expect(_scale.map(300)).to.equal(180);
    })

    it("3 ._scale.map(20) should return '50' when Scale([100,500],[10,30])", function(){
        _scale = new Scale([100,500],[10,350])
        expect(_scale.map(500)).to.equal(350);
    })

    it("The max value of the array should be 120", function(){
        var arr = [10,20,30,120,9,0,8,8]
        expect(Scale.max(arr)).to.equal(120);
    })

    it("The max value of the array should be an object with x value of 10 and y value of 220", function(){
        var arr = [{x:10, y:20}, {x:10, y:30}, {x:10, y:40}, {x:10, y:220}, {x:10, y:200}]
        expect(Scale.max(arr, "y").y).to.equal(220);
        expect(Scale.max(arr, "y").x).to.equal(10);
    })


    })
    var _dataSet, _procFixture, _procRenderer, _alphaBeta, _ols, _yHat, _residuals;
    describe("Test the Regression Analysis", function(){
        beforeEach(function(){
             _procFixture = document.createElement('div');
             _dataSet = [{x:1,y:2}, {x:2,y:3}, {x:3,y:3}, {x:4,y:4}, {x:5,y:4}];
             _procRenderer = new ProcessingRenderer(_procFixture);
        })
        afterEach(function(){
            delete _procFixture;
            delete _dataSet;
            delete _procRenderer;
        })

         _ols = new OLS(_dataSet);

        it("_dataSet should not be null.", function(){
            expect(_dataSet).to.not.be.null;
        });

        it("_ols should not be null.", function(){
            expect(_ols).to.not.be.null;
        });

        it("_ols should have a setData method", function(){
            expect(_ols.setData).to.be.a("function");
        });

        it("_ols should have a setData method", function(){
            expect(_ols.setData).to.be.a("function");
        });

/*
    Float helper function to reduce to one decimal point
 */

        var oneDecimalPoint = function(value){
           return  parseFloat(value.toFixed(1))
        }

        it("Should have an alpha value of 1.7.", function(){
            _ols.setData(_dataSet);
            _alphaBeta = _ols.getAlphaBeta()
            expect( parseFloat(_alphaBeta.alpha.toFixed(1)) ).to.equal(1.7);
        });

        it("Should have an beta value of 0.5.", function(){
            _ols.setData(_dataSet);
            _alphaBeta = _ols.getAlphaBeta()
            expect( parseFloat(_alphaBeta.beta.toFixed(1)) ).to.equal(0.5);
        });

        it("_ols should have a getYHat method", function(){
            expect(_ols.getYHat).to.be.a("function");
        });

        it("_ols getYHat.residuals( should return an array the same length as the dataset", function(){
            _ols.setData(_dataSet);
            _yHat = _ols.getYHat().residuals
           expect( _yHat.length ).to.equal(_dataSet.length);
        });

        it("_ols getYHat[0 - 4].yhat should be 2.2, 2.7, 3.2, 3.7, 4.2, respectively", function(){
            _ols.setData(_dataSet);
            _yHat = _ols.getYHat().yhat
            expect( _yHat[0] ).to.equal(2.2);
            expect( _yHat[1] ).to.equal(2.7);
            expect( _yHat[2] ).to.equal(3.2);
            expect( _yHat[3] ).to.equal(3.7);
            expect( _yHat[4] ).to.equal(4.2);

        });

        it("_ols getYHat[0 - 4].residuals should be -0.2, 0.3, -0.2, 0.3, -0.2, respectively", function(){
            _ols.setData(_dataSet);
            _residuals = _ols.getYHat().residuals
            expect( oneDecimalPoint(_residuals[0]) ).to.equal(-0.2);
            expect( oneDecimalPoint(_residuals[1]) ).to.equal(0.3);
            expect( oneDecimalPoint(_residuals[2])).to.equal(-0.2);
            expect( oneDecimalPoint(_residuals[3]) ).to.equal(0.3);
            expect( oneDecimalPoint(_residuals[4]) ).to.equal(-0.2);

        });

    })

    describe("Tests for the functions to create grid lines on the Processing chart", function(){
        it("one and one should be two", function(){
                expect(1+1).to.equal(2);
        })


        it("_sketch.calculateYDivisions should be a function", function(){
                expect(_sketch.calculateYDivisions).to.be.a("function");
        })

        it("_sketch.calculateYDivisions(3000000) to return 10000", function(){
            expect(_sketch.calculateYDivisions(3000000)).to.equal(10000);
        })

        it("_sketch.calculateYDivisions(1000000) to return 10000", function(){
            expect(_sketch.calculateYDivisions(1000000)).to.equal(1000);
        })

        it("_sketch.calculateYDivisions(100000) to return 10000", function(){
            expect(_sketch.calculateYDivisions(100000)).to.equal(1000);
        })

        it("_sketch.calculateYDivisions(100000) to return 10000", function(){
            expect(_sketch.calculateYDivisions(10000)).to.equal(1000);
        })

        it("_sketch.calculateYDivisions(1000) to return 100", function(){
            expect(_sketch.calculateYDivisions(1000)).to.equal(100);
        })

        it("_sketch.calculateYDivisions(1000) to return 100", function(){
            expect(_sketch.calculateYDivisions(100)).to.equal(10);
        })

        it("_sketch.calculateYDivisions(1000) to return 100", function(){
            expect(_sketch.calculateYDivisions(10)).to.equal(1);
        })

    })

})
