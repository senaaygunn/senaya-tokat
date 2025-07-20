let counter = 0;

function loadCounter() {
  const saved = localStorage.getItem("slapCount");
  if (saved) {
    counter = parseInt(saved);
    document.getElementById("counter").innerText = counter;
  }
}

function slap() {
  const face = document.getElementById("face");
  const counterElement = document.getElementById("counter");
  const messageElement = document.getElementById("message");
  const slapSound = document.getElementById("slapSound");
  const userName = document.getElementById("username").value || "Sen";

  face.classList.add("slap", "red");
  slapSound.currentTime = 0;
  slapSound.play();

  counter++;
  localStorage.setItem("slapCount", counter);
  counterElement.innerText = counter;

  const messages = [
    `${userName}, bana niye bunu yapıyorsun 😭`,
    `Biraz yavaş olur musun ${userName}? 😩`,
    `${userName}, sinirini benden çıkarma 😤`,
    `${userName}... bu kadarı fazla 🙃`,
    `Tokat yetmedi mi ${userName}? 😢`,
    `Of ya ${userName}, yine mi sen! 😵`
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  messageElement.innerText = randomMessage;

  // fotoğraf geçişi
  if (counter % 5 === 0) {
    face.src = "sena_crying.png";
  } else {
    face.src = "sena.png";
  }

  updateLeaderboard(userName);

  setTimeout(() => {
    face.classList.remove("slap", "red");
  }, 300);
}

function updateLeaderboard(name) {
  const data = JSON.parse(localStorage.getItem("leaderboard") || "{}");
  data[name] = (data[name] || 0) + 1;
  localStorage.setItem("leaderboard", JSON.stringify(data));
  renderLeaderboard();
}

function renderLeaderboard() {
  const data = JSON.parse(localStorage.getItem("leaderboard") || "{}");
  const leaderboard = Object.entries(data)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const container = document.getElementById("leaderboard");
  container.innerHTML = "<h3>🏆 Tokat Kraliçeleri</h3>";
  leaderboard.forEach(([name, count], i) => {
    container.innerHTML += `<p>${i + 1}. ${name} – ${count} tokat</p>`;
  });
}

window.onload = function () {
  loadCounter();
  renderLeaderboard();
};
