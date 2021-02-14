class ClockHand {
  static oneSecond = 1000;

  constructor({ parent, angle, deltaAngle, id }) {
    this.parent = parent;
    this.angle = angle; // deg
    this.deltaAngle = deltaAngle; // deg/s
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

  /**
   * Atualiza o ângulo de rotação para o próximo valor, após ter passado 1 segundo.
   */
  update() {
    this.angle += this.deltaAngle;
    this.rotate(this.angle);
  }

  /**
   * Aplica a transformação de rotação no elemento.
   * @param {number} angle Ângulo para rotacionar (em graus)
   */
  rotate(angle) {
    this.element.style.transform = `rotate(${angle}deg)`;
  }
}

class Clock {
  static oneMinute = 60; // segundos
  static oneHour = Clock.oneMinute * 60; // segundos
  static deltaDegHour = 360 / 12; // 30 deg
  static deltaDegMinAndSec = 360 / 60; // 6 deg

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

    // Hora
    new ClockHand({
      parent: this.element,
      angle: hourAngle,
      deltaAngle: Clock.deltaDegHour / Clock.oneHour, // 0.0083 deg/s
      id: 'hour'
    });

    // Minuto
    new ClockHand({
      parent: this.element,
      angle: minuteAngle,
      deltaAngle: Clock.deltaDegMinAndSec / Clock.oneMinute, // 0.1 deg/s
      id: 'minute'
    });

    // Segundo
    new ClockHand({
      parent: this.element,
      angle: secondAngle,
      deltaAngle: Clock.deltaDegMinAndSec, // 6 deg/s
      id: 'second'
    });
  }
}

function render() {
  const clockElement = document.getElementById('clock');
  new Clock(clockElement);
}

render();
