// Matrix rain background
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "アァイィウヴエェオカガキギクグケゲコゴサザシジスズセゼソゾタダチッヂツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤャユュヨョラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
  drops[x] = 1;
}

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(draw, 35);

// Typewriter effect
const text = "Welcome to my retro hub.";
let i = 0;
function typeWriter() {
  if (i < text.length) {
    document.getElementById("typewriter").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  } else {
    document.querySelector(".links").classList.add("visible");
    document.querySelector(".about").classList.add("visible");
  }
}
window.onload = typeWriter;

// Draggable + closable popup system
function openWindow(type) {
  const popup = document.createElement("div");
  popup.classList.add("popup", "fade-in-up");

  const header = document.createElement("div");
  header.classList.add("popup-header");
  header.innerHTML = `<span>${type.toUpperCase()}</span><button onclick="this.closest('.popup').remove()">X</button>`;
  popup.appendChild(header);

  const content = document.createElement("div");
  content.classList.add("popup-content");

  if (type === "discord") {
    content.innerHTML = `
      <div class="discord-profile">
        <div class="banner"></div>
        <div class="profile-content">
          <div class="profile-left">
            <img src="avatar.jpg" alt="Avatar" class="profile-avatar">
            <div class="profile-name">
              <span class="username">YourUsername</span>
              <span class="tag">#1234</span>
            </div>
          </div>
          <div class="profile-right">
            <div class="profile-info">
              <div class="status">Online</div>
              <div class="bio">This is my Discord bio.</div>
              <div class="profile-buttons">
                <button>Add Friend</button>
                <button class="message">Message</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (type === "steam") {
    content.innerHTML = `
      <div class="steam-profile">
        <div class="steam-header">
          <img src="avatar.jpg" class="steam-avatar">
          <div>
            <span class="steam-username">YourSteamName</span>
            <span class="steam-level">Lvl 25</span>
          </div>
        </div>
        <div class="steam-recent">Recent Activity</div>
        <div class="steam-game">
          <img src="game1.jpg" alt="Game 1">
          <span>Game Title 1 — 12 hrs on record</span>
        </div>
        <div class="steam-game">
          <img src="game2.jpg" alt="Game 2">
          <span>Game Title 2 — 34 hrs on record</span>
        </div>
      </div>
    `;
  }

  if (type === "aol") {
    content.innerHTML = `
      <div class="aol-profile">
        <div class="aol-header">YourScreenName</div>
        <div class="aol-bio">
          <textarea readonly>This is my old-school AOL profile. Nostalgia vibes!</textarea>
        </div>
        <div class="aol-buttons">
          <button>IM</button>
          <button>Add Buddy</button>
          <button>Directory Info</button>
        </div>
      </div>
    `;
  }

  popup.appendChild(content);
  document.body.appendChild(popup);

  // Dragging
  let offsetX, offsetY, isDown = false;
  header.addEventListener("mousedown", (e) => {
    isDown = true;
    offsetX = e.clientX - popup.offsetLeft;
    offsetY = e.clientY - popup.offsetTop;
  });
  document.addEventListener("mouseup", () => isDown = false);
  document.addEventListener("mousemove", (e) => {
    if (isDown) {
      popup.style.left = (e.clientX - offsetX) + "px";
      popup.style.top = (e.clientY - offsetY) + "px";
    }
  });
}
