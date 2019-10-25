var w = 1500;
var h = 800;
var center = { x: w / 2, y: h / 2, r: 10};
// var rs = [50, 100, 150, 200];
var text_offset = { x: -25, y: -30 };
// var inset = 20; // 内边距
// var s = 14, size = 10, ma = 90; // 间隔,size小圆直径,ma最大开角（一个方向的）
// var dataset = Array(4)
// var r = rs[0];
// var R = center.x;
// var th = R * tan(0.5 * ma); // 最大开角y
// // 最大开角点
// var p1 = [x(-R), y(th)];
// var p2 = [x(-R), y(-th)];
// var p3 = [x(R), y(th)];
// var p4 = [x(R), y(-th)];
// var ps = [p1, p2, p3, p4];
// console.log(p1)

// /**
//  * x相对转绝对坐标
//  */
// function x(rel) {
//   return center.x + rel;
// }

// /**
//  * y相对转绝对坐标
//  */
// function y(rel) {
//   return center.y + rel;
// }

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

// // 轨道
// // var orbit = svg.selectAll("circle.orbit")
// //   .data(rs)
// //   .enter()
// //   .append("circle")

// // // 缩放
// // var orbit_scale = d3.scale
// //   .linear()
// //   .domain([0, rs[rs.length - 1]])
// //   .range([0, h / 2 - inset])

// // orbit
// //   .attr("cx", center.x)
// //   .attr("cy", center.y)
// //   .attr("r", function (d) {
// //     return (d);
// //   })
// //   .style('fill', 'none')
// //   .style('stroke', 'blue')

// // var base_line = svg.append("line")
// //   .attr("x1", center.x)
// //   .attr("y1", center.y)
// //   .attr('x2', 0)
// //   .attr('y2', h / 2)
// //   .style('stroke', 'black')

// // var limit_lines = svg.selectAll("line.limit")
// //   .data(ps)
// //   .enter()
// //   .append('line')
// //   .attr("x1", x(0))
// //   .attr("y1", y(0))
// //   .attr('x2', function (d, i) {
// //     return ps[i][0];
// //   })
// //   .attr('y2', function (d, i) {
// //     return ps[i][1];
// //   })
// //   .style('stroke', 'red')
// //   .attr('class', 'limit')

// // 画4条最大角度线
// // for (let i = 0; i < ps.length; i++) {
// //   const [x2, y2] = ps[i];
// // }

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

// /**
//  * 获取第i个圆的角度
//  * @param i
//  * @return {number}
//  */
// function get_a_by_i (i) {
//   return s * i;
// }

// var cache = [];
// var level = 1;
// var is = 14, size = 10, ma = 90, r = 50; // 间隔,size小圆直径,ma最大开角（一个方向的）

// function drawNodes() {
//   s = is / level;
//   var node_circles = svg.selectAll('circle.node' + level)
//   .data(Array(4 * level - 1))
//   .enter()
//   .append('circle');
//   node_circles
//   .attr('class', 'node' + level)
//   .attr('cx', function (d, i) {
//     const a =  s * i;
//     const e = cos(a) * r; // 临边
//     return center.x - e;
//   })
//   .attr('cy', function (d, i) {
//     const a = s * i;
//     const f = sin(a) * r; // 对边
//     return center.y - f;
//   })
//   .attr('r', size * 0.5)
//   .style('fill', 'blue')

 
//   r+= 50;
//   level +=1;
// }

/**
 * draw one node
 * @param {number} cx x
 * @param {number} cy y
 * @param {number} r radius
 */
function drawNode(cx, cy, r) {
  svg
  .append("circle")
  .attr('cx', cx)
  .attr('cy', cy)
  .attr('r', r)
  .style('fill', 'blue')
}

var is = 14, size = 10, ma = 90;
var max = 1000, c = 5, l = 1, distance = 50;

/**
 * 画点
 * @param {number} offset 偏移量
 * @param {number} section 象限
 * @param {number} level 距离单位
 */
function drawPoint(offset, section, level) {
  // section:
  // 1 3
  // 2 4
  var a = is / level * offset;
  var e = cos(a) * distance * level;
  var f = sin(a) * distance * level;
  var cx, cy;
  switch (section) {
    case 1: {
      cx = center.x - e; cy = center.y - f;
      break;
    }
    case 2: {
      cx = center.x - e; cy = center.y + f;
      break;
    }
    case 3: {
      cx = center.x + e; cy = center.y + f;
      break;
    }
    case 4: {
      cx = center.x + e; cy = center.y - f;
      break;
    }
    default: {
      break;
    }
  }
  var r = size * 0.5;
  drawNode(cx, cy, r);
  return [cx, cy];
}

var mock = false;

if (mock) {
  // 1. 水平点 容量5
  drawPoint(0, 1, 1);
  // 1. 对称点
  drawPoint(1, 1, 1);
  drawPoint(1, 2, 1);

  drawPoint(2, 1, 1);
  drawPoint(2, 2, 1);
  
// 层 1/ 2
// 1 3 2 * (n + 1) -1
// 2 5
// 3 7

  // 2. 水平点 容量9 = 2 * （2 * (n + 1) -1) -1
  drawPoint(0, 1, 2); // j = 0
  // 2. 对称点
  drawPoint(1, 1, 2); // j = 1
  drawPoint(1, 2, 2); // j = 2

  drawPoint(2, 1, 2);
  drawPoint(2, 2, 2);

  drawPoint(3, 1, 2);
  drawPoint(3, 2, 2);

  drawPoint(4, 1, 2);
  drawPoint(4, 2, 2);
}


var level = 1;
// 左侧点(1,2象限)
var j = 0; // 每个level内的位置
for (let i = 0; i < max; i++) {
  var offset, section;
  var capacity = 2 * (2 * (level + 1) -1) -1; // 层容量;
  if (j === 0) {
    offset = 0;
    section = 1; // 因为是水平点，画在2象限也可以
  } else {
    offset = Math.floor((j - 1) * 0.5);
    section = (j - 1) % 2 + 1;
  }
  drawPoint(offset, section, level);
  j++;
  if (j === capacity) {
    j = 0;
    level++;
  }
}

var level = 1;
// 右侧点(3,4象限)
var j = 0; // 每个level内的位置
for (let i = 0; i < max; i++) {
  var offset, section;
  var capacity = 2 * (2 * (level + 1) -1) -1; // 层容量;
  if (j === 0) {
    offset = 0;
    section = 1; // 因为是水平点，画在2象限也可以
  } else {
    offset = Math.floor((j - 1) * 0.5);
    section = (j - 1) % 2 + 1;
  }
  if (section === 1) {
    section = 3;
  } else {
    section = 4;
  }
  drawPoint(offset, section, level);
  j++;
  if (j === capacity) {
    j = 0;
    level++;
  }
}