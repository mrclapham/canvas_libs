Main.controller('MainController', ['$scope', function($scope){
    $scope.testalue = "Here is the test value "
}])

/* Paper Controller */
Main.controller('PaperController', ['$scope', function($scope){
    $scope.libTitle = "PaperJS"
    $scope.libURL = "http://paperjs.org/"
    $scope.libCopy = "Here is the test value fom the paper controller 2"

    $scope.targ0 = document.getElementById("chartHolder0");

    $scope.dataConfig =  {  yMin : 0,
        yMax: 100,
        xStart: 0,
        xEnd: 900,
        steps : 12
    }

    $scope.dataConfig1 =  {    yMin : 0,
        yMax: 1500,
        xStart: 0,
        xEnd: 900,
        steps : 48
    }

    $scope.dataConfig2 =  {    yMin : 0,
        yMax: 1500,
        xStart: 0,
        xEnd: 900,
        steps : 248
    }

    $scope.data0 = new data_model($scope.dataConfig).getData();
    $scope.data1 = new data_model($scope.dataConfig1).getData();
    $scope.data2 = new data_model($scope.dataConfig2).getData();

    $scope.dataR0 = new data_model().getRegualaData(6);
    $scope.dataR1 = new data_model().getRegualaData(12);

    $scope._paper = new PaperRenderer("paperCanv", $scope.data0, {dotColor:"green", leftMargin:80});
    $scope._paper2 = new PaperRenderer("paperCanv2", $scope.data1);
    $scope._paper3 = new PaperRenderer("paperCanv3", $scope.data0);

    $scope.setData = function(data){
        $scope._paper.setData(data);
    }


}])


/* D£ */

Main.controller('d3Controller', ['$scope', function($scope) {

    function generateDataArray(length, year, months){
        var retArr = [];
        for(var i=0; i<length; i++){
            retArr.push(Random365Data(year, months));
        }
        return retArr;
    }
    //--- colour array
    function makeColorGradient(frequency1, frequency2, frequency3,
                               phase1, phase2, phase3,
                               center, width, len)
    {

        function RGB2Color(r,g,b)
        {
            return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
        }

        function byte2Hex(n)
        {
            var nybHexString = "0123456789ABCDEF";
            return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
        }

        if (len == undefined)      len = 50;
        if (center == undefined)   center = 128;
        if (width == undefined)    width = 127;

        var rbw =[]

        for (var i = 0; i < len; ++i)
        {
            var red = Math.sin(frequency1*i + phase1) * width + center;
            var grn = Math.sin(frequency2*i + phase2) * width + center;
            var blu = Math.sin(frequency3*i + phase3) * width + center;
            rbw.push(RGB2Color(red,grn,blu) );
        }
        return(rbw) ;
    }
    $scope.cols= makeColorGradient(.3,.3,.3,0,2,4);
    $scope.data0 = generateDataArray(3, 2015, 4);
    $scope.data1 = generateDataArray(3, 2015, 8);
    $scope.data2 = generateDataArray(4, 2015, 12);
    $scope.sc = new LineFillChart('#line_graph_holder', generateDataArray(3, 2013, 3), {w:1100,h:350, dummy: "DummyData", lineColorArray:$scope.cols, line_color:'#ff00ff' });
    $scope.setData = function(data){
        $scope.sc.setData(data);

    }
}]);












/* P5 */


