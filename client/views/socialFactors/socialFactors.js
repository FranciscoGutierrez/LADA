/*
* Event Handling:
*/
Template.socialfactors.events({});
Template.socialfactors.helpers({
  sessionCourses: function() {
    var courses = Session.get("courses");
    var sc;
    if(courses) sc = Courses.find({"_id": {$in: courses }}).fetch();
    return sc;
  }
});
Template.socialfactors.rendered = function () {};
