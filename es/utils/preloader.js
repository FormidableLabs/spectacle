import forEach from 'lodash/forEach';

var preload = function preload(imageCollection) {
  forEach(imageCollection, function (src) {
    var image = new Image();
    image.src = src;
  });
};

export default preload;