Main.controller('p5Controller', ['$scope', function($scope) {

    $scope._msData = [];
    $scope._ftseData = [];
    $scope._msVftse = [];
    $scope.staticJson = {"data":[{"date":"01/01/2003","mks":297.5,"ftse":3567.4},{"date":"03/02/2003","mks":305.5,"ftse":3655.6},{"date":"03/03/2003","mks":282,"ftse":3613.3},{"date":"01/04/2003","mks":291.5,"ftse":3926},{"date":"01/05/2003","mks":286,"ftse":4048.1},{"date":"02/06/2003","mks":315.75,"ftse":4031.2},{"date":"01/07/2003","mks":312,"ftse":4157},{"date":"01/08/2003","mks":304.5,"ftse":4161.1},{"date":"01/09/2003","mks":306,"ftse":4091.3},{"date":"01/10/2003","mks":287.75,"ftse":4287.6},{"date":"03/11/2003","mks":268.5,"ftse":4342.6},{"date":"01/12/2003","mks":289,"ftse":4476.9},{"date":"01/01/2004","mks":270.5,"ftse":4390.7},{"date":"02/02/2004","mks":293,"ftse":4492.2},{"date":"01/03/2004","mks":278.5,"ftse":4385.7},{"date":"01/04/2004","mks":276.25,"ftse":4489.7},{"date":"03/05/2004","mks":359.5,"ftse":4430.7},{"date":"01/06/2004","mks":362.75,"ftse":4464.1},{"date":"01/07/2004","mks":347,"ftse":4413.1},{"date":"02/08/2004","mks":352,"ftse":4459.3},{"date":"01/09/2004","mks":343,"ftse":4570.8},{"date":"01/10/2004","mks":359,"ftse":4624.2},{"date":"01/11/2004","mks":328.25,"ftse":4703.2},{"date":"01/12/2004","mks":343,"ftse":4814.3},{"date":"03/01/2005","mks":361,"ftse":4852.3},{"date":"01/02/2005","mks":350.5,"ftse":4968.5},{"date":"01/03/2005","mks":346,"ftse":4894.4},{"date":"01/04/2005","mks":336.5,"ftse":4801.7},{"date":"02/05/2005","mks":337.5,"ftse":4964},{"date":"01/06/2005","mks":360.5,"ftse":5113.2},{"date":"01/07/2005","mks":358,"ftse":5282.3},{"date":"01/08/2005","mks":356.75,"ftse":5296.9},{"date":"01/09/2005","mks":374.75,"ftse":5477.7},{"date":"03/10/2005","mks":417.5,"ftse":5317.3},{"date":"01/11/2005","mks":457,"ftse":5423.2},{"date":"01/12/2005","mks":505,"ftse":5618.8},{"date":"02/01/2006","mks":486,"ftse":5760.3},{"date":"01/02/2006","mks":518.5,"ftse":5791.5},{"date":"01/03/2006","mks":556.5,"ftse":5964.6},{"date":"03/04/2006","mks":585.5,"ftse":6023.1},{"date":"01/05/2006","mks":543,"ftse":5723.8},{"date":"01/06/2006","mks":587,"ftse":5833.4},{"date":"03/07/2006","mks":596.5,"ftse":5928.3},{"date":"01/08/2006","mks":592.5,"ftse":5906.1},{"date":"01/09/2006","mks":642.5,"ftse":5960.8},{"date":"02/10/2006","mks":656.5,"ftse":6129.2},{"date":"01/11/2006","mks":683,"ftse":6048.8},{"date":"01/12/2006","mks":717,"ftse":6220.8},{"date":"01/01/2007","mks":676,"ftse":6203.1},{"date":"01/02/2007","mks":675,"ftse":6171.5},{"date":"01/03/2007","mks":676.5,"ftse":6308},{"date":"02/04/2007","mks":742,"ftse":6449.2},{"date":"01/05/2007","mks":699,"ftse":6621.4},{"date":"01/06/2007","mks":628,"ftse":6607.9},{"date":"02/07/2007","mks":632,"ftse":6360.1},{"date":"01/08/2007","mks":625,"ftse":6303.3},{"date":"03/09/2007","mks":615.5,"ftse":6466.8},{"date":"01/10/2007","mks":652,"ftse":6721.6},{"date":"01/11/2007","mks":583.5,"ftse":6432.5},{"date":"03/12/2007","mks":560,"ftse":6456.9},{"date":"01/01/2008","mks":444,"ftse":5879.8},{"date":"01/02/2008","mks":402.75,"ftse":5884.3},{"date":"03/03/2008","mks":387.25,"ftse":5702.1},{"date":"01/04/2008","mks":380.5,"ftse":6087.3},{"date":"01/05/2008","mks":380,"ftse":6053.5},{"date":"02/06/2008","mks":328.5,"ftse":5625.9},{"date":"01/07/2008","mks":258.5,"ftse":5411.9},{"date":"01/08/2008","mks":262.25,"ftse":5636.6},{"date":"01/09/2008","mks":201.5,"ftse":4902.5},{"date":"01/10/2008","mks":219,"ftse":4377.3},{"date":"03/11/2008","mks":225.75,"ftse":4288},{"date":"01/12/2008","mks":214.75,"ftse":4434.2},{"date":"02/01/2009","mks":231,"ftse":4149.6},{"date":"02/02/2009","mks":261,"ftse":3830.1},{"date":"02/03/2009","mks":296,"ftse":3926.1},{"date":"01/04/2009","mks":338.75,"ftse":4243.7},{"date":"01/05/2009","mks":283.5,"ftse":4417.9},{"date":"01/06/2009","mks":306,"ftse":4249.2},{"date":"01/07/2009","mks":345.75,"ftse":4608.4},{"date":"03/08/2009","mks":339.8,"ftse":4908.9},{"date":"01/09/2009","mks":362.1,"ftse":5133.9},{"date":"01/10/2009","mks":342.5,"ftse":5044.5},{"date":"02/11/2009","mks":386.42,"ftse":5190.7},{"date":"01/12/2009","mks":402,"ftse":5412.9},{"date":"04/01/2010","mks":348.8,"ftse":5188.5},{"date":"01/02/2010","mks":330.1,"ftse":5354.5},{"date":"01/03/2010","mks":370.1,"ftse":5679.6},{"date":"01/04/2010","mks":366.5,"ftse":5553.3},{"date":"04/05/2010","mks":353.7,"ftse":5188.4},{"date":"01/06/2010","mks":331.8,"ftse":4916.9},{"date":"01/07/2010","mks":344.4,"ftse":5258},{"date":"02/08/2010","mks":346.1,"ftse":5225.2},{"date":"01/09/2010","mks":388.1,"ftse":5548.6},{"date":"01/10/2010","mks":427.4,"ftse":5675.2},{"date":"01/11/2010","mks":372.6,"ftse":5528.3},{"date":"01/12/2010","mks":369,"ftse":5899.9},{"date":"04/01/2011","mks":356.5,"ftse":5862.9},{"date":"01/02/2011","mks":346.4,"ftse":5994},{"date":"01/03/2011","mks":336.7,"ftse":5908.8},{"date":"01/04/2011","mks":388,"ftse":6069.9},{"date":"03/05/2011","mks":398.9,"ftse":5990},{"date":"01/06/2011","mks":361.4,"ftse":5945.7},{"date":"01/07/2011","mks":346.2,"ftse":5815.2},{"date":"01/08/2011","mks":322.2,"ftse":5394.5},{"date":"01/09/2011","mks":314.6,"ftse":5128.5},{"date":"03/10/2011","mks":321.9,"ftse":5544.2},{"date":"01/11/2011","mks":330.2,"ftse":5505.4},{"date":"01/12/2011","mks":311,"ftse":5572.3},{"date":"03/01/2012","mks":326.8,"ftse":5681.6},{"date":"01/02/2012","mks":363,"ftse":5871.5},{"date":"01/03/2012","mks":362.1,"ftse":5955.9}]}


    var loader = new JsonLoader();
    loader.listen(JsonLoader.LOAD_COMPLETE, function(e){
        console.log(e.detail.data)
        console.log(e.detail.data.data.length)
        var xOffset = 10;
        for(var i=0; i<e.detail.data.data.length; i++){
//                    console.log("e.detail.data[i].mks ", e.detail.data.data[i].mks)
            $scope._msData.push({date:e.detail.data.data[i].date, x:i*xOffset, y:e.detail.data.data[i].mks})
            $scope._ftseData.push({date:e.detail.data.data[i].date, x:i*xOffset, y:e.detail.data.data[i].ftse})
            $scope._msVftse.push({date:e.detail.data.data[i].date, y:e.detail.data.data[i].mks, x:e.detail.data.data[i].ftse})
        }

        console.log($scope._msData)
    });

    loader.listen(JsonLoader.LOAD_ERROR, function(e){
        console.log("ERROR LOADING JSON FILE");
    });
    //loader.setPath("data/MKS_FTSE.json");

    $scope.parseStaticJson = function(){
        var xOffset = 10;
        for(var i=0; i<$scope.staticJson.data.length; i++){
//                    console.log("e.detail.data[i].mks ", e.detail.data.data[i].mks)
            $scope._msData.push({date:$scope.staticJson.data[i].date, x:i*xOffset, y:$scope.staticJson.data[i].mks})
            $scope._ftseData.push({date:$scope.staticJson.data[i].date, x:i*xOffset, y:$scope.staticJson.data[i].ftse})
            $scope._msVftse.push({date:$scope.staticJson.data[i].date, y:$scope.staticJson.data[i].mks, x:$scope.staticJson.data[i].ftse})
        }
    }

    $scope.parseStaticJson();

    var dataConfig =  {  yMin : 0,
        yMax: 2200,
        xStart: 0,
        xEnd: 900,
        steps : 60
    }
    $scope.data0 = new data_model(dataConfig).getData();
    $scope.data1 = new data_model(dataConfig).getData();
    $scope._dataSetXl = [{x:1,y:2}, {x:2,y:3}, {x:3,y:3}, {x:4,y:4}, {x:5,y:4}];


    $scope._targ = document.getElementById("processDiv");
    $scope._pro = new ProcessingRenderer($scope._targ, $scope.data0, {width:1200, height:900});
    $scope._pro.setWidth(1200)
    $scope._pro.setData($scope._dataSetXl);

    $scope.setData = function(value){
        $scope._pro.setData(value)
    }
}]);



