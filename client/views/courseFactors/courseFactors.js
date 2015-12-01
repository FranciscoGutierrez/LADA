/*
* Event Handling:
*/
Template.coursefactors.events({});
Template.coursefactors.helpers({});
Template.coursefactors.rendered = function () {
  // var courses = Session.get("courses");
  // var student = Session.get("student");
  // var str = "";

  // if(courses) {
  //   for (var i=0; i<courses.length-1; i++) str += '{"id": "'+courses[i]+'", "compliance": 5},';
  //   str+= '{"id": "'+courses[courses.length]+'", "compliance": 5}';
  //   Websocket.send('{"requestId": "5645f7f7ef0bde57344c84de",'+
  //   '"student": [{"id": '+student+',"gpa": 7.0793,'+
  //   '"performance": 0.6,"compliance": 3}],'+
  //   '"courses": ['+ str + '],'+
  //   '"data": [{"from": 2009,"to": 2015,'+
  //   '"program": true,'+
  //   '"sylabus": true,'+
  //   '"evaluation": false,'+
  //   '"instructors": true,'+
  //   '"compliance": 2}]}');
  // }
};
