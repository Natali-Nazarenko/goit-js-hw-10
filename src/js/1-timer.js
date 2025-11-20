import flatpickr from 'flatpickr';
import iziToast from "izitoast";

const inputDate = document.querySelector('input#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const blockClock = document.querySelector('.timer');

const refs = {
            clockDays: blockClock.querySelector('[data-days]'),
            clockHours: blockClock.querySelector('[data-hours]'),
            clockMinutes: blockClock.querySelector('[data-minutes]'),
            clockSeconds: blockClock.querySelector('[data-seconds]'),
}

let userSelectedDate = null;
let currentDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        currentDate = +new Date();
        if (+selectedDates[0] > currentDate) {
            userSelectedDate = +selectedDates[0];
            btnStart.disabled = false;
        } else {
            iziToast.show({
                title: 'Hey',
                message: 'Please choose a date in the future',
                titleColor: 'red',
                messageColor: 'red',
                color: 'yellow',
                position: 'topCenter',
            });
        }
  },
};

flatpickr(inputDate, options);

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

btnStart.addEventListener('click', () => {
    btnStart.disabled = true;
    inputDate.disabled = true;

    timer.start();
})

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

const timer = {
    intervalId: null,
    start() {
        let time = userSelectedDate - currentDate;
        let remainingTime = convertMs(time);

        this.intervalId = setInterval(() => {
            if (time > 0) {

                refs.clockDays.textContent = addLeadingZero(remainingTime.days);
                refs.clockHours.textContent = addLeadingZero(remainingTime.hours);
                refs.clockMinutes.textContent = addLeadingZero(remainingTime.minutes);
                refs.clockSeconds.textContent = addLeadingZero(remainingTime.seconds);
                    
                time -= 1000;
                remainingTime = convertMs(time);
            } else {
                this.stop();
            }
        
    }, 1000);
 },
    stop() {
        clearInterval(this.intervalId);
        inputDate.disabled = false;
},
}