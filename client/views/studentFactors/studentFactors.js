/*
* Event Handling:
*/
Template.studentfactors.events({
  "click .sf-student": function(event,template){
    if(template.$(".sf-student").attr("checked")){
      StudentFactorsChart.datasets[1].points[0].value = Students.findOne({_id:Session.get("student")}).factor1*100;
      StudentFactorsChart.datasets[1].points[1].value = Students.findOne({_id:Session.get("student")}).factor2*100;
      StudentFactorsChart.datasets[1].points[2].value = Students.findOne({_id:Session.get("student")}).factor3*100;
      StudentFactorsChart.datasets[1].points[3].value = Students.findOne({_id:Session.get("student")}).factor4*100;
      StudentFactorsChart.datasets[1].points[4].value = Students.findOne({_id:Session.get("student")}).factor5*100;
      StudentFactorsChart.update();
    } else {
      StudentFactorsChart.datasets[1].points[0].value = 0;
      StudentFactorsChart.datasets[1].points[1].value = 0;
      StudentFactorsChart.datasets[1].points[2].value = 0;
      StudentFactorsChart.datasets[1].points[3].value = 0;
      StudentFactorsChart.datasets[1].points[4].value = 0;
      StudentFactorsChart.update();
    }
  },
  "click .sf-similar": function(event,template){
    if(template.$(".sf-similar").attr("checked")){
      StudentFactorsChart.datasets[0].points[0].value = _.random(40, 70);
      StudentFactorsChart.datasets[0].points[1].value = _.random(30, 70);
      StudentFactorsChart.datasets[0].points[2].value = _.random(40, 80);
      StudentFactorsChart.datasets[0].points[3].value = _.random(20, 80);
      StudentFactorsChart.datasets[0].points[4].value = _.random(10, 70);
      StudentFactorsChart.update();
    } else {
      StudentFactorsChart.datasets[0].points[0].value = 0;
      StudentFactorsChart.datasets[0].points[1].value = 0;
      StudentFactorsChart.datasets[0].points[2].value = 0;
      StudentFactorsChart.datasets[0].points[3].value = 0;
      StudentFactorsChart.datasets[0].points[4].value = 0;
      StudentFactorsChart.update();
    }
  },
  "click .sf-toggle": function(event,template) {
    if(template.$(".sf-toggle").attr("checked")){
      Session.set("sf-toggle",true);
      template.$(".card-content-middle").fadeIn();
      template.$(".card-subtitle").fadeIn();
      template.$(".card-content-bottom").fadeIn();
      template.$(".control-title").fadeIn(300, function(){
        template.$(".cf-nothing").fadeOut();
      });
    }
    else {
      Session.set("sf-toggle",false);
      template.$(".card-content-middle").fadeOut();
      template.$(".card-subtitle").fadeOut();
      template.$(".card-content-bottom").fadeOut();
      template.$(".control-title").fadeIn(300, function(){
        template.$(".cf-nothing").css("display","flex");
      });
    }
  },
  "click .card-info": function (event,template) {
    template.$(".help-info").css("display","flex");
  },
  "click .close-info": function (event,template) {
    template.$(".help-info").fadeOut("fast");
  },
  "click .help-info": function (event,template) {
    template.$(".help-info").fadeOut("fast");
  },
  "click": function(event,template){
    /*** Interaction Recorder ***/
    var self = this;
    var myEvent = event;
    Recorder.insert({
      "user": Meteor.connection._lastSessionId,
      "template": template.view.name,
      "target": $(event.target).first().attr('class'),
      "screenX": event.screenX,
      "screenY": event.screenY,
      "offsetX": event.offsetX,
      "offsetY": event.offsetY,
      "timestamp": new Date()
    });
  }
});

Template.studentfactors.helpers({
});

Template.studentfactors.rendered = function () {
  setTimeout(function() {
    var ctx = document.getElementById("sf-chart").getContext("2d");
    var data = {
      labels: ["Fundamentos", "Tópicos Avanzados", "Programación", "Humanidades", "Matemáticas"],
      datasets: [{
        label: "Similar Students",
        fillColor:  "rgba(207, 207, 207,0.5)",
        strokeColor:"rgba(207, 207, 207,1.0)",
        pointColor: "rgba(207, 207, 207,1.0)",
        pointStrokeColor:  "#fff",
        pointHighlightFill:"#fff",
        pointHighlightStroke:"rgba(207, 207, 207,1.0)",
        data: [
          _.random(40, 70),
          _.random(30, 80),
          _.random(40, 90),
          _.random(30, 70),
          _.random(20, 70)
        ]},
        {
          label: "This Student",
          fillColor:  "rgba(179,93,126,0.5)",
          strokeColor:"rgba(179,93,126,1.0)",
          pointColor: "rgba(179,93,126,1.0)",
          pointStrokeColor:  "#fff",
          pointHighlightFill:"#fff",
          pointHighlightStroke:"rgba(179,93,126,1.0)",
          data: [
            Students.findOne({_id:Session.get("student")}).factor1*100,
            Students.findOne({_id:Session.get("student")}).factor2*100,
            Students.findOne({_id:Session.get("student")}).factor3*100,
            Students.findOne({_id:Session.get("student")}).factor4*100,
            Students.findOne({_id:Session.get("student")}).factor5*100
          ]}
        ]
      };
      StudentFactorsChart = new Chart(ctx).Radar(data, {
        responsive: false,
        pointDotRadius: 3,
        pointLabelFontSize: 12,
        animation: true
      });
    },3500);
  };
