/*
* Server-side, Home of >publish< stuff...
*/

Students = new Meteor.Collection('students');
Courses  = new Meteor.Collection('courses');
Grades   = new Meteor.Collection('studentscourses');
Historial= new Meteor.Collection('historial');

Meteor.publish('grades', function(who){
  var query = Grades.find({$or: [{course: {$in: who.courses}}, {student: who.student}]});
  if (!who.courses) query = 0;
  return query;
});

Meteor.publish("this_student", function (who) {
  return Students.find({ "_id": who+""});
});

Meteor.publish("historial", function (who) {
  return Historial.find();
});

Meteor.publish("this_courses", function (who) {
  return Courses.find({"_id": {$in: who }});
});

SearchSource.defineSource('courses', function(searchText, options) {
  var options = {sort: {isoScore: -1}, limit: 5};
  if(searchText) {
    var regExp = buildRegExp(searchText+" ");
    var selector = {$or: [{name: regExp},{code: regExp}]};
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
