/*=====================================================
    PROYECTO NEXUS
    ui.js
=====================================================*/

const UI = {
  pantalla: document.getElementById("pantalla"),
  logDiv: document.getElementById("logMensajes"),

  //-------------------------------------------------
  // Pinta HTML
  //-------------------------------------------------

  mostrar(html) {
    this.pantalla.innerHTML = html;
  },

  //-------------------------------------------------
  // LOG
  //-------------------------------------------------

  log(texto) {
    const ahora = new Date();

    const hora = ahora.toLocaleTimeString("es-ES");

    this.logDiv.innerHTML += `<div>[${hora}] ${texto}</div>`;

    this.logDiv.scrollTop = this.logDiv.scrollHeight;
  },

  //-------------------------------------------------
  // HUD
  //-------------------------------------------------

  actualizarHUD() {
    document.getElementById("hudNombre").textContent = juego.nombre || "---";

    document.getElementById("hudNivel").textContent =
      `${Math.min(juego.retoActual + 1, RETOS.length)} / ${RETOS.length}`;

    document.getElementById("hudPuntos").textContent = juego.puntos;

    document.getElementById("hudPistas").textContent = juego.pistas;

    document.getElementById("progreso").style.width = juego.porcentaje() + "%";
  },

  //-------------------------------------------------
  // Inicio
  //-------------------------------------------------

  inicio() {
    this.mostrar(`

<div class="tarjeta">

<h2>PROYECTO NEXUS</h2>

<p>

Una Inteligencia Artificial ha tomado el control
del laboratorio.

</p>

<p>

Tu misión consiste en recuperar los veinte nodos
del sistema.

</p>

<input
id="nombre"
maxlength="30"
placeholder="Escribe tu nombre">

<div class="botones">

<button id="btnComenzar">

INICIAR MISIÓN

</button>

<button id="btnRankingInicio">

VER RANKING

</button>

</div>

</div>

`);

    document.getElementById("btnComenzar").onclick = app.iniciar;

    document
      .getElementById("btnRankingInicio")
      .addEventListener("click", () => {
        UI.ranking();
      });
  },

  //-------------------------------------------------
  // Arranque tipo BIOS
  //-------------------------------------------------

  boot() {
    this.mostrar(`

<div class="codigo" id="boot">

Inicializando...

</div>

`);

    const mensajes = [
      "Inicializando memoria...",
      "Comprobando red...",
      "Verificando credenciales...",
      "Conectando con NEXUS...",
      "Acceso concedido.",
    ];

    let i = 0;

    const boot = document.getElementById("boot");

    const timer = setInterval(() => {
      boot.innerHTML += `<br>${mensajes[i]}`;

      i++;

      if (i >= mensajes.length) {
        clearInterval(timer);

        setTimeout(() => {
          app.cargarReto();
        }, 700);
      }
    }, 600);
  },

  //-------------------------------------------------
  // Reto
  //-------------------------------------------------

  reto(reto) {
    this.mostrar(`

<div class="tarjeta">

<h2>

NODO ${reto.id}

</h2>

<h3>

${reto.titulo}

</h3>

<p>

${reto.narrativa}

</p>

<div
class="codigo"
id="pregunta"
data-flag="FLAG{HTML}">

${reto.pregunta}

</div>

<input
id="respuesta"
autocomplete="off"
placeholder="Escribe la respuesta">

<div class="botones">

<button id="btnResponder">
COMPROBAR
</button>

<button id="btnPista">
PISTA
</button>

${
  reto.tipo === "network"
    ? `<button id="btnNetwork">
GENERAR PETICIÓN
</button>`
    : ""
}

${
  reto.tipo === "imagen"
    ? `<p>

<a href="img/nexus.png" target="_blank">

Abrir imagen

</a>

</p>`
    : ""
}

${
  reto.tipo === "audio"
    ? `<audio controls>

<source src="audio/nexus.mp3" type="audio/mpeg">

</audio>`
    : ""
}

</div>
</div>

`);

    document.getElementById("btnResponder").addEventListener("click", () => {
      app.comprobar();
    });
    document.getElementById("btnPista").addEventListener("click", () => {
      app.pista();
    });

    const btnNetwork = document.getElementById("btnNetwork");

    if (btnNetwork) {
      btnNetwork.onclick = app.generarPeticion;
    }
    document.getElementById("respuesta").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        app.comprobar();
      }
    });
  },

  //-------------------------------------------------
  // Final
  //-------------------------------------------------

  //-------------------------------------------------
  // Pantalla final
  //-------------------------------------------------

  final() {
    this.mostrar(`

<div class="tarjeta">

<h2>

🏆 MISIÓN COMPLETADA

</h2>

<p>

Has conseguido recuperar el control del sistema NEXUS.

</p>

<h3>

Puntuación final

</h3>

<div class="codigo">

${juego.puntos} puntos

</div>

<h3>

Tiempo empleado

</h3>

<div class="codigo">

${juego.tiempo()}

</div>

<div class="botones">

<button id="btnRanking">

VER RANKING

</button>

<button id="btnDiploma">

DESCARGAR DIPLOMA

</button>

<button id="btnReiniciar">

JUGAR OTRA VEZ

</button>

</div>

</div>

`);

    document.getElementById("btnRanking").addEventListener("click", () => {
      UI.ranking();
    });

    document.getElementById("btnReiniciar").addEventListener("click", () => {
      location.reload();
    });

    document.getElementById("btnDiploma").addEventListener("click", () => {
      Diploma.generar();
    });
  },

  //-------------------------------------------------
  // Pantalla de ranking
  //-------------------------------------------------

  ranking() {
    const datos = Ranking.obtener();

    let html = `

<div class="tarjeta">

<h2>

🏆 RANKING LOCAL

</h2>

`;

    if (datos.length === 0) {
      html += `

<p>

Todavía no hay ninguna partida registrada.

</p>

`;
    } else {
      html += `

<table class="ranking">

<tr>

<th>#</th>

<th>Jugador</th>

<th>Puntos</th>

<th>Tiempo</th>

</tr>

`;

      datos.forEach((j, i) => {
        html += `

<tr>

<td>${i + 1}</td>

<td>${j.nombre}</td>

<td>${j.puntos}</td>

<td>${j.tiempo}</td>

</tr>

`;
      });

      html += `</table>`;
    }

    html += `

<br>

<div class="botones">

<button id="btnVolver">

VOLVER

</button>

</div>

</div>

`;

    this.mostrar(html);

    document.getElementById("btnVolver").addEventListener("click", () => {
      this.inicio();
    });
  },
};
