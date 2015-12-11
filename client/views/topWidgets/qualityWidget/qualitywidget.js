Template.qualitywidget.helpers({
  quality: function() {
    var quality = Math.round(Session.get("qualityValue")*100);
    return parseInt(quality) || 0;
  },
  qualityText: function() {
    var quality = Session.get("qualityValue");
    var text;
    if (quality >= 0.0) text = "Muy Pobre";
    if (quality >= 0.2) text = "Pobre";
    if (quality >= 0.4) text = "Aceptable";
    if (quality >= 0.6) text = "Buena";
    if (quality >= 0.8) text = "Muy Buena";
    return text;
  },
  qualityColor: function() {
    var quality = Session.get("qualityValue");
    if (quality >= 0.0) $(".quality-bubble > #svgCircle").css("stroke","#e74c3c");
    if (quality >= 0.2) $(".quality-bubble > #svgCircle").css("stroke","#e67e22");
    if (quality >= 0.4) $(".quality-bubble > #svgCircle").css("stroke","#f1c40f");
    if (quality >= 0.6) $(".quality-bubble > #svgCircle").css("stroke","#27ae60");
    if (quality >= 0.8) $(".quality-bubble > #svgCircle").css("stroke","#25a085");
    return quality;
  }
});

Template.qualitywidget.events({
  "click .quality-info": function (event,template) {
    template.$(".help-info").css("display","flex");
  },
  "click .close-info": function (event,template) {
    template.$(".help-info").fadeOut();
  },
  "click .help-info": function (event,template) {
    template.$(".help-info").fadeOut();
  }
});
