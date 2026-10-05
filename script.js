(function () {
  const toc = document.getElementById("toc");
  const toggle = document.getElementById("menuToggle");
  const toTop = document.getElementById("toTop");
  const links = Array.from(document.querySelectorAll(".toc a"));
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  document.getElementById("year").textContent = new Date().getFullYear();

  // Mobile contents menu
  toggle.addEventListener("click", () => {
    const open = toc.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.forEach((a) =>
    a.addEventListener("click", () => {
      toc.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  // Highlight the section being read
  const setActive = (id) =>
    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + id));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
  }

  // Back to top button
  const onScroll = () => {
    toTop.hidden = window.scrollY < 600;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();
