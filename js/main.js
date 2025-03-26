document.getElementById('convocatorias-link').addEventListener('click', function(e) {
    e.preventDefault();  // Previene el comportamiento predeterminado del enlace
  
    // Obtiene el elemento al que queremos hacer scroll (en este caso, el elemento con el ID "convocatorias")
    const targetElement = document.querySelector('#convocatorias');
  
    // Realiza el scroll suave y centra la sección
    targetElement.scrollIntoView({
      behavior: 'smooth',  // Desplazamiento suave
      block: 'center',     // Centra el elemento en la ventana
      inline: 'nearest'    // Alineación horizontal
    });
  });
  