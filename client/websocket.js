//Websocket = new WebSocket("ws://localhost:8000/test");
// Websocket = new WebSocket("ws://10.43.48.75/test");
StudentFactorsChart = 0;
CoursesFactorsChart = 0;
// Websocket = new WebSocket("ws://franciscogutierrez10-80.terminal.com/test");
Websocket = new WebSocket("wss://franciscogutierrez11-80.terminal.com/test");
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
  // console.log(recieved);
  Session.set("riskValue",recieved.risk);
  Session.set("qualityValue",recieved.quality);
  Session.set("loading",false)
  $(".risk-content-viz").css("opacity",1);
  $(".quality-content-viz").css("opacity",1);
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
        for (var i=0; i<courses.length-1; i++){ string += '{"id": "'+courses[i]+'"},'; }
        string += '{"id": "'+courses[courses.length-1]+'"}';
        request = '{"requestId": "'+ Meteor.connection._lastSessionId +'",'+
        '"source": "espol",'+
        '"student": [{"id": '+ student +',"gpa": 7.0793,'+
        '"performance": 0.6}],'+
        '"courses": ['+ string + '],'+
        '"data": [{"from": '+ dataFrom +',"to": '+ dataTo +','+
        '"program": true,'+
        '"sylabus": true,'+
        '"evaluation": false,'+
        '"instructors": true}]}';
        Websocket.send(request);
        // Session.set("loading",true);
        // $(".risk-content-viz").css("opacity",0.25);
        // $(".quality-content-viz").css("opacity",0.25);
        // console.log(request);
      }
    }
    if (Websocket.readyState == 3) {
      $("#paperToast").attr("text","Connection lost, reconnecting...");
      document.querySelector('#paperToast').show();
      //Websocket = new WebSocket("ws://localhost:8000/test");
      // Websocket = new WebSocket("ws://franciscogutierrez10-80.terminal.com/test");
      Websocket = new WebSocket("wss://franciscogutierrez11-80.terminal.com/test");
      Websocket.onopen    = function(evt) { onOpen(evt)   };
      Websocket.onclose   = function(evt) { onClose(evt)  };
      Websocket.onmessage = function(evt) { onMessage(evt)};
      Websocket.onerror   = function(evt) { onError(evt)  };

      if(courses) {
        for (var i=0; i<courses.length-1; i++){ string += '{"id": "'+courses[i]+'"},'; }
        string += '{"id": "'+courses[courses.length-1]+'"}';
        request = '{"requestId": "'+ Meteor.connection._lastSessionId +'",'+
        '"source": "espol",'+
        '"student": [{"id": '+ student +',"gpa": 7.0793,'+
        '"performance": 0.6}],'+
        '"courses": ['+ string + '],'+
        '"data": [{"from": '+ dataFrom +',"to": '+ dataTo +','+
        '"program": true,'+
        '"sylabus": true,'+
        '"evaluation": false,'+
        '"instructors": true}]}';
        Websocket.send(request);
        // Session.set("loading",true);
        // $(".risk-content-viz").css("opacity",0.25);
        // $(".quality-content-viz").css("opacity",0.25);
        // console.log(request);
      }
    }
  }, 7000);
});
