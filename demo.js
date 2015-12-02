function updateColor(r, g, b, c) {
  r /= c; r *= 256;
  g /= c; g *= 256;
  b /= c; b *= 256;
  // var clamp = function (x) { return Math.min(255, Math.pow(x/255, 2.5)*255); };
  var clamp = function (x) { return Math.round(x); }
  var red = clamp(r);
  var green = clamp(g);
  var blue = clamp(b);
  var span = document.getElementById("color");
  span.style.backgroundColor = "rgb("+red+","+green+","+blue+")";
}

var buf = "";
var port = chrome.runtime.connect("jmockekaclnoghdblhiogkkhadjmdkin", { name: "touchdevelop" });
port.onMessage.addListener(function (msg) {
  if (msg.type == "serial") {
    buf += msg.data;
    var i = buf.lastIndexOf("\n");
    if (i >= 0) {
      var msg = buf.substring(0, i+1);
      var log = document.getElementById("log");
      var newText = log.textContent + msg;
      if (newText.length > 2048) {
        newText = newText.substr(-2048);
        newText = newText.substr(newText.indexOf("\n")+1);
      }
      log.textContent = newText;
      log.scrollTop = log.scrollHeight;
      var re = /(\d+), (\d+), (\d+), (\d+)/;
      var matches = msg.match(re);
      if (matches) {
        var r = parseInt(matches[1]);
        var g = parseInt(matches[2]);
        var b = parseInt(matches[3]);
        var c = parseInt(matches[4]);
        updateColor(r, g, b, c);
      }
      buf = buf.slice(i+1);
    }
  }
});

