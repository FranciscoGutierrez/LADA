// Websocket = new WebSocket("ws://localhost:9000/test");
Websocket = new WebSocket("ws://franciscogutierrez10-80.terminal.com/test");
Websocket.onopen    = function(evt) { onOpen(evt)    };
Websocket.onclose   = function(evt) { onClose(evt)   };
Websocket.onmessage = function(evt) { onMessage(evt) };
Websocket.onerror   = function(evt) { onError(evt)   };

function onOpen(evt) {
  // $("#paperToast").attr("text","Connection is active.");
  // document.querySelector('#paperToast').show();
  console.log("ws:connected");

  $( document ).ready(function() {
    console.log( "Router!" );
    var courses;
    var student = Router.current().params._id;
    if(Router.current().params.query.c) courses = _.uniq(Router.current().params.query.c.split(','));
    Session.set('student', student);
    Session.set('courses', courses);
    Session.set("cc-compliance", 5);
    Session.set("gc-compliance", 5);
    Session.set("hc-compliance", 5);
    Session.set("gc-toggle", true);
    Session.set("hc-toggle", true);

    var str = "";
    if(courses) {
      for (var i=0; i<courses.length-1; i++){ str += '{"id": "'+courses[i]+'", "compliance": 5},'; }
      str+= '{"id": "'+courses[courses.length-1]+'", "compliance": 5}';
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
  });

}

function onClose(evt) {
  // $("#paperToast").attr("text","Server is offline.");
  // document.querySelector('#paperToast').show();
  console.log("ws:offline");
}

function onMessage(evt) {
  var recieved = JSON.parse(evt.data);
  Session.set("riskValue",recieved.risk);
  Session.set("qualityValue",recieved.quality);
  console.log(recieved);
  // $("#paperToast").attr("text","Loading...");
  // document.querySelector('#paperToast').show();
}

function onError(evt) {
  // $("#paperToast").attr("text","Error, can't find server.");
  // document.querySelector('#paperToast').show();
  console.log("ws:error: " + evt.data);
}

function doSend(message) {
  console.log("ws:doSend: " + message);
  Websocket.send(message);
}
