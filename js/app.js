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
      UI.mensaje("✖ Introduce tu nombre", "error");
      return;
    }

    juego.comenzar(nombre);

    UI.log(`Bienvenido ${nombre}.`);

    UI.boot();
  },

  //-------------------------------------------------
  // Muestra el reto actual
  //-------------------------------------------------

  async cargarReto() {
    if (juego.retoActual >= RETOS.length) {
      Ranking.guardar(
        juego.nombre,

        juego.puntos,

        juego.tiempo(),

        juego.fallos,

        3 - juego.pistas,
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

    if (reto.id === 21) {
      console.clear();

      console.log(
        "%cOMEGA_2 = RESTORED_",
        "color:#00ff88;font-size:22px;font-weight:bold",
      );

      fetch("data/omega.json")
        .then((r) => r.json())
        .then(console.log);
    }

    UI.actualizarHUD();

    UI.log(`Nodo ${reto.id} cargado.`);

    UI.reto(reto);
  },

  //-------------------------------------------------
  // Reiniciar proceso Ω
  //-------------------------------------------------

  omega() {
    console.clear();

    console.log(
      "%cOMEGA_2 = RESTORED_",
      "color:#00ff88;font-size:22px;font-weight:bold",
    );

    fetch("data/omega.json")
      .then((r) => r.json())
      .then((datos) => {
        console.log(datos);

        UI.log("Proceso Ω reiniciado.");

        UI.mensaje("Proceso Ω reiniciado", "info");
      });
  },

  //-------------------------------------------------
  // Comprueba la respuesta
  //-------------------------------------------------

  comprobar() {
    const respuesta = document.getElementById("respuesta").value;

    if (juego.comprobar(respuesta)) {
      UI.log("Respuesta correcta.");

      UI.mensaje("✔ Nodo completado", "ok");

      juego.acierto();

      // Acaba de superar el nodo 20
      if (juego.retoActual === 20) {
        UI.omega();

        setTimeout(() => {
          app.cargarReto();
        }, 7000);

        return;
      }

      // Ha terminado también el Nodo Ω
      if (juego.retoActual >= RETOS.length) {
        Ranking.guardar(
          juego.nombre,
          juego.puntos,
          juego.tiempo(),
          juego.fallos,
          3 - juego.pistas,
        );

        UI.final();

        return;
      }

      setTimeout(() => {
        app.cargarReto();
      }, 500);
    } else {
      juego.error();

      UI.log("Respuesta incorrecta.");

      const segundos = juego.fallos * 15;

      UI.mensaje(
        `✖ Respuesta incorrecta<br><b>+${segundos} segundos</b>`,
        "error",
      );

      document.getElementById("respuesta").focus();

      document.getElementById("respuesta").select();
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
      UI.mensaje("No quedan pistas disponibles.", "error");

      UI.log("Sin pistas disponibles.");

      return;
    }

    UI.log("Pista utilizada.");

    UI.mensaje("<b>PISTA</b><br><br>" + pista, "info");
  },
};

//-------------------------------------------------
// Inicio automático
//-------------------------------------------------

window.addEventListener("load", () => {
  app.iniciarAplicacion();
});
