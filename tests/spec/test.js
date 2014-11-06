var foo, _tradeViz;

    beforeEach(function() {
        _tradeViz = new TradeVizPulse("target");
        foo = "foo";
    });

    afterEach(function() {
         console.log("After");
    });




describe('Array', function(){
    describe('#indexOf()', function(){
        it('should return -1 when the value is not present', function(){
            [1,2,3].indexOf(5).should.equal(-1);
            [1,2,3].indexOf(0).should.equal(-1);
        })
    })
})


describe("_tradeViz has been instatiated", function(){
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