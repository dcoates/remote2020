// set the dimensions and margins of the graph
var margin = {top: 20, right: 15, bottom: 30, left: 20},
    //width_graph = document.getElementById('table_graph').scrollWidth - margin.left - margin.right,
    width_graph = 400 - margin.left - margin.right,
    height_graph = 380 - margin.top - margin.bottom;

   left_extra=20; // for the arrow

   const rad=3;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width_graph + margin.left + margin.right)
    .attr("height", height_graph + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + (margin.left+left_extra) + "," + margin.top + ")");

//Read the data
//d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_IC.csv",function(data) {

const xScale = d3.scaleLinear()
        .domain([0,45])
        .range([0,width_graph])
const xAxis = d3.axisBottom(xScale);

svg.append("g")
    .attr("transform", "translate(0," + height_graph + ")")
    .attr("class", "axisRed")
    .call(d3.axisBottom(xScale));

const g = svg.append("g");
//const margin = { left: 5, right: 5 };

// Add Y axis
var yScale = d3.scaleLinear()
  .domain([-3, 4])
  .range([ height_graph, 0 ]);

  // Add the Y Axis
  svg.append("g")
    .attr("class", "axisRed")
    //.attr("transform", "translate(10,0)")
    .call(d3.axisLeft(yScale));
	
svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "left")
    .attr("y", height_graph+margin.bottom)
    .attr("x", (width_graph/2.0))
    .attr("stroke", "red")
    .text("Elapsed time (min)")

// Define the line
var valueline = d3.line()
    .x(function(d) { return xScale(d.x); })
	.y(function(d) { return yScale(d.y); })
	//.is_correct(function(d) { return d.is_correct; });

function app1(data) {

    //var datalen=data.length;

     //https://bl.ocks.org/HarryStevens/678935d06d4601c25cb141bacd4068ce
    // would have loved to make xAxis dynamic, but couldn't understand d3.js data model
    // and how to modify old lines: they were duplicated and not erasing
    //xScale
        //.domain([0,datalen+5])
        //.range([0,width_graph]);

    // Add the line
    svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "black") //{function(d) {
			//if (d.is_correct) {
				//return "green";
			//} else {
				//return "red";
			//}
			//} )
      .attr("stroke-width", 3.0)
	  //.attr("class","line")
      //.datum(data)
      //.attr("d", d3.line()
        //.x(function(d) { return x(d.x) })
        //.y(function(d) { return y(d.y) })
        //);
      .attr("d", valueline(data) )
      //.exit().remove()
     //.attr("transform", `translate(${margin.left}, ${height_graph})`) .transition().duration(1000)

    // Wasn't erasing old data
    //g.attr("transform", `translate(${margin.left}, ${height_graph})`) .transition().duration(1000)
                        //.call(xAxis);
}

function render(dat) {
    path = svg.selectAll('path').data(dat)
    path.attr('d', function(d){return valueline(d)}) // before had +'Z' at end... WHY !?!?!!
        .style('stroke-width', 1)
        .style('stroke', 'steelblue');
    path.enter().append('svg:path').attr('d', function(d){return valueline(d)}) // before had +'Z' at end... WHY !?!?!!
        .style('stroke-width', 1)
        .style('stroke', 'steelblue');
    path.exit().remove()
    path.attr("fill", "none");
}

//var circles=svg.selectAll("circle")
    //.data(data);

//circles.enter()
    //.append("circle")
	//.attr("class", "dot")
	//.style("fill", function(d,i){
		//if (i == 1){
				//return "red";
		//} else {
			//return "green"; 
		//}
	//})
	//.attr("cx", function(d,i) { return x(d.x) })
	//.attr("cy", function(d,i) { return y(d.y) })
	//.attr("r", 6)

// Define the line
//var valueline = d3.svg.line()
 //   .x(function(d) { return x(d.num); })
//	.y(function(d) { return y(d.size); });

