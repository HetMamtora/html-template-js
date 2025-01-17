export async function getAudioDuration(audioUrl) {
    return new Promise((resolve) => {
        const audio = new Audio(audioUrl);
        audio.addEventListener('loadedmetadata', () => {
            resolve(Math.ceil(audio.duration));
        });
        audio.addEventListener('error', () => {
            console.warn(`Error loading audio: ${audioUrl}`);
            resolve(BASE_DURATION);
        });
    });
}
