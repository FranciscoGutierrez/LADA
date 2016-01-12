Template.topribbon.events({
  "click .ribbon-title": function (event,template) {
    if (template.$(".ribbon-icon").attr("icon") != "icons:arrow-drop-up") {
      template.$(".top-ribbon-hidden").fadeIn();
      template.$(".top-ribbon").animate({height:"240px"}, 200, function() {
        template.$(".ribbon-icon").attr("icon","icons:arrow-drop-up");
      });
    } else {
      template.$(".top-ribbon").animate({height:"24px"}, 200, function() {});
      template.$(".ribbon-icon").attr("icon","icons:arrow-drop-down");
      template.$(".top-ribbon-hidden").fadeOut(200);
    }
  },
  "click paper-input": function(event,template) {
    template.$(".top-ribbon-save").attr("raised","true");
  },
  "click .top-ribbon-save": function(event,template) {
    Session.set("user-name", template.$("paper-input").val());
  },
  "click .ribbon-student": function(event,template) {
    Session.set("user-profile", template.$(".ribbon-student").attr("name"));
  },
  "click .ribbon-layman": function(event,template) {
    Session.set("user-profile", template.$(".ribbon-layman").attr("name"));
  },
  "click .ribbon-expert": function(event,template) {
    Session.set("user-profile", template.$(".ribbon-expert").attr("name"));
  },
  "click .ribbon-start": function(event,template) {
    if(Session.get("user-name") && Session.get("user-profile")) {
      Session.set("user-timestart",new Date());
      template.$(".ribbon-stop").attr("raised",true);
      template.$(".ribbon-start").attr("raised",false);
      template.$(".ribbon-start").attr("elevation",0);
      Session.set("user-session",true);
      template.$(".ribbon-icon").attr("icon","icons:arrow-drop-down");
      template.$(".top-ribbon-hidden").fadeOut(200);
      template.$(".top-ribbon").animate({height:"24px"}, 200, function() {
        template.$(".ribbon-icon").attr("icon","icons:arrow-drop-down");
      });
    } else {
      template.$(".top-ribbon-radio").addClass("animated pulse");
      template.$(".top-ribbon-input").addClass("animated pulse");
      $('.top-ribbon-radio').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        template.$(".top-ribbon-radio").removeClass("animated pulse");
        template.$(".top-ribbon-input").removeClass("animated pulse");
      });
    }
  },
  "click .ribbon-stop":  function(event,template) {
    if(Session.get("user-session",true)){
      template.$(".top-ribbon-flex").fadeOut(100,function (){
        template.$(".top-ribbon-experience").css("display","flex");
        template.$(".top-ribbon").css("background-color","rgba(255, 255, 255, 0.65)");
      });
    } else {
      template.$(".top-ribbon-radio").addClass("animated pulse");
      template.$(".top-ribbon-input").addClass("animated pulse");
      template.$(".ribbon-start").addClass("animated pulse");
      $('.top-ribbon-radio').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        template.$(".top-ribbon-radio").removeClass("animated pulse");
        template.$(".top-ribbon-input").removeClass("animated pulse");
        template.$(".ribbon-start").removeClass("animated pulse");
      });
    }
  },
  "click .ribbon-send-confidence": function(event,template) {
    template.$(".top-ribbon-confidence").fadeOut(100,function (){
      template.$(".top-ribbon-scenario").css("display","flex");
      // template.$(".top-ribbon").css("background-color","rgba(255, 255, 255, 0.65)");
    });
  },
  "click .ribbon-send-experience": function(event,template) {
    template.$(".top-ribbon-experience").fadeOut(100,function (){
      template.$(".top-ribbon-confidence").css("display","flex");
      // template.$(".top-ribbon").css("background-color","rgba(255, 255, 255, 0.65)");
    });
  },
  "click .ribbon-send-scenario": function(event,template) {
    var now = new Date();
    Sessions.insert({
      "sessionId": Meteor.connection._lastSessionId,
      "user": Session.get("user-name"),
      "profile": Session.get("user-profile"),
      "prediction": Session.get("riskValue"),
      "uncertainty":Session.get("qualityValue"),
      "courses":Session.get("courses"),
      "load":Session.get("load"),
      "confidence": Session.get("user-confidence"),
      "experience": Session.get("user-experience"),
      "scenario": Session.get("user-scenario"),
      "timestampStart": Session.get("user-timestart"),
      "timestampStartMs": Session.get("user-timestart").getTime(),
      "timestampEnd": new Date(),
      "timestampEndMs": now.getTime(),
      "timeSpent" : now.getTime() - Session.get("user-timestart").getTime()
    });
    location.reload();
  },
  "click .ribbon-vlow": function(event,template) {
    Session.set("user-confidence", template.$(".ribbon-vlow").attr("name"));
  },
  "click .ribbon-low": function(event,template) {
    Session.set("user-confidence", template.$(".ribbon-low").attr("name"));
  },
  "click .ribbon-fair": function(event,template) {
    Session.set("user-confidence", template.$(".ribbon-fair").attr("name"));
  },
  "click .ribbon-high": function(event,template) {
    Session.set("user-confidence", template.$(".ribbon-high").attr("name"));
  },
  "click .ribbon-vhigh": function(event,template) {
    Session.set("user-confidence", template.$(".ribbon-vhigh").attr("name"));
  },
  "click .ribbon-vhard": function(event,template) {
    Session.set("user-experience", template.$(".ribbon-vhard").attr("name"));
  },
  "click .ribbon-hard": function(event,template) {
    Session.set("user-experience", template.$(".ribbon-hard").attr("name"));
  },
  "click .ribbon-regular": function(event,template) {
    Session.set("user-experience", template.$(".ribbon-regular").attr("name"));
  },
  "click .ribbon-easy": function(event,template) {
    Session.set("user-experience", template.$(".ribbon-easy").attr("name"));
  },
  "click .ribbon-veasy": function(event,template) {
    Session.set("user-experience", template.$(".ribbon-veasy").attr("name"));
  },
  "click paper-slider": function(event,template) {
    Session.set("user-scenario", template.$("paper-slider").attr("value"));
  }
});

Template.topribbon.helpers({
  studentId: function () {
    return Session.get("student");
  },
  userName: function () {
    return Session.get("user-name");
  },
  userProfile: function () {
    return Session.get("user-profile");
  },
  userConfidence: function () {
    return Session.get("user-confidence");
  },
  userExperience: function () {
    return Session.get("user-experience");
  },
  userScenario: function () {
    return Session.get("user-scenario");
  }
});
