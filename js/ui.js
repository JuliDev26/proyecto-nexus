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

    const nodoVisible = Math.min(juego.retoActual + 1, 20);

    document.getElementById("hudNivel").textContent = `${nodoVisible} / 20`;

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

<button href="img/nexus.png" target="_blank">

Abrir imagen

</button>

</p>`
    : ""
}

${
  reto.tipo === "audio"
    ? `<audio controls>

<source src="audio/audio.mp3" type="audio/mpeg">

</audio>`
    : ""
}

${
  reto.id === 21
    ? `
<button id="btnOmega">

REINICIAR PROCESO Ω

</button>
`
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

    if (reto.id === 21) {
      document
        .getElementById("btnOmega")
        .addEventListener("click", () => app.omega());
    }
  },

  //-------------------------------------------------
  // Mensaje emergente
  //-------------------------------------------------

  mensaje(texto, tipo = "info") {
    const anterior = document.getElementById("mensajeNexus");

    if (anterior) {
      anterior.remove();
    }

    const div = document.createElement("div");

    div.id = "mensajeNexus";

    div.className = `mensaje ${tipo}`;

    div.innerHTML = texto;

    document.body.appendChild(div);

    setTimeout(() => {
      div.classList.add("mostrar");
    }, 10);

    setTimeout(() => {
      div.classList.remove("mostrar");

      setTimeout(() => div.remove(), 300);
    }, 2500);
  },

  //-------------------------------------------------
  // Falsa pantalla final
  //-------------------------------------------------

  //-------------------------------------------------
  // Pantalla de transición al Nodo Ω
  //-------------------------------------------------

  omega() {
    this.mostrar(`

<div class="tarjeta">

<h2>SISTEMA NEXUS</h2>

<pre id="omegaTerminal" class="codigo"></pre>

</div>

`);

    const terminal = document.getElementById("omegaTerminal");

    const lineas = [
      "████████████████████████████████",
      "",
      "> RESTAURANDO SISTEMA...",
      "",
      "[OK] Cargando módulos...",
      "[OK] Verificando integridad...",
      "[OK] Restaurando archivos...",
      "[OK] Eliminando procesos maliciosos...",
      "",
      "Acceso concedido.",
      "Cerrando conexión...",
      "",
      "...",
      "...",
      "",
      "ERROR",
      "",
      "Proceso oculto detectado.",
      "",
      "nexus.core sigue activo.",
      "",
      "Nivel de autorización insuficiente.",
      "",
      "Inicializando protocolo Ω...",
      "",
      "████████████████████████████████",
    ];

    let i = 0;

    const escribir = () => {
      if (i >= lineas.length) return;

      terminal.textContent += lineas[i] + "\n";

      terminal.scrollTop = terminal.scrollHeight;

      i++;

      setTimeout(escribir, 180);
    };

    escribir();
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

  async ranking() {
    const datos = await Ranking.obtener();

    let html = `

<div class="tarjeta">

<h2>

🏆 RANKING NEXUS

</h2>

`;

    if (datos.length === 0) {
      html += `

<p>

Todavía no hay ninguna partida registrada.

</p>

`;
    } else {
      //---------------------------------
      // PODIO
      //---------------------------------

      html += `

<div class="podio">

`;

      if (datos[0]) {
        html += `

<div class="puesto oro">

<div class="medalla">🥇</div>

<h3>${datos[0].nombre}</h3>

<p>${datos[0].puntos} puntos</p>

</div>

`;
      }

      if (datos[1]) {
        html += `

<div class="puesto plata">

<div class="medalla">🥈</div>

<h3>${datos[1].nombre}</h3>

<p>${datos[1].puntos} puntos</p>

</div>

`;
      }

      if (datos[2]) {
        html += `

<div class="puesto bronce">

<div class="medalla">🥉</div>

<h3>${datos[2].nombre}</h3>

<p>${datos[2].puntos} puntos</p>

</div>

`;
      }

      html += `

</div>

<table class="ranking">

<tr>

<th>#</th>
<th>Jugador</th>
<th>Puntos</th>
<th>Tiempo</th>
<th>Errores</th>
<th>Pistas</th>

</tr>

`;

      datos.slice(0, 10).forEach((r, i) => {
        html += `

<tr>

<td>${i + 1}</td>

<td>${r.nombre}</td>

<td>${r.puntos}</td>

<td>${r.tiempo}</td>

<td>${r.errores}</td>

<td>${r.pistas}</td>

</tr>

`;
      });

      html += `

</table>

`;
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
