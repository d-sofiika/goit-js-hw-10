// Бібліотека flatpickr
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Бібліотека iziToast
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputDate = document.querySelector("#datetime-picker");
const dateTime = document.querySelector("[data-days]");
const hoursTime = document.querySelector("[data-hours]");
const minTime = document.querySelector("[data-minutes]");
const secondTime = document.querySelector("[data-seconds]");
const startBtn = document.querySelector("[data-start]");


let userSelectedDate = 0;
let intervalId;
startBtn.disabled = true;

startBtn.addEventListener("click", () => {
    
  startTimer();
});


// flatpickr


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        const userDate = selectedDates[0];
        const startDate = new Date();
        userSelectedDate = userDate - startDate;
        if (userSelectedDate > 0) {
            startBtn.disabled = false
            
            //updateTimer(convertMs(userSelectedDate));

        } else {
            startBtn.disabled = true; 

            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
            });
            
        }
        userSelectedDate = userDate;
    }
    
};

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer({ days, hours, minutes, seconds }) {
    dateTime.textContent = addLeadingZero(days);
    hoursTime.textContent = addLeadingZero(hours);
    minTime.textContent = addLeadingZero(minutes);
    secondTime.textContent = addLeadingZero(seconds);
 
};


function startTimer() {
    const selectedDate = userSelectedDate;
    intervalId = setInterval(() => {
        const start = new Date();
        const countDown = selectedDate - start;
        startBtn.disabled = true;
        inputDate.disabled = true;

        if (countDown < 1000) {
            clearInterval(intervalId);
            return
        } 
        updateTimer(convertMs(countDown));
    
    }, 1000);

}




flatpickr(inputDate, options); 
