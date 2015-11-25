Template.historicalcard.events({
  "click .settings-icon": function (event,template) {
    if(!template.$(".card-settings-icon").hasClass("opened")) {
      template.$(".card-settings-icon").addClass("opened");
      template.$(".card-content").animate({"min-width":"+=350px"},"slow", function(){
        template.$(".card-settings-icon > iron-icon").fadeOut(300, function(){
          template.$(".card-settings-icon > iron-icon").attr("icon","icons:close").fadeIn(300);
        });
      });
    } else {
      template.$(".card-settings-icon").removeClass("opened");
      template.$(".card-content").animate({"min-width":"-=350px"},"slow ", function(){
        template.$(".card-settings-icon > iron-icon").fadeOut(300, function(){
          template.$(".card-settings-icon > iron-icon").attr("icon","icons:settings").fadeIn(300);
        });
      });
    }
  },
  "click .hc-toggle": function(event,template) {
    if(template.$(".hc-toggle").attr("checked")){
      Session.set("hc-toggle",true);
      setTimeout(function() {
        $("#selector").ionRangeSlider({
          type: 'double ',
          min: 1999,
          max: 2013,
          step: 1,
          grid: true,
          grid_snap: true
        });

        var data = [
          { x: 0,  y: 30, },
          { x: 1,  y: 35, },
          { x: 2,  y: 35, },
          { x: 3,  y: 40, },
          { x: 4,  y: 40, },
          { x: 5,  y: 35, },
          { x: 6,  y: 35, },
          { x: 7,  y: 30, },
          { x: 8,  y: 30, },
          { x: 9,  y: 35, },
          { x: 10, y: 35, },
          { x: 11, y: 40, },
          { x: 12, y: 40, },
          { x: 13, y: 40, },
          { x: 14, y: 40, },
          { x: 15, y: 40, },
        ];

        var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width  = 335,
        height = 170;

        var x = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { return d.x; })])
        .range([0, width]);

        var y = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { return d.y; })])
        .range([height, 0]);

        var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

        var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

        var area = d3.svg.area()
        .x(function(d) { return x(d.x); })
        .y0(height)
        .y1(function(d) { return y(d.y); });

        var svg = d3.select("svg#area")
        .attr("width",width)
        .attr("height",height)
        .insert("g")
        .attr("transform", "translate(0,0)")
        .attr("class", "animated flipInX");

        svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area);

      },250);
    } else {
      Session.set("hc-toggle",false);
    }
  },
  "change .hc-paper-slider": function(event,template) {
    var n = template.$(".hc-paper-slider").attr("value");
    Session.set("hc-compliance", n);
  },
  "click" : function(event, template) {
    var slider = $("#selector").data("ionRangeSlider");
    if (slider) {
      // console.log(slider.result.from);
      // console.log(slider.result.to);
    }
  }
});

Template.historicalcard.helpers({
  isOn: function() {
    return Session.get("hc-toggle");
  },
  compliance: function() {
    return Session.get("hc-compliance");
  }
});

Template.historicalcard.rendered = function () {
  setTimeout(function() {
    $("#selector").ionRangeSlider({
      type: 'double ',
      min: 1999,
      max: 2013,
      step: 1,
      grid: true,
      grid_snap: true
    });

    var data = [
      { x: 0,  y: 30, },
      { x: 1,  y: 35, },
      { x: 2,  y: 35, },
      { x: 3,  y: 40, },
      { x: 4,  y: 40, },
      { x: 5,  y: 35, },
      { x: 6,  y: 35, },
      { x: 7,  y: 30, },
      { x: 8,  y: 30, },
      { x: 9,  y: 35, },
      { x: 10, y: 35, },
      { x: 11, y: 40, },
      { x: 12, y: 40, },
      { x: 13, y: 40, },
      { x: 14, y: 40, },
      { x: 15, y: 40, },
    ];

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width  = 335,
    height = 170;

    var x = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.x; })])
    .range([0, width]);

    var y = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.y; })])
    .range([height, 0]);

    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

    var area = d3.svg.area()
    .x(function(d) { return x(d.x); })
    .y0(height)
    .y1(function(d) { return y(d.y); });

    var svg = d3.select("svg#area")
    .attr("width",width)
    .attr("height",height)
    .insert("g")
    .attr("transform", "translate(0,0)")
    .attr("class", "animated flipInX");

    svg.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", area);

  },250);
};
