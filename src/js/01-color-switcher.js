function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let changeBackgroundColorIntervalId = null;
const isBtnDisabled = true;
const refs = {
  documentBody: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

refs.stopBtn.disabled = isBtnDisabled;
refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  refs.startBtn.disabled = isBtnDisabled;
  refs.stopBtn.disabled = !isBtnDisabled;
  changeBackgroundColorIntervalId = setInterval(changeBackgroundColor, 1000);
}
// refs.startBtn.disabled = !refs.stopBtn.disabled;
// console.log(refs.startBtn);

function changeBackgroundColor() {
  refs.documentBody.style.backgroundColor = getRandomHexColor();
}

function onStopBtnClick() {
  clearInterval(changeBackgroundColorIntervalId);
  refs.startBtn.disabled = !isBtnDisabled;
  refs.stopBtn.disabled = isBtnDisabled;
}
