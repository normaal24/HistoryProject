let videoPlayers = document.getElementsByClassName("video");

for (let i = 0; i < videoPlayers.length; i++) {
    let playButton = document.createElement("button");
    playButton.classList.add("play-button");

    let video = videoPlayers[i].getElementsByTagName("video")[0];

    video.addEventListener("click", () => {
        if (!video.paused) {
            video.pause();
            playButton.style.display = "block";
        }
    });

    playButton.addEventListener("click", () => {
        if (video.paused) {
            video.play();
            playButton.style.display = "none";
        } else {
            video.pause();
            playButton.style.display = "block";
        }
    });

    videoPlayers[i].getElementsByTagName("div")[0].appendChild(playButton);
}
