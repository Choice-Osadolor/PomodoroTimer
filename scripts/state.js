import {saveState, loadState} from './storage.js';

export const state = {
    focusLength: 25,
    breakLength: 5,
    longBreakLength: 5,

    timeLeft: 25 * 60,

    isPaused: false,
    isActive: false,
    isFinished: false,

    mode: "focus", // "focus", "break", "longBreak",
    tasks:[],

    pomodoroCount: 0,
    pomodoroMax: 4,

    currentTheme: "default",
    currentFrameIndex: 0,
};



export let timerInterval = null;


export const themes = {
  default: {
    frames: [
      'assets/tomato.png',
      'assets/tomato.png',
      'assets/tomato.png',
      'assets/tomato.png',
      'assets/tomato.png',
    ]
  },
  lemon: {
    frames: [
        'assets/lemon.png' ,
      'assets/lemontheme/lemonframe1.webp',
      'assets/lemontheme/lemonframe2.webp',
      'assets/lemontheme/lemonframe3.webp',
      'assets/lemontheme/lemonframe4.webp',
      'assets/lemontheme/lemonframe5.webp',
    ]
  },
  apple: {
    frames: [
        'assets/apple.png',
      'assets/appletheme/appleframe1.webp',
      'assets/appletheme/appleframe2.webp',
      'assets/appletheme/appleframe3.webp',
      'assets/appletheme/appleframe4.webp',
      'assets/appletheme/appleframe5.webp',
    ]
  }
};