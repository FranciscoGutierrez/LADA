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
  },
  "click .mc-radio-all": function(event,template) {
    template.$(".mc-radio-level").attr("checked",false);
    template.$(".mc-radio-all").attr("checked",true);
    Session.set("studentYear","all");
  },
  "click .mc-radio-level": function(event,template) {
    template.$(".mc-radio-level").attr("checked",false);
    template.$(".mc-radio-all").attr("checked",false);
    template.$(".mc-radio-"+this.number).attr("checked",true);
    Session.set("studentYear",this.year);
  }
});


Template.reactiveTable.onCreated(function () {
  Filter = new ReactiveTable.Filter('group', ['group']);
});

/*
* Display data from helpers
*/
Template.missingcourses.helpers({
  selectedCourses: function() {
    var selected = Session.get("studentdata");
    var year     = Session.get("studentYear");
    var query = [];
    // if(selected == "passed") query = Grades.find({"student": Session.get("student"), "status":"AP"}, {sort: {year: 1}}).fetch();
    // if(selected == "failed") query = Grades.find({"student": Session.get("student"), "status":"RP"}, {sort: {year: 1}}).fetch();
    // if(selected == "redo") query = Grades.find({"student": Session.get("student"), "status":"RP", "status":{$not: "AP"}}, {sort: {year: 1}}).fetch();
    if((selected != "redo") && (year != "all")) query = Grades.find({"student": Session.get("student"), "year": Session.get("studentYear")}, {sort: {year: 1}}).fetch();
    if((selected != "redo") && (year == "all")) query = Grades.find({"student": Session.get("student")}, {sort: {year: 1}}).fetch();
    /* Show me redo's Specific years */
    if((selected == "redo") && (year != "all")) query = Grades.find({"student": Session.get("student"), "year": Session.get("studentYear"), "status":"RP", "status":{$not: "AP"}}, {sort: {year: 1}}).fetch();
    /* Show me redo's All years */
    if((selected == "redo") && (year == "all")) query = Grades.find({"student": Session.get("student"), "status":"RP"}).fetch();
    /**
    **
    **/
    for (i = 0; i < query.length; i++) query[i].grade = parseFloat(query[i].grade);
    return query;
  },
  academicYears: function() {
    var selected = Session.get("studentdata");
    var query = Grades.find({"student": Session.get("student")}, {sort: {year: 1}}).fetch();
    var shit = _.uniq(_.pluck(query,"year"));
    var obj = [];
    for (i = 0; i < shit.length; i++) {
      obj.push({year: shit[i], number: i});
    }
    return obj;
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
