

Template.topribbon.helpers({
  studentId: function () {
    return Session.get("studentId");;
  }
});

Template.topribbon.rendered = function(){};
