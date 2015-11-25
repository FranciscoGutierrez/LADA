Template.riskwidget.helpers({
  risk: function() {
    return Math.round(Session.get("riskValue")*100);;
  }
});
