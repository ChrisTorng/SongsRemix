const vocal = document.getElementById('vocal') as HTMLAudioElement;
const other = document.getElementById('other') as HTMLAudioElement;
const piano = document.getElementById('piano') as HTMLAudioElement;
const guitar = document.getElementById('guitar') as HTMLAudioElement;
const bass = document.getElementById('bass') as HTMLAudioElement;
const drum = document.getElementById('drum') as HTMLAudioElement;

vocal.load();
other.load();
piano.load();
guitar.load();
bass.load();
drum.load();

document.getElementById('play')!.addEventListener('click', () => {
    vocal.play();
    other.play();
    piano.play();
    guitar.play();
    bass.play();
    drum.play();
});

document.getElementById('pause')!.addEventListener('click', () => {
    vocal.pause();
    other.pause();
    piano.pause();
    guitar.pause();
    bass.pause();
    drum.pause();
});