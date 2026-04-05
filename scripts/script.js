
const timerDisplayValue=document.querySelector('#session_timer');
timerDisplayValue.textContent='25:00';

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
toggleicons('play');

//change display
}

function play(){
  isPaused=false;
  toggleicons('pause');
//change display
}

function stop(){
  const minutesInput = document.getElementById("minuteInput").textContent;
  const secondsInput = document.getElementById("secondInput").textContent;
  isFinished=true;
  isActive=false;

  clearInterval(currentTimer);
  minutes=parseInt(minutesInput);//take input
  seconds=parseInt(secondsInput);
  toggleicons('stop');
  updateDisplay();

}

function restart(){
  isPaused=false;
  isActive=true;
  pomodoro_count=0;
  currentTimer = setInterval(pomodoro, 1000);
    clearInterval(currentTimer);


}

function start(){
  const minutesInput = document.getElementById("minuteInput").textContent;
  const secondsInput = document.getElementById("secondInput").textContent;

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

  
toggleicons('pause');
updateDisplay();
currentTimer=setInterval(pomodoro,1000);


}

function updateDisplay(){
timerDisplayValue.innerText=`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;//display


}

function pomodoro(){
const minuteInputBreak = parseInt(document.getElementById('minuteInput_break').textContent);
const secondInputBreak= parseInt(document.getElementById('secondInput_break').textContent);

const minutesInput = parseInt(document.getElementById("minuteInput").textContent);
const secondsInput = parseInt(document.getElementById("secondInput").textContent);

const minuteInputLong = parseInt(document.getElementById('minuteInput_long')?.textContent || '10');
const secondInputLong= parseInt(document.getElementById('secondInput_long')?.textContent || '00');


  if(minutes === 0 && seconds === 0){
    alert_sound.currentTime=0;
    alert_sound.play();
    
  if(work_session){// POMODORO SESSION FINISH
      pomodoro_count++;

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

function toggleicons(button){
  // Placeholder for icon toggling logic
  
  //take in button, match it to the id, and for each in that class
  const buttons = document.querySelectorAll('.icons');
  buttons.forEach(btn => {
    if(btn.id === `${button}-btn`){
      btn.style.display = 'block';
    } else {
      btn.style.display = 'none';
    }
  });

}



//Onclick functions for buttons
const startBtn=document.getElementById('start-btn');
startBtn.addEventListener('click',function(){
  start();
  startBtn.style.display='none';
  console.log('start');
});

const settingsBtn=document.getElementById('settings-btn');
settingsBtn.addEventListener('click',()=>{
  const settingsContainer=document.getElementById('timer_settings');
  settingsContainer.classList.toggle('active');
});

const pauseBtn=document.getElementById('pause-btn');
pauseBtn.addEventListener('click',pause);

const playBtn=document.getElementById('play-btn');
playBtn.addEventListener('click',play);

const restartBtn=document.getElementById('restart-btn');
restartBtn.addEventListener('click',restart);

const stopBtn=document.getElementById('stop-btn');
stopBtn.addEventListener('click',stop);






