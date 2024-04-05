// Бібліотека flatpickr
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Бібліотека iziToast
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputDate = document.querySelector("#datetime-picker");
const dateTime = document.querySelector("[data-days]");
const hoursTime = document.querySelector("[data-hour]");
const minTime = document.querySelector("[data-minutes]");
const secondTime = document.querySelector("[data-seconds]");
const startBtn = document.querySelector("[data-start]");

startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    inputDate.disabled = true;
    startTimer();
    
});
let userSelectedDate;
let intervalId;

// flatpickr

const options = {
    enableTime: true,
    time_24hr: true,
    minuteIncrement: 1,

    onClose(selectedDates) {
        const userDate = selectedDates[0];
        const startDate = Date.now();

        if (userDate >= startDate) {
            startBtn.disabled = false
            userSelectedDate = userDate - startDate;
            updateTimer(convertMs(userSelectedDate));

        } else {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
            });
            
        }
    }
    
};

flatpickr('#datetime-picker', options);

function updateTimer({ days, hours, minutes, seconds }) {
    dateTime.textContent = `${days}`;
    hoursTime.textContent = `${hours}`;
    minTime.textContent = `${minutes}`;
    secondTime.textContent = `${seconds}`;
 
};


function startTimer() {
    clearInterval(intervalId);
    intervalId = setInterval(timer, 1000);

}

function timer() {
    if (userSelectedDate > 0) {
        userSelectedDate -= 1000;
        updateTimer(convertMs(userSelectedDate));

    } else {
        clearInterval(intervalId);
        inputDate.disabled = false;
    }
    
}

console.log(userSelectedDate);
function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

