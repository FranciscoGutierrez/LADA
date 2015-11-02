Template.riskWidget.rendered = function(){

  var colors = {
    'pink': '#607D8B',
    'yellow': '#f0ff08',
    'green': '#47e495'
  };
  var parent = d3.select('div#contentd3');

  var color   = colors.pink;
  var radius  = parent.node().getBoundingClientRect().width/2;
  var border  = 5;
  var padding = 0;
  var startPercent = 0;
  var endPercent = 0.85;

  var twoPi = Math.PI * 2;
  var formatPercent = d3.format("s");
  var boxSize = (radius + padding) * 2;

  var count = Math.abs((endPercent - startPercent) / 0.01);
  var step = endPercent < startPercent ? -0.01 : 0.01;

  var arc = d3.svg.arc()
  .startAngle(0)
  .innerRadius(radius)
  .outerRadius(radius - border);

  var svg = parent.append('svg')
  .attr('width', boxSize)
  .attr('height', boxSize);

  var defs = svg.append('defs');

  var filter = defs.append('filter')
  .attr('id', 'blur');

  /*
  filter.append('feGaussianBlur')
  .attr('in', 'SourceGraphic')
  .attr('stdDeviation', '7');
  */

  var g = svg.append('g')
  .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');

  var meter = g.append('g')
  .attr('class', 'progress-meter');

  meter.append('path')
  .attr('class', 'background')
  .attr('fill', '#ccc')
  .attr('fill-opacity', 0.5)
  .attr('d', arc.endAngle(twoPi));

  var foreground = meter.append('path')
  .attr('class', 'foreground')
  .attr('fill', color)
  .attr('fill-opacity', 1)
  .attr('stroke', color)
  .attr('stroke-width', 5)
  .attr('stroke-opacity', 1)
  .attr('filter', 'url(#blur)');

  var front = meter.append('path')
  .attr('class', 'foreground')
  .attr('fill', color)
  .attr('fill-opacity', 1);

  var numberText = meter.append('text')
  .attr('fill', '#424242')
  .attr('text-anchor', 'middle');
  /*.attr('dy', '.35em');*/

  function updateProgress(progress) {
    foreground.attr('d', arc.endAngle(twoPi * progress));
    front.attr('d', arc.endAngle(twoPi * progress));
    numberText.text(progress.toFixed(2)*100|0);
  }

  var progress = startPercent;

  (function loops() {
    updateProgress(progress);

    if (count > 0) {
      count--;
      progress += step;
      setTimeout(loops, 10);
    }
  })();
};
