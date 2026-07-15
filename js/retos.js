/*=====================================================
    PROYECTO NEXUS
    retos.js
=====================================================*/

const RETOS = [
  /*=====================================================
NODO 1
=====================================================*/

  {
    id: 1,

    tipo: "texto",

    titulo: "Acceso al laboratorio",

    narrativa: `NEXUS ha detectado una conexión no autorizada.

Antes de permitirte acceder al laboratorio deberás demostrar
que posees los conocimientos básicos de un técnico.`,

    pregunta: "¿Qué sistema operativo tiene como mascota un pingüino?",

    respuesta: "linux",

    pista: "Fue creado por Linus Torvalds.",

    puntos: 100,
  },

  /*=====================================================*/

  {
    id: 2,

    tipo: "texto",

    titulo: "Comunicación interceptada",

    narrativa: `Se ha interceptado un mensaje cifrado mediante el método César.

Consigue descifrarlo para continuar.`,

    pregunta: "IODJ{QHAXV}",

    respuesta: "FLAG{NEXUS}",

    pista: "Desplaza todas las letras tres posiciones hacia atrás.",

    puntos: 150,
  },

  /*=====================================================*/

  {
    id: 3,

    tipo: "texto",

    titulo: "Codificación Base64",

    narrativa: `Los administradores suelen codificar información antes de
transmitirla.

Descodifica el siguiente mensaje.`,

    pregunta: "RkxBR3tTRVJWRVJ9",

    respuesta: "FLAG{SERVER}",

    pista: "No está cifrado, solo codificado.",

    puntos: 150,
  },

  /*=====================================================*/

  {
    id: 4,

    tipo: "texto",

    titulo: "Código Morse",

    narrativa: `Una antigua transmisión todavía permanece almacenada.

Convierte el siguiente código.`,

    pregunta: "..-. .-.. .- --.",

    respuesta: "flag",

    pista: "Busca una tabla Morse.",

    puntos: 200,
  },

  /*=====================================================*/

  {
    id: 5,

    tipo: "texto",

    titulo: "Binario",

    narrativa: `Los sistemas solo entienden unos y ceros.

Convierte el siguiente binario.`,

    pregunta: "01001110",

    respuesta: "N",

    pista: "Es una única letra ASCII.",

    puntos: 200,
  },

  /*=====================================================*/

  {
    id: 6,

    tipo: "html",

    titulo: "Código fuente",

    narrativa: `La contraseña NO está aquí.

Debes inspeccionar el código fuente de la página.`,

    pregunta: "Encuentra la FLAG oculta.",

    respuesta: "FLAG{SOURCE}",

    pista: "Pulsa CTRL+U.",

    puntos: 250,
  },

  /*=====================================================*/

  {
    id: 7,

    tipo: "css",

    titulo: "CSS",

    narrativa: `Los diseñadores también esconden secretos.

Busca en la hoja de estilos.`,

    pregunta: "¿Cuál es la FLAG?",

    respuesta: "FLAG{STYLE}",

    pista: "Abre styles.css.",

    puntos: 250,
  },

  /*=====================================================*/

  {
    id: 8,

    tipo: "inspector",

    titulo: "Inspector",

    narrativa: `Existe un atributo HTML que contiene la contraseña.`,

    pregunta: "Inspecciona el elemento indicado.",

    respuesta: "FLAG{HTML}",

    pista: "Pulsa F12.",

    puntos: 300,
  },

  /*=====================================================*/

  {
    id: 9,

    tipo: "consola",

    titulo: "Consola JavaScript",

    narrativa: `La IA ha dejado un mensaje en la consola.`,

    pregunta: "Lee el mensaje oculto.",

    respuesta: "FLAG{CONSOLE}",

    pista: "F12 → Consola.",

    puntos: 300,
  },

  /*=====================================================*/

  {
    id: 10,

    tipo: "consola",

    titulo: "Variable",

    narrativa: `Existe una variable global con la contraseña.`,

    pregunta: "Consulta la variable secreta.",

    respuesta: "FLAG{VARIABLE}",

    pista: "Escribe su nombre en la consola.",

    puntos: 300,
  },

  /*=====================================================*/

  {
    id: 11,

    tipo: "localstorage",

    titulo: "Local Storage",

    narrativa: `El navegador ha guardado una pista.`,

    pregunta: "Encuentra la FLAG.",

    respuesta: "FLAG{LOCAL}",

    pista: "F12 → Application.",

    puntos: 350,
  },

  /*=====================================================*/

  {
    id: 12,

    tipo: "cookie",

    titulo: "Cookies",

    narrativa: `Una cookie contiene información importante.`,

    pregunta: "Lee la cookie correcta.",

    respuesta: "FLAG{COOKIE}",

    pista: "Las cookies aparecen en Application.",

    puntos: 350,
  },

  /*=====================================================*/

  {
    id: 13,

    tipo: "robots",

    titulo: "Robots",

    narrativa: `Quizá robots.txt revele demasiado...`,

    pregunta: "Encuentra la contraseña.",

    respuesta: "FLAG{ROBOTS}",

    pista: "Añade robots.txt a la URL.",

    puntos: 350,
  },

  /*=====================================================*/

  {
    id: 14,

    tipo: "json",

    titulo: "JSON",

    narrativa: `Existe un fichero JSON con información interna.`,

    pregunta: "Abre datos.json.",

    respuesta: "FLAG{JSON}",

    pista: "Está en la carpeta data.",

    puntos: 400,
  },

  /*=====================================================*/

  {
    id: 15,

    tipo: "network",

    titulo: "Network",

    narrativa: `Intercepta una petición del navegador.`,

    pregunta: "¿Qué FLAG devuelve?",

    respuesta: "FLAG{NETWORK}",

    pista: "Pestaña Network.",

    puntos: 400,
  },

  /*=====================================================*/

  {
    id: 16,

    tipo: "imagen",

    titulo: "Imagen",

    narrativa: `Una imagen contiene información escondida.`,

    pregunta: "Encuentra la contraseña.",

    respuesta: "FLAG{IMAGE}",

    pista: "Observa la imagen detenidamente.",

    puntos: 450,
  },

  /*=====================================================*/

  {
    id: 17,

    tipo: "audio",

    titulo: "Audio",

    narrativa: `Escucha atentamente la grabación.`,

    pregunta: "¿Qué palabra se escucha?",

    respuesta: "NEXUS",

    pista: "Puedes reproducir el audio varias veces.",

    puntos: 450,
  },

  /*=====================================================*/

  {
    id: 18,

    tipo: "algoritmo",

    titulo: "Algoritmo",

    narrativa: `Calcula correctamente el resultado.`,

    pregunta: "13 × 17",

    respuesta: "221",

    pista: "No hace falta calculadora.",

    puntos: 500,
  },

  /*=====================================================*/

  {
    id: 19,

    tipo: "texto",

    titulo: "Protocolo de Restauración",

    narrativa: `Has conseguido acceder al núcleo principal.

El sistema solicita la clave maestra, pero la IA ha alterado el texto.

Reconstruye correctamente la contraseña.`,

    pregunta: `M4S73R`,

    respuesta: "MASTER",

    pista: "Los números sustituyen letras.",

    puntos: 700,
  },

  /*=====================================================*/

  {
    id: 20,

    tipo: "texto",

    titulo: "Núcleo NEXUS",

    narrativa: `La IA ha cifrado el último código en hexadecimal.

Solo podrás restaurar el sistema si recuperas el texto original.`,

    pregunta: `46 49 4E 41 4C`,

    respuesta: "FINAL",

    pista: "Cada pareja representa un carácter ASCII en hexadecimal.",

    puntos: 1000,
  },

  {
    id: 21,

    tipo: "omega",

    titulo: "Nodo Ω",

    narrativa: `

NEXUS ha dejado un último proceso oculto.

La contraseña definitiva está dividida en tres fragmentos.

Solo un administrador podrá reconstruirla.

`,

    pregunta: "Introduce la FLAG definitiva.",

    respuesta: "FLAG{SYSTEM_RESTORED_2026}",

    pista: "La respuesta no está en un único sitio.",

    puntos: 2500,
  },
];
