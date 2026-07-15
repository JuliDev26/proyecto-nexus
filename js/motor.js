/*=====================================================
    PROYECTO NEXUS
    motor.js
=====================================================*/

class MotorJuego {
  constructor() {
    this.nombre = "";

    this.retoActual = 0;

    this.puntos = 0;

    this.pistas = 3;

    this.fallos = 0;

    this.inicio = 0;

    this.terminado = false;
  }

  //---------------------------------------

  comenzar(nombre) {
    this.nombre = nombre;

    this.retoActual = 0;

    this.puntos = 0;

    this.pistas = 3;

    this.fallos = 0;

    this.inicio = Date.now();

    this.terminado = false;

    UI.actualizarHUD();

    UI.log("Sistema iniciado correctamente.");
  }

  //---------------------------------------

  reto() {
    return RETOS[this.retoActual];
  }

  //---------------------------------------

  comprobar(respuesta) {
    const reto = this.reto();

    return respuesta.trim().toLowerCase() === reto.respuesta.toLowerCase();
  }

  //---------------------------------------

  acierto() {
    this.puntos += this.reto().puntos;

    this.retoActual++;

    UI.actualizarHUD();
  }

  //---------------------------------------

  error() {
    this.fallos++;

    if (this.puntos >= 20) {
      this.puntos -= 20;
    }

    UI.actualizarHUD();
  }

  //---------------------------------------

  usarPista() {
    if (this.pistas <= 0) {
      return null;
    }

    this.pistas--;

    UI.actualizarHUD();

    return this.reto().pista;
  }

  //---------------------------------------

  porcentaje() {
    return Math.floor((this.retoActual / RETOS.length) * 100);
  }

  //---------------------------------------

  tiempo() {
    const segundos = Math.floor((Date.now() - this.inicio) / 1000);

    const minutos = Math.floor(segundos / 60);

    const resto = segundos % 60;

    return (
      String(minutos).padStart(2, "0") + ":" + String(resto).padStart(2, "0")
    );
  }
}

const juego = new MotorJuego();

setInterval(() => {
  if (!juego.inicio) return;

  document.getElementById("hudTiempo").textContent = juego.tiempo();
}, 1000);
