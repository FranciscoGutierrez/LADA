Websocket = new WebSocket("ws://localhost:9000/test");
Websocket.onopen    = function(evt) { onOpen(evt)    };
Websocket.onclose   = function(evt) { onClose(evt)   };
Websocket.onmessage = function(evt) { onMessage(evt) };
Websocket.onerror   = function(evt) { onError(evt)   };

function onOpen(evt) {
  // $("#paperToast").attr("text","Connection is active.");
  // document.querySelector('#paperToast').show();
  // doSend('{"requestId": "5645f7f7ef0bde57344c84de","student": [{"id": "200834711","gpa": 7.0793,"performance": 0.6,"compliance": 3}],"courses": [{"id": "ICF01099","compliance": 2},{ "id": "ICHE00877","compliance": 5},{ "id": "FIEC06460", "compliance": 5}],"data": [{"from": 2009,"to": 2015,"program": true,"sylabus": true,"evaluation": false,"instructors": true,"compliance": 2}]}');
}

function onClose(evt) {
  // $("#paperToast").attr("text","Server is offline.");
  // document.querySelector('#paperToast').show();
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
  // console.log("ws:error: " + evt.data);
}

function doSend(message) {
  console.log("ws:doSend: " + message);
  Websocket.send(message);
}
