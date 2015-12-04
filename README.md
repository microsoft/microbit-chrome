# microbit-chrome
Prototype chrome addon that exposes the micro:bit's serial output to webpages. 
* watch the [demo video](https://vimeo.com/146207766)

# Installation
Until I put this up on the Chrome App Store, see
[developer.chrome.com](https://developer.chrome.com/extensions/getstarted#unpacked)
for instructions on how to install the local version into your chrome browser.

# Requirements
You need Chrome 48 (Canary) for this to work on Windows. This may work on other
platforms with Chrome 46.

# Sample page
The `demo.html` webpage goes along with the
https://github.com/Microsoft/microbit-touchdevelop/blob/master/examples/tcs34725.cpp
program. Run `http-server` from this directory, then visit
http://localhost:8080/demo.html
(keep in mind that pages served from `file://` cannot open ports).
