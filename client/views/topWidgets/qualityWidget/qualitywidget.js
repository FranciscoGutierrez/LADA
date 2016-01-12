Template.qualitywidget.helpers({
  quality: function() {
    var quality = Session.get("qualityValue");
    var text = "";
    var casestext = "";
    if (quality >= 0.0){
      text = "Muy baja";
      casestext = "No Confiable";
      $(".quality-bubble #svgCircle").css("stroke","#e74c3c !important");
    }
    if (quality >= 0.2){
      text = "Baja";
      casestext = "No Confiable";
      $(".quality-bubble #svgCircle").css("stroke","#e67e22 !important");
    }
    if (quality >= 0.4) {
      text = "Media";
      casestext = "No Confiable";
      $(".quality-bubble > #svgCircle").css("stroke","#f1c40f !important");
    }
    if (quality >= 0.6) {
      text = "Alta";
      casestext = "Confiable";
      $(".quality-bubble #svgCircle").css("stroke","#27ae60 !important");
    }
    if (quality >= 0.8) {
      text = "Muy Alta";
      casestext = "Confiable";
      $(".quality-bubble #svgCircle").css("stroke","#25a085 !important");
    }
    return {
      "value": parseInt(Math.round(quality*100)),
      "text" : text,
      "casestext": casestext,
      "cases": _.random(40, 75)
    };
  },
  loading: function() {
    return Session.get("loading");
  }
});

Template.qualitywidget.events({
  "click .quality-info": function (event,template) {
    template.$(".help-info").fadeIn();
  },
  "click .close-info": function (event,template) {
    template.$(".help-info").fadeOut();
  },
  "click .help-info": function (event,template) {
    template.$(".help-info").fadeOut();
  },
  "click": function(event,template){
    /*** Interaction Recorder ***/
    var self = this;
    var myEvent = event;
    if(Session.get("user-session")) {
      Actions.insert({
        "sessionId": Meteor.connection._lastSessionId,
        "user": Session.get("user-name"),
        "profile": Session.get("user-profile"),
        "prediction": Session.get("riskValue"),
        "uncertainty":Session.get("qualityValue"),
        "courses":Session.get("courses"),
        "load":Session.get("load"),
        "template": template.view.name,
        "target": $(event.target).first().attr('class'),
        "x": (event.pageX - $('.coursescard-paper').offset().left) + $(".content").scrollLeft(),
        "y": (event.pageY - $('.coursescard-paper').offset().top)  + $(".content").scrollTop(),
        "timestamp": new Date()
      });
    }
  }
});

Template.qualitywidget.rendered = function () {
  $(document).ready(function() {
    setInterval(function(){
      var quality = Session.get("qualityValue");
      if (quality >= 0.0) $(".quality-bubble #svgCircle").css("stroke","#e74c3c");
      if (quality >= 0.2) $(".quality-bubble #svgCircle").css("stroke","#e67e22");
      if (quality >= 0.4) $(".quality-bubble #svgCircle").css("stroke","#f1c40f");
      if (quality >= 0.6) $(".quality-bubble #svgCircle").css("stroke","#27ae60");
      if (quality >= 0.8) $(".quality-bubble #svgCircle").css("stroke","#25a085");
    }, 500);
  });
};
