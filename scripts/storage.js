export function saveState(state) {
    localStorage.setItem('pomodoroState', JSON.stringify(state));
}

// export function loadState() {
//     const savedState = localStorage.getItem('pomodoroState');
//     return savedState ? JSON.parse(savedState) : null;
// }

export function loadState() {
  try {
    const raw = localStorage.getItem('state');
    if (!raw) return null;

    const data = JSON.parse(raw);

    return {
      tasks: data.tasks || [],
      currentTheme: data.currentTheme || 'default',
      pomodoroCount: data.pomodoroCount || 0,
      mode: data.mode || 'focus'
    };

  } catch (e) {
    console.error("State broken, resetting:", e);
    localStorage.removeItem('state');
    return null;
  }
}