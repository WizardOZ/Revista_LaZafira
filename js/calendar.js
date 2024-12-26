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

  const renderCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    tbody.innerHTML = "";
    const monthName = new Date(currentYear, currentMonth).toLocaleString("es", {
      month: "long",
    });
    monthYearText.textContent = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${currentYear}`;

    let row = document.createElement("tr");

    // Añadir celdas vacías al principio de la primera fila
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

      // Marcar el día actual
      if (
        day === today.day &&
        currentMonth === today.month &&
        currentYear === today.year
      ) {
        cell.classList.add("current-day");
      }

      row.appendChild(cell);
    }

    // Añadir celdas vacías al final de la última fila
    while (row.children.length < 7) {
      row.appendChild(document.createElement("td"));
    }

    tbody.appendChild(row);
  };

  document.querySelector(".prev-month").addEventListener("click", () => {
    currentMonth = (currentMonth - 1 + 12) % 12;
    if (currentMonth === 11) currentYear--;
    renderCalendar();
  });

  document.querySelector(".next-month").addEventListener("click", () => {
    currentMonth = (currentMonth + 1) % 12;
    if (currentMonth === 0) currentYear++;
    renderCalendar();
  });

  document.querySelector(".current-month").addEventListener("click", () => {
    currentMonth = date.getMonth();
    currentYear = date.getFullYear();
    renderCalendar();
  });

  return { init: renderCalendar };
})();

calendar.init();


// Mostrar botón para volver arriba
const scrollToTopButton = document.querySelector(".scroll-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
});

scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
