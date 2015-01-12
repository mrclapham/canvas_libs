/**
 * Created with JetBrains WebStorm.
 * User: grahamclapham
 * Date: 04/04/2013
 * Time: 15:07
 * To change this template use File | Settings | File Templates.
 */
function LineFillChart(targ, dataArray, config){
    var scope = {
        model:{
            dataArray:dataArray,
            d:null,
            w:753,
            h:344,
            padding:{l:70,r:0,t:20, b:70},
            sw:function(){return scope.model.w - (scope.model.padding.l + scope.model.padding.r)},
            sh:function(){return scope.model.h - (scope.model.padding.t + scope.model.padding.b)},
            backgroundColor:'transparent',
            svgClass:'svgViz',
            dotClasses:[],
            dotArray:[],
            dot_line_color:'#ffffff',
            dot_radius:6,
            fill_color: 'rgba(241, 122, 2, 0.1)',
            fill_alpha:0.3,
            line_color:'#ff8000',
            lineColorArray:['#ff8000', '#1e9ff1' ],
            line_thickness: 2,
            lineArray:[],
            lineClasse:[],
            areaArray:[],
            areaFillColors:['rgba(241, 122, 2, 0.1)', 'rgba(0, 255, 0, 0.1)', 'rgba(241, 122, 2, 0.1)'],
            // BAR CHARTS ---
            dataArrayBars:[],
            barArray:[],
            barColors:['rgba(241, 122, 2, 0.1)', 'rgba(0, 255, 0, 0.1)', 'rgba(241, 122, 2, 0.1)'],
            barClasses:[],
            barsStack:false,
            barWidth:function(){
                var w = Math.ceil(scope.model.sw() / scope.model.dataArray[0].length -1)
                w<0 ? w=1 :w=w;
                return 5 // w
            },
            tick_text_color:'#ffffff',
            tick_text_font:null,
            trans_speed:500,
            tool_tip_fade:200,
            show_tool_tip:true,
            interpolation: ['linear', 'cardinal'],
            yAxis:null,
            timeXAxis1:null,
            timeAxisDivision1:'months',
            timeAxisDivision2:'weeks',
            timeAxisDivision3:'days',
            timeAxisLegendAngle:-60,
            timeAxisLegendColor:'#cccccc',
            timeAxisLegendOffset:10,
            legendFont:"'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neu', Helvetica, Arial, 'Lucida Grande', sans-serif;",
            dataMax:function(){
                var _maxArray = [];
                for(var dt in scope.model.dataArray){
                    _maxArray.push( d3.max( scope.model.dataArray[dt], function(d){return d.value[1];}));
                }
                return d3.max(_maxArray);
            },
            dataLengthMax:function(){
                var _maxArray = [];
                for(var dt in scope.model.dataArray){
                    _maxArray.push(  scope.model.dataArray[dt].length );
                }
                return d3.max(_maxArray);
            }
        },
        view:{
            svg:null,
            gridLinesHorizontal:null,
            gridLinesVertical:null,
            targ:targ,
            targDiv:null,
        },
        controller:{
            init_svg:function(){
                scope.view.svg = d3.select(scope.view.targ)
                    .style('width', scope.model.w+ "px")
                    .style('height',  scope.model.h+ "px")
                    .style('background-color',  scope.model.backgroundColor)
                    .append('svg:svg')
                    .attr('width',scope.model.w)
                    .attr('height',scope.model.h )
                    .attr('class', scope.model.svgClass)
                    .append('svg:g')
                    .attr('transform', "translate(" + scope.model.padding.l + "," + scope.model.padding.t  + ")")

                    scope.view.gridLinesHorizontal  =
                        scope.view.svg
                            .append('svg:g')
                            .attr('class', 'gridlinesH')

                scope.view.gridLinesVertical  =
                    scope.view.svg
                        .append('svg:g')
                        .attr('class', 'gridlinesV');
            },

            init_gridY:function(){
                var     max = scope.model.dataMax();
                var     x = d3.scale.linear().domain([0, scope.model.dataLengthMax() - 1]).range([0, scope.model.sw()]);
                var     y = d3.scale.linear().domain([0, max]).range([scope.model.sh(), 0]);

                scope.model.yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left")
                    .ticks(10)

                scope.view.gridLinesHorizontal.append("g")
                    .attr("class", "axisH")
                    //.attr('fill', '#ffffff')
                    .transition().duration(700)
                    .call(scope.model.yAxis)

                var __paths = scope.view.gridLinesHorizontal.selectAll(".axisH").selectAll('path');
                __paths.attr('fill', '#ff00ff')
                    .style("opacity", "0")

                __text = scope.view.gridLinesHorizontal.selectAll(".axisH").selectAll('.major');

                __text.attr('fill', scope.model.timeAxisLegendColor);
            },
            transform_gridY:function(){

                var _remove = scope.view.gridLinesHorizontal.selectAll(".axisH").remove();
                    scope.controller.init_gridY()
            },
            init_timex_axis:function(){
                var minDate = scope.model.dataArray[0][0].date;
                var maxDate = scope.model.dataArray[0][scope.model.dataArray[0].length-1].date;

                var xScale = d3.time.scale().domain([minDate, maxDate]).range([0, scope.model.sw()]);

                scope.model.timeXAxis1 = scope.view.gridLinesVertical.selectAll(".tickY")
                                        .data(xScale.ticks(d3.time.months))

                var _baseline =  scope.model.h-(scope.model.padding.b+scope.model.padding.t)
                scope.model.timeXAxis1
                    .enter()
                    .append("g")
                    .attr('class', 'tickY')
                    .append("svg:line")
                    .attr("x1", xScale)
                    .attr("x2", xScale)
                    .attr("y1", 0)
                    .attr("y2", _baseline )
                    .style({'stroke': '#999999',  'stroke-width':'.5px'})
                    .style("stroke-dasharray", ("1, 1"))

                scope.model.timeXAxis1
                    .append("g")
                    .attr('x', xScale)
                    .attr('width', 10)
                    .attr('height', 200)
                    .attr('fill', scope.model.timeAxisLegendColor)
                    .attr('class', 'textHolder')
                    .attr('transform', function(d,i){return 'translate('+xScale(d)+','+( scope.model.timeAxisLegendOffset+scope.model.sh() )+')'})

                .append("svg:text")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("dy", ".5em")
                    .attr("text-anchor", "end")
                    .attr("transform", function(d) {
                        return "rotate("+scope.model.timeAxisLegendAngle+")"
                    })
                    .text(xScale.tickFormat(12))

              scope.model.timeXAxis1.exit().remove();
            },
            transform_timex_axis:function(){
                scope.view.gridLinesVertical.selectAll(".tickY").remove();
                scope.controller.init_timex_axis();
            },

            init_dots:function(i){
                scope.model.dotClasses[i]="dot_"+i;
                var     max = scope.model.dataMax();
                var     x = d3.scale.linear().domain([0, scope.model.dataLengthMax() - 1]).range([0, scope.model.sw()]);
                var     y = d3.scale.linear().domain([0, max]).range([scope.model.sh(), 0]);
                var dd =  scope.view.svg.selectAll('.'+scope.model.dotClasses[i])
                           .data(scope.model.dataArray[i])

                dd.enter().append('svg:circle')
                    .style('fill', scope.model.lineColorArray[i])
                    .style({'stroke': '#ffffff',  'stroke-width':'1px'})
                    .style({'opacity': '0'})
                    .attr('class', scope.model.dotClasses[i])
                    .attr("cx", function(d, i) {
                        return x(i);
                    })
                    .attr("cy", function(d, i) {
                        return y(d.value[1]);
                    })
                    .attr('r', scope.model.dot_radius)
                    .on("mouseover", function(d, i) {
                        scope.controller.onMouseOverDot(d,i,this)

                    })
                    .on('mouseout', function(){
                        scope.controller.removeTooltips();

                        for(var ds in scope.model.dotArray ) {
                            scope.model.dotArray[ds]
                              .style("opacity", "0")
                        }
                    })

                 dd.exit().remove();

                scope.model.dotArray[i]=dd;
            },
            transformDots:function(){
                scope.controller.removeTooltips();

                var     max = scope.model.dataMax();
                var     x = d3.scale.linear().domain([0, scope.model.dataLengthMax() - 1]).range([0, scope.model.sw()]);
                var     y = d3.scale.linear().domain([0, max]).range([scope.model.sh(), 0]);

                for( var i=0; i<scope.model.dotArray.length; i++){

                    scope.model.dotArray[i] =  scope.view.svg.selectAll('.'+scope.model.dotClasses[i])
                        .data(scope.model.dataArray[i])

                    scope.model.dotArray[i].enter().append('svg:circle')
                        .style('fill', scope.model.lineColorArray[i])
                        .style({'stroke': '#ffffff',  'stroke-width':'1px'})
                        .style({'opacity': '0'})
                        .attr('class', scope.model.dotClasses[i])
                        .attr("cx", function(d, i) {
                            return x(i);
                        })
                        .attr("cy", function(d, i) {
                            return y(d.value[1]);
                        })
                        .attr('r', scope.model.dot_radius)
                        .on("mouseover", function(d, i) {
                            scope.controller.onMouseOverDot(d,i,this)

                        })
                        .on('mouseout', function(){
                            scope.controller.removeTooltips();

                            for(var ds in scope.model.dotArray ) {
                                scope.model.dotArray[ds]
                                    .style("opacity", "0")
                            }
                        })


                    scope.model.dotArray[i].transition()
                        .duration(scope.model.trans_speed)
                        .attr("cx", function(d, i) { return x(i); })
                        .attr("cy", function(d, i) { return y(d.value[1]); })
                        .attr('r', scope.model.dot_radius)

                    scope.model.dotArray[i].exit().remove();

                }
            },
            onMouseOverDot:function(d,i, targ){
                var lineTopArray =[]       // we are going to find the higest of the selected nodes to position the line top.
                for(var ds in scope.model.dotArray ) {
                    scope.model.dotArray[ds]
                        .style("opacity", "0");

                    d3.select(scope.model.dotArray[ds][0][i])
                        .style("opacity", "1");

                    lineTopArray.push( scope.model.dataArray[ds][i].value[1] );
                }
                scope.model.lineTop = d3.max(lineTopArray);

                d3.select(targ)
                    .style("opacity", "1");
                var className =  String(targ.getAttribute('class'));
                var arrayNumArray =  className.split("_");
                var  arrayNum = arrayNumArray[arrayNumArray.length-1];
                var current_color = scope.model.lineColorArray[arrayNum];

                scope.model.d = d ;
                scope.model.i = i ;

                var     max = scope.model.dataMax();
                var     x = d3.scale.linear().domain([0, scope.model.dataLengthMax() - 1]).range([0, scope.model.sw()]);
                var     y = d3.scale.linear().domain([0, max]).range([scope.model.sh(), 0]);

                scope.view.svg.append('svg:line')
                    .attr('x1', function(d, i) { return x(scope.model.i); } )
                    .attr('x2', function(d, i) { return x(scope.model.i); } )
                    .attr('y1', function(d, i) { return y(scope.model.lineTop)+scope.model.dot_radius; } )
                    .attr('y2', function(d, i) { return scope.model.sh() } )
                    .attr('class', 'tool_line')
                    .style({'stroke': '#ffffff',  'stroke-width':'.5px'})
                    .style("stroke-dasharray", ("3, 3"))
                // now the horizontal line
                scope.view.svg.append('svg:line')
                    .attr('x1', function(d, i) { return x(0); } )
                    .attr('x2', function(d, i) { return x(scope.model.w); } )
                    .attr('y1', function(d, i) { return y(scope.model.d.value[1]); } )
                    .attr('y2', function(d, i) { return y(scope.model.d.value[1]);  } )
                    .attr('class', 'tool_line')
                    .style({'stroke': '#ffffff',  'stroke-width':'.5px'})
                    .style("stroke-dasharray", ("3, 3"))

              /* display the data in a balloon */
                var div = d3.select("body").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);

                div.transition()
                    .duration(scope.model.tool_tip_fade)
                    .style("opacity", .9);

                div.html("<p>"+scope.controller.formatTime(d.date) + "</p>")

                div.style("left", (d3.event.pageX - 65 ) + "px")
                    .style("top", (d3.event.pageY - (scope.model.dot_radius*2) - 70 ) + "px")
                    .style("position", "absolute")
                    .style("width", "100px")
                    .style("background-color", "#ff00ff")
                    .style("padding", "15px");

                /* now for the actuala value */
                d3.select(scope.view.targ)
                    .style({'position': 'relative'})

                var divVal = d3.select(scope.view.targ).append("div")
                    .attr("class", "tooltipVal")
                    .style("opacity", 0);

                divVal.transition()
                    .duration(scope.model.tool_tip_fade)
                    .style("opacity", .9);

                divVal.html("<p>"+ d.value[1].toFixed(2)+ "</p>")

                divVal.style("left", -100 + "px")
                    .style("top", y(scope.model.d.value[1])+(scope.model.padding.t - 25) + "px")
                    .style("position", "absolute")
                    .style("width", "100px")
                    .style("background-color", "#000000")
                    .style('color', current_color)
                    .style("padding", "5px 10px 5px 5px");
            },
            removeTooltips:function(){
                d3.select('body').selectAll('div.tooltip').remove();
                d3.select('body').selectAll('.tool_line').remove();
                d3.select('body').selectAll('.tooltipVal').remove();
            },
            init_area:function(){
                var     max = scope.model.dataMax();
                var     x = d3.scale.linear().domain([0, scope.model.dataLengthMax() - 1]).range([0, scope.model.sw()]);
                var     y = d3.scale.linear().domain([0, max]).range([scope.model.sh(), 0]);

                var _area = d3.svg.area()
                    .interpolate("cardinal")
                    .x(function(d, i) { return x(i); })
                    .y0(function(d) {return y(d.value[1]);})
                    .y1(function(d) { return scope.model.sh(); });

                var arr = scope.view.svg.selectAll('path.areas')
                    .data([scope.model.dataArray[0]])
                    .enter().append("path")
                    .style("fill", scope.model.fill_color)
                    .attr("class", "areas")
                    .attr("d", _area);

                scope.model.areaArray.push(arr)
            },
            transformArea:function(){
                var     max = scope.model.dataMax();
                var     x = d3.scale.linear().domain([0, scope.model.dataLengthMax() - 1]).range([0, scope.model.sw()]);
                var     y = d3.scale.linear().domain([0, max]).range([scope.model.sh(), 0]);

                for(var i=0; i<scope.model.areaArray.length; i++){
                var _area = d3.svg.area()
                    .interpolate("cardinal")
                    .x(function(d, i) { return x(i); })
                    .y0(function(d) {return y(d.value[1]);})
                    .y1(function(d) { return scope.model.sh(); });

                 scope.model.areaArray[i]
                    .data([scope.model.dataArray[0]])
                    .transition()
                    .duration(scope.model.trans_speed)
                    .attr("d", _area);
                }
            },
            init_line:function(i){
                var     max = scope.model.dataMax();
                var     x = d3.scale.linear().domain([0, scope.model.dataLengthMax() - 1]).range([0, scope.model.sw()]);
                var     y = d3.scale.linear().domain([0, max]).range([scope.model.sh(), 0]);

                scope.model.lineClasse[i] = "line_" +i

                    var ll = scope.view.svg.selectAll('path.'+scope.model.lineClasse[i])
                    .data([scope.model.dataArray[i]])

                    ll.enter()
                    .append("svg:path")
                    .attr('class', 'top_line_main')
                    .style({'stroke': scope.model.lineColorArray[i],  'stroke-width':scope.model.line_thickness+'px'})
                    .style({'fill': 'none'})
                    .attr("d", d3.svg.line()
                        .x( function(d, i) { return x(i);} )
                        .y( function(d,i){ return y(d.value[1])} )
                        .interpolate(scope.model.interpolation[1]) );
                    ll.exit().remove();

                scope.model.lineArray[i] =  ll
            },

            transform_line:function(){
                var     max = scope.model.dataMax();
                var     x = d3.scale.linear().domain([0, scope.model.dataLengthMax() - 1]).range([0, scope.model.sw()]);
                var     y = d3.scale.linear().domain([0, max]).range([scope.model.sh(), 0]);

                for( var n=0; n<scope.model.lineArray.length; n++){
                    scope.model.lineArray[n]
                    .data([scope.model.dataArray[n]])
                    .transition()
                    .duration(scope.model.trans_speed)
                    .attr("d", d3.svg.line()
                        .x( function(d, i) { return x(i);} )
                        .y( function(d,i){console.log(/*"Y_POS : "+y(d.all the dots)*/); return y(d.value[1])} )
                        .interpolate(scope.model.interpolation[1]) );
                }
            },
            //-- THE BAR CHARTS
                init_bar:function(i){
                    scope.model.barClasses[i]="bar_"+i;
                    var     max = scope.model.dataMax();
                    var     x = d3.scale.linear().domain([0, scope.model.dataLengthMax() - 1]).range([0, scope.model.sw()]);
                    var     y = d3.scale.linear().domain([0, max]).range([scope.model.sh(), 0]);

                    scope.model.barArray[i] =  scope.view.svg.selectAll('.'+scope.model.barClasses[i])
                        .data(scope.model.dataArray[i])

                    scope.model.barArray[i].enter().append('svg:rect')
                        .attr('height', 100)
                        .attr('width', 50)
                        .style('fill', '#ff0000')
                        .style({'opacity': '.3'})
                        //.style({'stroke': '#00ffff',  'stroke-width':'1px'})
                        .attr('class', scope.model.barClasses[i])
                        .attr("x", function(d, i) {
                            return x(i);
                        })
                        .attr("y", function(d, i) {
                            return y(d.value[1]);
                        })
                        .attr('height', function(d, i){
                           return scope.model.sh() - y(d.value[1])
                        })
                        .attr('width', function(){ return scope.model.barWidth() })
                        .on("mouseover", function(d, i) {
                            // scope.controller.onMouseOverDot(d,i,this)
                        })
                        .on('mouseout', function(){
                            //-----
                        })

                    scope.model.barArray[i].exit().remove();
                },
                transforn_bar:function(){

                    var     max = scope.model.dataMax();
                    var     x = d3.scale.linear().domain([0, scope.model.dataLengthMax() - 1]).range([0, scope.model.sw()]);
                    var     y = d3.scale.linear().domain([0, max]).range([scope.model.sh(), 0]);

                    for(var b=0; b<scope.model.barArray.length; b++){

                        scope.model.barArray[b] = scope.view.svg.selectAll('.'+scope.model.barClasses[b])
                                                 .data(scope.model.dataArray[b])

                        scope.model.barArray[b].enter().append('svg:rect')
                            .style('fill', '#ff0000')
                            .style({'opacity': '.3'})
                            //.style({'stroke': '#00ffff',  'stroke-width':'1px'})
                            .attr('class', scope.model.barClasses[b])
                            .attr("x", function(d, i) {
                                return x(i);
                            })
                            .attr("y", function(d, i) {
                                return y(d.value[1]);
                            })
                            .attr('height', function(d, i){
                                return scope.model.sh() - y(d.value[1])
                            })
                            .attr('width', function(){ return scope.model.barWidth() })
                            .on("mouseover", function(d, i) {
                                // scope.controller.onMouseOverDot(d,i,this)

                            })
                            .on('mouseout', function(){
                                //                            scope.controller.removeTooltips();
                                //
                                //                            for(var ds in scope.model.dotArray ) {
                                //                                scope.model.dotArray[ds]
                                //                                    .style("opacity", "0")
                                //                            }
                            })

                        scope.model.barArray[b]
                            .data( scope.model.dataArray[b] )
                            .transition()
                            .duration(scope.model.trans_speed)
                            .attr("x", function(d, i) {
                               return x(i);
                            })
                            .attr("y", function(d, i) {
                                return y(d.value[1]);
                            })
                            .attr('height', function(d, i){
                                return scope.model.sh() - y(d.value[1])
                            })
                           // .attr('width', 5+Math.random()*60)

                        scope.model.barArray[b].exit().remove();
                    }
                },
            // -- THE BAR CHARTS END
            formatTime:function(_date){
                var formatter = d3.time.format("%e %b %Y %H:%m" );
                return formatter(_date)
            },
            get_random_color:function(a) {
                return 'rgba(' + Math.floor( Math.random()*255)+','+Math.floor( Math.random()*255)+','+Math.floor( Math.random()*255)+','+a+")";
            },
            init:function(config){
               //
                for(var prop in config){
                     scope.model[prop] = config[prop]
                }
                scope.view.targDiv = document.getElementById(scope.view.targ);

                scope.controller.init_svg();
                scope.controller.init_area();
                scope.controller.init_gridY();
                scope.controller.init_timex_axis()
                scope.controller.init_bar(0);

                for(var i=0; i<scope.model.dataArray.length; i++){
                    scope.controller.init_line(i);
                    scope.controller.init_dots(i);
                }
            }
        }
    }

    scope.setData = function(value){
        scope.model.dataArray = value;
        scope.controller.transformDots();
        scope.controller.transform_line();
        scope.controller.transformArea();
        scope.controller.transform_gridY();
        scope.controller.transform_timex_axis();
        scope.controller.transforn_bar();
    }

    scope.controller.init(config)
    return scope;
}

//--

function getLineChart(){
    var lc = Core.extend_class(LineFillChart, 'LineFillChart');
    return lc
}