/*
* Template life Cycle (Events)
*/
Template.missingcourses.events({
  "click paper-radio-button": function(event,template) {
    console.log(event.target);
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
