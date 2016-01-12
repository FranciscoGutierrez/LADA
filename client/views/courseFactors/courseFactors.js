Template.coursefactors.events({
  "click .cf-checkbox": function(event,template){
    CoursesFactorsChart.datasets[0].points[0].value = 0;
    CoursesFactorsChart.datasets[0].points[1].value = 0;
    CoursesFactorsChart.datasets[0].points[2].value = 0;
    CoursesFactorsChart.datasets[0].points[3].value = 0;
    CoursesFactorsChart.datasets[0].points[4].value = 0;
    CoursesFactorsChart.update();

    $('.cf-checkbox').each(function() {
      if($(this).attr("checked")) {
        CoursesFactorsChart.datasets[0].points[0].value += parseInt((Courses.findOne({"_id": $(this).val()}).factor1*100)/5);
        CoursesFactorsChart.datasets[0].points[1].value += parseInt((Courses.findOne({"_id": $(this).val()}).factor2*100)/5);
        CoursesFactorsChart.datasets[0].points[2].value += parseInt((Courses.findOne({"_id": $(this).val()}).factor3*100)/5);
        CoursesFactorsChart.datasets[0].points[3].value += parseInt((Courses.findOne({"_id": $(this).val()}).factor4*100)/5);
        CoursesFactorsChart.datasets[0].points[4].value += parseInt((Courses.findOne({"_id": $(this).val()}).factor5*100)/5);
      }
    });
    CoursesFactorsChart.update();
  },
  "click .cf-toggle": function(event,template) {
    if(template.$(".cf-toggle").attr("checked")){
      Session.set("cf-toggle",true);
      template.$(".card-content-middle").fadeIn();
      template.$(".card-subtitle").fadeIn();
      template.$(".card-content-bottom").fadeIn();
      template.$(".control-title").fadeIn(300, function(){
        template.$(".cf-nothing").fadeOut();
      });
    }
    else {
      Session.set("cf-toggle",false);
      template.$(".card-content-middle").fadeOut();
      template.$(".card-subtitle").fadeOut();
      template.$(".card-content-bottom").fadeOut();
      template.$(".control-title").fadeIn(300, function(){
        template.$(".cf-nothing").css("display","flex");
      });

    }
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
    var trackName = $(event.target).attr('track');
    if($(event.target).attr("id") === "checkboxContainer") trackName = "courseskill.bottomcontent.checkbox." + $(event.target).next().text();
    if($(event.target).hasClass("toggle-container"))  trackName = "courseskill.topcontent.togglebutton";
    if($(event.target).attr("id") === "toggleButton") trackName = "courseskill.topcontent.togglebutton";
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
        "toggle": Session.get("cf-toggle"),
        "x": (event.pageX - $('.courseskill-paper').offset().left) + $(".content").scrollLeft(),
        "y": (event.pageY - $('.courseskill-paper').offset().top)  + $(".content").scrollTop(),
        "timestamp": new Date(),
        "timestampms": new Date().getTime()
      });
    }
  }
});

Template.coursefactors.helpers({
  sessionCourses: function() {
    var courses = Session.get("courses");
    var sc = [];
    if(courses) sc = Courses.find({"_id": {$in: courses }}).fetch();

    $('.cf-checkbox').each(function() {
      if($(this).attr("checked")) {
        CoursesFactorsChart.datasets[0].points[0].value += parseInt((Courses.findOne({"_id": $(this).val()}).factor1*100)/5);
        CoursesFactorsChart.datasets[0].points[1].value += parseInt((Courses.findOne({"_id": $(this).val()}).factor2*100)/5);
        CoursesFactorsChart.datasets[0].points[2].value += parseInt((Courses.findOne({"_id": $(this).val()}).factor3*100)/5);
        CoursesFactorsChart.datasets[0].points[3].value += parseInt((Courses.findOne({"_id": $(this).val()}).factor4*100)/5);
        CoursesFactorsChart.datasets[0].points[4].value += parseInt((Courses.findOne({"_id": $(this).val()}).factor5*100)/5);
      }
    });
    if(CoursesFactorsChart) CoursesFactorsChart.update();
    return sc;
  }
});

Template.coursefactors.rendered = function(){
  setTimeout(function() {
    var courses = Session.get("courses");
    var sc = [];
    if(courses) sc = Courses.find({"_id": {$in: courses }}).fetch();
    var obj = [0,0,0,0,0];
    for (i=0; i< sc.length; i++){
      obj[0] += parseInt((sc[i].factor1*100)/5);
      obj[1] += parseInt((sc[i].factor2*100)/5);
      obj[2] += parseInt((sc[i].factor3*100)/5);
      obj[3] += parseInt((sc[i].factor4*100)/5);
      obj[4] += parseInt((sc[i].factor5*100)/5);
    }
    var ctx = document.getElementById("cf-chart").getContext("2d");
    var data = {
      labels: ["Fundamentos", "Tópicos Avanzados", "Programación", "Humanidades", "Matemáticas"],
      datasets: [
        {
          label: "Éste Estudiante",
          fillColor:  "rgba(179,93,126,0.5)",
          strokeColor:"rgba(179,93,126,1.0)",
          pointColor: "rgba(179,93,126,1.0)",
          pointStrokeColor:  "#fff",
          pointHighlightFill:"#fff",
          pointHighlightStroke:"rgba(179,93,126,1.0)",
          data: obj
        }]
      };
      CoursesFactorsChart = new Chart(ctx).Radar(data, {
        responsive: false,
        pointDotRadius: 3,
        pointLabelFontSize: 12,
        animation: true
      });
    },3500);
  };
