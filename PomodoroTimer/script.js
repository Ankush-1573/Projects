const timeDisplay = document.getElementById('time');
const sessionType = document.getElementById('sessionType');
const progressCircle = document.getElementById('progress');
const sessionCountDisplay = document.getElementById('sessionCount');
const beep = document.getElementById('beep');

const workTime = 25 * 60;
const breakTime = 5 * 60;

let time = workTime;
let isWork = true;
let isRunning = false;
let interval = null;
let sessionCount = 0;

function formatTime(seconds) {
  const min = String(Math.floor(seconds / 60)).padStart(2, '0');
  const sec = String(seconds % 60).padStart(2, '0');
  return `${min}:${sec}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(time);
  sessionType.textContent = isWork ? "Work" : "Break";
  updateProgress();
}

function updateProgress() {
  const total = isWork ? workTime : breakTime;
  const offset = 534 - (534 * time) / total;
  progressCircle.style.strokeDashoffset = offset;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  interval = setInterval(() => {
    time--;
    updateDisplay();
    if (time <= 0) {
      clearInterval(interval);
      beep.play();
      isWork = !isWork;
      time = isWork ? workTime : breakTime;
      if (isWork) sessionCount++;
      sessionCountDisplay.textContent = sessionCount;
      isRunning = false;
      startTimer(); // auto-continue
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(interval);
  isRunning = false;
}

function resetTimer() {
  clearInterval(interval);
  isRunning = false;
  isWork = true;
  time = workTime;
  updateDisplay();
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

updateDisplay();
