// Websocket = new WebSocket("ws://localhost:9000/test");
// Websocket = new WebSocket("ws://10.43.48.75/test");
StudentFactorsChart = 0;
CoursesFactorsChart = 0;
Websocket = new WebSocket("ws://franciscogutierrez10-80.terminal.com/test");
Websocket.onopen    = function(evt) { onOpen(evt)    };
Websocket.onclose   = function(evt) { onClose(evt)   };
Websocket.onmessage = function(evt) { onMessage(evt) };
Websocket.onerror   = function(evt) { onError(evt)   };

function onOpen(evt) { console.log("ws:connected"); }
function onClose(evt) {
  console.log("ws:offline");
}
function onMessage(evt) {
  var recieved = JSON.parse(evt.data);
  Session.set("riskValue",recieved.risk);
  Session.set("qualityValue",recieved.quality);
}

function onError(evt) { console.log("ws:error: " + evt.data); }
function doSend(message) {
  console.log("ws:doSend: " + message);
  Websocket.send(message);
}

$(document).ready(function() {
  setInterval(function(){
    var string   = "";
    var request  = "";
    var dataTo   = Session.get('data-to');
    var dataFrom = Session.get('data-from');
    var courses  = Session.get('courses');
    var student  = Session.get('student');
    if(Websocket.readyState == 1) {
      if(courses) {
        // Append the courses
        for (var i=0; i<courses.length-1; i++){ string += '{"id": "'+courses[i]+'", "compliance": 5},'; }
        string += '{"id": "'+courses[courses.length-1]+'", "compliance": 5}';
        // Elaborate the request
        request = '{"requestId": "'+ Meteor.connection._lastSessionId +'",'+
        '"student": [{"id": '+ student +',"gpa": 7.0793,'+
        '"performance": 0.6,"compliance": 3}],'+
        '"courses": ['+ string + '],'+
        '"data": [{"from": '+ dataFrom +',"to": '+ dataTo +','+
        '"program": true,'+
        '"sylabus": true,'+
        '"evaluation": false,'+
        '"instructors": true,'+
        '"compliance": 2}]}';
        // Send the request through websocket
        Websocket.send(request);
      }
    } else if (Websocket.readyState == 3) {
      $("#paperToast").attr("text","Conexión inactiva, volviendo a conectar...");
      document.querySelector('#paperToast').show();
      Websocket = new WebSocket("ws://franciscogutierrez10-80.terminal.com/test");
      Websocket.onopen    = function(evt) { onOpen(evt)   };
      Websocket.onclose   = function(evt) { onClose(evt)  };
      Websocket.onmessage = function(evt) { onMessage(evt)};
      Websocket.onerror   = function(evt) { onError(evt)  };
    }
  }, 2000);
});
