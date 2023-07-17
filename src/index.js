"use strict";
const vocal = document.getElementById('vocal');
const other = document.getElementById('other');
const piano = document.getElementById('piano');
const guitar = document.getElementById('guitar');
const bass = document.getElementById('bass');
const drum = document.getElementById('drum');
const allParts = [vocal, other, piano, guitar, bass, drum];
const partVolumeTemplate = document.getElementById('part-volume-template');
main();
function main() {
    allParts.forEach(audio => audio.load());
    setPartsVolume('allParts', '全部');
    setPartsVolume('vocal', '人聲');
    setPartsVolume('other', '其他');
    setPartsVolume('piano', '鋼琴');
    setPartsVolume('guitar', '吉它');
    setPartsVolume('bass', '貝斯');
    setPartsVolume('drum', '鼓　');
    setEvents();
}
function setPartsVolume(id, title) {
    const titleHtml = `<span id="${id}">${title}</span>`;
    const radiosHtml = getVolumeRadio(id, 0) +
        getVolumeRadio(id, 25, true) +
        getVolumeRadio(id, 50) +
        getVolumeRadio(id, 75) +
        getVolumeRadio(id, 100);
    document.getElementById('parts').innerHTML +=
        `<div class="part">${titleHtml} % ${radiosHtml}</div>
`;
}
function getVolumeRadio(id, volume, selected = false) {
    return `<input type="radio" name="${id}-radio" id="${id}${volume}"
        onclick="setVolume(${id}, ${volume})" ${selected ? 'checked' : ''}
        /><label id="${id}${volume}-label" for="${id}${volume}" class="part">${volume} </label>`;
}
function setEvents() {
    document.getElementById('play').addEventListener('click', () => {
        allParts.forEach(audio => audio.play());
    });
    document.getElementById('pause').addEventListener('click', () => {
        allParts.forEach(audio => audio.pause());
    });
}
function setVolume(target, volume) {
    if (Array.isArray(target)) {
        target.forEach(audio => {
            document.getElementById(`${audio.id}${volume}`).checked = true;
            audio.volume = volume / 100;
        });
        return;
    }
    target.volume = volume / 100;
}
