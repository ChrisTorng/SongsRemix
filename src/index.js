"use strict";
const vocal = document.getElementById('vocal');
const other = document.getElementById('other');
const piano = document.getElementById('piano');
const guitar = document.getElementById('guitar');
const bass = document.getElementById('bass');
const drum = document.getElementById('drum');
const allParts = [vocal, other, piano, guitar, bass, drum];
const HAVE_ENOUGH_DATA = 4;
main();
function main() {
    setEvents();
    setPartsVolume('allParts', '全部');
    setPartsVolume('vocal', '人聲');
    setPartsVolume('other', '其他');
    setPartsVolume('piano', '鋼琴');
    setPartsVolume('guitar', '吉它');
    setPartsVolume('bass', '貝斯');
    setPartsVolume('drum', '鼓　');
}
function loadSong(song) {
    allParts.forEach(audio => {
        audio.src = `./songs/${song}/${audio.id}.mp3`;
        audio.load();
        audio.volume = 0.25;
    });
    return false;
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
    return `<input type="radio" name="${id}-radio" id="${id}${volume}" disabled="disabled"
        onclick="setVolume(${id}, ${volume})" ${selected ? 'checked' : ''}
        /><label id="${id}${volume}-label" for="${id}${volume}" class="part">${volume} </label>`;
}
function setEvents() {
    document.getElementById('playOrPause').addEventListener('click', () => {
        if (allParts[0].paused) {
            allParts.forEach(audio => {
                if (audio.readyState === HAVE_ENOUGH_DATA) {
                    audio.play();
                }
            });
            document.getElementById('playOrPause').innerHTML = '║ ';
        }
        else {
            allParts.forEach(audio => {
                if (audio.readyState === HAVE_ENOUGH_DATA) {
                    audio.pause();
                }
            });
            document.getElementById('playOrPause').innerHTML = '▶';
        }
    });
    allParts.forEach(audio => audio.oncanplaythrough = function () {
        console.log(audio.id, 'oncanplaythrough');
        document.getElementById(`${audio.id}0`).disabled = false;
        document.getElementById(`${audio.id}25`).disabled = false;
        document.getElementById(`${audio.id}50`).disabled = false;
        document.getElementById(`${audio.id}75`).disabled = false;
        document.getElementById(`${audio.id}100`).disabled = false;
        document.getElementById(`allParts0`).disabled = false;
        document.getElementById(`allParts25`).disabled = false;
        document.getElementById(`allParts50`).disabled = false;
        document.getElementById(`allParts75`).disabled = false;
        document.getElementById(`allParts100`).disabled = false;
    });
    allParts.forEach(audio => audio.onerror = function () {
        switch (audio.error.code) {
            case 1:
                console.log(audio.id, 'MEDIA_ERR_ABORTED');
                break;
            case 2:
                console.log(audio.id, 'MEDIA_ERR_NETWORK');
                break;
            case 3:
                console.log(audio.id, 'MEDIA_ERR_DECODE');
                break;
            case 4:
                console.log(audio.id, 'MEDIA_ERR_SRC_NOT_SUPPORTED');
                break;
            default:
                console.log(audio.id, 'UNKNOWN_ERROR');
                break;
        }
        document.getElementById(`${audio.id}0`).disabled = true;
        document.getElementById(`${audio.id}25`).disabled = true;
        document.getElementById(`${audio.id}50`).disabled = true;
        document.getElementById(`${audio.id}75`).disabled = true;
        document.getElementById(`${audio.id}100`).disabled = true;
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
