/* ParkEt — tüm sayfalarda ortak küçük davranışlar */

/* Mobil menü */
(function menu(){
  const btn = document.getElementById("menuBtn");
  const list = document.getElementById("navLinks");
  if (!btn || !list) return;
  const set = open => { btn.setAttribute("aria-expanded", open); list.classList.toggle("open", open); };
  btn.addEventListener("click", e => { e.stopPropagation(); set(btn.getAttribute("aria-expanded") !== "true"); });
  list.addEventListener("click", e => { if (e.target.closest("a")) set(false); });
  document.addEventListener("click", e => { if (!list.contains(e.target)) set(false); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { set(false); btn.focus(); }
  });
})();

/* Görünür olunca beliren öğeler */
(function reveal(){
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach(el => el.classList.add("in")); return; }
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }), { threshold: 0.15 });
  els.forEach(el => io.observe(el));
})();

/* Alt bilgideki yıl */
document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
