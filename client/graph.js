// set the dimensions and margins of the graph
var margin = {top: 5, right: 5, bottom: 5, left: 25},
    //width_graph = document.getElementById('table_graph').scrollWidth - margin.left - margin.right,
    width_graph = 400 - margin.left - margin.right,
    height_graph = 400 - margin.top - margin.bottom;

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

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
      .domain([0,100])
      .range([ 0, width_graph ]);
    svg.append("g")
      .attr("transform", "translate(0," + height_graph + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 100.0])
      .range([ height_graph, 0 ]);

data=[{x:0,y:0.5},{x:1,y:6.0},{x:2,y:3.0}];
// Define the line
var valueline = d3.line()
    .x(function(d) { return x(d.x); })
	.y(function(d) { return y(d.y); })
	//.is_correct(function(d) { return d.is_correct; });

function app1(data) {
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

function update(data) {

   // force.nodes(data);
   // force.on('tick', function (e) {
    //    circles.attr("transform", function (d, i) {
     //       return "translate(" + d.x + "," + d.y + ")";
     //   });
    //});

    // DATA JOIN
    // Join new data with old elements, if any.
    var circles = svg.selectAll("circle").data(data);

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

    // ENTER
    // Create new elements as needed.
    circles.enter().append("svg:circle").attr("r", 2);
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

    // EXIT
    // Remove old elements as needed.
    circles.exit().remove();

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
