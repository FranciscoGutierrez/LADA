
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
      datasets: [
        {
        label: "Human Comp Stuff",
        fillColor:  "rgba(145,0,63,0.5)",
        strokeColor:"rgba(145,0,63,1.0)",
        pointColor: "rgba(145,0,63,1.0)",
        pointStrokeColor:  "#fff",
        pointHighlightFill:"#fff",
        pointHighlightStroke:"rgba(145,0,63,1.0)",
        data: [65, 59, 90, 81, 56]
      },
      {
        label: "Object Oriented Stuff",
        fillColor:  "rgba(206,18,86,0.5)",
        strokeColor:"rgba(206,18,86,1.0)",
        pointColor: "rgba(206,18,86,1.0)",
        pointStrokeColor:  "#fff",
        pointHighlightFill:"#fff",
        pointHighlightStroke:"rgba(206,18,86,1.0)",
        data: [28, 48, 40, 19, 96]
      },
      {
        label: "Object Oriented Stuff",
        fillColor:  "rgba(231,41,138,0.5)",
        strokeColor:"rgba(231,41,138,1.0)",
        pointColor: "rgba(231,41,138,1.0)",
        pointStrokeColor:  "#fff",
        pointHighlightFill:"#fff",
        pointHighlightStroke:"rgba(231,41,138,1.0)",
        data: [28, 48, 40, 19, 96]
      },
      {
        label: "Object Oriented Stuff",
        fillColor:  "rgba(223,101,176,0.5)",
        strokeColor:"rgba(223,101,176,1)",
        pointColor: "rgba(223,101,176,1)",
        pointStrokeColor:  "#fff",
        pointHighlightFill:"#fff",
        pointHighlightStroke:"rgba(223,101,176,1.0)",
        data: [28, 48, 40, 19, 96]
      },
      {
        label: "Object Oriented Stuff",
        fillColor:  "rgba(201,148,199,0.5)",
        strokeColor:"rgba(201,148,199,1.0)",
        pointColor: "rgba(201,148,199,1.0)",
        pointStrokeColor:  "#fff",
        pointHighlightFill:"#fff",
        pointHighlightStroke:"rgba(201,148,199,1.0)",
        data: [28, 48, 40, 19, 96]
      },
      {
        label: "Object Oriented Stuff",
        fillColor:  "rgba(212,185,218,0.5)",
        strokeColor:"rgba(212,185,218,1.0)",
        pointColor: "rgba(212,185,218,1.0)",
        pointStrokeColor:  "#fff",
        pointHighlightFill:"#fff",
        pointHighlightStroke:"rgba(212,185,218,1.0)",
        data: [28, 48, 40, 19, 96]
      },
      {
        label: "Object Oriented Stuff",
        fillColor:  "rgba(241,238,246,0.5)",
        strokeColor:"rgba(241,238,246,1.0)",
        pointColor: "rgba(241,238,246,1.0)",
        pointStrokeColor:  "#fff",
        pointHighlightFill:"#fff",
        pointHighlightStroke:"rgba(241,238,246,1.0)",
        data: [28, 48, 40, 19, 96]
      }
      ]
    };

    var myRadarChart = new Chart(ctx).Radar(data, {
      responsive: false,
      pointDotRadius: 3,
      pointLabelFontSize: 12,
      animation: false
    });

  },3500);
};