/*  Easle */



Main.controller('easleController', ['$scope', function($scope) {
    $scope.targ0 = document.getElementById("chartHolder0");
    $scope.targ1 = document.getElementById("chartHolder1");
    $scope.targ2 = document.getElementById("chartHolder2");

    $scope.dataConfig0 =  {  yMin : 0,
        yMax: 100,
        xStart: 0,
        xEnd: 900,
        steps : 12
    }

    $scope.dataConfig1 =  {  yMin : 0,
        yMax: 100,
        xStart: 0,
        xEnd: 900,
        steps : 32
    }

    $scope.dataConfig2 =  {  yMin : 0,
        yMax: 100,
        xStart: 0,
        xEnd: 1900,
        steps : 88
    }

    $scope.data0 = new data_model($scope.dataConfig0).getData();
    $scope.data1 = new data_model($scope.dataConfig1).getData();
    $scope.data2 = new data_model($scope.dataConfig2).getData();
    $scope.dataR0 = new data_model().getRegualaData(26);
    $scope.dataR1 = new data_model().getRegualaData(52);
    $scope._EasleRenderer = new EasleRenderer("easleCanvas", $scope.data0, {createCanvas: false});

    //-- functions

    ///-- data updates

    $scope.setData = function(value){
        $scope._EasleRenderer.setData(value);
    }

}]);

