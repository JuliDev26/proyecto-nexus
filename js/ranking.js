/*=====================================================
    PROYECTO NEXUS
    ranking.js
=====================================================*/

const Ranking = {
  //-----------------------------------------
  // Obtener ranking
  //-----------------------------------------

  async obtener() {
    const { data, error } = await db
      .from("ranking")
      .select("*")
      .order("puntos", { ascending: false })
      .order("tiempo", { ascending: true });

    if (error) {
      console.error(error);

      return [];
    }

    return data;
  },

  //-----------------------------------------
  // Guardar partida
  //-----------------------------------------

  async guardar(nombre, puntos, tiempo, errores, pistas) {
    const { error } = await db.from("ranking").insert([
      {
        nombre,
        puntos,
        tiempo,
        errores,
        pistas,
        fecha: new Date().toLocaleString(),
      },
    ]);

    if (error) {
      console.error(error);
    }
  },
};
