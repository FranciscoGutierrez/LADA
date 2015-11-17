/*
* Template life Cycle (Helpers)
*/


Template.gradescard.events({
  "click .good-grades": function(event,template){
    if(template.$(".good-grades").attr("checked")){
      template.$(".sg-good").css("display","block");
    } else {
      template.$(".sg-good").css("display","none");
    }
  },
  "click .best-grades": function(event,template){
    if(template.$(".best-grades").attr("checked")){
      template.$(".sg-excellent").css("display","block");
    } else {
      template.$(".sg-excellent").css("display","none");
    }
  },
  "click .bad-grades": function(event,template){
    if(template.$(".bad-grades").attr("checked")){
      template.$(".sg-bad").css("display","block");
    } else {
      template.$(".sg-bad").css("display","none");
    }
  },
  "click .lazy-grades": function(event,template){
    if(template.$(".lazy-grades").attr("checked")){
      template.$(".sg-lazy").css("display","block");
    } else {
      template.$(".sg-lazy").css("display","none");
    }
  },
  "click .regular-grades": function(event,template){
    if(template.$(".regular-grades").attr("checked")){
      template.$(".sg-regular").css("display","block");
    } else {
      template.$(".sg-regular").css("display","none");
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
  }
});
