/*
 * Server-side, Home of >publish< stuff...
 */


Students = new Meteor.Collection('students');
Courses  = new Meteor.Collection('courses');
Grades   = new Meteor.Collection('studentscourses');

Meteor.publish('grades', function(who){
  return Grades.find({$or: [{course: {$in: who.courses}}, {student: who.student}]});
});

Meteor.publish("this_student", function (who) {
  return Students.find({ "_id": who+""});
});

Meteor.publish("this_courses", function (who) {
  return Courses.find({"_id": {$in: who }});
});

SearchSource.defineSource('courses', function(searchText, options) {
  var options = {sort: {isoScore: -1}, limit: 5};
  if(searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {$or: [{name: regExp}]};
    return Courses.find(selector, options).fetch();
  } else {
    return Courses.find({}, options).fetch();
  }
});

function buildRegExp(searchText) {
  var words = searchText.trim().split(/[ \-\:]+/);
  var exps = _.map(words, function(word) {
    return "(?=.*" + word + ")";
  });
  var fullExp = exps.join('') + ".+";
  return new RegExp(fullExp, "i");
}
