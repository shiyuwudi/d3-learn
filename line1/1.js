
function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

var width = 500,
height = 300,
margin = { top: 30, left: 50, bottom: 30, right: 50 },
g_width = width - margin.left - margin.right,
g_height = height - margin.top - margin.bottom
data = Array(10).fill(0).map(() => randomInt(10));

// svg
var svg = d3.select("#container")
.append("svg")
.attr("width", width)
.attr("height", height);

// 缩放
var scale_x = d3.scale.linear()
.domain([0, data.length - 1]) // 输入范围
.range([0, g_width]) // 输出范围

var scale_y = d3.scale.linear()
.domain([0, d3.max(data)])
.range([0, g_height])

console.log(data)

// 容器
var g = d3.select("svg")
.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`)

var line_generator = d3.svg.line()
.x(function(d, i) { return scale_x(i) })
.y(function(d, i) { return scale_y(d) })
.interpolate("cardinal")

g.append('path')
.attr('d', line_generator(data))

