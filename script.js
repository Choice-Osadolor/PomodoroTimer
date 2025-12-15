
const timerDisplayValue=document.getElementById('timer');
const animationsContainer=document.body;

let minutes;
let seconds;

let isPaused=false;
let work_session=false;

let currentTimer;
let pomodoro_count=0;

function pause(){
isPaused =true;

//change display
}

function play(){
  isPaused=false;
//change display
}

function stop(){
  clearInterval(currentTimer);

}

function restart(){
    clearInterval(currentTimer);
    start();

}

function start(){
  const minutesInput = document.getElementById("minuteInput").value;
  const secondsInput = document.getElementById("secondInput").value;

  clearInterval(currentTimer);

  minutes=parseInt(minutesInput);//take input
  seconds=parseInt(secondsInput);

  if(isNaN(minutes)|| isNaN(seconds)){
    minutes=0;
    seconds=0;
  }
  work_session=true;
  pomodoro_count=0;
  isPaused=false;

activeDisplay();
updateDisplay();
currentTimer=setInterval(pomodoro,1000);


}

function updateDisplay(){
timerDisplayValue.innerText=`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;//display

}

function pomodoro(){
const minuteInputBreak = parseInt(document.getElementById('minuteInput_break').value);
const secondInputBreak= parseInt(document.getElementById('secondInput_break').value);

const minutesInput = parseInt(document.getElementById("minuteInput").value);
const secondsInput = parseInt(document.getElementById("secondInput").value);

  if(minutes === 0 && seconds === 0){
    setTimeout(pomodoro,10000);
    alert_sound.currentTime=0;
    alert_sound.play();
    if(work_session){
      pomodoro_count++;
      minutes=minuteInputBreak;
      seconds=secondInputBreak;
      work_session=false;
    }else{
      minutes=minutesInput;
      seconds=secondsInput;
      work_session=true;
      
    }
    updateDisplay();
    return;
  }//if countdown stop...stop counting


  if(!isPaused){//if timer is running...countdown, then update display, 
if(seconds == 0){
  seconds=59;
  minutes--
}else{
  seconds--
}
updateDisplay();
}

}

// Notification
const alert_sound = new Audio('notification.mp3');
alert_sound.preload;




function activeDisplay() {
  document.getElementById('timer').style.backgroundColor = '#7F8330';
  document.getElementById('timer').style.transition='1s ease-in-out';

  // select all tomato images
  const images = document.querySelectorAll('.background_images');

  images.forEach((img,index) => {
    img.style.top = 'auto';
    img.style.left = 'auto';
    img.style.position = 'relative';
    img.style.animation='bounce 2s ease infinite';
    img.style.animationDelay=`${index * 0.5}s`;

  });
}

// Background images
for(let i=0; i<10; i++){
const images =document.createElement('img');
images.className = 'background_images';
images.src='./assets/tomato_noBG.png';


const rect = images.getBoundingClientRect();

  images.style.top = Math.random() * window.innerHeight + 'px';
  images.style.left = Math.random() * window.innerWidth + 'px';
  images.style.position='absolute';


animationsContainer.appendChild(images); 
}

//toggle play and pause 
function toggleicons(){
 const start_button=document.getElementById('start');
 const play_button= document.getElementById('play');
 const pause_button = document.getElementById('pause');

 if(start_button.style.display==='block' || start_button.style.display===''){
  start_button.style.display='none';
  pause_button.style.display='block';
  play_button.style.display='none';
  return;
 }
 
if(pause_button.style.display==='block'){
  pause_button.style.display='none';
  play_button.style.display='block';
}else{
  play_button.style.display='none';
  pause_button.style.display='block';
}

}