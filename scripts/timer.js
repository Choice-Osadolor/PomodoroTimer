import{state} from './state.js';
import {saveState, loadState} from './storage.js';
import {toggleicons,updateDisplay,updatePomodoroImage} from './render.js';

let currentTimer;

// Notification
const alert_sound = new Audio('assets/notification.mp3');
alert_sound.preload='auto';

export function pause(){
state.isPaused=true;
toggleicons('play');

}

export function play(){
  state.isPaused=false;
  toggleicons('pause');
//change display
}

export function stop(){
  
  state.isFinished=true;
  state.isActive=false;

  clearInterval(currentTimer);
  resetTimer();
  toggleicons('stop');
  updateDisplay();

}

export function resetTimer() {
  state.timeLeft = state.focusLength * 60;
}

export function restart(){
  clearInterval(currentTimer);
  state.isPaused=false;
  state.isActive=true;
  state.pomodoroCount=0;
  resetTimer();
  updateDisplay();
  toggleicons('pause');
  currentTimer = setInterval(pomodoro, 1000);
  document.getElementById('start-btn').style.display='none';
}

export function start(){
  clearInterval(currentTimer);
  
  state.mode='focus';
  state.isActive=true;
  state.isPaused=false;
  state.isFinished=false;
  state.pomodoroCount=0;

    state.timeLeft = state.focusLength * 60;

  
toggleicons('pause');
updateDisplay();
currentTimer=setInterval(pomodoro,1000);
        document.getElementById('focus_name').textContent=state.mode.charAt(0).toUpperCase() + state.mode.slice(1);


}


export function pomodoro(){

  if(state.timeLeft <= 0){
    alert_sound.currentTime=0;
    alert_sound.play();
    
  if(state.mode === 'focus'){// POMODORO FOCUS FINISH
      state.pomodoroCount++;
      updatePomodoroImage();
     saveState(state);

      if(state.pomodoroCount===state.pomodoroMax){// 3 Pomodoros= 1 focus session, this is when we naturally finish a focus session 
        stop();
        showFocusEndImage();
        state.pomodoroCount=0;
        return;
     }
  
      if(state.pomodoroCount==2){// LONG BREAK// normal break=5 mins, If we are one 3rd pomodoro, break=10 mins
        state.timeLeft=state.longBreakLength*60;
        state.mode='long-break';
      }else{
      state.timeLeft=state.breakLength*60;
      state.mode='break';
    }

    }else{
      state.mode='focus';
      state.timeLeft=state.focusLength*60;
      saveState(state);    
    }
    
    updateDisplay();
    return;
  }//if countdown stop...stop counting


if(!state.isPaused){//if timer is running...countdown, then update display, 
  state.timeLeft--;
  updateDisplay();
  updatePomodoroImage(); // Update animation frame during countdown
}

}

function showFocusEndImage(){
  const overlay = document.getElementById('focus-end-overlay');
  if (!overlay) return;
  overlay.classList.add('show');
  clearTimeout(overlay.hideTimeout);
  overlay.hideTimeout = setTimeout(() => {
    overlay.classList.remove('show');
  }, 5000);
}

// Notification moved to top
// //Making it permananet. . use actual time

// const started_at=Date.now;
// let elapsedTime = Date.now() - startedAt;
// state.timeLeft=end_at-Date.now

// //When timer starts, compute time started, and the end time an duration of timer
// const end_at = Date.now() + durationMs
// const durationMs=(state.focusLength*60)+(state.breakLength*60*1000);//timer is in milliseconds so we add *1000 to convert from seconds to milliseconds