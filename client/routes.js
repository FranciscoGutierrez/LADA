/*
 *  Gets data from address bar using Iron-Router
 *  Sets the session according this data.
 */

Router.route('/:_id', {
  data: function () {
    var courses;
    if(this.params.query.c) courses = _.uniq(this.params.query.c.split(','));

    var student = this.params._id;
    Meteor.subscribe("grades", courses);
    Meteor.subscribe("this_student", student);
    Meteor.subscribe("this_courses", courses);
    
    Session.set('student', student);
    Session.set('courses', courses);
    Session.set("cc-compliance",5);
    Session.set("gc-compliance",5);
    Session.set("hc-compliance",5);
    if(courses) Session.set("selected-course", courses[0]);
  }
});
