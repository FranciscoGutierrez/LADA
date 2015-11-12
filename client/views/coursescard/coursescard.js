/*
* Instant search (Global values for client, NOT part of this template life cycle)
*/
var fields = ['name'];
var options = {keepHistory: 1000 * 60 * 5,localSearch: true};
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
      template.$(".selected-courses").append(
        "<div class='selected-container'>" +
        "<paper-checkbox class='selected-course' checked>"+
        "<div class='selected-course-meta'>"+
        "<div class='course-name'>"+ simpleName + "</div>" +
        "<div class='course-id'>"  + this._id + "</div></div>"+
        "</paper-checkbox>"+
        "<iron-icon class='remove-selected-course' icon='icons:close'></iron-icon></div>");

        var courses = Session.get('sessionCourses');
        var course  = this;

        var m = Session.get("sessionCourses");
        m = _.extend([], m);
        m.push(this);
        Session.set("sessionCourses", m);
        console.log(Session.get("sessionCourses"));
      }
    },
    "click .remove-selected-course": function(event,template) {
      $(event.target).parent().fadeOut('slow', function (){
        $(this).remove();
        var m = Session.get("sessionCourses");
        Session.set("sessionCourses", "");
        // m = _.extend([], m);
        // m.push({name: simpleName, id: this._id});
        // Session.set("selected-courses", m);
        // console.log(courses);
      });
    },
    "click .selected-course": function(event,template) {
      //  switch to grayout template
      //  $(event.target).css("background", "none");
    }
    // ,
    // "mouseenter .selected-course": function(event,template){
    //   $(event.target).find(".remove-selected-course").css("display","flex");
    // },
    // "mouseleave .selected-course": function(event,template){
    //   $(event.target).find(".remove-selected-course").hide();
    // }
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
      return Session.get("sessionCourses");
    }
  });

  /*
  * Template life Cycle (rendered)
  */
  Template.coursescard.rendered = function () {
    var self = this;
    // function animateTemplate(bar) {
    //   var minval = 30;
    //   var vnegative = self.$(".vnegative-value").text();
    //   var negative  = self.$(".negative-value").text();
    //   var neutral   = self.$(".neutral-value").text();
    //   var positive  = self.$(".positive-value").text();
    //   var vpositive = self.$(".vpositive-value").text();
    //
    //   self.$(".verynegative").animate({'height': minval + parseFloat(vnegative)+'px'});
    //   self.$(".negative").animate({'height': minval + parseFloat(negative)+'px'});
    //   self.$(".neutral").animate({'height': minval + parseFloat(neutral)+'px'});
    //   self.$(".positive").animate({'height': minval + parseFloat(positive)+'px'});
    //   self.$(".verypositive").animate({'height': minval + parseFloat(vpositive)+'px'});
    // }
    //
    // Tracker.autorun(function () {
    //   var bar = Session.get("bar-avg");
    //   animateTemplate(bar);
    // });

  };
