Template.riskwidget.rendered = function(){
  $(function() {
    $(".risk-knob").knob();
  });
  //   /***
  //   * Slider D3 Code
  //   ****/
  //   var width = radius*2;
  //   var x = d3.scale.linear()
  //   .domain([1, 100])
  //   .range([0, width])
  //   .clamp(true);
  //   var dispatch = d3.dispatch("sliderChange");
  //   var slider = d3.select(".risk-slider")
  //   .style("width", width + "px");
  //   var sliderTray = slider.append("div")
  //   .attr("class", "slider-tray");
  //   var sliderHandle = slider.append("div")
  //   .attr("class", "slider-handle");
  //   sliderHandle.append("div")
  //   .attr("class", "slider-handle-icon");
  //   slider.call(d3.behavior.drag()
  //   .on("dragstart", function() {
  //     dispatch.sliderChange(x.invert(d3.mouse(sliderTray.node())[0]));
  //     d3.event.sourceEvent.preventDefault();
  //   })
  //   .on("drag", function() {
  //     dispatch.sliderChange(x.invert(d3.mouse(sliderTray.node())[0]));
  //   }));
  //   dispatch.on("sliderChange.slider", function(value) {
  //     sliderHandle.style("left", x(value) + "px")
  //   });
  //
  //   function updateProgress(progress) {
  //     foreground.attr('d', arc.endAngle(twoPi * progress));
  //     front.attr('d', arc.endAngle(twoPi * progress));
  //     numberText.text(progress.toFixed(2)*100|0);
  //
  //     if(progress > 0.00) {
  //       front.attr('fill','rgb(231, 76, 60)');
  //       wordText.text("VERY HARD");
  //     }
  //     if(progress > 0.20) {
  //       front.attr('fill','rgb(230, 126, 34)');
  //       wordText.text("HARD");
  //     }
  //     if(progress > 0.40) {
  //       front.attr('fill','rgb(241, 196, 15)');
  //       wordText.text("HARDWORK");
  //     }
  //     if(progress > 0.60) {
  //       front.attr('fill','rgb(39, 174, 96)');
  //       wordText.text("EASY");
  //     }
  //     if(progress > 0.80) {
  //       front.attr('fill','rgb(37,160,133)');
  //       wordText.text("VERY EASY");
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
  //
};
