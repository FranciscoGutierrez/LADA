Template.coursefactors.events({
  "click .cf-checkbox": function(event,template){
    CoursesFactorsChart.datasets[0].points[0].value = 0;
    CoursesFactorsChart.datasets[0].points[1].value = 0;
    CoursesFactorsChart.datasets[0].points[2].value = 0;
    CoursesFactorsChart.datasets[0].points[3].value = 0;
    CoursesFactorsChart.datasets[0].points[4].value = 0;
    CoursesFactorsChart.update();

    $('.cf-checkbox').each(function() {
      if($(this).attr("checked")) {
        CoursesFactorsChart.datasets[0].points[0].value += parseInt((Courses.findOne({"_id": $(this).val()}).factor1*100)/5);
        CoursesFactorsChart.datasets[0].points[1].value += parseInt((Courses.findOne({"_id": $(this).val()}).factor2*100)/5);
        CoursesFactorsChart.datasets[0].points[2].value += parseInt((Courses.findOne({"_id": $(this).val()}).factor3*100)/5);
        CoursesFactorsChart.datasets[0].points[3].value += parseInt((Courses.findOne({"_id": $(this).val()}).factor4*100)/5);
        CoursesFactorsChart.datasets[0].points[4].value += parseInt((Courses.findOne({"_id": $(this).val()}).factor5*100)/5);
      }
    });
    CoursesFactorsChart.update();
  }
});

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
    var courses = Session.get("courses");
    var sc;
    if(courses) sc = Courses.find({"_id": {$in: courses }}).fetch();
    var obj = [0,0,0,0,0];
    for (i=0; i< sc.length; i++){
      obj[0] += parseInt((sc[i].factor1*100)/5);
      obj[1] += parseInt((sc[i].factor2*100)/5);
      obj[2] += parseInt((sc[i].factor3*100)/5);
      obj[3] += parseInt((sc[i].factor4*100)/5);
      obj[4] += parseInt((sc[i].factor5*100)/5);
    }
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
          data: obj
        }]
      };
      CoursesFactorsChart = new Chart(ctx).Radar(data, {
        responsive: false,
        pointDotRadius: 3,
        pointLabelFontSize: 12,
        animation: true
      });
    },3500);
  };
