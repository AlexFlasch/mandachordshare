let timerId = null;
let interval = 125;

const play = () => {
  timerId = setInterval(() => self.postMessage('tick'), interval);
};

const pause = () => {
  clearInterval(timerId);
  timerId = null;
};

self.addEventListener('message', e => {
  console.log('scheduler worker recieved: ', e.data);
  if (e.data.interval) {
    interval = e.data.interval;
    if (timerId) {
      clearInterval(timerId);
    }
  }

  switch (e.data) {
    case 'play':
      play();
      break;

    case 'pause':
      pause();
      break;
  }
});
