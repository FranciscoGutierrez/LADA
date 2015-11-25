Websocket = new WebSocket("ws://localhost:9000/test");
Websocket.onopen    = function(evt) { onOpen(evt)    };
Websocket.onclose   = function(evt) { onClose(evt)   };
Websocket.onmessage = function(evt) { onMessage(evt) };
Websocket.onerror   = function(evt) { onError(evt)   };

function onOpen(evt) {
  console.log("ws:online");
  doSend('{"reuqestId": "5645f7f7ef0bde57344c84de"}');
}

function onClose(evt) {
  console.log("ws:offline");
}

function onMessage(evt) {
  var r = Math.random() * (1 - 0) + 0;
  console.log("ws:recieved: " + r);
  Session.set("riskValue",r);
  return r;
}

function onError(evt) {
  console.log("ws:error: " + evt.data);
}

function doSend(message) {
  console.log("ws:doSend: " + message);
  Websocket.send(message);
}
