/*
* Template life Cycle (Helpers)
*/

Meteor.subscribe('stdcres',["FIEC01545"]);

Template.gradescard.helpers({
  excellent: function () {
    var sc   = Stdcres.find({ gp: { $gte : "9"} }).fetch();
    for (i = 0; i < sc.length; i++) {
      sc[i].gp = "#25a085";
      sc[i].grade       = (((sc[i].grade - 5.7) * 350) / 4.5);
      sc[i].performance = (sc[i].performance * 197);
    }
    return sc;
  },
  good: function () {
    var sc   = Stdcres.find({ gp: { $gte : "8", $lt : "9" } }).fetch();
    for (i = 0; i < sc.length; i++) {
      sc[i].gp = "#27ae60";
      sc[i].grade       = (((sc[i].grade - 5.7) * 350) / 4.5);
      sc[i].performance = (sc[i].performance * 197);
    }
    return sc;
  },
  regular: function () {
    var sc   = Stdcres.find({ gp: { $gte : "7", $lt : "8" } }).fetch();
    for (i = 0; i < sc.length; i++) {
      sc[i].gp = "#f0c30e";
      sc[i].grade       = (((sc[i].grade - 5.7) * 350) / 4.5);
      sc[i].performance = (sc[i].performance * 197);
    }
    return sc;
  },
  lazy: function () {
    var sc   = Stdcres.find({ gp: { $gte : "6", $lt : "7" } }).fetch();
    for (i = 0; i < sc.length; i++) {
      sc[i].gp = "#e67d22";
      sc[i].grade       = (((sc[i].grade - 5.7) * 350) / 4.5);
      sc[i].performance = (sc[i].performance * 197);
    }
    return sc;
  },
  bad: function () {
    var sc   = Stdcres.find({ gp: { $lte : "6"} }).fetch();
    for (i = 0; i < sc.length; i++) {
      sc[i].gp = "#e74c3c";
      sc[i].grade       = (((sc[i].grade - 5.7) * 350) / 4.5);
      sc[i].performance = (sc[i].performance * 197);
    }
    return sc;
  }
});
