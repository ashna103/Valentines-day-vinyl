document.addEventListener("DOMContentLoaded", () => {
  const vinyl = document.getElementById("vinyl");
  const playButton = document.getElementById("play-button");
  const audio = document.getElementById("sumika-Fiction");

  // Ensure UI matches actual audio state
  function setPlayingUI(isPlaying) {
    vinyl.classList.toggle("spinning", isPlaying);
    playButton.textContent = isPlaying ? "Pause" : "Play";
    playButton.setAttribute("aria-pressed", String(isPlaying));
  }

  // Toggle play/pause on button click
  playButton.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play(); // may fail if browser blocks autoplay; click usually allows it
        setPlayingUI(true);
      } else {
        audio.pause();
        setPlayingUI(false);
      }
    } catch (err) {
      console.error("Audio play failed:", err);
      // If the mp3 isn't found or blocked, you’ll see it here.
    }
  });

  // Keep UI in sync if audio ends naturally
  audio.addEventListener("ended", () => setPlayingUI(false));
  audio.addEventListener("pause", () => setPlayingUI(false));
  audio.addEventListener("play", () => setPlayingUI(true));

  // Initial state
  setPlayingUI(false);
});
