document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".year").forEach(el => el.textContent = new Date().getFullYear());

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "×" : "☰";
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    }));
  }

  const filterButtons = [...document.querySelectorAll(".filter-btn")];
  const cards = [...document.querySelectorAll(".gallery-card")];
  const count = document.querySelector("#gallery-count");
  function applyFilter(filter) {
    let visible = 0;
    cards.forEach(card => {
      const show = filter === "all" || card.dataset.category === filter;
      card.hidden = !show;
      if (show) visible++;
    });
    if (count) count.textContent = `${String(visible).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")} ENTRIES`;
    filterButtons.forEach(btn => {
      const active = btn.dataset.filter === filter;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
  }
  filterButtons.forEach(btn => btn.addEventListener("click", () => applyFilter(btn.dataset.filter)));

  const params = new URLSearchParams(window.location.search);
  const designField = document.querySelector("#design-field");
  if (designField && params.get("design")) designField.value = params.get("design");

  const form = document.querySelector("#contact-form");
  if (form) form.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = `Zapytanie VOIDFORM — ${data.get("type") || "Nowy tatuaż"}`;
    const body = [
      `Imię / pseudonim: ${data.get("name")}`,
      `E-mail: ${data.get("email")}`,
      `Rodzaj zapytania: ${data.get("type")}`,
      `Rozmiar: ${data.get("size")}`,
      `Wybrany wzór: ${data.get("design") || "Nie wybrano"}`,
      "",
      "Wiadomość:",
      data.get("message")
    ].join("\n");
    const mailto = `mailto:hello@voidform.studio?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const status = document.querySelector("#form-status");
    if (status) status.textContent = "Otwieramy aplikację pocztową z przygotowaną wiadomością…";
    window.location.href = mailto;
  });
});