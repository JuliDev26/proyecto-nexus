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

    const verde = [0, 120, 60];
    const negro = [30, 30, 30];
    const gris = [110, 110, 110];

    //------------------------------------------------
    // Marcos
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

    pdf.text("PROYECTO NEXUS", 105, 30, {
      align: "center",
    });

    pdf.setFontSize(18);

    pdf.text("CERTIFICADO OFICIAL DE SUPERACIÓN", 105, 42, {
      align: "center",
    });

    //------------------------------------------------
    // Separador
    //------------------------------------------------

    pdf.setDrawColor(...verde);
    pdf.line(35, 50, 175, 50);

    //------------------------------------------------
    // Texto
    //------------------------------------------------

    pdf.setTextColor(...negro);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(14);

    pdf.text("Se certifica que", 105, 70, {
      align: "center",
    });

    //------------------------------------------------
    // Nombre
    //------------------------------------------------

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(26);

    pdf.text(juego.nombre.toUpperCase(), 105, 90, {
      align: "center",
    });

    //------------------------------------------------
    // Texto principal
    //------------------------------------------------

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(14);

    pdf.text("ha recuperado con éxito el control del sistema", 105, 110, {
      align: "center",
    });

    pdf.text("NEXUS completando los 20 retos técnicos", 105, 118, {
      align: "center",
    });

    //------------------------------------------------
    // Datos
    //------------------------------------------------

    pdf.setDrawColor(...verde);

    pdf.line(35, 132, 175, 132);

    pdf.setFontSize(15);

    pdf.text(`🏆 Puntuación : ${juego.puntos} puntos`, 40, 148);

    pdf.text(`⏱ Tiempo : ${juego.tiempo()}`, 40, 160);

    pdf.text(`📅 Fecha : ${new Date().toLocaleDateString()}`, 40, 172);

    pdf.line(35, 182, 175, 182);

    //------------------------------------------------
    // Nivel conseguido
    //------------------------------------------------

    let nivel = "TÉCNICO";

    if (juego.puntos >= 2500) nivel = "ANALISTA";

    if (juego.puntos >= 4500) nivel = "EXPERTO";

    if (juego.puntos >= 6500) nivel = "ELITE";

    pdf.setTextColor(...verde);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);

    pdf.text("NIVEL CONSEGUIDO", 105, 205, {
      align: "center",
    });

    pdf.setFontSize(26);

    pdf.text(nivel, 105, 220, {
      align: "center",
    });

    //------------------------------------------------
    // Firma
    //------------------------------------------------

    pdf.setTextColor(...gris);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);

    pdf.line(125, 245, 180, 245);

    pdf.text("Administrador del sistema NEXUS", 152, 252, {
      align: "center",
    });

    //------------------------------------------------
    // Identificador
    //------------------------------------------------

    const id =
      "NEXUS-" +
      new Date().getFullYear() +
      "-" +
      Date.now().toString().slice(-6);

    pdf.setFontSize(10);

    pdf.text(id, 105, 275, {
      align: "center",
    });

    //------------------------------------------------
    // Guardar
    //------------------------------------------------

    pdf.save(`Diploma_${juego.nombre.replace(/\s+/g, "_")}.pdf`);
  },
};
