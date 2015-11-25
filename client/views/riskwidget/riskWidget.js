
Template.riskwidget.helpers({
  risk: function() {
    var v = Math.round(Session.get("riskValue")*100);
    $('.risk-knob').val(v).trigger("change");
    return v;
  }
});

Template.riskwidget.rendered = function(){
  $(function() {
    $(".risk-knob").knob();
  });
};
