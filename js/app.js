/*=====================================================
    PROYECTO NEXUS
    app.js
=====================================================*/

const app = {
  //-------------------------------------------------
  // Arranque de la aplicación
  //-------------------------------------------------

  iniciarAplicacion() {
    UI.actualizarHUD();
    UI.inicio();
    UI.log("Sistema preparado.");
  },

  //-------------------------------------------------
  // Comienza la partida
  //-------------------------------------------------

  iniciar() {
    const nombre = document.getElementById("nombre").value.trim();

    if (nombre === "") {
      alert("Introduce tu nombre.");

      return;
    }

    juego.comenzar(nombre);

    UI.log(`Bienvenido ${nombre}.`);

    UI.boot();
  },

  //-------------------------------------------------
  // Muestra el reto actual
  //-------------------------------------------------

  cargarReto() {
    if (juego.retoActual >= RETOS.length) {
      Ranking.guardar(
        juego.nombre,

        juego.puntos,

        juego.tiempo(),
      );

      UI.final();

      return;
    }

    const reto = juego.reto();

    if (reto.tipo === "consola" && reto.id === 9) {
      console.clear();

      console.log("%cFLAG{CONSOLE}", "color:#00ff00;font-size:22px");
    }

    if (reto.id === 10) {
      window.secreto = "FLAG{VARIABLE}";
    }

    if (reto.id === 11) {
      localStorage.setItem("flag", "FLAG{LOCAL}");
    }

    if (reto.id === 12) {
      document.cookie = "flag=FLAG{COOKIE}; path=/";
    }

    if (reto.id === 15) {
      fetch("data/network.json")
        .then((r) => r.json())
        .then(() => {});
    }

    if (reto.id === 16) {
      UI.log("Imagen disponible en img/nexus.png");
    }

    UI.actualizarHUD();

    UI.log(`Nodo ${reto.id} cargado.`);

    UI.reto(reto);
  },

  //-------------------------------------------------
  // Comprueba la respuesta
  //-------------------------------------------------

  comprobar() {
    const respuesta = document.getElementById("respuesta").value;

    if (juego.comprobar(respuesta)) {
      UI.log("Respuesta correcta.");

      juego.acierto();

      if (juego.retoActual >= RETOS.length) {
        UI.final();

        return;
      }

      setTimeout(() => {
        app.cargarReto();
      }, 500);
    } else {
      juego.error();

      UI.log("Respuesta incorrecta.");

      alert("❌ Respuesta incorrecta.");
    }
  },

  //-------------------------------------------------
  // Generar petición de red
  //-------------------------------------------------

  generarPeticion() {
    fetch("data/network.json")
      .then((r) => r.json())
      .then((datos) => {
        UI.log("Petición HTTP realizada.");

        console.log(datos);
      });
  },

  //-------------------------------------------------
  // Pista
  //-------------------------------------------------

  pista() {
    const pista = juego.usarPista();

    if (pista == null) {
      alert("No quedan pistas.");

      UI.log("Sin pistas disponibles.");

      return;
    }

    UI.log("Pista utilizada.");

    alert("💡 " + pista);
  },
};

//-------------------------------------------------
// Inicio automático
//-------------------------------------------------

window.addEventListener("load", () => {
  app.iniciarAplicacion();
});
