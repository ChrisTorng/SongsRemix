"use strict";
const vocal = document.getElementById('vocal');
const other = document.getElementById('other');
const piano = document.getElementById('piano');
const guitar = document.getElementById('guitar');
const bass = document.getElementById('bass');
const drum = document.getElementById('drum');
const partVolumeTemplate = document.getElementById('part-volume-template');
main();
function main() {
    vocal.load();
    other.load();
    piano.load();
    guitar.load();
    bass.load();
    drum.load();
    setPartsVolume('vocal', 'Vocal');
    setPartsVolume('other', 'Other');
    setPartsVolume('piano', 'Piano');
    setPartsVolume('guitar', 'Guitar');
    setPartsVolume('bass', 'Bass');
    setPartsVolume('drum', 'Drum');
}
function setPartsVolume(id, title) {
    const titleHtml = `<span id="${title}">${title}</span>`;
    const radiosHtml = getVolumeRadio(id, title, 0) +
        getVolumeRadio(id, title, 30) +
        getVolumeRadio(id, title, 50) +
        getVolumeRadio(id, title, 70) +
        getVolumeRadio(id, title, 100, true);
    document.getElementById('parts').innerHTML += titleHtml + radiosHtml + '<br/>';
}
function getVolumeRadio(id, title, volume, selected = false) {
    return `<input type="radio" name="${id}-radio" id="${id}${volume}" onchange="setVolume(${id}, ${volume})"
        ${selected ? 'checked' : ''}/><label id="${id}${volume}-label" for="${id}${volume}">${volume}%</label>`;
}
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
function getVolume(part) {
    var radios = document.getElementsByName(part);
    for (const radio of radios) {
        if (radio.checked) {
            return radio.valueAsNumber;
        }
    }
    return 0;
}
function setVolume(target, volume) {
    target.volume = volume / 100;
}
