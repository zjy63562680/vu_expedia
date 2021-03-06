

chart("google_related_ranks.json", "orange");

var datearray = [];
var colorrange = [];


function chart(csvpath, color) {

if (color == "blue") {
  colorrange = ["#045A8D", "#2B8CBE", "#74A9CF", "#A6BDDB", "#D0D1E6", "#F1EEF6",
  "#980043", "#DD1C77", "#DF65B0", "#C994C7", "#D4B9DA", "#F1EEF6"];
}
else if (color == "pink") {
  colorrange = ["#980043", "#DD1C77", "#DF65B0", "#C994C7", "#D4B9DA", "#F1EEF6",
  "#980043", "#DD1C77", "#DF65B0", "#C994C7", "#D4B9DA", "#F1EEF6"];
}
else if (color == "orange") {
  colorrange = ["#B30000", "#E34A33", "#FC8D59", "#FDBB84", "#FDD49E", "#FEF0D9",
  "#980043", "#DD1C77", "#DF65B0", "#C994C7", "#D4B9DA", "#F1EEF6"];
}
strokecolor = colorrange[0];

var format = d3.timeFormat("%m/%d/%y");

var margin = {top: 20, right: 40, bottom: 30, left: 30};
var width = document.body.clientWidth - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var tooltip = d3.select(".viz-4")
    .append("div")
    .attr("class", "remove")
    .style("position", "absolute")
    .style("z-index", "20")
    .style("visibility", "hidden")
    .style("top", "30px")
    .style("left", "55px");

var x = d3.scaleTime()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height-10, 0]);

var z = d3.scaleOrdinal()
    .range(colorrange);

var xAxis = d3.axisBottom()
    .scale(x)
    .ticks(d3.Months);

var yAxis = d3.axisLeft()
    .scale(y);

var yAxisr = d3.axisRight()
    .scale(y);

var stack = d3.stack()
    .offset(d3.stackOffsetSilhouette)
    .keys(function(d) { console.log(d); return d; });
    //.x(function(d) { return d.date; })
    //.y(function(d) { return d.value; });

var nest = d3.nest()
    .key(function(d) {
      return d.key; });

var area = d3.area()
    .curve(d3.curveCardinal)
    .x(function(d) { return x(d.date); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });
    
  var vertical = d3.select(".viz-4").append('div').attr('class', 'chart')
        .append("div")
        .attr("class", "remove")
        .style("position", "absolute")
        .style("z-index", "19")
        .style("width", "1px")
        .style("height", "380px")
        .style("top", "10px")
        .style("bottom", "30px")
        .style("left", "0px")
        .style("background", "#fff");

var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var graph = d3.json(csvpath, function(data) {
  var parsed = [];
  var mainVal = [];

  for (var i = 0; i < data.length; i ++) {
    var timeData = JSON.parse(data[i]).default.timelineData;

    parsed.push(timeData);
  }

  for (var j = 0; j < parsed.length; j++) {
    for (var k = 0; k < parsed[j].length; k++) {
    obj = {};
      var date = new Date(1000*parsed[j][k].time);
      obj.value = parsed[j][k].value[0];
      obj.date = date;
      obj.key = 'arr' + j;
      mainVal.push(obj);
    }
  }

  mainVal.forEach(function(d) {
    d.date = d.date;
    d.value = +d.value;
  });

  var layers = stack(nest.entries(mainVal));
console.log(layers);
  x.domain(d3.extent(mainVal, function(d) {
    return d.date; }));
  y.domain([0, d3.max(mainVal, function(d) { return d.y0 + d.y; })]);

  svg.selectAll(".layer")
      .data(layers)
    .enter().append("path")
      .attr("class", "layer")
      .attr("d", function(d) { return console.log(d); area(d.values); })
      .style("fill", function(d, i) { return z(i); });


  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + width + ", 0)")
      .call(yAxisr);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  svg.selectAll(".layer")
    .attr("opacity", 1)
    .on("mouseover", function(d, i) {
      svg.selectAll(".layer").transition()
      .duration(250)
      .attr("opacity", function(d, j) {
        return j != i ? 0.6 : 1;
    })})

    .on("mousemove", function(d, i) {
      mousex = d3.mouse(this);
      mousex = mousex[0];
      var invertedx = x.invert(mousex);
      invertedx = invertedx.getMonth() + invertedx.getDate();
      var selected = (d.values);
      for (var k = 0; k < selected.length; k++) {
        datearray[k] = selected[k].date
        datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
      }

      mousedate = datearray.indexOf(invertedx);
      pro = d.values[mousedate].value;

      d3.select(this)
      .classed("hover", true)
      .attr("stroke", strokecolor)
      .attr("stroke-width", "0.5px"), 
      tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "visible");
      
    })
    .on("mouseout", function(d, i) {
     svg.selectAll(".layer")
      .transition()
      .duration(250)
      .attr("opacity", "1");
      d3.select(this)
      .classed("hover", false)
      .attr("stroke-width", "0px"), tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "hidden");
  })

  d3.select(".chart")
      .on("mousemove", function(){  
         mousex = d3.mouse(this);
         mousex = mousex[0] + 5;
         vertical.style("left", mousex + "px" )})
      .on("mouseover", function(){  
         mousex = d3.mouse(this);
         mousex = mousex[0] + 5;
         vertical.style("left", mousex + "px")});
});
}