Template.riskwidget.helpers({
  risk: function() {
    var risk = Session.get("riskValue");
    var text = "";
    if (risk >= 0.0) text = "Muy baja";
    if (risk >= 0.2) text = "Baja"
    if (risk >= 0.5) text = "Media";
    if (risk >= 0.7) text = "Alta";
    if (risk >= 0.8) text = "Muy Alta";
    return {
      number : parseInt(Math.round(risk*100)) || 0,
      text : text
    };
  },
  loading: function() {
    return Session.get("loading");
  }
});

Template.riskwidget.events({
  "click .risk-info": function (event,template) {
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

Template.riskwidget.rendered = function () {
  $(document).ready(function() {
    setInterval(function(){
      var risk = Session.get("riskValue");
      if (risk >= 0.0) $(".risk-bubble #svgCircle").css("stroke","#e74c3c");
      if (risk >= 0.2) $(".risk-bubble #svgCircle").css("stroke","#e67e22");
      if (risk >= 0.5) $(".risk-bubble #svgCircle").css("stroke","#f1c40f");
      if (risk >= 0.7) $(".risk-bubble #svgCircle").css("stroke","#27ae60");
      if (risk >= 0.8) $(".risk-bubble #svgCircle").css("stroke","#25a085");
    }, 500);
  });
};
