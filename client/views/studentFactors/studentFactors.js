/*
* Event Handling:
*/
Template.studentfactors.events({});
Template.studentfactors.helpers({});
Template.studentfactors.rendered = function () {
  setTimeout(function() {
    var ctx = document.getElementById("sf-chart").getContext("2d");
    var data = {
      labels: ["CS Fundamentals", "Advanced CS", "Programming", "Humanities", "Math"],
      datasets: [{
        label: "Similar Students",
        fillColor:  "rgba(207, 207, 207,0.5)",
        strokeColor:"rgba(207, 207, 207,1.0)",
        pointColor: "rgba(207, 207, 207,1.0)",
        pointStrokeColor:  "#fff",
        pointHighlightFill:"#fff",
        pointHighlightStroke:"rgba(207, 207, 207,1.0)",
        data: [28, 48, 40, 19, 96]
      },
      {
        label: "This Student",
        fillColor:  "rgba(179,93,126,0.5)",
        strokeColor:"rgba(179,93,126,1.0)",
        pointColor: "rgba(179,93,126,1.0)",
        pointStrokeColor:  "#fff",
        pointHighlightFill:"#fff",
        pointHighlightStroke:"rgba(179,93,126,1.0)",
        data: [65, 59, 90, 81, 56]
      }]
    };
    var myRadarChart = new Chart(ctx).Radar(data, {
      responsive: false,
      pointDotRadius: 3,
      pointLabelFontSize: 12,
      animation: false
    });
  },3350);
};
