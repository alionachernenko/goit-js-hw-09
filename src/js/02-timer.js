import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";

const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysField: document.querySelector('[data-days]'),
  hoursField: document.querySelector('[data-hours]'),
  minutesField: document.querySelector('[data-minutes]'),
  secondsField: document.querySelector('[data-seconds]'),
};
let timerIntervalId = null;

refs.startBtn.disabled = true;

const fp = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onDateSelectionWindowClose(selectedDates)
  }})


function onDateSelectionWindowClose(selectedDates) {
  if (selectedDates[0].getTime() < Date.now()) {
    Notiflix.Notify.warning('Please choose a date in the future');
    return;
  }
  else {
    refs.startBtn.disabled = false
    refs.startBtn.addEventListener('click', () => {
      timerIntervalId = setInterval(() => {
        if (selectedDates[0].getTime() - Date.now() < 1000) {
          clearInterval(timerIntervalId);
        }
    
        let currentTime = convertMs(selectedDates[0].getTime() - Date.now());
        refs.daysField.textContent = addLeadingZero(currentTime.days);
        refs.hoursField.textContent = addLeadingZero(currentTime.hours);
        refs.minutesField.textContent = addLeadingZero(currentTime.minutes);
        refs.secondsField.textContent = addLeadingZero(currentTime.seconds);
      }, 1000);
})
}}

function addLeadingZero(value) {
  return String(value).padStart(2, 0)
}
































      //   refs.startBtn.disabled = true;
//     } else {
//       let currentTime = convertMs(selectedDates[0].getTime() - Date.now());
//       refs.startBtn.disabled = false;
//       refs.daysField.textContent = currentTime.days;
//       refs.hoursField.textContent = currentTime.hours;
//       refs.minutesField.textContent = currentTime.minutes;
//       refs.secondsField.textContent = currentTime.seconds;
//     }
//   },
// }); // flatpickr

// let selectedDate = fp.selectedDates[0];

// refs.startBtn.addEventListener('click', onStartBtnClick);

// function onStartBtnClick() {
//   timerIntervalId = setInterval(() => {
//     if (selectedDate.getTime() - Date.now() < 1000) {
//       clearInterval(timerIntervalId);
//     }

//     let currentTime = convertMs(selectedDate.getTime() - Date.now());

//     refs.daysField.textContent = currentTime.days;
//     refs.hoursField.textContent = currentTime.hours;
//     refs.minutesField.textContent = currentTime.minutes;
//     refs.secondsField.textContent = currentTime.seconds;
//   }, 1000);
// }

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
