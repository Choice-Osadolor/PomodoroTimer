//count down function



//set timer function

const timerDisplayValue=document.getElementById('timer');

let minutes=25;
let seconds=0;
let isPaused=false;
let currentTimer;

function updateDisplay(){
timerDisplayValue.innerText=`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;//display

}

function count(){}

function countdown(){

  if(minutes === 0 & seconds ===0){
    return
  }//if countdown stop...stop counting


  if(!isPaused){//countdown
if(seconds == 0){
  seconds=59;
  minutes--
}else{
  seconds--
}
updateDisplay();
}
}

function stop(){
isPaused =true;
}

function play(){
  isPaused=false;
}

function start(){
  clearInterval(currentTimer);
const minutesInput = document.getElementById("minuteInput").value;
const secondsInput = document.getElementById("secondInput").value;

  minutes=parseInt(minutesInput);//take input
  seconds=parseInt(secondsInput);
updateDisplay();
currentTimer=setInterval(countdown,1000);
}



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


