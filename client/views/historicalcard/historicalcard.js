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
      Session.set("data-from","1999");
      Session.set("data-to","2012");
      setTimeout(function() {
        $("#selector").ionRangeSlider({
          type: 'double ',
          min: 1999,
          max: 2012,
          step: 1,
          grid: true,
          grid_snap: true,
          onChange: function(data) {
            Session.set("data-from",data.from);
            Session.set("data-to",data.to);
            Session.set("loading",true);
            $(".risk-content-viz").css("opacity",0.25);
            $(".quality-content-viz").css("opacity",0.25);
          }
        });

        var data = [
          { x: 0,  y: 3535},
          { x: 1,  y: 3863},
          { x: 2,  y: 4921},
          { x: 3,  y: 5847},
          { x: 4,  y: 6232},
          { x: 5,  y: 6770},
          { x: 6,  y: 7420},
          { x: 7,  y: 7469},
          { x: 8,  y: 7403},
          { x: 9,  y: 6014},
          { x: 10, y: 5434},
          { x: 11, y: 5285},
          { x: 12, y: 4841}
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
      template.$(".historicalcard-paper").css("opacity","1");
      Session.set("data-from","1999");
      Session.set("data-to","2012");
    }
  },
  "change .hc-paper-slider": function(event,template) {
    var n = template.$(".hc-paper-slider").attr("value");
    Session.set("hc-compliance", n);
    // Websocket.send('{"reuqestId": "5645f7f7ef0bde57344c84de"}');
    if(n==5) template.$(".historicalcard-paper").css("opacity","1");
    if(n==4) template.$(".historicalcard-paper").css("opacity","0.85");
    if(n==3) template.$(".historicalcard-paper").css("opacity","0.75");
    if(n==2) template.$(".historicalcard-paper").css("opacity","0.65");
    if(n==1) template.$(".historicalcard-paper").css("opacity","0.55");
    if(n==0) template.$(".historicalcard-paper").css("opacity","0.45");
  },
  "click .card-info": function (event,template) {
    template.$(".help-info").fadeIn();
  },
  "click .close-info": function (event,template) {
    template.$(".help-info").fadeOut();
  },
  "click .help-info": function (event,template) {
    template.$(".help-info").fadeOut();
  },
  "click": function(event,template){
    /*** Interaction Recorder ***/
    var self = this;
    var myEvent = event;
    var trackName = "";
    if($(event.target).attr("track")) trackName = $(event.target).attr('track');
    if($(event.target).hasClass("irs")) trackName = "historicalrecords.middlecontent.slider";
    if($(event.target).hasClass("area")) trackName = "historicalrecords.middlecontent.chart";
    if($(event.target).hasClass("irs-grid-pol")) trackName = "historicalrecords.middlecontent.slider";
    if($(event.target).hasClass("irs-grid-text")) trackName = "historicalrecords.middlecontent.slider";
    if($(event.target).hasClass("irs-with-grid")) trackName = "historicalrecords.middlecontent.slider";
    if($(event.target).hasClass("irs-bar")) trackName = "historicalrecords.middlecontent.slider";
    if($(event.target).hasClass("irs-line-mid")) trackName = "historicalrecords.middlecontent.slider";
    if($(event.target).hasClass("from")) trackName = "historicalrecords.middlecontent.sliderfrom";
    if($(event.target).hasClass("to"))   trackName = "historicalrecords.middlecontent.sliderto";
    if($(event.target).hasClass("toggle-container")) trackName = "historicalrecords.topcontent.togglebutton";
    if($(event.target).attr("id") === "toggleButton") trackName = "historicalrecords.topcontent.togglebutton";
    console.log(trackName);
    if(Session.get("user-session")) {
      Actions.insert({
        "sessionId": Meteor.connection._lastSessionId,
        "user": Session.get("user-name"),
        "profile": Session.get("user-profile"),
        "prediction": Session.get("riskValue"),
        "uncertainty":Session.get("qualityValue"),
        "courses":Session.get("courses"),
        "load":Session.get("load"),
        "template": template.view.name,
        "target": trackName,
        "extended": false,
        "toggle": Session.get("hc-toggle"),
        "x": (event.pageX - $('.historicalcard-paper').offset().left) + $(".content").scrollLeft(),
        "y": (event.pageY - $('.historicalcard-paper').offset().top)  + $(".content").scrollTop(),
        "timestamp": new Date(),
        "timestampms": new Date().getTime()
      });
    }
  }
});

