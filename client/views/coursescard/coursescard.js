Template.coursescard.events({
  "click .card-settings-icon": function (event,template) {
    if(!template.$(".card-settings-icon").hasClass("opened")) {
      template.$(".card-settings-icon").addClass("opened");
      template.$(".card-content").animate({"min-width":"+=350px"},"slow", function(){
        template.$(".card-settings-icon > iron-icon").fadeOut(300, function(){
          template.$(".card-settings-icon > iron-icon").attr("icon","icons:close").fadeIn(300);
        });
      });
    } else {
      template.$(".card-settings-icon").removeClass("opened");
      template.$(".card-content").animate({"min-width":"-=350px"},"slow ", function(){
        template.$(".card-settings-icon > iron-icon").fadeOut(300, function(){
          template.$(".card-settings-icon > iron-icon").attr("icon","icons:settings").fadeIn(300);
        });
      });
    }
    // border-right: 1px solid #b25d7e;
  }
});

Template.coursescard.rendered = function(){};
