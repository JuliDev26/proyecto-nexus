/*=====================================================
    PROYECTO NEXUS
    ranking.js
=====================================================*/

const Ranking = {
  CLAVE: "nexus_ranking",

  //---------------------------------------

  obtener() {
    const datos = localStorage.getItem(this.CLAVE);

    if (!datos) return [];

    return JSON.parse(datos);
  },

  //---------------------------------------

  guardar(nombre, puntos, tiempo) {
    const ranking = this.obtener();

    ranking.push({
      nombre,
      puntos,
      tiempo,
      fecha: new Date().toLocaleDateString(),
    });

    ranking.sort((a, b) => {
      if (b.puntos !== a.puntos) return b.puntos - a.puntos;

      return a.tiempo.localeCompare(b.tiempo);
    });

    localStorage.setItem(this.CLAVE, JSON.stringify(ranking.slice(0, 10)));
  },
};
