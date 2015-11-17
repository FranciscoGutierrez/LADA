Courses  = new Meteor.Collection('courses');
Stdcres  = new Meteor.Collection('studentscourses');

Meteor.publish('stdcres', function(who){
  console.log(who);
  return Stdcres.find({course: {$in: who }}, {limit: 250});
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
