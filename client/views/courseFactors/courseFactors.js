// function constructDataset(course){
//   var dataset;
//   var index_=course.index%6;
//   if(!course.data)
//   dataset={
//     label: course.name,
//     data:course.data
//   }
//   switch(index_) {
//     case 1:
//     dataset["fillColor"]= "rgba(39,174,96,0.5)";
//     dataset["strokeColor"]= "rgba(39,174,96,0.8)";
//     dataset["pointColor"]= "rgb(39,174,96)";
//     dataset["pointHighlightStroke"]= "rgb(255,255,255)";
//     dataset["pointStrokeColor"]= "rgb(39,174,96)";
//     dataset["pointHighlightFill"]= "rgb(39,174,96)";
//     break;
//     case 2:
//     dataset["fillColor"]= "rgba(37,160,133,0.5)";
//     dataset["strokeColor"]= "rgba(37,160,133,0.8)";
//     dataset["pointColor"]= "rgb(37,160,133)";
//     dataset["pointHighlightStroke"]= "rgb(255,255,255)";
//     dataset["pointStrokeColor"]= "rgb(37,160,133)";
//     dataset["pointHighlightFill"]= "rgb(37,160,133)";
//     break;
//     case 3:
//     dataset["fillColor"]= "rgba(231,76,60,0.5)";
//     dataset["strokeColor"]= "rgba(231,76,60,0.8)";
//     dataset["pointColor"]= "rgb(231,76,60)";
//     dataset["pointHighlightStroke"]= "rgb(255,255,255)";
//     dataset["pointStrokeColor"]= "rgb(231,76,60)";
//     dataset["pointHighlightFill"]= "rgb(231,76,60)";
//     break;
//     case 4:
//     dataset["fillColor"]= "rgba(230,125,34,0.5)";
//     dataset["strokeColor"]= "rgba(230,125,34,0.8)";
//     dataset["pointColor"]= "rgb(230,125,34)";
//     dataset["pointHighlightStroke"]= "rgb(255,255,255)";
//     dataset["pointStrokeColor"]= "rgb(230,125,34)";
//     dataset["pointHighlightFill"]= "rgb(230,125,34)";
//     break;
//     case 5:
//     dataset["fillColor"]= "rgba(240,195,1,0.5)";
//     dataset["strokeColor"]= "rgba(240,195,1,0.8)";
//     dataset["pointColor"]= "rgb(240,195,1)";
//     dataset["pointHighlightStroke"]= "rgb(255,255,255)";
//     dataset["pointStrokeColor"]= "rgb(240,195,1)";
//     dataset["pointHighlightFill"]= "rgb(240,195,1)";
//     break;
//     default:
//     dataset["fillColor"]= "rgba(39,174,96,0.5)";
//     dataset["strokeColor"]= "rgba(39,174,96,0.8)";
//     dataset["pointColor"]= "rgb(39,174,96)";
//     dataset["pointHighlightStroke"]= "rgb(255,255,255)";
//     dataset["pointStrokeColor"]= "rgb(39,174,96)";
//     dataset["pointHighlightFill"]= "rgb(39,174,96)";
//   }
//   return dataset;
// };
//
// function drawChart( ){
//   var datos=[];
//   datos.length=0;
//   for (var k = 0; k < sc.length; k++) {
//     if(sc[k].visible){
//       datos.push(constructDataset(sc[k]));
//     }
//   }
//   var data = {
//     labels: ["Programming", "Advanced\nComputing", "Customer\nInteraction", "Unrelated\nCourses", "Engineering"],
//     datasets: datos
//   };
//   var ctx = document.getElementById("myChart").getContext("2d");
//   if(myRadarChart)
//   myRadarChart.destroy();
//
//   try{
//     myRadarChart = new Chart(ctx).Radar(data, {
//       //Boolean - Whether to show lines for each scale point
//       scaleShowLine : true,
//       //Boolean - Whether we show the angle lines out of the radar
//       angleShowLineOut : true,
//       //String - Colour of the angle line
//       angleLineColor : "rgba(0,0,0,.1)",
//       //Number - Pixel width of the angle line
//       angleLineWidth : 1,
//       //String - Point label font declaration
//       pointLabelFontFamily : "'Arial'",
//       //String - Point label font weight
//       pointLabelFontStyle : "normal",
//       //Number - Point label font size in pixels
//       pointLabelFontSize : 11,
//       //String - Point label font colour
//       pointLabelFontColor : "#666",
//       //Boolean - Whether to show a dot for each point
//       pointDot : true,
//       //Number - Radius of each point dot in pixels
//       pointDotRadius : 3,
//       //Number - Pixel width of point dot stroke
//       pointDotStrokeWidth : 1,
//       //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
//       pointHitDetectionRadius : 20,
//       //Boolean - Whether to show a stroke for datasets
//       datasetStroke : true,
//       //Number - Pixel width of dataset stroke
//       datasetStrokeWidth : 2,
//       //Boolean - Whether to fill the dataset with a colour
//       datasetFill : true,
//       showScale: true,
//       //Boolean - Whether to show labels on the scale
//       scaleShowLabels : true,
//       // Boolean - Whether the scale should begin at zero
//       scaleBeginAtZero : true,
//       // Number - Scale label font size in pixels
//       scaleFontSize: 10,
//       // String - Scale label font weight style
//       scaleFontStyle: "normal",
//       // String - Scale label font colour
//       scaleFontColor: "#BBB",
//       multiTooltipTemplate: function(valuesObject){
//         // console.log(valuesObject);
//         // do different things here based on whatever you want;
//         return valuesObject.value+"%" ;
//       }
//
//     });
//   }
//   catch(error){
//     var a =0;
//   }
//   //var legend = myRadarChart.generateLegend();
//
//   //and append it to your page somewhere
//   //$('#myChart').append(legend);
//   //console.log(myRadarChart.generateLegend());
//   //console.log('Done chart');
// }
Template.coursefactors.events({
  "change .coursefactor": function(event,template){
    console.log(event.target.id);
    var result = $.grep(sc, function(e){ return e.id == event.target.id; });
    if (result.length == 0) {
      console.log('Invalid Selection');
    } else if (result.length == 1) {
      result[0].visible=event.target.checked;
      console.log('curso: '+ result[0].id+' visible:'+result[0].visible);
      for (var i = sc.length - 1; i >= 0; i--) {
        console.log('curso: '+sc[i].id+'visible: '+sc[i].visible);
      };
      drawChart();
    } else {
      console.log('Invalid Selection. Multiple');
    }
    Session.set(event.target.id,event.target.checked);
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
    var ctx = document.getElementById("cf-chart").getContext("2d");
    var data = {
      labels: ["CS Fundamentals", "Advanced CS", "Programming", "Humanities", "Math"],
      datasets: [{
        label: "My First dataset",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [65, 59, 90, 81, 56]
      },
      {
        label: "My Second dataset",
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [28, 48, 40, 19, 96]
      }]
    };
    var myRadarChart = new Chart(ctx).Radar(data, { responsive: false, scaleShowLabels : false, pointDotRadius : 3 });
  },3500);
};
