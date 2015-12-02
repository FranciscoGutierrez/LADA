/*
*  Gets data from address bar using Iron-Router
*  Sets the session according this data.
*/
Router.route('/:_id', {
  data: function () {
    var courses;
    var student = Router.current().params._id;
    if(Router.current().params.query.c) courses = _.uniq(Router.current().params.query.c.split(','));
    Session.set('student', student);
    Session.set('courses', courses);
    Session.set("cc-compliance", 5);
    Session.set("gc-compliance", 5);
    Session.set("hc-compliance", 5);
    Session.set("gc-toggle", true);
    Session.set("hc-toggle", true);

    Session.set("data-from",1999);
    Session.set("data-to",2013);

    if(courses) Session.set("selected-course", courses[0]);
    Meteor.subscribe("grades", courses);
    Meteor.subscribe("this_student", student);
    Meteor.subscribe("this_courses", courses);
  }
});
