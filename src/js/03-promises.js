import Notiflix from 'notiflix';

const delayInput = document.querySelector('input[name=delay]')
const stepInput = document.querySelector('input[name=step]')
const amountInput = document.querySelector('input[name=amount]')
const submitButton = document.querySelector('button')
const generatorForm = document.querySelector('form')

generatorForm.addEventListener('submit', onGeneratorFormSubmit)

function createPromise(position, delay){
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) =>{
      setTimeout(() => {if (shouldResolve) {
            resolve({
                position: position,
                delay: delay
            })
        }
        else {
            reject({
                position: position,
                delay: delay
            })
        }}, delay)
    })
}

function onGeneratorFormSubmit(event){
    event.preventDefault()
    let counter = 1
    let stepVal = 0
    createPromise(counter, Number(delayInput.value))
        .then(({position, delay}) => {Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)})
        .catch(({position, delay}) => {Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)})
    const intervalId = setInterval(() => {{
        if (counter === Number(amountInput.value - 1)) clearInterval(intervalId)
        counter += 1
        stepVal += Number(stepInput.value)
        createPromise(counter, stepVal + Number(delayInput.value))
        .then(({position, delay}) => {Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)})
        .catch(({position, delay}) => {Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)})
    }}, stepInput.value)
}






