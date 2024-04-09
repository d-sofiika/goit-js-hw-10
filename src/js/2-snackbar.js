// Бібліотека iziToast
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', sentPromise);

function sentPromise(event) {
  const delay = +form.delay.value;
  const checkbox = form.state.value;
  event.preventDefault();

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (checkbox === 'fulfilled') {
        resolve('value');
      } else if (checkbox === 'rejected') {
        reject('error');
      }
    }, delay);
  });

  promise.then(
    value => {
      iziToast.success({
        title: 'OK',
        titleColor: 'white',
        message: `Fulfilled promise in ${delay}ms`,
        backgroundColor: '#59A10D',
        messageColor: 'white',
        balloon: true,
        position: 'topRight',
        progressBarColor: 'black',
        transitionIn: 'bounceInRight',
        
      });
    },

    error => {
      iziToast.error({
        title: 'Error',
        titleColor: 'white',
        message: ` Rejected promise in ${delay}ms`,
        backgroundColor: '#EF4040',
        messageColor: 'white',
        balloon: true,
        position: 'topRight',
        progressBarColor: 'black',
        transitionIn: 'bounceInRight',
        
      });
    }
  );
  form.reset();
}
