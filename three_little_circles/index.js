// Once upon a time, there were three little circles.
var circle = d3.selectAll("circle");
circle.style("fill", "steelblue");
circle.attr("r", 30);
circle.attr("cx", function(d,i) { return Math.random() * 720 });
circle.data([32, 57, 112]);
