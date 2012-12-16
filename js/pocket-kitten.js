//user feedback if device is not online
if (navigator.onLine == false) {
  alert('Oh nos! It seems you\'re not online :(\nSorry but this app only works if you are online, please connect and try again.');
}


//creates url and loads image
function setImage() {
  //get value between 240 and 440 for the width
  var imageWidth = Math.floor(Math.random() * (200 + 1)) + 240;
  //get value between 320 and 520 for the height
  var imageHeight = Math.floor(Math.random() * (200 + 1)) + 320;

  //Create image source url
  var sourceUrl = 'http://placekitten.com/'+imageWidth+'/'+imageHeight;
  //ge image element
  var domElement = document.getElementById("kitten-image"); 

  //set new image source
  domElement.src = sourceUrl;
}

//run once on app load
setImage();
//run when clicked/tapped
document.body.addEventListener('click', function onKittenSmashed(evt) {
  setImage();
});

