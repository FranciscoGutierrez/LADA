Template.qualitywidget.helpers({
  quality: function() {
    Session.get("riskValue");
    return Math.round(Math.random() * (100 - 0) + 0);
  }
});
