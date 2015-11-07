Template.aspectswidget.rendered = function(){

  setTimeout(function() {

    /***
    * Bar D3 Code
    ****/
    var parent = d3.select('.aspects-content');
    var height  = parent.node().getBoundingClientRect().height*0.75;

    var x = d3.scale.linear()
    .domain([1, 100])
    .range([0, height])
    .clamp(true);

    var dispatch = d3.dispatch("barChange");

    var bar = d3.select(".aspects-bar")
    .style("height", height + "px");

    var barTray = bar.append("div")
    .attr("class", "bar-tray");

    var barHandle = bar.append("div")
    .attr("class", "bar-handle");

    barHandle.append("div")
    .attr("class", "bar-handle-icon");

    bar.call(d3.behavior.drag()
    .on("dragstart", function() {
      dispatch.barChange(x.invert(d3.mouse(barTray.node())[0]));
      d3.event.sourceEvent.preventDefault();
    })
    .on("drag", function() {
      dispatch.barChange(x.invert(d3.mouse(barTray.node())[0]));
    }));

    dispatch.on("barChange.bar", function(value) {
      barHandle.style("left", x(value) + "px")
    });
  },500);
};
