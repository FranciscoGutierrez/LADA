/*
 *  Gets data from address bar using Iron-Router
 *  Sets the session according this data.
 */

Router.route('/:_id', {
  data: function () {
    Session.set('studentId',this.params._id);
    Meteor.subscribe("this_student",this.params._id);
  }
});
