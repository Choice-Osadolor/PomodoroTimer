//count down function

//set timer function

// Background images
for(let i=0; i<20; i++){
const images =document.createElement('img');
images.className = 'background_images';

images.src='./assets/tomato_noBG.png';

const rect = images.getBoundingClientRect();

  images.style.top = Math.random() * window.innerHeight + 'px';
  images.style.left = Math.random() * window.innerWidth + 'px';

document.body.appendChild(images); 
}


