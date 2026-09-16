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
