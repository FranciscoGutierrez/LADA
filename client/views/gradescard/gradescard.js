/*
* Template life Cycle (Helpers)
*/

Template.gradescard.events({
  "click .good-grades": function(event,template){
    if(template.$(".good-grades").attr("checked")){
      template.$(".sg-good").attr("class","sg-good animated fadeInLeft");
    } else {
      template.$(".sg-good").attr("class","sg-good animated fadeOutLeft");
    }
  },
  "click .best-grades": function(event,template){
    if(template.$(".best-grades").attr("checked")){
      template.$(".sg-excellent").attr("class","sg-excellent animated fadeInLeft");
    } else {
      template.$(".sg-excellent").attr("class","sg-excellent animated fadeOutLeft");
    }
  },
  "click .bad-grades": function(event,template){
    if(template.$(".bad-grades").attr("checked")){
      template.$(".sg-bad").attr("class","sg-bad animated fadeInLeft");
    } else {
      template.$(".sg-bad").attr("class","sg-bad animated fadeOutLeft");
    }
  },
  "click .lazy-grades": function(event,template){
    if(template.$(".lazy-grades").attr("checked")){
      template.$(".sg-lazy").attr("class","sg-lazy animated fadeInLeft");
    } else {
      template.$(".sg-lazy").attr("class","sg-lazy animated fadeOutLeft");
    }
  },
  "click .regular-grades": function(event,template){
    if(template.$(".regular-grades").attr("checked")){
      template.$(".sg-regular").attr("class","sg-regular animated fadeInLeft");
    } else {
      template.$(".sg-regular").attr("class","sg-regular animated fadeOutLeft");
    }
  }
});

Template.registerHelper('isCourse',function(input){
  return Session.get("sessionCourses");
});

Template.gradescard.helpers({
  excellent: function () {
    var sc   = Stdcres.find({ gp: { $gte : "9"} }).fetch();
    for (i = 0; i < sc.length; i++) {
      sc[i].gp           = "#25a085";
      sc[i].grade        = (((sc[i].grade - 5.7) * 350) / 4.5);
      sc[i].performance  = (sc[i].performance * 197);
    }
    return sc;
  },
  good: function () {
    var sc   = Stdcres.find({ gp: { $gte : "8", $lt : "9" } }).fetch();
    for (i = 0; i < sc.length; i++) {
      sc[i].gp = "#27ae60";
      sc[i].grade       = (((sc[i].grade - 5.7) * 350) / 4.5);
      sc[i].performance = (sc[i].performance * 197);
    }
    return sc;
  },
  regular: function () {
    var sc   = Stdcres.find({ gp: { $gte : "7", $lt : "8" } }).fetch();
    for (i = 0; i < sc.length; i++) {
      sc[i].gp = "#f0c30e";
      sc[i].grade       = (((sc[i].grade - 5.7) * 350) / 4.5);
      sc[i].performance = (sc[i].performance * 197);
    }
    return sc;
  },
  lazy: function () {
    var sc   = Stdcres.find({ gp: { $gte : "6", $lt : "7" } }).fetch();
    for (i = 0; i < sc.length; i++) {
      sc[i].gp = "#e67d22";
      sc[i].grade       = (((sc[i].grade - 5.7) * 350) / 4.5);
      sc[i].performance = (sc[i].performance * 197);
    }
    return sc;
  },
  bad: function () {
    var sc   = Stdcres.find({ gp: { $lt : "6"} }).fetch();
    for (i = 0; i < sc.length; i++) {
      sc[i].gp = "#e74c3c";
      sc[i].grade       = (((sc[i].grade - 5.7) * 350) / 4.5);
      sc[i].performance = (sc[i].performance * 197);
    }
    return sc;
  },
  thisStudent: function() {
    var sc = Students.findOne({});
    sc.gpa         = (((sc.gpa - 5.7) * 350) / 4.5);
    sc.performance = (sc.performance * 197);
    return sc;
  }
});
