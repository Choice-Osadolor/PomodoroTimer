export function saveState(state) {
    localStorage.setItem('pomodoroState', JSON.stringify(state));
}

export function loadState() {
    const savedState = localStorage.getItem('pomodoroState');
    return savedState ? JSON.parse(savedState) : null;
}