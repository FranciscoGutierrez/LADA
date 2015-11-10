var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['name'];
PackageSearch = new SearchSource('courses', fields, options);

Template.coursescard.events({
  "click .clear-search": function(event,template){
    template.$("#search-box").find("#input").val('');
  },
  "click .settings-icon": function (event,template) {
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
      template.$(".selected-courses").append(
        "<div class='selected-course'>"+
        "<paper-checkbox class='selected-course-checkbox' checked>"+
        "<div class='selected-course-meta'>"+
        "<div class='course-name'>"+ this.name.replace(/<(?:.|\n)*?>/gm, '') + "</div>" +
        "<div class='course-id'>"  + this._id + "</div></div></paper-checkbox>"+
        "<div class='remove-selected-course'><iron-icon icon='icons:close'></iron-icon></div>" +
        "</div>");
      }
    },
    "click .remove-selected-course": function(event,template) {
      console.log("Removing");
    }
    // ,
    // "mouseenter .selected-course": function(event,template){
    //   $(event.target).find(".remove-selected-course").css("display","flex");
    // },
    // "mouseleave .selected-course": function(event,template){
    //   $(event.target).find(".remove-selected-course").hide();
    // }
  });

  Template.coursescard.helpers({
    getCourses: function() {
      return PackageSearch.getData({
        transform: function(matchText, regExp) {
          return matchText.replace(regExp, "<b>$&</b>")
        },
        sort: {isoScore: -1}
      });
    },
    isLoading: function() {
      return PackageSearch.getStatus().loading;
    },
    courses: function () {
      return Courses.find({});
    }
  });
