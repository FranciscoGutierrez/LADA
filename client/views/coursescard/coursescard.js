/*
* Instant search (Global values for client, NOT part of this template life cycle)
*/
var fields = ['name'];
var options = {keepHistory: 1000,localSearch: true};
PackageSearch = new SearchSource('courses', fields, options);

/*
* Template life Cycle (Events)
*/
Template.coursescard.events({
  "click .clear-search": function(event,template){
    template.$("#search-box").find("#input").val('');
  },
  "click .settings-icon, click .cc-nothing-add": function (event,template) {
    if(!template.$(".card-settings-icon").hasClass("opened")) {
      template.$(".card-settings-icon").addClass("opened");
      template.$(".card-content").animate({"min-width":"+=350px"},"slow", function(){
        template.$(".settings-content").css("display","flex");
        template.$(".card-settings-icon > iron-icon").fadeOut(300, function(){
          template.$(".card-settings-icon > iron-icon").attr("icon","icons:close").fadeIn(300);
        });
      });
    } else {
      template.$(".card-settings-icon").removeClass("opened");
      template.$(".settings-content").hide();
      template.$(".card-content").animate({"min-width":"-=350px"},"slow ", function(){
        template.$(".card-settings-icon > iron-icon").fadeOut(300, function(){
          template.$(".card-settings-icon > iron-icon").attr("icon","icons:settings").fadeIn(300);
        });
      });
    }
  },
  "keyup #search-box, click #input": _.throttle(function(e,template) {
    template.$(".search-results").show();
    var text = $(e.target).val().trim();
    PackageSearch.search(text);
  }, 200),
  "click": function(event,template){
    template.$(".search-results").hide();
  },
  "click .result-course": function(event,template) {
    var course = this;
    var courses = _.uniq(Session.get('courses'));
    if(courses.length < 7) {
      courses = _.extend([], courses);
      courses.push(course._id);
      Session.set("courses", courses);
      Meteor.subscribe("this_courses", courses);
      Meteor.subscribe("grades", courses);
    } else {
      $("#paperToast").attr("text","Can't add more courses.");
      document.querySelector('#paperToast').show();
    }
  },
  "click .remove-selected-course": function(event,template) {
    var id = this._id;
    $(event.target).parent().fadeOut('slow', function (){
      var a = Session.get("courses");
      for(var i = a.length; i--;) {
        if(a[i] === id) {
          a.splice(i, 1);
        }
      }
      Session.set("courses",a);
      $(this).remove();
    });
  },
  "click .cc-squares, click .cc-meta": function(event,template) {
    var id = this._id;
    $(".gradescard-paper").find("circle").css("fill-opacity","0.15");
    $(".gradescard-paper").find("circle").css("stroke","none");

    $("."+ id).css("fill-opacity","1");
    $(".sg-this").css("fill-opacity","1");
    $("."+id).css("stroke","#ececec");

    var parent = $(event.target).parents(".cc-course");
    template.$(".cc-squares").css("background","#fafafa");
    template.$(".cc-meta").css("background","#fafafa");
    parent.find(".cc-squares").css("background","#EEEEEE");
    parent.find(".cc-meta").css("background","#EEEEEE");
    Session.set("selected-course",id);
  },
  "change .cc-paper-slider": function(event,template) {
    var n = template.$(".cc-paper-slider").attr("value");
    if(n==5) template.$(".coursescard-paper").css("opacity","1");
    if(n==4) template.$(".coursescard-paper").css("opacity","0.85");
    if(n==3) template.$(".coursescard-paper").css("opacity","0.75");
    if(n==2) template.$(".coursescard-paper").css("opacity","0.65");
    if(n==1) template.$(".coursescard-paper").css("opacity","0.55");
    if(n==0) template.$(".coursescard-paper").css("opacity","0.45");
    Session.set("cc-compliance", n);
    Websocket.send('{"reuqestId": "5645f7f7ef0bde57344c84de"}');
  }
});

/*
* Display data from helpers
*/
Template.coursescard.helpers({
  getCourses: function() {
    return PackageSearch.getData({
      transform: function(matchText, regExp) {
        // return matchText.replace(regExp, "<b>$&</b>")
        return matchText
      },
      sort: {isoScore: -1}
    });
  },
  isLoading: function() {
    return PackageSearch.getStatus().loading;
  },
  courses: function () {
    return Courses.find({});
  },
  sessionCourses: function() {
    var courses = Session.get("courses");
    var sc;
    if (courses) {
      sc = Courses.find({"_id": {$in: courses }}).fetch();
      for (i = 0; i < sc.length; i++) {
        sc[i].students = sc[i].students > 999 ? (sc[i].students/1000).toFixed(1) + 'k' : sc[i].students;
      }
    }
    return sc;
  },
  compliance: function() {
    return Session.get("cc-compliance");
  },
  selectedCourse: function() {
    return Courses.findOne({ "_id" : Session.get("selected-course")});
  }
});
