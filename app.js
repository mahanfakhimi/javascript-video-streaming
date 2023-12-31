document.addEventListener("DOMContentLoaded", () => {
  const videoPlayer = document.getElementById("videoPlayer");
  const toggleButton = document.getElementById("toggleButton");

  let stream;

  let isStreaming = false;

  const startStream = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("getUserMedia is not supported in this browser");
      }

      toggleButton.innerText = "Stop";

      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      videoPlayer.srcObject = stream;
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  const stopStream = async () => {
    try {
      toggleButton.innerText = "Start";

      if (stream) {
        const tracks = stream.getTracks();
        await Promise.all(tracks.map((track) => track.stop()));
        videoPlayer.srcObject = null;
      }
    } catch (error) {
      console.error("Error stopping the stream:", error);
    }
  };

  toggleButton.addEventListener("click", async () =>
    (isStreaming = !isStreaming) ? await startStream() : await stopStream()
  );
});
