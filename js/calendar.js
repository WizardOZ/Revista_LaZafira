const calendar = (() => {
    const date = new Date();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();

    const today = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
    };

    const monthYearText = document.querySelector(".month-year");
    const tbody = document.querySelector(".calendar tbody");

    // Asegurarnos de que solo se ejecuta en la página del calendario
    if (!tbody) {
        return { init: () => {} }; // No hacer nada si no hay calendario
    }

    const renderCalendar = () => {
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        tbody.innerHTML = "";
        const monthName = new Date(currentYear, currentMonth).toLocaleString("es", {
            month: "long",
        });
        monthYearText.textContent = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${currentYear}`;

        let row = document.createElement("tr");

        for (let i = 0; i < firstDay; i++) {
            row.appendChild(document.createElement("td"));
        }

        for (let day = 1; day <= daysInMonth; day++) {
            if (row.children.length === 7) {
                tbody.appendChild(row);
                row = document.createElement("tr");
            }

            const cell = document.createElement("td");
            cell.textContent = day;
            let formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            cell.dataset.fecha = formattedDate;

            if (day === today.day && currentMonth === today.month && currentYear === today.year) {
                cell.classList.add("current-day");
            }

            row.appendChild(cell);
        }

        while (row.children.length < 7) {
            row.appendChild(document.createElement("td"));
        }

        tbody.appendChild(row);

        // ¡MEJORA! Ahora solo llama a la función de resaltar.
        // La variable 'eventosDestacados' la crea 'index.php'
        if (typeof eventosDestacados !== 'undefined') {
            resaltarFechas(eventosDestacados);
        }
    };

    // --- Event Listeners para los botones ---
    const prevButton = document.querySelector(".prev-month");
    const nextButton = document.querySelector(".next-month");
    const currentButton = document.querySelector(".current-month");

    if (prevButton) {
        prevButton.addEventListener("click", () => {
            currentMonth = (currentMonth - 1 + 12) % 12;
            if (currentMonth === 11) currentYear--;
            renderCalendar();
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            currentMonth = (currentMonth + 1) % 12;
            if (currentMonth === 0) currentYear++;
            renderCalendar();
        });
    }

    if (currentButton) {
        currentButton.addEventListener("click", () => {
            currentMonth = date.getMonth();
            currentYear = date.getFullYear();
            renderCalendar();
        });
    }

    return { init: renderCalendar };
})();

calendar.init();

// ¡MEJORA! Esta función ya no carga nada, solo resalta.
function resaltarFechas(fechasEventos) {
    let celdas = document.querySelectorAll(".calendar td[data-fecha]");

    celdas.forEach(celda => {
        let fecha = celda.dataset.fecha;
        
        // Limpiamos resaltado previo (para que funcione bien prev/next mes)
        celda.classList.remove("resaltado");
        celda.title = "";
        const eventoSpan = celda.querySelector(".evento");
        if (eventoSpan) {
            eventoSpan.parentElement.innerHTML = eventoSpan.parentElement.firstChild.textContent;
        }

        // Aplicamos el resaltado si existe en nuestro objeto
        if (fechasEventos[fecha]) {
            celda.classList.add("resaltado");
            celda.title = fechasEventos[fecha];
            celda.innerHTML += `<br><span class="evento">${fechasEventos[fecha]}</span>`;
        }
    });
}


// --- Tu código del botón "Scroll to Top" (con verificaciones) ---
const scrollToTopButton = document.querySelector(".scroll-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 1) {
    if (scrollToTopButton) scrollToTopButton.style.display = "block";
  } else {
    if (scrollToTopButton) scrollToTopButton.style.display = "none";
  }
});

if (scrollToTopButton) {
    scrollToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
}