/*
* Instant search (Global values for client, NOT part of this template life cycle)
*/
var fields = ['name'];
var options = {keepHistory: 1000,localSearch: true};
PackageSearch = new SearchSource('courses', fields, options);

/*
* This temaplate is using sessions:
*/
Session.set('sessionCourses',[]);

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
    if( $(".selected-courses").children().length < 7) {
      var simpleName = this.name.replace(/<(?:.|\n)*?>/gm,'');
      var courses = Session.get('sessionCourses');
      var course  = this;
      var m = Session.get("sessionCourses");
      m = _.extend([], m);
      m.push(this);
      Session.set("sessionCourses", m);
      Meteor.subscribe('stdcres',[this._id]);
    }
  },
  "click .remove-selected-course": function(event,template) {
    $(event.target).parent().fadeOut('slow', function (){
      $(this).remove();
      var m = Session.get("sessionCourses");
      Session.set("sessionCourses", "");
    });
  },
  "click .selected-course": function(event,template) {
  }
});

/*
* Template life Cycle (Helpers)
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
    var sc = Session.get("sessionCourses");
    console.log(Session.get("sessionCourses"));
    for (i = 0; i < sc.length; i++) {
      sc[i].students = sc[i].students > 999 ? (sc[i].students/1000).toFixed(1) + 'k' : sc[i].students;
    }
    return sc;
  }
});

/*
* Template life Cycle (rendered)
*/
Template.coursescard.rendered = function () {
  // var self = this;
  // console.log("rendered");
  //
  // function animateTemplate(bar) {
  //   var size = (self.$(".cc-squares").text() * 100)/3294;
  //   self.$(".cc-squares").animate({'height': size+'px'});
  // }
  //
  // Tracker.autorun(function () {
  //   var bar = Session.get("sessionCourses");
  //   animateTemplate(bar);
  // });
};
