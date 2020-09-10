// set the dimensions and margins of the graph
var margin = {top: 20, right: 15, bottom: 30, left: 20},
    //width_graph = document.getElementById('table_graph').scrollWidth - margin.left - margin.right,
    width_graph = 400 - margin.left - margin.right,
    height_graph = 340 - margin.top - margin.bottom;

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
      .attr("stroke-width", 3.0)
      .attr("d", valueline(data) )
}

function graph_clear_dots() {
    svg.selectAll('circle').remove()
}

function graph_clear() {
    graph_clear_dots()
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

}



