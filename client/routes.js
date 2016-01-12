/*
*  Gets data from address bar using Iron-Router
*  Sets the session according this data.
*/
Router.route('/:_id', {
  data: function () {
    var courses;
    var student = Router.current().params._id;
    if(Router.current().params.query.c) courses = _.uniq(Router.current().params.query.c.split(','));
    Session.set('student', student);
    Session.set('courses', courses);
    Session.set("cc-compliance", 5);
    Session.set("gc-compliance", 5);
    Session.set("hc-compliance", 5);
    Session.set("hc-toggle", true);
    Session.set("gc-toggle", true);
    Session.set("cf-toggle", true);
    Session.set("sf-toggle", true);
    Session.set("sc-toggle", false);
    Session.set("data-from","2010");
    Session.set("data-to",  "2015");
    Session.set("studentdata","redo");
    Session.set("studentYear","all");
    Session.set("loading",true);
    $(".risk-content-viz").css("opacity",0.5);
    $(".quality-content-viz").css("opacity",0.5);
    if(courses) {
      Session.set("selected-course", courses[0]);
      Meteor.subscribe("this_student", student, function() {
        Meteor.subscribe("historial", function() {
          Meteor.subscribe("studentgrades", student, function() {
            Meteor.subscribe("this_courses", function(){
              for (i = 0; i<courses.length; i++){
                Meteor.subscribe('sufficientgrades',courses[i], function(){});
                Meteor.subscribe('failuregrades',   courses[i], function(){});
                Meteor.subscribe('goodgrades',      courses[i], function(){});
                Meteor.subscribe('verygoodgrades',  courses[i], function(){});
                Meteor.subscribe('excellentgrades', courses[i], function(){});
                if($(".loading-screen")) $(".loading-screen").remove();
              }
            });
          });
        });
      });
    } else {
      Meteor.subscribe("this_courses", function(){
        Meteor.subscribe("historial", function() {
          Meteor.subscribe("this_student", student, function() {
            Meteor.subscribe("studentgrades", student, function() {
              if($(".loading-screen")) $(".loading-screen").remove();
              var grades = Grades.find({"student": Session.get("student"), "status":"Failed"},{limit:7}).fetch();
              var failed = [];
              for (j = 0; j< grades.length; j++) failed.push(grades[j].course);
              Session.set("courses",failed);
              for (i = 0; i<failed.length; i++){
                Meteor.subscribe('sufficientgrades',failed[i], function(){});
                Meteor.subscribe('failuregrades',   failed[i], function(){});
                Meteor.subscribe('goodgrades',      failed[i], function(){});
                Meteor.subscribe('verygoodgrades',  failed[i], function(){});
                Meteor.subscribe('excellentgrades', failed[i], function(){});
              }
            });
          });
        });
      });
    }
  }
});
