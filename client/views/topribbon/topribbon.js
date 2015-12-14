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
  },
  "click": function(event,template){
    /*** Interaction Recorder ***/
    var self = this;
    var myEvent = event;
    Recorder.insert({
      "user": Meteor.connection._lastSessionId,
      "template": template.view.name,
      "target": $(event.target).first().attr('class'),
      "screenX": event.screenX,
      "screenY": event.screenY,
      "offsetX": event.offsetX,
      "offsetY": event.offsetY,
      "timestamp": new Date()
    });
  }
});
