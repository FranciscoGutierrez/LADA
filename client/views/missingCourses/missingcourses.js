/*
* Template life Cycle (Events)
*/
Template.missingcourses.events({
  "click .mc-toggle": function(event,template) {
    var grades = {courses: Session.get("courses"), student: Session.get("student")};
    template.$(".mc-progress").fadeIn();
    template.$(".cc-nothing-message").text("Loading dataset...");
    Session.set("showRadioSC", {passed: true, failed: false, other: false});

    Meteor.subscribe("grades", grades, function() {
      Session.set("mc-toggle",template.$(".mc-toggle").attr("checked"));
      template.$(".mc-progress").fadeOut();
      template.$(".cc-nothing-message").text("This Card is Turned Off");
    });
  },
  "click .mc-radio-passed": function(event,template) {
    Session.set("showRadioSC", {passed: true, failed: false, other: false});
    template.$(".mc-radio-failed").attr("checked",false);
  },
  "click .mc-radio-failed": function(event,template) {
    Session.set("showRadioSC", {passed: false, failed: true, other: false});
    template.$(".mc-radio-passed").attr("checked",false);
  },
  "click .sc-course": function(event,template) {
    var parent = $(bvevent.target).parents(".sc-course");
    template.$(".sc-course").css("background","#fafafa");
    parent.css("background","#eeeeee");
  }
});

/*
* Display data from helpers
*/
Template.missingcourses.helpers({
  passedCourses: function() {
    return Grades.find({"student": Session.get("student"), "status": "AP"}, {sort: {year: 1}}).fetch();
  },
  failedCourses: function() {
    return Grades.find({"student": Session.get("student"), "status": "RP"}, {sort: {year: 1}}).fetch();
  },
  showPassed: function() {
    return Session.get("showRadioSC").passed;
  },
  showFailed: function() {
    return Session.get("showRadioSC").failed;
  },
  isOn: function() {
    return Session.get("mc-toggle");
  },
  student: function() {
    return Session.get("student");
  },
  settings: function () {
    return {
      rowsPerPage: 10,
      showFilter: false,
      showRowCount: false,
      showNavigationRowsPerPage: false,
      fields: ['course', 'grade', 'year']
    };
  }
});

Template.missingcourses.rendered = function () {};
