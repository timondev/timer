const params = new URL(window.location.toLocaleString()).searchParams;
let end = params.has('date') ? new Date(params.get('date')) : new Date();
if (params.has('for')) {
  const unitTimes = { 'sec': 1000, 'min': 60 * 1000, 'hour': 60 * 60 * 1000 };
  const [time, unit] = params.get('for').split('-');

  end = new Date(Date.now() + (+time * unitTimes[unit]));
}

const headRef = document.querySelector('head');
const bodyRef = document.querySelector('body');
const titleRef = document.querySelector('title');
const timerRef = document.querySelector('#timer');

const timezoneOffset = new Date(0).getTimezoneOffset() * 60 * 1000;

let start = new Date();

function timeStep() {
  const distance = end.getTime() - start.getTime();
  const date = new Date(distance + timezoneOffset);

  if (distance > 0) {
  timerRef.innerText = date.toLocaleTimeString("en-UK");
  titleRef.innerText = date.toLocaleTimeString("en-UK");

    start = new Date();
    setTimeout(timeStep, 1);
  } else {
    timerRef.innerText = params.has('done') ? params.get('done') : 'TIME\'S UP';
    titleRef.innerText = params.has('done') ? params.get('done') : 'TIME\'S UP';
  }
};

timeStep();