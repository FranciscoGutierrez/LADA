/*
* Template life Cycle (Events)
*/
Template.missingcourses.events({
  "click .mc-all": function(event,template) {
    Session.set("studentdata","all");
  },
  "click .mc-passed": function(event,template) {
    Session.set("studentdata","passed");
  },
  "click .mc-failed": function(event,template) {
    Session.set("studentdata","failed");
  },
  "click .mc-redo": function(event,template) {
    Session.set("studentdata","redo");
  }
});

/*
* Display data from helpers
*/
Template.missingcourses.helpers({
  selectedCourses: function() {
    var selected = Session.get("studentdata");
    var query = Grades.find({"student": Session.get("student")}, {sort: {year: 1}}).fetch();
    // if(selected == "passed") query = Grades.find({"student": Session.get("student"), "status":"AP"}, {sort: {year: 1}}).fetch();
    // if(selected == "failed") query = Grades.find({"student": Session.get("student"), "status":"RP"}, {sort: {year: 1}}).fetch();
    if(selected == "redo") query = Grades.find({"student": Session.get("student"), "status":"RP", "status":{$not: "AP"}}, {sort: {year: 1}}).fetch();
    for (i = 0; i < query.length; i++) query[i].grade = parseFloat(query[i].grade);
    return query;
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
      fields: ['course','name', 'grade', 'year', 'status']
    };
  }
});

Template.missingcourses.rendered = function () {
  Session.set("mc-toggle",false);
};
