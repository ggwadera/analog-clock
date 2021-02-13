class ClockHand {
  static oneSecond = 1000;

  constructor({ parent, angle, deltaAngle, id }) {
    this.parent = parent;
    this.angle = angle;
    this.deltaAngle = deltaAngle;
    this.id = id;
    this.append();
    this.rotate(angle);
    setInterval(() => this.update(), ClockHand.oneSecond);
  }

  append() {
    this.element = document.createElement('div');
    this.element.classList.add('hand');
    this.element.id = this.id;
    this.parent.appendChild(this.element);
  }

  update() {
    this.angle += this.deltaAngle;
    this.rotate(this.angle);
  }

  rotate(angle) {
    this.element.style.transform = `rotate(${angle}deg)`;
  }
}

class Clock {
  static deltaDegHour = 360 / 12;
  static deltaDegMinAndSec = 360 / 60;

  constructor(element) {
    this.element = element;
    this.putClockHands();
  }

  putClockHands() {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const secondAngle = Clock.deltaDegMinAndSec * second;
    const minuteAngle = Clock.deltaDegMinAndSec * minute + secondAngle / 60;
    const hourAngle = Clock.deltaDegHour * hour + minute / 2;

    new ClockHand({
      parent: this.element,
      angle: hourAngle,
      deltaAngle: Clock.deltaDegHour / 3600,
      id: 'hour'
    });

    new ClockHand({
      parent: this.element,
      angle: minuteAngle,
      deltaAngle: Clock.deltaDegMinAndSec / 60,
      id: 'minute'
    });

    new ClockHand({
      parent: this.element,
      angle: secondAngle,
      deltaAngle: Clock.deltaDegMinAndSec,
      id: 'second'
    });
  }
}

function render() {
  const clockElement = document.getElementById('clock');
  new Clock(clockElement);
}

render()
