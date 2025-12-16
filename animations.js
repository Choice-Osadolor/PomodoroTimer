
const timerDisplayValue=document.getElementById('timer');
const animationsContainer=document.body;
let appleAnimation=[
    '../assetsapple1.png',
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
const themes = {
  pomodoro: {
    pomodoroImg: '../assets/pomodoro_timer.png',
    pomodoroBG:'../assets/tomato_noBG.png',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    timerColor: '#7F8330',
    iconColor: '#7F8330',
    animation: null
  },
  apple: {
    pomodoroImg: '../assets/apple.png',
    pomodoroBG:'../assets/apple_bg.png',
    backgroundColor: '#FFFFDD',
    textColor: '#AA0000',
    timerColor: '#AA0000',
    iconColor: '#AA0000',
    animation: appleAnimation
  },
  lemon: {
    pomodoroImg: '../assets/lemon.png',
    pomodoroBG:'../assets/lemon_bg.png',
    backgroundColor: '#C5F0FF',
    textColor: '#247453',
    timerColor: '#247453',
    iconColor: '#FFD307',
    animation: lemonAnimation
  }
};
let theme='pomodoro'

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
  toggleicons();
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


  if(minutes === 0 && seconds === 0){
    alert_sound.currentTime=0.3;
    alert_sound.play();
    
  if(work_session){// POMODORO SESSION FINISH
      pomodoro_count++;
      pomodoroAnimations(theme);
      
        if(pomodoro_count===4){// 6 Pomodoros= 1 session, this is whne we naturally finish a session 
        stop();
        alert('session is over, well done!!');
        pomodoro_count=0;
        return;
    }

  
    if(pomodoro_count==2){// LONG BREAK// normal break=5 mins, If we are one 3rd pomodoro, break=10 mins
    minutes=0;
    seconds=3;
          document.getElementById('session_name').textContent='Long-Break';

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
function switchDisplay(currentTheme){
  const theme=themes[currentTheme];
  const icons = document.querySelectorAll('.icons');

document.querySelector('#pomodoro').src=theme.pomodoroImg;
document.querySelector('#timer').style.color = theme.timerColor;

document.body.style.backgroundColor=theme.backgroundColor;
document.body.style.color=theme.textColor;

icons.forEach(icon => icon.style.fill = themeData.iconColor || themeData.iconColor);

  
if(isActive){
  pomodoroAnimations();
}
}

function pomodoroAnimations(){
    const pomodoro=document.getElementById('pomodoro')
    let theme=themes[theme];

    if(theme.animation){
     pomodoro.src=theme.animation[pomodoro_count];
    }else{
       pomodoro.src=theme.pomodoroImg;

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
// pomodoroAnimations();




