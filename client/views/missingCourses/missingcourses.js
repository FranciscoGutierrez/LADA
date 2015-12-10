/*
* Template life Cycle (Events)
*/
Template.missingcourses.events({
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
  selectedCourses: function() {
    // return Grades.find({"student": Session.get("student"), "status": Session.get("sc-radio")}, {sort: {year: 1}}).fetch();
    return Grades.find({"student": Session.get("student")}, {sort: {year: 1}}).fetch();
  },
  isOn: function() {
    return Session.get("mc-toggle");
  },
  student: function() {
    return Session.get("student");
  },
  settings: function () {
    return {
      rowsPerPage: 5,
      showFilter: false,
      showRowCount: false,
      showNavigationRowsPerPage: false,
      fields: ['course','name', 'grade', 'year']
    };
  }
});

Template.missingcourses.rendered = function () {
  Session.set("mc-toggle",false);
};
