/*
*  Gets data from address bar using Iron-Router
*  Sets the session according this data.
*/

Router.route('/:_id', {
  data: function () {
    var courses;
    var student = this.params._id;

    if(this.params.query.c) courses = _.uniq(this.params.query.c.split(','));

    Session.set('student', student);
    Session.set('courses', courses);

    Session.set("cc-compliance", 5);
    Session.set("gc-compliance", 5);
    Session.set("hc-compliance", 5);

    Session.set("gc-toggle", true);
    Session.set("hc-toggle", true);

    // anibal
    // http://localhost:3000/200909893?c=ICM00166,FIEC03046,FIEC01545
    //
    // roger
    // http://localhost:3000/200834711?c=ICM00166,FIEC03046,FIEC01545

    var str = "";
    if(courses) {
      for (var i=0; i<courses.length-1; i++){ str += '{"id": "'+courses[i]+'", "compliance": 5},'; }
      str+= '{"id": "'+courses[courses.length]+'", "compliance": 5}';
      Websocket.send('{"requestId": "5645f7f7ef0bde57344c84de",'+
      '"student": [{"id": '+student+',"gpa": 7.0793,'+
      '"performance": 0.6,"compliance": 3}],'+
      '"courses": ['+ str + '],'+
      '"data": [{"from": 2009,"to": 2015,'+
      '"program": true,'+
      '"sylabus": true,'+
      '"evaluation": false,'+
      '"instructors": true,'+
      '"compliance": 2}]}');
    }

    if(courses) Session.set("selected-course", courses[0]);

    Meteor.subscribe("grades", courses);
    Meteor.subscribe("this_student", student);
    Meteor.subscribe("this_courses", courses);
  }
});
