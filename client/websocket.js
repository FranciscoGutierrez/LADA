// Websocket = new WebSocket("ws://localhost:9000/test");
Websocket = new WebSocket("ws://franciscogutierrez10-80.terminal.com/test");
Websocket.onopen    = function(evt) { onOpen(evt)    };
Websocket.onclose   = function(evt) { onClose(evt)   };
Websocket.onmessage = function(evt) { onMessage(evt) };
Websocket.onerror   = function(evt) { onError(evt)   };

function onOpen(evt) {
  console.log("ws:connected");
}

function onClose(evt) {
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
  console.log("ws:error: " + evt.data);
}

function doSend(message) {
  console.log("ws:doSend: " + message);
  Websocket.send(message);
  $("#paperToast").attr("text","Loading...");
  document.querySelector('#paperToast').show();
}

$(document).ready(function() {
  setInterval(function(){
    var courses = Session.get('courses');
    var student = Session.get('student');
    if(Websocket.readyState == 1) {
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
    } else if (Websocket.readyState == 3) {
      // $("#paperToast").attr("text","Lost connection...");
      // document.querySelector('#paperToast').show();
    }
  }, 2000);
});
