Template.quality.helpers({
  quality: function() {
    return Math.round(Session.get("qualityValue")*100);;
  }
});