Template.historicalcard.helpers({
  isOn: function() {
    return Session.get("hc-toggle");
  },
  compliance: function() {
    return Session.get("hc-compliance");
  },
  students: function () {
    var result = 0;
    var x = Historial.find({}).fetch();
    for (i=0; i < x.length; i++) {
      if ((Session.get("data-from") <= parseInt(x[i].year)) && (Session.get("data-to") >= parseInt(x[i].year)))
      result = parseInt(x[i].students) + result;
    }
    return result.toLocaleString();
  },
  courses: function () {
    var result = 0;
    var x = Historial.find({}).fetch();
    for (i=0; i < x.length; i++) {
      if ((Session.get("data-from") <= parseInt(x[i].year)) && (Session.get("data-to") >= parseInt(x[i].year)))
      result = parseInt(x[i].courses) + result;
    }
    return result.toLocaleString();
  },
  from: function () {
    return Session.get("data-from");
  },
  to: function () {
    return Session.get("data-to");
  },
  loading: function(){
    return Session.get("loading");
  }
});

Template.historicalcard.rendered = function () {
  Session.set("hc-toggle", true);
  setTimeout(function() {
    $("#selector").ionRangeSlider({
      type: 'double ',
      min: 1999,
      max: 2012,
      step: 1,
      grid: true,
      grid_snap: true,
      onChange: function(data) {
        Session.set("loading",true);
        $(".risk-content-viz").css("opacity",0.25);
        $(".quality-content-viz").css("opacity",0.25);
        Session.set("data-from",data.from);
        Session.set("data-to",data.to);
        var courses = Session.get('courses');
        var student = Session.get('student');
        if(Websocket.readyState == 1) {
          var string = "";
          if(courses) {
            for (var i=0; i<courses.length-1; i++){ string += '{"id": "'+courses[i]+'"},'; }
            string += '{"id": "'+courses[courses.length-1]+'"}';
            request = '{"requestId": "'+ Meteor.connection._lastSessionId +'",'+
            '"source": "espol",'+
            '"student": [{"id": '+ student +',"gpa": 7.0793,'+
            '"performance": 0.6}],'+
            '"courses": ['+ string + '],'+
            '"data": [{"from": '+ Session.get("data-from") +',"to": '+ Session.get("data-to") +','+
            '"program": true,'+
            '"sylabus": true,'+
            '"evaluation": false,'+
            '"instructors": true}]}';
            Websocket.send(request);
            Session.set("loading",true);
            $(".risk-content-viz").css("opacity",0.25);
            $(".quality-content-viz").css("opacity",0.25);
          }
        } else if (Websocket.readyState == 3) {
          // $("#paperToast").attr("text","Lost connection...");
          // document.querySelector('#paperToast').show();
        }
      }
    });

    var data = [
      { x: 0,  y: 3535},
      { x: 1,  y: 3863},
      { x: 2,  y: 4921},
      { x: 3,  y: 5847},
      { x: 4,  y: 6232},
      { x: 5,  y: 6770},
      { x: 6,  y: 7420},
      { x: 7,  y: 7469},
      { x: 8,  y: 7403},
      { x: 9,  y: 6014},
      { x: 10, y: 5434},
      { x: 11, y: 5285},
      { x: 12, y: 4841}
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
    .attr("class", "animated flipInX")
    .attr("track", "historicalrecords.middlecontent.chart");

    svg.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", area)
    .attr("track", "historicalrecords.middlecontent.chart");

  },250);
};
