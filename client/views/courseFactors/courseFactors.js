
Template.coursefactors.events({});

Template.coursefactors.helpers({
  sessionCourses: function() {
    var courses = Session.get("courses");
    var sc;
    if(courses) sc = Courses.find({"_id": {$in: courses }}).fetch();
    return sc;
  }
});

Template.coursefactors.rendered = function(){
  setTimeout(function() {
    var ctx = document.getElementById("cf-chart").getContext("2d");
    var data = {
      labels: ["CS Fundamentals", "Advanced CS", "Programming", "Humanities", "Math"],
      datasets: [{
        label: "Human Comp Stuff",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [65, 59, 90, 81, 56]
      },
      {
        label: "Object Oriented Stuff",
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [28, 48, 40, 19, 96]
      }]
    };

    var myRadarChart = new Chart(ctx).Radar(data, {
      responsive: false,
      pointDotRadius: 3,
      pointLabelFontSize: 12,
      animation: false
    });

  },3500);
};
