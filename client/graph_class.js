class aGraph {
    constructor(elem,width,height) {

    var margin = {top: 20, right: 15, bottom: 30, left: 20};
    var width_graph = width - margin.left - margin.right;
    var height_graph = height - margin.top - margin.bottom;
    this.width_graph=width_graph;
    this.height_graph=height_graph;

    var left_extra=20; // for the arrow

    this.rad=3;

    this.elem=elem;

// append the svg object to the body of the page
    this.svg = d3.select(elem)
      .append("svg")
        .attr("width", width_graph + margin.left + margin.right)
        .attr("height", height_graph + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + (margin.left+left_extra) + "," + margin.top + ")");

    this.xScale = d3.scaleLinear()
        .domain([0,45])
        .range([0,this.width_graph])
    this.xAxis = d3.axisBottom(this.xScale);

    this.svg.append("g")
        .attr("transform", "translate(0," + this.height_graph + ")")
        .attr("class", "axisRed")
        .call(d3.axisBottom(this.xScale));

    this.g = this.svg.append("g");

// Add Y axis
    this.yScale = d3.scaleLinear()
        .domain([-3, 4])
        .range([ this.height_graph, 0 ]);

  // Add the Y Axis
    this.svg.append("g")
        .attr("class", "axisRed")
    //.attr("transform", "translate(10,0)")
        .call(d3.axisLeft(this.yScale));
	
    this.svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "left")
        .attr("y", this.height_graph+margin.bottom)
        .attr("x", (this.width_graph/2.0))
        .attr("stroke", "red")
        .text("Elapsed time (min)")

// Define the line
    this.valueline = d3.line()
        .x(function(d) { return this.xScale(d.x); })
	    .y(function(d) { return this.yScale(d.y); })
    }

    app1(data) {

    this.svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 3.0)
      .attr("d", this.valueline(data) )
    }

    // UNTESTED:
    render(dat) {
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

    graph_clear_dots() {
        this.svg.selectAll('circle').remove()
    }

    graph_clear() {
        this.graph_clear_dots()
        this.svg.selectAll('path').remove()
    }

    update_graph(data1) {
        this.svg.append('circle')
            .attr("r", this.rad)
            .attr("cx", this.xScale(data1.x) )
            .attr("cy", this.yScale(data1.y) )
            .style("fill", data1.color)
    }

};
