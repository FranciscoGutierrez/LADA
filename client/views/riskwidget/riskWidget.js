Template.riskwidget.rendered = function(){

  setTimeout(function() {

    var colors = {
      'red':    '#E74C3C',
      'orange': '#E67E22',
      'yellow': '#F1C40F',
      'lime':   '#27AE60',
      'green':  '#25A085'
    };

    var parent = d3.select('div#risk-content-viz');

    var color   = colors.green;
    var radius  = parent.node().getBoundingClientRect().width/2;
    var border  = 10;
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

    var g = svg.append('g')
    .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');

    var meter = g.append('g')
    .attr('class', 'progress-meter');

    meter.append('path')
    .attr('class', 'background')
    .attr('fill', '#ECEFF1')
    .attr('fill-opacity', 1)
    .attr('d', arc.endAngle(twoPi))
    .attr('stroke-width', 2);

    var foreground = meter.append('path')
    .attr('class', 'foreground')
    .attr('fill', color)
    .attr('fill-opacity', 1)
    .attr('stroke', color)
    .attr('stroke-width', 5)
    .attr('stroke-opacity', 1)
    .attr('filter', 'url(#blur)')
    .attr('stroke-linecap','round');

    var front = meter.append('path')
    .attr('class', 'foreground')
    .attr('fill', color)
    .attr('fill-opacity', 1)
    .attr('stroke-linecap','round');

    var numberText = meter.append('text')
    .attr('fill', '#424242')
    .attr('text-anchor', 'middle');

    var wordText = meter.append('text')
    .attr('fill', '#9F9F9F')
    .attr('text-anchor', 'middle')
    .attr("y",22)
    .attr("class", "subtext-risk");


    /***
    * Slider D3 Code
    ****/
    var width = radius*2;
    var x = d3.scale.linear()
    .domain([1, 100])
    .range([0, width])
    .clamp(true);
    var dispatch = d3.dispatch("sliderChange");
    var slider = d3.select(".risk-slider")
    .style("width", width + "px");
    var sliderTray = slider.append("div")
    .attr("class", "slider-tray");
    var sliderHandle = slider.append("div")
    .attr("class", "slider-handle");
    sliderHandle.append("div")
    .attr("class", "slider-handle-icon");
    slider.call(d3.behavior.drag()
    .on("dragstart", function() {
      dispatch.sliderChange(x.invert(d3.mouse(sliderTray.node())[0]));
      d3.event.sourceEvent.preventDefault();
    })
    .on("drag", function() {
      dispatch.sliderChange(x.invert(d3.mouse(sliderTray.node())[0]));
    }));
    dispatch.on("sliderChange.slider", function(value) {
      sliderHandle.style("left", x(value) + "px")
    });

    function updateProgress(progress) {
      foreground.attr('d', arc.endAngle(twoPi * progress));
      front.attr('d', arc.endAngle(twoPi * progress));
      numberText.text(progress.toFixed(2)*100|0);

      if(progress > 0.00) {
        front.attr('fill','rgb(231, 76, 60)');
        wordText.text("VERY HARD");
      }
      if(progress > 0.20) {
        front.attr('fill','rgb(230, 126, 34)');
        wordText.text("HARD");
      }
      if(progress > 0.40) {
        front.attr('fill','rgb(241, 196, 15)');
        wordText.text("HARDWORK");
      }
      if(progress > 0.60) {
        front.attr('fill','rgb(39, 174, 96)');
        wordText.text("EASY");
      }
      if(progress > 0.80) {
        front.attr('fill','rgb(37,160,133)');
        wordText.text("VERY EASY");
      }
    }

    var progress = startPercent;

    (function loops() {
      updateProgress(progress);
      if (count > 0) {
        count--;
        progress += step;
        setTimeout(loops, 50);
      }
    })();

  },500);

};
