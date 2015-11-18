Template.qualitywidget.rendered = function(){
  $(function() {
    $(".quality-knob").knob();
  });
  //
  // setTimeout(function() {
  //
  //   var colors = {
  //     'dark':      '#273238',
  //     'bluegrey':  '#475A64',
  //     'grey':      '#637D8B',
  //     'softgrey':  '#92A4AE',
  //     'white':     '#25A085'
  //   };
  //   var parent = d3.select('div#prediction-quality-viz');
  //
  //   var color   = colors.dark;
  //   var radius  = parent.node().getBoundingClientRect().width/2;
  //   var border  = 10;
  //   var padding = 0;
  //   var startPercent = 0;
  //   var endPercent = 0.73;
  //
  //   var twoPi = Math.PI * 2;
  //   var formatPercent = d3.format("s");
  //   var boxSize = (radius + padding) * 2;
  //
  //   var count = Math.abs((endPercent - startPercent) / 0.01);
  //   var step = endPercent < startPercent ? -0.01 : 0.01;
  //
  //   var arc = d3.svg.arc()
  //   .startAngle(0)
  //   .innerRadius(radius)
  //   .outerRadius(radius - border);
  //
  //   var svg = parent.append('svg')
  //   .attr('width', boxSize)
  //   .attr('height', boxSize);
  //
  //   var defs = svg.append('defs');
  //
  //   var filter = defs.append('filter')
  //   .attr('id', 'blur');
  //
  //   var g = svg.append('g')
  //   .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');
  //
  //   var meter = g.append('g')
  //   .attr('class', 'progress-meter');
  //
  //   meter.append('path')
  //   .attr('class', 'background')
  //   .attr('fill', '#ECEFF1')
  //   .attr('fill-opacity', 1)
  //   .attr('d', arc.endAngle(twoPi))
  //   .attr('stroke-width', 2);
  //
  //   var foreground = meter.append('path')
  //   .attr('class', 'foreground')
  //   .attr('fill', color)
  //   .attr('fill-opacity', 1)
  //   .attr('stroke', color)
  //   .attr('stroke-width', 5)
  //   .attr('stroke-opacity', 1)
  //   .attr('filter', 'url(#blur)')
  //   .attr('stroke-linecap','round');
  //
  //   var front = meter.append('path')
  //   .attr('class', 'foreground')
  //   .attr('fill', color)
  //   .attr('fill-opacity', 1)
  //   .attr('stroke-linecap','round');
  //
  //   var numberText = meter.append('text')
  //   .attr('fill', '#424242')
  //   .attr('text-anchor', 'middle');
  //
  //   var wordText = meter.append('text')
  //   .attr('fill', '#9F9F9F')
  //   .attr('text-anchor', 'middle')
  //   .attr("y",22)
  //   .attr("class", "subtext-quality")
  //   .text("CASES");
  //
  //
  //   function updateProgress(progress) {
  //     foreground.attr('d', arc.endAngle(twoPi * progress));
  //     front.attr('d', arc.endAngle(twoPi * progress));
  //     numberText.text(progress.toFixed(2)*100|0);
  //     if(progress > 0.00) {
  //       front.attr('fill','#d9dfe4');
  //     }
  //     if(progress > 0.20) {
  //       front.attr('fill','#92A4AE');
  //     }
  //     if(progress > 0.40) {
  //       front.attr('fill','#637D8B');
  //     }
  //     if(progress > 0.60) {
  //       front.attr('fill','#475A64');
  //     }
  //     if(progress > 0.80) {
  //       front.attr('fill','#273238');
  //     }
  //   }
  //
  //   var progress = startPercent;
  //
  //   (function loops() {
  //     updateProgress(progress);
  //     if (count > 0) {
  //       count--;
  //       progress += step;
  //       setTimeout(loops, 50);
  //     }
  //   })();
  //
  // },1000);
  //
};
