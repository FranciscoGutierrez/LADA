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
  "keyup #search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    PackageSearch.search(text);
  }, 200),
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
