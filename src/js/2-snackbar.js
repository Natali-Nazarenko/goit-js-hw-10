import iziToast from "izitoast";

const form = document.querySelector('.form');

function onFulfilled (delay) {
    iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        messageColor: 'white',
        color: 'green',
        position: 'topRight',
});
}

function onRejected(delay) {
    iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        messageColor: 'white',
        color: 'red',
        position: 'topRight',
});
}

form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const userChoise = new FormData(form);
    const ms = userChoise.get('delay');
    const choice = userChoise.get('state');

    const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (choice === "fulfilled") {
            resolve(ms);
            console.log(`✅ Fulfilled promise in ${ms}ms`);
        } else {
            reject(ms);
            console.log(`❌ Rejected promise in ${ms}ms`);
                
        }
    }, ms)
});

    promise.then(onFulfilled, onRejected)
    
    form.reset();
});

