var svg = d3.select('#container')
.append("svg")
.attr("width", 500)
.attr("height", 500)
.style("background", "#ddd")

var rect = svg.append("rect")
.attr("x", 1)
.attr("y", 1)
.attr("width", 498)
.attr("height", 498)
.style("fill", "none")
.style("stroke", "blue")

var path = svg.append("path")
.attr("d", )