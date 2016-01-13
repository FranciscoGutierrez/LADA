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
    // var grades = {courses: Session.get("courses"), student: Session.get("student")};
    // template.$(".gc-progress").fadeIn();
    // Meteor.subscribe("grades", grades, function() {
    //   Session.set("gc-toggle",template.$(".gc-toggle").attr("checked"));
    //   template.$(".gc-progress").fadeOut();
    //   template.$(".cc-nothing-message").text("This Card is Turned Off");
    // });
    if(template.$(".gc-toggle").attr("checked")){
      Session.set("gc-toggle",true);
      template.$(".card-content-middle").fadeIn();
      template.$(".card-content-bottom").fadeIn();
      template.$(".cc-nothing").fadeOut();
    }
    else {
      Session.set("gc-toggle",false);
      template.$(".card-content-middle").fadeOut();
      template.$(".card-content-bottom").fadeOut();
      template.$(".cc-nothing").fadeIn();
    }
  },
  "change .gc-paper-slider": function(event,template) {
    var n = template.$(".gc-paper-slider").attr("value");
    Session.set("gc-compliance", n);
    if(n==5) template.$(".gradescard-paper").css("opacity","1");
    if(n==4) template.$(".gradescard-paper").css("opacity","0.85");
    if(n==3) template.$(".gradescard-paper").css("opacity","0.75");
    if(n==2) template.$(".gradescard-paper").css("opacity","0.65");
    if(n==1) template.$(".gradescard-paper").css("opacity","0.55");
    if(n==0) template.$(".gradescard-paper").css("opacity","0.45");
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
    if($(event.target).attr("id") === "checkboxContainer") trackName = "grades.bottomcontent.checkbox." + $(event.target).next().text();
    if($(event.target).hasClass("toggle-container")) trackName = "grades.topcontent.togglebutton";
    if($(event.target).attr("id") === "toggleButton") trackName = "grades.topcontent.togglebutton";
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
        "toggle": Session.get("gc-toggle"),
        "x": (event.pageX - $('.gradescard-paper').offset().left) + $(".content").scrollLeft(),
        "y": (event.pageY - $('.gradescard-paper').offset().top)  + $(".content").scrollTop(),
        "timestamp": new Date(),
        "timestampms": new Date().getTime()
      });
    }
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
    var sc   = Grades.find({grade: { $gte : "9.0"}}).fetch();
    for (i = 0; i < sc.length; i++) {
      sc[i].gp           = "#25a085";
      sc[i].grade        = ((sc[i].grade - 5.6) * 350)/4.5;
      sc[i].performance  = 190 - (sc[i].performance * 190);
    }
    return sc;
  },
  good: function () {
    var sc   = Grades.find({ grade: { $gte : "8.0", $lt : "9.0" } }).fetch();
    for (i = 0; i < sc.length; i++) {
      sc[i].gp           = "#27ae60";
      sc[i].grade        = ((sc[i].grade - 5.6) * 350)/4.5;
      sc[i].performance  = 190 - (sc[i].performance * 190);
    }
    return sc;
  },
  regular: function () {
    var sc = Grades.find({ grade: { $gte :"7.0", $lt :"8.0" } }).fetch();
    for (i = 0; i < sc.length; i++) {
      sc[i].gp           = "#f0c30e";
      sc[i].grade        = ((sc[i].grade - 5.6) * 350)/4.5;
      sc[i].performance  = 190 - (sc[i].performance * 190);
    }
    return sc;
  },
  lazy: function () {
    var sc   = Grades.find({ grade: { $gte :"6", $lt :"7" } }).fetch();
    for (i = 0; i < sc.length; i++) {
      sc[i].gp           = "#e67d22";
      sc[i].grade        = ((sc[i].grade - 5.6) * 350)/4.5;
      sc[i].performance  = 190 - (sc[i].performance * 190);
    }
    return sc;
  },
  // bad: function () {
  //   var sc = Grades.find({ grade: { $gte : "1", $lt : "10"} }).fetch();
  //   for (i = 0; i < sc.length; i++) {
  //     sc[i].gp           = "#e74c3c";
  //     sc[i].grade        = (sc[i].grade * 320)/20;
  //     sc[i].performance  = 190 - (sc[i].performance * 190)/20;
  //   }
  //   return sc;
  // },
  thisStudent: function() {
    var sc = Students.findOne({});
    if(sc) {
      if(sc.gpa >= 6) sc.gpa = (((sc.gpa - 5) * 350) / 5);
      if(sc.gpa <  6) sc.gpa = 15
      sc.performance = 190 - (sc.performance * 190);
    }
    return sc;
  },
  isOn: function() {
    // $(".gc-toggle").attr("checked",Session.get("gc-toggle"));
    return Session.get("gc-toggle");
  },
  compliance: function() {
    return Session.get("gc-compliance");
  },
  sessionCourses: function() {
    var courses = Session.get("courses");
    var sc;
    if(courses) sc = Courses.find({"_id": {$in: courses }}).fetch();
    return sc;
  }
});

Template.gradescard.rendered = function () {
  Session.set("gc-toggle", true);
};
