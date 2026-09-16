const soundBtn = document.getElementById("soundBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");

soundBtn.addEventListener("click", () => {
  const muted = soundBtn.dataset.muted === "true";
  soundBtn.dataset.muted = String(!muted);
  soundBtn.textContent = muted ? "🔊" : "🔇";
});

fullscreenBtn.addEventListener("click", async () => {
  try {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  } catch(e) {
    alert("Tarayıcınız tam ekran özelliğini desteklemiyor olabilir.");
  }
});

// Oyun kartlarını games.json dosyasından otomatik oluşturur.
// Yeni oyun eklemek için index.html'yi değiştirmek gerekmez.
async function loadGames() {
  const container = document.getElementById("gameSections");
  const errorBox = document.getElementById("gameError");

  try {
    const response = await fetch("games.json", { cache: "no-store" });
    if (!response.ok) throw new Error("games.json yüklenemedi");
    const games = await response.json();

    const categories = [
      { name: "Türkçe", id: "turkce", icon: "📖" },
      { name: "Masal ve Destanlarımız", id: "masal-destan", icon: "📜" },
      { name: "Genel Kültür", id: "genel-kultur", icon: "💡" }
    ];

    container.innerHTML = "";

    categories.forEach(category => {
      const categoryGames = games.filter(game => game.id === category.id);
      if (!categoryGames.length) return;

      const block = document.createElement("div");
      block.className = "category-block";
      block.id = category.id;

      const heading = document.createElement("h2");
      heading.textContent = `${category.icon} ${category.name}`;
      block.appendChild(heading);

      const grid = document.createElement("div");
      grid.className = "game-grid";

      categoryGames.forEach(game => {
        const card = document.createElement("a");
        card.className = "game-card";
        card.href = encodeURI(game.file);

        const picture = document.createElement("div");
        picture.className = `game-picture ${game.picture || "blue"}`;
        picture.textContent = game.icon || "🎮";

        const title = document.createElement("h3");
        title.textContent = game.title;

        const tag = document.createElement("span");
        tag.className = `tag ${game.tagClass || ""}`;
        tag.textContent = category.name;

        grid.appendChild(card);
        card.append(picture, title, tag);

        if (game.description) {
          card.title = game.description;
        }
      });

      block.appendChild(grid);
      container.appendChild(block);
    });
  } catch (error) {
    console.error(error);
    errorBox.hidden = false;
  }
}

loadGames();
