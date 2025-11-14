//count down function



//set timer function
const minuteDisplay= document.getElementById('minuteDisplay');
const secondDisplay = document.getElementbyID('secondDisplay');
const minutes=25;
const seconds=0;
const isPaused=false;

function start(){
if(!isPaused){
seconds++
if(seconds>60){
  minutes++
}
minuteDisplay.textContent=minutes;
}
}

function pause(){
isPaused = true;
}

function play(){
  isPaused=false;
}

setInterval(start, 1000);//every second
setInterval(start, 60000);//every minute



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


