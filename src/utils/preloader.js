const preload = (imageArray) => {
  const images = [];
  for (let i = 0; i < imageArray.length; i++) {
    images[i] = new Image();
    images[i].src = imageArray[i];
  }
};

export default preload;
