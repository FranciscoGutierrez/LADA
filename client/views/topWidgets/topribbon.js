Template.topribbon.helpers({
  studentId: function () {
    return Session.get("student");
  }
});

Template.topribbon.rendered = function(){};
