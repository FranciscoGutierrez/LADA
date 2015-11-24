Template.aspectswidget.events({
  "click .courses-aspect" : function(event, template) {
    var animationName = "animated pulse";
    var animationEnd  = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
    $(".coursescard-paper").addClass(animationName).one(animationEnd, function() {
      $(this).removeClass(animationName);
    });
  },
  "click .grades-aspect" : function(event, template) {
    var animationName = "animated pulse";
    var animationEnd  = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
    $(".gradescard-paper").addClass(animationName).one(animationEnd, function() {
      $(this).removeClass(animationName);
    });
  },
  "click .history-aspect" : function(event, template) {
    var animationName = "animated pulse";
    var animationEnd  = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
    $(".historicalcard-paper").addClass(animationName).one(animationEnd, function() {
      $(this).removeClass(animationName);
    });
  }
});

Template.aspectswidget.helpers({
  historyOn: function() {
    return Session.get("hc-toggle");
  },
  gradesOn: function() {
    return Session.get("gc-toggle");
  }
});

Template.aspectswidget.rendered = function(){};
