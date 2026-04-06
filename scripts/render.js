import {state} from './state.js';
import { saveState,loadState } from './storage.js';

const timerDisplayValue=document.querySelector('#focus_timer');


export function toggleicons(button){
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

export function updateDisplay(){
  const minutes = Math.floor(state.timeLeft / 60);
  const seconds = state.timeLeft % 60;
  timerDisplayValue.innerText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const focusName = document.getElementById('focus_name');
  focusName.textContent = state.mode.charAt(0).toUpperCase() + state.mode.slice(1);
}


export function incrementTimerSettings(type){

  switch(type) {
    case 'session':
      state.focusLength += 5;
      break;
    case 'break':
      state.breakLength += 5;
      break;
    case 'pomodoro':
      state.pomodoroMax ++;
      break;
  }
  saveState();
}

export function decrementTimerSettings(type){

  switch(type) {
    case 'session':
      state.focusLength -= 5;
      break;
    case 'break':
      state.breakLength -= 5;
      break;
    case 'pomodoro':
      state.pomodoroMax --;
      break;
  }
  saveState();
}

//when i click on this button, check teh aprnets id, incremenet the state.time ,based on the id,  instead.

//function('break'), incremenst the break length
