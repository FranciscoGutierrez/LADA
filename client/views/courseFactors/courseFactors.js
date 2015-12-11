
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
      labels: ["Fundamentos", "Tópicos Avanzados", "Programación", "Humanidades", "Matemáticas"],
      datasets: [
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

    },3500);
  };
