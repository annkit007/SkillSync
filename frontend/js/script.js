// Dark/Light Mode Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  const html = document.documentElement;
  const isDark = html.getAttribute("data-theme") === "dark";
  html.setAttribute("data-theme", isDark ? "light" : "dark");
});

// Particle Canvas Animation
const canvas = document.getElementById("bg-particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    speedX: Math.random() * 1 - 0.5,
    speedY: Math.random() * 1 - 0.5,
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#00ffff";
    ctx.fill();
    p.x += p.speedX;
    p.y += p.speedY;

    // Wrap
    if (p.x > canvas.width) p.x = 0;
    if (p.y > canvas.height) p.y = 0;
    if (p.x < 0) p.x = canvas.width;
    if (p.y < 0) p.y = canvas.height;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();
