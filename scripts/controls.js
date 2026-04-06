import {play,pause,restart,stop,start} from './timer.js';
import { incrementTimerSettings , decrementTimerSettings} from './render.js';

console.log('pls work')
//Onclick functions for buttons
const startBtn=document.getElementById('start-btn');
startBtn.addEventListener('click',function(){
  start();
  startBtn.style.display='none';
  console.log('start');
});

const settingsBtn=document.querySelectorAll('.settings-btn');
settingsBtn.forEach((btn)=>{
    btn.addEventListener('click',()=>{
  const settingsContainer=document.getElementById('timer_settings');
  settingsContainer.classList.toggle('active');
});

})

const pauseBtn=document.getElementById('pause-btn');
pauseBtn.addEventListener('click',pause);

const playBtn=document.getElementById('play-btn');
playBtn.addEventListener('click',play);
// Increment buttons
document.getElementById('plus-focus').addEventListener('click', () => incrementTimerSettings('session'));
document.getElementById('plus-break').addEventListener('click', () => incrementTimerSettings('break'));
document.getElementById('plus-pomodoro').addEventListener('click', () => incrementTimerSettings('pomodoro'));

// Decrement buttons
document.getElementById('minus-focus').addEventListener('click', () => decrementTimerSettings('session'));
document.getElementById('minus-break').addEventListener('click', () => decrementTimerSettings('break'));
document.getElementById('minus-pomodoro').addEventListener('click', () => decrementTimerSettings('pomodoro'));

const restartBtn=document.getElementById('restart-btn');
restartBtn.addEventListener('click',restart);

const stopBtn=document.getElementById('stop-btn');
stopBtn.addEventListener('click',stop);



