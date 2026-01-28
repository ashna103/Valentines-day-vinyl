document.addEventListener("DOMContentLoaded", () => {
  const vinyl = document.getElementById("vinyl");
  const playButton = document.getElementById("play-button");
  const audio = document.getElementById("love-song");

  // HARD FAIL if elements aren't found
  if (!vinyl || !playButton || !audio) {
    console.error("Missing elements:", { vinyl, playButton, audio });
    alert("Something didn't load (vinyl/playButton/audio missing). Check IDs + filenames.");
    return;
  }

  function setUI(playing) {
    vinyl.classList.toggle("spinning", playing);
    playButton.textContent = playing ? "Pause" : "Play";
  }

  playButton.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        // force starting from beginning if you want:
        // audio.currentTime = 0;

        await audio.play();
        setUI(true);
      } else {
        audio.pause();
        setUI(false);
      }
    } catch (e) {
      console.error("Audio play error:", e);
      alert(
        "Audio couldn't play. Likely the MP3 path/name is wrong or the browser blocked it. Check Console + Network."
      );
    }
  });

  audio.addEventListener("ended", () => setUI(false));
  audio.addEventListener("pause", () => setUI(false));
  audio.addEventListener("play", () => setUI(true));

  setUI(false);
});
