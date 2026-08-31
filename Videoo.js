const openButton = document.querySelector(".majito-uwu");
const closeButton = document.getElementById("closeButton");
const videoContainer = document.getElementById("videoContainer");
const majoVideo = document.getElementById("majoVideo");

majoVideo.muted = true;

openButton.addEventListener("click", () => {
    videoContainer.style.display = "flex";
    majoVideo.play();
});

closeButton.addEventListener("click", () => {
    videoContainer.style.display = "none";
    majoVideo.pause();
    majoVideo.currentTime = 0;
});