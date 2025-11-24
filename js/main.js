/*
=========================================
--- SCRIPT PARA EL HEADER CON SCROLL ---
=========================================
*/
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Script de scroll para el header
  const header = document.querySelector('.main-header');
  
  if (header) {
    window.addEventListener('scroll', () => {
      // Si el scroll es mayor de 10px
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 2. Tu script antiguo de 'convocatorias-link' (re-integrado)
  const convocatoriasLink = document.getElementById('convocatorias-link');
  
  if (convocatoriasLink) {
    convocatoriasLink.addEventListener('click', function(e) {
        e.preventDefault();
        const targetElement = document.querySelector('#convocatorias');
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
        }
    });
  }
  
});