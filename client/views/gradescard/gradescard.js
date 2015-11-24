/*
 * Event Handling:
 */

Template.gradescard.events({
  "click .good-grades": function(event,template){
    var id = template.$(".sg-good").attr("class").split(" ")[0];
    if(template.$(".good-grades").attr("checked")){
      template.$(".sg-good").attr("class",id + " sg-good animated fadeInLeft");
    } else {
      template.$(".sg-good").attr("class",id + " sg-good animated fadeOutLeft");
    }
  },
  "click .best-grades": function(event,template){
    var id = template.$(".sg-excellent").attr('class').split(' ')[0];
    if(template.$(".best-grades").attr("checked")){
      template.$(".sg-excellent").attr("class",id + " sg-excellent animated fadeInLeft");
    } else {
      template.$(".sg-excellent").attr("class",id + " sg-excellent animated fadeOutLeft");
    }
  },
  "click .bad-grades": function(event,template){
    var id = template.$(".sg-bad").attr('class').split(' ')[0];
    if(template.$(".bad-grades").attr("checked")){
      template.$(".sg-bad").attr("class",id + " sg-bad animated fadeInLeft");
    } else {
      template.$(".sg-bad").attr("class",id + " sg-bad animated fadeOutLeft");
    }
  },
  "click .lazy-grades": function(event,template){
    var id = template.$(".sg-lazy").attr('class').split(' ')[0];
    if(template.$(".lazy-grades").attr("checked")){
      template.$(".sg-lazy").attr("class",id + " sg-lazy animated fadeInLeft");
    } else {
      template.$(".sg-lazy").attr("class",id + " sg-lazy animated fadeOutLeft");
    }
  },
  "click .regular-grades": function(event,template){
    var id = template.$(".sg-regular").attr('class').split(' ')[0];
    if(template.$(".regular-grades").attr("checked")){
      template.$(".sg-regular").attr("class",id + " sg-regular animated fadeInLeft");
    } else {
      template.$(".sg-regular").attr("class",id + " sg-regular animated fadeOutLeft");
    }
  },
  "click .student-grades": function(event,template){
    if(template.$(".student-grades").attr("checked")){
      template.$(".sg-this").attr("class","sg-this animated fadeIn");
    } else {
      template.$(".sg-this").attr("class","sg-this animated fadeOut");
    }
  },
  "click .gc-toggle": function(event,template) {
    var time = 300;
    if(template.$(".gc-toggle").attr("checked")){
      Session.set("gc-toggle",true);
      // template.$(".gc-card-content").fadeOut(time,function(){
      //   template.$(".gc-card-content").fadeIn(time);
      // });
    } else {
      Session.set("gc-toggle",false);
      // template.$(".gc-card-content").fadeOut(function(){
      //   template.$(".gc-card-content").fadeIn(time);
      // });
    }
  },
  "change .gc-paper-slider": function(event,template) {
    var n = template.$(".gc-paper-slider").attr("value");
    Session.set("gc-compliance", n);
  }
});

/*
 *  Check for courses
 */
Template.registerHelper('isCourse',function(input){
  return Session.get("courses");
});

/*
 * Render Data from helpers
 */
Template.gradescard.helpers({
  excellent: function () {
    var sc   = Grades.find({ gp: { $gte : "9"} }).fetch();
    for (i = 0; i < sc.length; i++) {
      sc[i].gp           = "#25a085";
      sc[i].grade        = (((sc[i].grade - 5.7) * 350) / 4.5);
      sc[i].performance  = ((1.0 - sc[i].performance) * 190) + 10;
    }
    return sc;
  },
  good: function () {
    var sc   = Grades.find({ gp: { $gte : "8", $lt : "9" } }).fetch();
    for (i = 0; i < sc.length; i++) {
      sc[i].gp = "#27ae60";
      sc[i].grade       = (((sc[i].grade - 5.7) * 350) / 4.5);
      sc[i].performance  = ((1.0 - sc[i].performance) * 190) + 10;
    }
    return sc;
  },
  regular: function () {
    var sc   = Grades.find({ gp: { $gte : "7", $lt : "8" } }).fetch();
    for (i = 0; i < sc.length; i++) {
      sc[i].gp = "#f0c30e";
      sc[i].grade       = (((sc[i].grade - 5.7) * 350) / 4.5);
      sc[i].performance  = ((1.0 - sc[i].performance) * 190) + 10;
    }
    return sc;
  },
  lazy: function () {
    var sc   = Grades.find({ gp: { $gte : "6", $lt : "7" } }).fetch();
    for (i = 0; i < sc.length; i++) {
      sc[i].gp = "#e67d22";
      sc[i].grade       = (((sc[i].grade - 5.7) * 350) / 4.5);
      sc[i].performance  = ((1.0 - sc[i].performance) * 190) + 10;
    }
    return sc;
  },
  bad: function () {
    var sc   = Grades.find({ gp: { $lt : "6"} }).fetch();
    for (i = 0; i < sc.length; i++) {
      sc[i].gp = "#e74c3c";
      sc[i].grade       = (((sc[i].grade - 5.7) * 350) / 4.5);
      sc[i].performance  = ((1.0 - sc[i].performance) * 190) + 10;
    }
    return sc;
  },
  thisStudent: function() {
    var sc = Students.findOne({});
    if(sc) {
      sc.gpa = (((sc.gpa - 5.7) * 350) / 4.5);
      sc.performance  = ((1.0 - sc.performance) * 190) + 10;
    }
    return sc;
  },
  isOn: function() {
    return Session.get("gc-toggle");
  },
  compliance: function() {
    return Session.get("gc-compliance");
  }
});
