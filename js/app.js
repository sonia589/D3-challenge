// @TODO: YOUR CODE HERE!

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 50,
  right: 60,
  bottom: 55,
  left: 100
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from data.csv
d3.csv("D3_data_journalism/data.csv").then(function(stateData) {
    console.log(stateData)

    //Format data for chart
    stateData.forEach(function(data) {
        data.age = +data.age;
        data.healthcare = +data.healthcare;
      });


var xScale=d3.scaleLinear()
.domain([d3.min(stateData, data => data.age)*.9, d3.max(stateData, data => data.age)*1.1])
.range([0, chartWidth]);

//Configure linear scales
var yLinearScale = d3.scaleLinear()
    .domain([d3.min(stateData, data => data.healthcare)*.9, d3.max(stateData, data => data.healthcare)*1.1])
    .range([chartHeight, 0]);
    
 // These will be used to create the chart's axes
 var bottomAxis = d3.axisBottom(xScale);
 var leftAxis = d3.axisLeft(yLinearScale);  



// Append an SVG group element to the chartGroup, create the left axis inside of it
  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

// Append an SVG group element to the chartGroup, create the bottom axis inside of it
  chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);
  
  //Add labels for axes
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - ((chartHeight / 2)+53))
    .attr("dy", "1em")
    .text("Lacks Healthcare (%)");

  chartGroup.append("text")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top})`)
    .text("Age (Median)");

  //add scatter plot dots
  chartGroup.selectAll("circle")
  .data(stateData)
  .enter().append("circle")
    .attr("cx", function (d) { return xScale(d.age); } )
    .attr("cy", function (d) { return yLinearScale(d.healthcare); } )
    .attr("r", 17)
    .attr("opacity", .75)
    .classed("stateCircle", true)
  
  //Add state abbreviations to circles
  chartGroup.selectAll("text")
  .data(stateData)
  .enter().append("text")
    .attr("x", function (d) { return xScale(d.age); } )
    .attr("y", function (d) { return yLinearScale(d.healthcare); } )
    .attr("dy", ".35mm")
    .text(d=>d.abbr)
    .classed("stateText", true)
});

