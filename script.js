// === Pop-up windows (Discord, Steam, AOL) ===
function openWindow(title, event) {
  const icon = event.currentTarget;
  const rect = icon.getBoundingClientRect();

  const win = document.createElement("div");
  win.className = "popup fade-in-up";

  let contentHTML = "";
  if (title === "Discord") {
    contentHTML = `
      <h3>Discord Profile</h3>
      <p><b>Username:</b> tumbs</p>
      <p>Status: 🟢 Online</p>
      <p>“Bass music producer, sound designer, audio engineer 👽👾”</p>
    `;
  } else if (title === "Steam") {
    contentHTML = `
      <h3>Steam Profile</h3>
      <p><b>User:</b> zachpef</p>
      <p>Currently Playing: Half-Life</p>
      <p>Recent Games: Quake II, Counter-Strike, Doom 95</p>
    `;
  } else if (title === "AOL") {
    contentHTML = `
      <h3>AOL Instant Messenger</h3>
      <textarea rows="6" style="width:95%">Personal Bio: Zach | Retro Web Explorer | AOL 4.0 Enthusiast</textarea>
      <div style="margin-top:15px; display:flex; justify-content:space-around;">
        <button>IM</button>
        <button>Add Buddy</button>
        <button>Directory Info</button>
      </div>
    `;
  }

  win.innerHTML = `
    <div class="popup-header">
      <span>${title}</span>
      <button onclick="this.parentElement.parentElement.remove()">X</button>
    </div>
    <div class="popup-content">${contentHTML}</div>
  `;

  document.body.appendChild(win);

  // Position near icon
  const popupWidth = 400;
  const popupHeight = 500;
  let left = rect.left + rect.width / 2 - popupWidth / 2;
  let top = rect.top + rect.height + 10;
  if (left < 10) left = 10;
  if (top + popupHeight > window.innerHeight - 10) {
    top = window.innerHeight - popupHeight - 10;
  }
  win.style.left = left + "px";
  win.style.top = top + "px";

  // Draggable logic
  const header = win.querySelector(".popup-header");
  let offsetX = 0, offsetY = 0, isDragging = false;
  header.addEventListener("mousedown", function(e) {
    isDragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    win.style.transition = "none";
  });
  document.addEventListener("mousemove", function(e) {
    if (!isDragging) return;
    win.style.left = (e.clientX - offsetX) + "px";
    win.style.top = (e.clientY - offsetY) + "px";
  });
  document.addEventListener("mouseup", function() {
    isDragging = false;
    win.style.transition = "";
  });
}

// === DVD Screensaver (constant speed + purple border avoidance) ===
window.addEventListener("load", () => {
  const dvd = document.getElementById("dvd-logo");
  const container = document.querySelector(".page-container");

  if (!dvd || !container) return;

  const SPEED = 5; // constant pixels per frame
  let x = 50;
  let y = 50;
  let dx = SPEED;
  let dy = SPEED;

  function moveDVD() {
    const dvdWidth = dvd.offsetWidth;
    const dvdHeight = dvd.offsetHeight;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Bounce off viewport edges
    if (x + dx <= 0 || x + dvdWidth + dx >= viewportWidth) {
      dx = -dx;
      randomizeDirection();
    }
    if (y + dy <= 0 || y + dvdHeight + dy >= viewportHeight) {
      dy = -dy;
      randomizeDirection();
    }

    // Bounce off .page-container purple border
    const contRect = container.getBoundingClientRect();
    const dvdNext = {
      left: x + dx,
      right: x + dx + dvdWidth,
      top: y + dy,
      bottom: y + dy + dvdHeight
    };

    if (
      dvdNext.right > contRect.left &&
      dvdNext.left < contRect.right &&
      dvdNext.bottom > contRect.top &&
      dvdNext.top < contRect.bottom
    ) {
      // Only flip horizontal, keep vertical direction
      dx = -dx;
      randomizeDirection(true); // keepVertical = true
    }

    // Update position
    x += dx;
    y += dy;
    dvd.style.left = x + "px";
    dvd.style.top = y + "px";

    requestAnimationFrame(moveDVD);
  }

  // Always normalize to SPEED
  function randomizeDirection(keepVertical = false) {
    if (keepVertical) {
      dx = dx > 0 ? SPEED : -SPEED;
      return;
    }
    const angleChange = (Math.random() - 0.5) * 0.5; // ±0.25 rad (~14°)
    let angle = Math.atan2(dy, dx) + angleChange;
    dx = Math.cos(angle) * SPEED;
    dy = Math.sin(angle) * SPEED;
  }

  moveDVD();
});
