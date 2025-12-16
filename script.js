
const timerDisplayValue=document.getElementById('timer');
const animationsContainer=document.body;
let appleAnimation=[
    '../assets/apple1.png',
    '../assets/apple2.png',
    '../assets/apple3.png',
    '../assets/apple4.png'
]
let lemonAnimation=[
    '../assets/lemon1.png',
    '../assets/lemon2.png',
    '../assets/lemon3.png',
    '../assets/lemon4.png'
]
let theme='pomodoro';

let minutes;
let seconds;

let isPaused=false;
let work_session=false;// if worksession is false then a break section is active
let isFinished=false;//entire session is finished
let isActive=false;//session is active

let currentTimer;
let pomodoro_count=0;

function pause(){
isPaused =true;
toggleicons();

//change display
}

function play(){
  isPaused=false;
  activeDisplay();
  toggleicons();
//change display
}

function stop(){
  const minutesInput = document.getElementById("minuteInput").value;
  const secondsInput = document.getElementById("secondInput").value;
  isFinished=true;
  isActive=false;

  clearInterval(currentTimer);
  minutes=parseInt(minutesInput);//take input
  seconds=parseInt(secondsInput);
  idleDisplay();
  toggleicons();
  updateDisplay();

}

function restart(){
  isPaused=false;
  isActive=true;
  pomodoro_count=0;
  toggleicons();
  currentTimer = setInterval(pomodoro, 1000);
    clearInterval(currentTimer);


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
  isActive=true;

  
if(isActive){
  activeDisplay();
}else {
  idleDisplay();
  
}
toggleicons();
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

const minuteInputLong = parseInt(document.getElementById('minuteInput_long').value);
const secondInputLong= parseInt(document.getElementById('secondInput_long').value);


  if(minutes === 0 && seconds === 0){
    alert_sound.currentTime=0;
    alert_sound.play();
    
  if(work_session){// POMODORO SESSION FINISH
      pomodoro_count++;
pomodoroAnimations(theme);

        if(pomodoro_count===4){// 3 Pomodoros= 1 session, this is whne we naturally finish a session 
        stop();
        alert('session is over, well done!!');
        pomodoro_count=0;
        return;
    }

  
    if(pomodoro_count==2){// LONG BREAK// normal break=5 mins, If we are one 3rd pomodoro, break=10 mins
    minutes=minuteInputLong;
    seconds=secondInputLong;
          document.getElementById('session_name').textContent='Long-Break';
    work_session=false

    }else{
      minutes=minuteInputBreak;
      seconds=secondInputBreak;
      document.getElementById('session_name').textContent='Break';
      work_session=false;
    }

  }else{
        document.getElementById('session_name').textContent='Pomodoro';
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
alert_sound.preload='auto';




function activeDisplay() {
  document.getElementById('timer').style.backgroundColor = '#7F8330';
  document.getElementById('timer').style.color='white';
  document.getElementById('timer').style.transition='0.1s ease-in-out';
  

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
function idleDisplay(){
    const activeImages = document.querySelectorAll('.background_images');
    activeImages.forEach(img=>img.remove());

for(let i=0; i<10; i++){

const images =document.createElement('img');
images.className = 'background_images';
images.src='./assets/tomato_noBG.png';



const rect = images.getBoundingClientRect();

  images.style.top = Math.random() * window.innerHeight + 'px';
  images.style.left = Math.random() * window.innerWidth + 'px';
  images.style.position='absolute';
  images.style.animation='none';


animationsContainer.appendChild(images);
}

}
function switchDisplay(newTheme){
  theme=newTheme;
    let pomodoro=document.querySelector('#pomodoro');
    let timer=document.querySelector('#timer');
    let icons=document.querySelectorAll('.icons');
    let images= document.querySelectorAll('.background_images');
  images.forEach(img => {
    img.src = newTheme === 'lemon'
      ? './assets/lemon_bg.png'
      : './assets/apple_bg.png';
  });
    
  
  //get the color red, or we can do a toggle, where depending on input it toggles to its red, or whatever
if(newTheme==='lemon'){
  theme='lemon';
  pomodoro.src='/assets/lemon.png';
  document.body.style.backgroundColor='#C5F0FF';
  timer.style.transition='none';

  timer.style.backgroundColor='#ffd307';
  document.getElementById('start').style.fill='#FFD307';

  document.getElementById('session_name').style.color='#247453';
  timer.style.color='#247453';
  document.body.style.color='#247453';

}
if(newTheme==='apple'){
  theme='apple';
  pomodoro.src='/assets/apple.png';
  document.body.style.backgroundColor='#FFFFDD';
  timer.style.color='#ffffff';
  timer.style.backgroundColor='#AA0000';

document.body.style.color='#AA0000'
document.getElementById('session_name').style.color='#aa0000';
document.getElementById('start').style.fill='#AA0000';
}
}

function pomodoroAnimations(currentTheme){
    const pomodoro=document.getElementById('pomodoro');

if(pomodoro_count&& pomodoro_count>0 &&pomodoro_count<appleAnimation.length){
      if(currentTheme=='apple'){
           pomodoro.src=appleAnimation[pomodoro_count];
    }
    if(currentTheme=='lemon'){
          pomodoro.src=lemonAnimation[pomodoro_count];
    }
}
}

//toggle play and pause 
function toggleicons(){
  const start_button = document.getElementById('start');
  const play_button  = document.getElementById('play');
  const pause_button = document.getElementById('pause');

  if (!isActive) {
    // Timer not running → show Start
    start_button.style.display = 'block';
    pause_button.style.display = 'none';
    play_button.style.display  = 'none';
    return;
  }

  if (isPaused) {
    // Timer paused → show Play
    start_button.style.display = 'none';
    pause_button.style.display = 'none';
    play_button.style.display  = 'block';
  } else {
    // Timer running → show Pause
    start_button.style.display = 'none';
    pause_button.style.display = 'block';
    play_button.style.display  = 'none';
  }
}


//toggle play and pause 
// function toggleicons(){ 
//   const start_button=document.getElementById('start'); 
//   const play_button= document.getElementById('play'); 
//   const pause_button = document.getElementById('pause'); 
//   if(start_button.style.display==='block' || start_button.style.display==='')
//     { start_button.style.display='none'; 
//       pause_button.style.display='block'; 
//       play_button.style.display='none'; 
//       return; } 
//       if(pause_button.style.display==='block')
//         { pause_button.style.display='none'; 
//           play_button.style.display='block'; }
//           else{ play_button.style.display='none'; 
//             pause_button.style.display='block'; } }


                                             //function calls
idleDisplay();




