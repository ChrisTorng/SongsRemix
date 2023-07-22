"use strict";
const vocal = document.getElementById('vocal');
const other = document.getElementById('other');
const piano = document.getElementById('piano');
const guitar = document.getElementById('guitar');
const bass = document.getElementById('bass');
const drum = document.getElementById('drum');
const allParts = [vocal, other, piano, guitar, bass, drum];
const songs = document.getElementById('songs');
const title = document.getElementById('title');
const video = document.getElementById('video');
const playOrPause = document.getElementById('playOrPause');
const loading = document.getElementById('loading');
const loadFailed = document.getElementById('loadFailed');
const currentTime = document.getElementById('currentTime');
const progress = document.getElementById('progress');
const duration = document.getElementById('duration');
const HAVE_ENOUGH_DATA = 4;
let player;
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
    allParts.forEach(audio => {
        audio.volume = 0.25;
    });
    setPartEnabled('allParts', true);
}
function loadSong(target, videoId, url) {
    let src = url ?? `./songs/${target.innerText}`;
    title.innerText = target.innerText;
    setPlayOrPauseEnabled(false);
    showLoadState(true, false);
    progress.value = 0;
    player.setVolume(1);
    player.cueVideoById(videoId);
    allParts.forEach(audio => {
        audio.src = `${src}/${audio.id}.mp3`;
        audio.load();
        setPartEnabled(audio.id, false);
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
function showLoadState(isLoading, isFailed) {
    loading.style.display = isLoading ? 'inline' : 'none';
    loadFailed.style.display = isFailed ? 'inline' : 'none';
    currentTime.style.display = isLoading || isFailed ? 'none' : 'inline';
    progress.style.display = isLoading || isFailed ? 'none' : 'inline';
    duration.style.display = isLoading || isFailed ? 'none' : 'inline';
}
function setPlayOrPauseEnabled(enabled) {
    playOrPause.disabled = !enabled;
    if (!enabled) {
        playOrPause.innerHTML = '▶';
    }
}
function onYouTubeIframeAPIReady() {
    console.log('onYouTubeIframeAPIReady');
    player = new YT.Player('player', {
        playerVars: {
            playsinline: 1,
            controls: 0
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    });
}
function onPlayerReady(event) {
    console.log('onPlayerReady');
    songs.style.display = 'block';
    title.innerText = '請選擇歌曲';
}
function onPlayerStateChange(event) {
    switch (event.data) {
        case YT.PlayerState.CUED:
            whenAllPartsReadySetPlay();
            break;
        case YT.PlayerState.PLAYING:
            allParts.forEach(audio => {
                if (audio.readyState === HAVE_ENOUGH_DATA) {
                    audio.play();
                }
            });
            playOrPause.innerHTML = '&#10074;&#10074;';
            break;
        case YT.PlayerState.ENDED:
            onEnded();
            break;
    }
}
function allPartsFinished() {
    return player.getPlayerState() === YT.PlayerState.CUED &&
        allParts.every(audio => audio.readyState === HAVE_ENOUGH_DATA || audio.error);
}
function vocalReady() {
    return vocal.readyState === HAVE_ENOUGH_DATA;
}
function whenAllPartsReadySetPlay() {
    if (allPartsFinished()) {
        if (!vocalReady()) {
            showLoadState(false, true);
            return;
        }
        setPlayOrPauseEnabled(true);
        showLoadState(false, false);
        showSongTotalTime();
    }
}
function showSongTotalTime() {
    const vocalTime = vocal.duration;
    const time = getTime(vocalTime);
    document.getElementById('duration').innerHTML = time;
}
function getTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    if (hours === 0) {
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
function setEvents() {
    playOrPause.addEventListener('click', () => {
        //if (vocal.paused || vocal.ended) {
        const playerState = player.getPlayerState();
        if (playerState === YT.PlayerState.UNSTARTED ||
            playerState === YT.PlayerState.CUED ||
            playerState === YT.PlayerState.PAUSED) {
            player.playVideo();
        }
        else {
            player.pauseVideo();
            allParts.forEach(audio => {
                audio.pause();
            });
            playOrPause.innerHTML = '▶';
        }
    });
    allParts.forEach(audio => audio.oncanplaythrough = function () {
        //console.log(audio.id, 'oncanplaythrough');
        setPartEnabled(audio.id, true);
        whenAllPartsReadySetPlay();
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
        whenAllPartsReadySetPlay();
    });
    vocal.onended = onEnded;
    vocal.ontimeupdate = function () {
        const time = getTime(vocal.currentTime);
        currentTime.innerHTML = time;
        if (Number.isNaN(vocal.duration)) {
            progress.value = 0;
        }
        else {
            progress.value = vocal.currentTime / vocal.duration * 100;
        }
    };
    progress.oninput = function () {
        const time = vocal.duration * progress.value / 100;
        player.seekTo(time, true);
        allParts.forEach(audio => {
            audio.currentTime = time;
        });
    };
}
function onEnded() {
    playOrPause.innerHTML = '▶';
    progress.value = 0;
    player.pauseVideo();
    player.seekTo(0, true);
    allParts.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}
;
function setPartEnabled(id, enabled) {
    document.getElementById(`${id}0`).disabled = !enabled;
    document.getElementById(`${id}25`).disabled = !enabled;
    document.getElementById(`${id}50`).disabled = !enabled;
    document.getElementById(`${id}75`).disabled = !enabled;
    document.getElementById(`${id}100`).disabled = !enabled;
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
