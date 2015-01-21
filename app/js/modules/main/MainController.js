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


}]);

