function startMissionMusic() {
    const audio = document.getElementById('agent-audio');
    if (audio) {
        audio.play().catch(() => {
            console.log("Autoplay blockiert - Interaktion erforderlich.");
        });
    }
}