function fup1(){
 nodes
  .attr("cx", function(d) {
    return d.x;
  })
  .attr("cy", function(d) {
    return d.y;
  })
  .attr("r", 3)
  .style("fill", function(d) {
    return 'green';
  })
}

function graph_clear() {
    svg.selectAll('circle').remove()
    svg.selectAll('path').remove()
}

function update_graph(data1) {
    // MANY MANY failed attempts to add successively add colored dots
    // using d3.js. Eventually just used svg.


   // force.nodes(data);
   // force.on('tick', function (e) {
    //    circles.attr("transform", function (d, i) {
     //       return "translate(" + d.x + "," + d.y + ")";
     //   });
    //});

    // DATA JOIN
    // Join new data with old elements, if any.
    svg.append('circle')
        .attr("r", rad)
        .attr("cx", xScale(data1.x) )
        .attr("cy", yScale(data1.y) )
        .style("fill", function () {
			if (data1.is_correct) {
				return "green";
			} else {
				return "red";
			}
    });

    if (false) {
    // ENTER
    // Create new elements as needed.
    // UPDATE
    // Update old elements as needed.
    circles.attr("cx", function (d) {return x(d.x);})
           .attr("cy", function (d) {return y(d.y);})
        //.transition().duration(750)
        .style("fill", function (d) {
			if (d.is_correct) {
				return "green";
			} else {
				return "red";
			}
    });

    }

    // EXIT
    // Remove old elements as needed.
    //circles.exit().remove();

   // force.start();
}

if (false) {
var nodes = svg.selectAll("circle.node").data(data)
  .enter()
  .append("g")
  .attr("class", "node")
  .append("svg:circle");
up1();
}

function BADupdate(dat) {

    // Select the section we want to apply our changes to
	    //var svg = d3.select("body").transition();

     //svg.select(".line")   // change the line
	//.attr("d", d3.svg.line()
	//.x(function(d) { return d.x; })
	//.y(function(d) { return d.y; })
	//.interpolate('linear')(dat))

      //.data(data)
      //.attr("d", d3.line()
        //.x(function(d) { return x(d.x) })
        //.y(function(d) { return y(d.y) })
        //);

	var circles=svg.selectAll("circle")
		.data(data);

	circles.enter()
		.append("circle")
		.attr("class", "dot")
		.style("fill", function(d,i){
			if (i == 1){
					return "red";
			} else {
				return "green"; 
			}
		})
		.attr("cx", function(d,i) { return x(d.x) })
		.attr("cy", function(d,i) { return y(d.y) })
		.attr("r", 6)

}

//update(data);
//render(data);

function createLine (x1, y1, x2, y2, color, w) {
    var aLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    aLine.setAttribute('x1', x1);
    aLine.setAttribute('y1', y1);
    aLine.setAttribute('x2', x2);
    aLine.setAttribute('y2', y2);
    aLine.setAttribute('stroke', color);
    aLine.setAttribute('stroke-width', w);
    return aLine;
}

var line_indicator=null;
function create_line() {
	line_indicator=createLine(-40,100,-28,100,'red',5 );
/*line_indicator = svg.selectAll("line").enter().append("line")
                         .attr("x1", -40)
                         .attr("y1", 100)
                         .attr("x2", -28)
                         .attr("y2", 100)
                         .attr("stroke", "red")
                         .attr("stroke-width", 6);
						 */

	svg.node().appendChild(line_indicator);
}
create_line();

function update_line(yval) {
	ypos=yScale( Math.log10(yval)+2.0 );
	line_indicator.y1.baseVal.value=ypos;
	line_indicator.y2.baseVal.value=ypos;
	//line_indicator.selectAll('line').update().attr("y1",ypos).attr("y2",ypos)
	//line_indicator.selectAll('line').enter().update().attr("y1",ypos).attr("y2",ypos) 
	//line_indicator.attr("y1",ypos).attr("y2",ypos) 
}
