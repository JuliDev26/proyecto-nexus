/*=====================================================
    PROYECTO NEXUS
    diploma.js
=====================================================*/

const Diploma = {
  generar() {
    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF("p", "mm", "a4");

    //------------------------------------------------
    // Colores
    //------------------------------------------------

    const verde = [0, 140, 70];
    const gris = [110, 110, 110];
    const negro = [35, 35, 35];

    //------------------------------------------------
    // Marco exterior
    //------------------------------------------------

    pdf.setDrawColor(...verde);
    pdf.setLineWidth(2);

    pdf.rect(10, 10, 190, 277);

    pdf.setLineWidth(0.5);

    pdf.rect(15, 15, 180, 267);

    //------------------------------------------------
    // Cabecera
    //------------------------------------------------

    pdf.setTextColor(...verde);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(30);

    pdf.text("PROYECTO NEXUS", 105, 28, {
      align: "center",
    });

    pdf.setFontSize(18);

    pdf.text("CERTIFICADO OFICIAL", 105, 40, {
      align: "center",
    });

    pdf.setFontSize(12);

    pdf.text("DE SUPERACION", 105, 48, {
      align: "center",
    });

    pdf.line(35, 58, 175, 58);

    //------------------------------------------------
    // Texto
    //------------------------------------------------

    pdf.setTextColor(...negro);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(14);

    pdf.text("Se certifica que", 105, 76, {
      align: "center",
    });

    //------------------------------------------------
    // Nombre
    //------------------------------------------------

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(26);

    pdf.text(juego.nombre.toUpperCase(), 105, 95, {
      align: "center",
    });

    //------------------------------------------------
    // Descripción
    //------------------------------------------------

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(13);

    pdf.text("ha restaurado satisfactoriamente el sistema NEXUS", 105, 114, {
      align: "center",
    });

    pdf.text("superando todos los retos de la simulacion tecnica.", 105, 122, {
      align: "center",
    });

    //------------------------------------------------
    // Línea
    //------------------------------------------------

    pdf.setDrawColor(...verde);

    pdf.line(35, 134, 175, 134);

    //------------------------------------------------
    // Datos
    //------------------------------------------------

    pdf.setFontSize(14);

    pdf.text(`Puntuacion : ${juego.puntos} puntos`, 40, 148);

    pdf.text(`Tiempo : ${juego.tiempo()}`, 40, 158);

    pdf.text(`Errores : ${juego.fallos}`, 40, 168);

    pdf.text(`Pistas utilizadas : ${3 - juego.pistas}`, 40, 178);

    pdf.text(`Fecha : ${new Date().toLocaleDateString()}`, 40, 188);

    pdf.line(35, 198, 175, 198);

    //------------------------------------------------
    // Nivel
    //------------------------------------------------

    let nivel = "TECNICO";

    if (juego.puntos >= 2500) nivel = "ANALISTA";

    if (juego.puntos >= 4500) nivel = "EXPERTO";

    if (juego.puntos >= 6500) nivel = "ELITE";

    if (juego.retoActual >= RETOS.length) nivel = "ADMINISTRADOR OMEGA";

    pdf.setTextColor(...verde);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);

    pdf.text("CLASIFICACION OBTENIDA", 105, 215, {
      align: "center",
    });

    pdf.setFontSize(24);

    pdf.text(nivel, 105, 228, {
      align: "center",
    });

    //------------------------------------------------
    // Firma
    //------------------------------------------------

    pdf.setTextColor(...gris);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);

    pdf.line(120, 248, 182, 248);

    pdf.text("Administrador del sistema NEXUS", 151, 255, {
      align: "center",
    });

    //------------------------------------------------
    // Identificador
    //------------------------------------------------

    const codigo =
      "NEXUS-" +
      new Date().getFullYear() +
      "-" +
      Math.random().toString(36).substring(2, 8).toUpperCase();

    pdf.setFontSize(10);

    pdf.text(codigo, 105, 274, {
      align: "center",
    });

    //------------------------------------------------
    // Guardar
    //------------------------------------------------

    pdf.save(`Diploma_${juego.nombre.replace(/\s+/g, "_")}.pdf`);
  },
};
