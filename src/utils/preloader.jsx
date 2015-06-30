export default function preload(imageArray) {
  var images = new Array()
  for (var i = 0; i < imageArray.length; i++) {
    images[i] = new Image()
    images[i].src = imageArray[i]
  }
}