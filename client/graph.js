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
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_IC.csv",function(data) {

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
      .domain([1,100])
      .range([ 0, width_graph ]);
    svg.append("g")
      .attr("transform", "translate(0," + height_graph + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 1.0])
      .range([ height_graph, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Show confidence interval
    //svg.append("path")
      //.datum(data)
      //.attr("fill", "#cce5df")
      //.attr("stroke", "none")
      //.attr("d", d3.area()
        //.x(function(d) { return x(d.x) })
        //.y0(function(d) { return y(d.CI_right)/10.0})
        //.y1(function(d) { return y(d.CI_left)/10.0})
        //)

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.x) })
        .y(function(d) { return parseFloat(y(d.y))/1.0 })
        )

})

