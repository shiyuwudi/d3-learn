var w = 600;
var h = 600;
var center = { x: w / 2, y: h / 2, r: 10};
var rs = [50, 100, 150, 200];
var text_offset = { x: 10, y: 5 };
var inset = 20; // 内边距
var a = 8, s = 8, size = 10, ma = 90; // 角度,角度间隔,size小圆直径,ma最大开角（一个方向的）
var dataset = []
var r = rs[0];
var R = center.x;
var th = r * tan(0.5 * ma); // 最大开角y
// 最大开角点
var p1 = [x(-R), y(th)];
var p2 = [x(-R), y(-th)];
var p3 = [x(R), y(th)];
var p4 = [x(R), y(-th)];
var ps = [p1, p2, p3, p4];
console.log(p1)

/**
 * x相对转绝对坐标
 */
function x(rel) {
  return center.x + rel;
}

/**
 * y相对转绝对坐标
 */
function y(rel) {
  return center.y + rel;
}

var svg = d3.select('body').append('svg').attr('width', w).attr('height', h)

var center_point = svg.append("circle")
  .attr('cx', center.x)
  .attr('cy', center.y)
  .attr('r', center.r)
  .style('fill', 'red')

var text = svg.append('text')
  .text('原点')
  .attr("x", center.x + center.r + text_offset.x)
  .attr('y', center.y + text_offset.y)

// 轨道
var orbit = svg.selectAll("circle.orbit")
  .data(rs)
  .enter()
  .append("circle")

// 缩放
var orbit_scale = d3.scale
  .linear()
  .domain([0, rs[rs.length - 1]])
  .range([0, h / 2 - inset])

orbit
  .attr("cx", center.x)
  .attr("cy", center.y)
  .attr("r", function (d) {
    return (d);
  })
  .style('fill', 'none')
  .style('stroke', 'blue')

var base_line = svg.append("line")
  .attr("x1", center.x)
  .attr("y1", center.y)
  .attr('x2', 0)
  .attr('y2', h / 2)
  .style('stroke', 'black')

var limit_lines = svg.selectAll("line.limit")
  .data(ps)
  .enter()
  .append('line')
  .attr("x1", x(0))
  .attr("y1", y(0))
  .attr('x2', function (d, i) {
    return ps[i][0];
  })
  .attr('y2', function (d, i) {
    return ps[i][1];
  })
  .style('stroke', 'red')
  .attr('class', 'limit')

// 画4条最大角度线
for (let i = 0; i < ps.length; i++) {
  const [x2, y2] = ps[i];
}

/**
 * 角度转PI
 * @param a
 * @return {number}
 */
function t(a) {
  return Math.PI / 180 * a;
}

function sin(a) {
  return Math.sin(t(a));
}

function cos(a) {
  return Math.cos(t(a));
}

function tan(a) {
  return Math.tan(t(a));
}

/**
 * 获取第i个圆的角度
 * @param i
 * @return {number}
 */
function get_a_by_i (i) {
  return (s + a) * i;
}

var node_circles = svg.selectAll('circle.node')
  .data(dataset)
  .enter()
  .append('circle')

var cache = [];

node_circles
  .attr('class', 'node')
  .attr('cx', function (d, i) {
    const a = get_a_by_i(i);
    const e = cos(a) * r; // 临边
    return center.x - e;
  })
  .attr('cy', function (d, i) {
    const a = get_a_by_i(i);
    const f = sin(a) * r; // 对边
    return center.y - f;
  })
  .attr('r', size * 0.5)
  .style('fill', 'blue')

function addLeft () {
  dataset.push(0);
  node_circles
    .data(dataset)
    .enter()
    .append("circle")
    .attr('cx', function (d, i) {
      const a = get_a_by_i(i);
      const e = cos(a) * r; // 临边
      return center.x - e;
    })
    .attr('cy', function (d, i) {
      const a = get_a_by_i(i);
      const f = sin(a) * r; // 对边
      return center.y - f;
    })
    .attr('r', size * 0.5)
    .style('fill', 'green')
}
function addRight () {

}
