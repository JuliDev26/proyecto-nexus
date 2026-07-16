/*=====================================================
    PROYECTO NEXUS
    app.js
=====================================================*/
let RETOS = [];
const app = {
  //------------------
  //
  // -------------------------------
  // Arranque de la aplicación
  //-------------------------------------------------

  //-------------------------------------------------
  // Arranque de la aplicación
  //-------------------------------------------------

  async iniciarAplicacion() {
    const { data, error } = await db
      .from("retos")
      .select(
        `
id,
tipo,
titulo,
narrativa,
pregunta,
pista,
puntos
`,
      )
      .order("id");

    if (error) {
      console.error(error);

      UI.mostrar(`

<div class="tarjeta">

<h2>Error</h2>

<p>

No se pudieron cargar los retos desde el servidor.

</p>

</div>

`);

      return;
    }

    RETOS = data;

    UI.actualizarHUD();

    UI.inicio();

    UI.log(`Sistema preparado.`);
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

  //-------------------------------------------------
  // Comprueba la respuesta
  //-------------------------------------------------

  async comprobar() {
    const respuesta = document.getElementById("respuesta").value;

    const correcta = await comprobarRespuesta(juego.reto().id, respuesta);

    if (correcta) {
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
        await Ranking.guardar(
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
