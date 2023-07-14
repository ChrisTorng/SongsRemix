"use strict";
const vocal = document.getElementById('vocal');
const other = document.getElementById('other');
const piano = document.getElementById('piano');
const guitar = document.getElementById('guitar');
const bass = document.getElementById('bass');
const drum = document.getElementById('drum');
vocal.load();
other.load();
piano.load();
guitar.load();
bass.load();
drum.load();
document.getElementById('play').addEventListener('click', () => {
    vocal.play();
    other.play();
    piano.play();
    guitar.play();
    bass.play();
    drum.play();
});
document.getElementById('pause').addEventListener('click', () => {
    vocal.pause();
    other.pause();
    piano.pause();
    guitar.pause();
    bass.pause();
    drum.pause();
});
