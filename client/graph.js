// set the dimensions and margins of the graph
var margin = {top: 0, right: 5, bottom: 0, left: 25},
    //width_graph = document.getElementById('table_graph').scrollWidth - margin.left - margin.right,
    width_graph = 300 - margin.left - margin.right,
    height_graph = 380 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width_graph + margin.left + margin.right)
    .attr("height", height_graph + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
//d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_IC.csv",function(data) {

const xScale = d3.scaleLinear()
        .domain([0,50])
        .range([0,width_graph])
//const xAxis = d3.axisBottom(xScale);

//svg.append("g")
    //.attr("transform", "translate(0," + 340 + ")")
    //.call(d3.axisBottom(xScale));

const g = svg.append("g");
//const margin = { left: 5, right: 5 };

// Add Y axis
var yScale = d3.scaleLinear()
  .domain([0, 100.0])
  .range([ height_graph, 0 ]);

data=[{x:0,y:0.5},{x:1,y:6.0},{x:2,y:3.0}];
// Define the line
var valueline = d3.line()
    .x(function(d) { return xScale(d.x); })
	.y(function(d) { return yScale(d.y); })
	//.is_correct(function(d) { return d.is_correct; });

function app1(data) {

    var datalen=data.length;

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

function update(data1) {
    // MANY MANY failed attempts to add successively add colored dots
    // using d3.js. Eventually just used svg.

    const rad=6;

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
