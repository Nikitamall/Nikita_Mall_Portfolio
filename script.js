const body = document.body;
const header = document.getElementById("header");
const progress = document.getElementById("scrollProgress");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const themeBtn = document.getElementById("themeBtn");
const cursorGlow = document.getElementById("cursorGlow");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${height ? (scrollTop / height) * 100 : 0}%`;
  header.classList.toggle("scrolled", scrollTop > 20);
});

menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const savedTheme = localStorage.getItem("nikita-theme");
if (savedTheme === "light") {
  body.classList.add("light");
  themeBtn.textContent = "☀";
}
themeBtn.addEventListener("click", () => {
  body.classList.toggle("light");
  const light = body.classList.contains("light");
  themeBtn.textContent = light ? "☀" : "☾";
  localStorage.setItem("nikita-theme", light ? "light" : "dark");
});

const roles = ["beautiful web apps.", "MERN applications.", "Python & Django projects.", "useful digital experiences."];
const typing = document.getElementById("typingText");
let roleIndex = 0, charIndex = 0, deleting = false;
function typeRole() {
  const current = roles[roleIndex];
  typing.textContent = current.slice(0, charIndex);
  if (!deleting && charIndex < current.length) {
    charIndex++;
    setTimeout(typeRole, 70);
  } else if (!deleting && charIndex === current.length) {
    deleting = true;
    setTimeout(typeRole, 1300);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeRole, 35);
  } else {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 250);
  }
}
typeRole();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-link");
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => sectionObserver.observe(section));

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card => {
      card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter);
    });
  });
});

const projectData = {
  interview: {
    title: "Interview Preparation Platform",
    description: "A placement-focused platform designed to provide students with structured technical, HR and aptitude preparation resources.",
    tech: ["Python", "Django", "SQLite", "HTML", "CSS", "Bootstrap"],
    features: ["Technical and HR preparation resources", "Aptitude practice content", "Database-driven platform", "Built for placement preparation"]
  },
  counsellor: {
    title: "AI-Assisted Virtual Counsellor",
    description: "A web-based virtual counselling application developed around a MERN architecture with AI-assisted interaction and secure user access.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    features: ["JWT-based authentication", "RESTful API integration", "MongoDB database", "AI-assisted interaction"]
  },
  civic: {
    title: "CivicSenseAI",
    description: "An AI-based public complaint management platform where citizens can report civic issues and track complaint progress.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    features: ["Citizen dashboard", "Officer dashboard", "Admin dashboard", "Complaint tracking", "Secure JWT authentication"]
  }
};

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");
const modalFeatures = document.getElementById("modalFeatures");

function openModal(key) {
  const data = projectData[key];
  if (!data) return;
  modalTitle.textContent = data.title;
  modalDescription.textContent = data.description;
  modalTech.innerHTML = data.tech.map(t => `<span>${t}</span>`).join("");
  modalFeatures.innerHTML = data.features.map(f => `<div>${f}</div>`).join("");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  body.style.overflow = "hidden";
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  body.style.overflow = "";
}
document.querySelectorAll(".project-link").forEach(btn => btn.addEventListener("click", () => openModal(btn.dataset.project)));
document.getElementById("modalClose").addEventListener("click", closeModal);
document.querySelector("[data-close-modal]").addEventListener("click", closeModal);
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const note = document.getElementById("formNote");
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const bodyText = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:nikitamall8127@gmail.com?subject=${subject}&body=${bodyText}`;
  note.textContent = "Opening your email app…";
});

document.getElementById("year").textContent = new Date().getFullYear();

window.addEventListener("mousemove", e => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});
