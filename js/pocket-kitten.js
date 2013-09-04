//TODO MEOW WHEN IDLE
//TODO COMIC ANTO HEROES @ NIGHT
//TODO SHAKE CHANGE PICTURE

//user feedback if device is not online
//CHECK WORKS IN BROWSERS
//TODO CACHING
if (navigator.onLine === false) {
  alert('Oh nos! It seems you\'re not online :(\nSorry but this app only works if you are online, please connect and try again.');
}

var bufferImg = document.createElement('img');

//ONLINE
//VIBRATION
//add below, 2) add light value to function 4) if call lightValue
//All very well and good but I did promise some vibration so...
//HERE----------------------------------------
var lightValue;

window.addEventListener('devicelight', function(event) {
  lightValue = event.value;
});
//-----------------------------------------------

//TODO MAKE IMAGE RESPONSIVE
//creates url and loads image~~~~~~~~~~~~~~~~~~~~~~
function setImage(lightValue) {
  var urlOrigin = 'http://placekitten.com/'; //kittenUrl
  if (lightValue < 50) {
    urlOrigin = 'http://placedog.com/'; //puppyUrl
  }
  //get value between 240 and 440 for the width
  var imageWidth = Math.floor(Math.random() * (200 + 1)) + 240;
  //get value between 320 and 520 for the height
  var imageHeight = Math.floor(Math.random() * (200 + 1)) + 320;

  //Create image source url
  var sourceUrl = urlOrigin+imageWidth+'/'+imageHeight;
  //get image element
  var domElement = document.getElementById("kitten-image");
  var loader = document.getElementById("loader");

  bufferImg.src = sourceUrl;
  loader.className = 'loading';

  //set new image source
  bufferImg.onload = function() {
    loader.className = '';
    domElement.src = sourceUrl;
  }

//TODO ON IMAGE SHOW
//HERE FIRST--------------------------------
  if (navigator.vibrate) {
    navigator.vibrate([0,300,200]);
  }
//-------------------------------------------
}

//run once on app load
setImage();
//run when clicked/tapped
document.body.addEventListener('click', function onKittenSmashed(evt) {
  setImage(lightValue);
});
document.body.addEventListener('touchstart', function onKittenSmashed(evt) {
  setImage(lightValue);
});


//TODO TEST INSTALL
//do install button shizzle~~~~~~~~~~~~~~~~~~~~~~~~~~~
function Install() {
  this.state = "idle";
  // trigger events registration
  var events = new Object();
  this.on = function(name, func) {
    events[name] = (events[name] || []).concat([func]);
  };
  this.off = function(name, func) {
    if (events[name]) {
      var res = [];
      for (var i=0, l=events[name].length; i<l; ++i) {
        var f = events[name][i];
        if (f != func) res.push();
      }
      events[name] = res;
    }
  };
  this.trigger = function(name) {
    var args = Array.prototype.slice.call(arguments, 1);
    if (events[name]) {
      for (var i=0, l=events[name].length; i<l; ++i) {
        events[name][i].apply(this, args);
      }
    }
  };
  this.triggerChange = function(state) {
    this.state = state;
    this.trigger("change", this.state);
  }
  if (navigator.mozApps) {
    var request = navigator.mozApps.getSelf();
    var that = this;
    request.onsuccess = function () {
      if (!this.result) {
        that.triggerChange("uninstalled");
        that.installUrl = 'http://rumyra.github.io/Pocket-Kitten/manifest.webapp';
        // that.installUrl = (
        //   location.href.substring(0, location.href.lastIndexOf("/")) + "/manifest.webapp"
        //   );
        that.doIt = function() {
          try {
            var req2 = navigator.mozApps.install(that.installUrl);
            req2.onsuccess = function(data) {
              that.triggerChange("installed");
            };
            req2.onerror = function() {
              that.error = this.error;
              that.triggerChange("failed");
            };
          } catch (error) {
            that.error = error;
            that.triggerChange("failed");
          }
        };
      } else {
        that.triggerChange("installed");
      }
    };
    request.onerror = function (error) {
      that.error = error;
      that.triggerChange("failed");
    };
  } else if ((typeof chrome !== "undefined") && chrome.webstore && chrome.app) {
    if (!chrome.app.isInstalled) {
      this.triggerChange("uninstalled");
      var that = this;
      this.doIt = function() {
        chrome.webstore.install(
          null,
          function () { that.triggerChange("installed"); },
          function (err) {
            that.error = err;
            that.triggerChange("failed");
          }
        );
      };
    } else {
      this.triggerChange("installed");
    }
  } else if (typeof window.navigator.standalone !== "undefined") {
    if (!window.navigator.standalone) {
      this.triggerChange("uninstalled");

/*| Right now, just asks that something show a UI element mentioning | how to install using Safari's "Add to Home Screen" button.*/

      this.doIt = function() {
        this.trigger("showiOSInstall", navigator.platform.toLowerCase());
      };
    } else {
      this.triggerChange("installed");
    }
  } else {
    this.triggerChange("unsupported");
  }
  return this;
}

function setInstallButton(buttonId) {
  if (!document.getElementById(buttonId)) {
    document.addEventListener("DOMContentLoaded", setInstallButton);
  } else {
    var install = new Install();
    var buttonElt = document.getElementById(buttonId);
    install.on(
      "change",
      function() {
        buttonElt.style.display = (
          (install.state == "uninstalled")? "block" : "none"
          );
        if (install.state == "failed") {
          alert("Install failed:\n" + install.error);
        }
      }
    );
    install.on(
      "showiOSInstall",
      function() {
        alert("To install, press the forward arrow in Safari "+"and touch \"Add to Home Screen\"");
      }
    );
    buttonElt.addEventListener(
      "click", function() { install.doIt(); }
      );
  }
}

setInstallButton("btnInstall");

