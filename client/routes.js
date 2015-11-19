/*
 *  Gets data from address bar using Iron-Router
 *  Sets the session according this data.
 */

Router.route('/:_id', {
  data: function () {
    var courses;
    if(this.params.query.c) {
      courses = _.uniq(this.params.query.c.split(','));
    }
    var student = this.params._id;
    Meteor.subscribe("grades", courses);
    Meteor.subscribe("this_courses", courses);
    Meteor.subscribe("this_student", student);
    Session.set('student', student);
    Session.set('courses', courses);
  }
});
