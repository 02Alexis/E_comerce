function actualizarCronometro() {
    var fechaExpiracion = new Date("2023-05-01T00:00:00Z"); // Establecer la fecha de expiración
    var ahora = new Date();
    var diferencia = fechaExpiracion - ahora;
  
    var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    var horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    var segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
  
    document.getElementById("dias").innerText = dias.toString().padStart(2, "0");
    document.getElementById("horas").innerText = horas.toString().padStart(2, "0");
    document.getElementById("minutos").innerText = minutos.toString().padStart(2, "0");
    document.getElementById("segundos").innerText = segundos.toString().padStart(2, "0");
  }
  
  setInterval(actualizarCronometro, 1000); // Actualizar el cronómetro cada segundo
  