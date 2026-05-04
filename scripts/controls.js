import {play,pause,restart,stop,start} from './timer.js';
import { incrementTimerSettings , decrementTimerSettings, updateSettingsDisplay, updatePomodoroImage} from './render.js';
import { state , themes} from './state.js';
import { saveState, loadState } from './storage.js';

console.log('contols loaded');


const persistedState = loadState(); 

if (persistedState) {
  Object.assign(state, persistedState);
}

console.log("persisted:", persistedState);
console.log('loaded state:'+state)

// Initialize display on load
updateSettingsDisplay();
renderTasks();
  
//Onclick functions for buttons
const startBtn=document.getElementById('start-btn');
startBtn.addEventListener('click',function(){
  start();
  startBtn.style.display='none';
  console.log('start');
});

const navSettingsBtn = document.getElementById('settings-btn');
navSettingsBtn.addEventListener('click', () => {
  const settingsContainer = document.getElementById('timer_settings');
  settingsContainer.classList.toggle('active');
});

function addTask(){
    //Onlcikc, add a task and renderall takss
        console.log('addtask called');

const input=document.getElementById('task-input');
if (!input) return;
const inputText= input.value.trim();

  const newTask = {
    id: Date.now(),
    text:inputText,
    completed: false
  };

  state.tasks.push(newTask);
  saveState(state);
  renderTasks();
  input.value='';
          console.log('task added');

}

function createTask(task){
        console.log('createtask opened');

  const li = document.createElement("li");
  const checkbox=document.createElement('input');
  checkbox.type='checkbox';

  checkbox.checked = task.completed;
  checkbox.addEventListener('change',()=>{
    task.completed=checkbox.checked;//equals true
    // p.style.textDecoration='underline black solid 1px'
    saveState(state);
  })

  const p=document.createElement('p');
  p.textContent=task.text;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✖';
  deleteBtn.onclick = () => deleteTask(task.id);

  li.appendChild(checkbox);
  li.appendChild(p);
  li.appendChild(deleteBtn);
    console.log('task created');

  return li;
  
}

function deleteTask(taskId){
    
  state.tasks = state.tasks.filter((task) => task.id !== taskId);
  saveState(state);
  renderTasks();
}

function renderTasks(){
            console.log('pls render');

  const list = document.querySelector("#tasklist");
  if (!list) return;
  list.innerHTML='';

  state.tasks.forEach(task =>{
    const tsk=createTask(task);
    list.appendChild(tsk);
  })
              console.log('task rendered');

}

function applyTheme(themeName){
  //fetch from themes object, set css variables, save to state
  //save to state, fetch from state, in a fcntion if curet yheme==themname apply theme, else do nothing
  if (state.currentTheme === themeName) return;
  if (!themes[themeName]) return;
  state.currentTheme = themeName;
  state.currentFrameIndex = 0;
  saveState(state);
  
  const theme = themes[themeName];
  document.documentElement.setAttribute('data-theme', themeName);
  document.getElementById('pomodoro').src = theme.frames[0];
  document.getElementById('pomodoro-mini').src = theme.frames[0];


}


function switchTheme(themeName) {
  applyTheme(themeName);
}
                                                                          //ON WINDOW LOAD

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(state.currentTheme || 'default');
  document.documentElement.setAttribute('data-theme', state.currentTheme);

  const current = themes[state.currentTheme];
  if (current && current.frames?.length) {
    document.getElementById('pomodoro').src = current.frames[0];
    const mini = document.getElementById('pomodoro-mini');
    if (mini) mini.src = current.frames[0];
  }

});
renderTasks();


// Event listeners for buttons

                                               // Timer control buttons

const pauseBtn=document.getElementById('pause-btn');
pauseBtn.addEventListener('click',pause);

const playBtn=document.getElementById('play-btn');
playBtn.addEventListener('click',play);


                                             // Settings buttons
const addTaskBtn = document.getElementById('addTask-btn');
addTaskBtn.addEventListener('click', addTask); 

const taskBtn=document.getElementById('tasks-btn');
taskBtn.addEventListener('click',()=>{
    document.querySelector('#tasks-container').classList.toggle('active');

})
const restartBtn=document.getElementById('restart-btn');
restartBtn.addEventListener('click',restart);


// Increment buttons
document.getElementById('plus-focus').addEventListener('click', () => incrementTimerSettings('focus'));
document.getElementById('plus-break').addEventListener('click', () => incrementTimerSettings('break'));
document.getElementById('plus-pomodoro').addEventListener('click', () => incrementTimerSettings('pomodoro'));

// Decrement buttons
document.getElementById('minus-focus').addEventListener('click', () => decrementTimerSettings('focus'));
document.getElementById('minus-break').addEventListener('click', () => decrementTimerSettings('break'));
document.getElementById('minus-pomodoro').addEventListener('click', () => decrementTimerSettings('pomodoro'));



const themesBtn= document.getElementById('themes-btn');
themesBtn.addEventListener('click',()=>{
    document.querySelector('#themes_container').classList.toggle('active');
})




                                          // Theme buttons
const themeAppleBtn = document.getElementById('theme-applebtn');
themeAppleBtn.addEventListener('click', () => {
  switchTheme('apple');
      document.querySelector('#themes_container').classList.toggle('active');

});

const themeLemonBtn = document.getElementById('theme-lemonbtn');
themeLemonBtn.addEventListener('click', () => {
    switchTheme('lemon');
        document.querySelector('#themes_container').classList.toggle('active');

});

const themeDefaultBtn = document.getElementById('theme-defaultbtn');
themeDefaultBtn.addEventListener('click', () => {
    switchTheme('default');
        document.querySelector('#themes_container').classList.toggle('active');

});




const stopBtn=document.getElementById('stop-btn');
if (stopBtn) {
  stopBtn.addEventListener('click', stop);
}

// Close buttons
const closeButtons = document.querySelectorAll('.close');

closeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const section = btn.closest('section');
    if (section) {
      section.classList.remove('active');
    }
  });
});