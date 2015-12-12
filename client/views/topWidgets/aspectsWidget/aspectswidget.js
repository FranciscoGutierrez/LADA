Template.aspectswidget.events({
  "click .missing-aspect" : function(event, template) {
    var animationName = "animated pulse";
    var animationEnd  = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
    $(".missingcourses-paper").addClass(animationName).one(animationEnd, function() {
      $(this).removeClass(animationName);
    });
  },
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
  },
  "click .courseskill-aspect" : function(event, template) {
    var animationName = "animated pulse";
    var animationEnd  = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
    $(".courseskill-paper").addClass(animationName).one(animationEnd, function() {
      $(this).removeClass(animationName);
    });
  },
  "click .studentskill-aspect" : function(event, template) {
    var animationName = "animated pulse";
    var animationEnd  = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
    $(".studentskills-paper").addClass(animationName).one(animationEnd, function() {
      $(this).removeClass(animationName);
    });
  },
  "click .aspects-info": function (event,template) {
    template.$(".help-info").css("display","flex");
  },
  "click .close-info": function (event,template) {
    template.$(".help-info").fadeOut();
  },
  "click .help-info": function (event,template) {
    template.$(".help-info").fadeOut();
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
