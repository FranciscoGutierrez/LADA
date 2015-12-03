Template.topribbon.helpers({
  studentId: function () {
    return Session.get("student");
  }
});

Template.topribbon.events({
  "click .top-ribbon": function (event,template) {
    if (template.$("iron-icon").attr("icon") != "icons:arrow-drop-up") {
      template.$(".top-ribbon").animate({height:"240px"}, 200, function() {});
      template.$("iron-icon").attr("icon","icons:arrow-drop-up");
    } else {
      template.$(".top-ribbon").animate({height:"24px"}, 200, function() {});
      template.$("iron-icon").attr("icon","icons:arrow-drop-down");
    }
  }
});
