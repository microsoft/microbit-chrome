var microbitIds = [];
var ports = [];

function onReceive(data, id) {
  ports.forEach(function (port) {
    var view = new DataView(data);
    var decoder = new TextDecoder("utf-8");
    var decodedString = decoder.decode(view);
    port.postMessage({
      type: "serial",
      data: decodedString,
      id: id,
    });
  });
}

function main() {
  chrome.runtime.onConnectExternal.addListener(function (port) {
    if (port.name == "micro:bit") {
      ports.push(port);
      port.onDisconnect.addListener(function () {
        ports = ports.filter(function (x) { return x != port });
      });
    }
  });
  chrome.serial.onReceive.addListener(function (info) {
    if (microbitIds.indexOf(info.connectionId) >= 0)
      onReceive(info.data, info.connectionId);
  });
  chrome.serial.getDevices(function (serialPorts) {
    serialPorts.forEach(function (serialPort) {
      // Chrome 48 and above (11/13: currently in canary)
      if (serialPort.displayName == "mbed Serial Port") {
        chrome.serial.connect(serialPort.path, { bitrate: 115200 }, function (info) {
          microbitIds.push(info.connectionId);
        });
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", main);
