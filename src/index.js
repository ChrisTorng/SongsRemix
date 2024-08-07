"use strict";
const original = document.getElementById('original');
const vocal = document.getElementById('vocal');
const other = document.getElementById('other');
const piano = document.getElementById('piano');
const guitar = document.getElementById('guitar');
const bass = document.getElementById('bass');
const drum = document.getElementById('drum');
const allParts = [vocal, other, piano, guitar, bass, drum];
let originalWaveform;
let vocalWaveform;
let otherWaveform;
let pianoWaveform;
let guitarWaveform;
let bassWaveform;
let drumWaveform;
let allWaveforms;
const songsListDiv = document.getElementById('songsList');
const currentSongTitle = document.getElementById('title');
const youtubeLink = document.getElementById('youtube-link');
const playerLoading = document.getElementById('player_loading');
const playOrPause = document.getElementById('playOrPause');
const loading = document.getElementById('loading');
const loadFailed = document.getElementById('loadFailed');
const mobileBeforePlayMessage = document.getElementById('mobileBeforePlayMessage');
const currentTime = document.getElementById('currentTime');
const progress = document.getElementById('progress');
const duration = document.getElementById('duration');
const HAVE_ENOUGH_DATA = 4;
const defaultVolume = 25;
const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
let mobilePlayed = false;
let songsBaseUrl;
let player;
main();
async function main() {
    const gotSongsBaseUrl = getSongsBaseUrl();
    if (!gotSongsBaseUrl) {
        return;
    }
    songsBaseUrl = gotSongsBaseUrl;
    try {
        songsListDiv.innerHTML = await loadSongsList(songsBaseUrl);
        clickFirstSong();
    }
    catch (e) {
        songsListDiv.innerText = e.toString();
        return;
    }
    setEvents();
    setPartsVolume('original', '原音', 0);
    setPartsVolume('allParts', '全部');
    setPartsVolume('vocal', '人聲');
    setPartsVolume('other', '其他');
    setPartsVolume('piano', '鋼琴');
    setPartsVolume('guitar', '吉它');
    setPartsVolume('bass', '貝斯');
    setPartsVolume('drum', '鼓組');
    setWaveform();
    allParts.forEach(audio => {
        audio.volume = defaultVolume / 100;
    });
    setPartEnabled('allParts', true);
}
function clickFirstSong() {
    console.log('clickFirstSong', player, player?.getPlayerState?.());
    if (!player || player?.getPlayerState?.() !== YT.PlayerState.CUED) {
        setTimeout(clickFirstSong, 100);
        return;
    }
    // 取得第一首歌曲以自動載入
    const firstSong = document.querySelector('ol li:first-child a');
    if (firstSong) {
        firstSong.click();
    }
    else {
        console.error('找不到第一首歌曲');
    }
}
function setWaveform() {
    originalWaveform = document.getElementById('original-waveform');
    vocalWaveform = document.getElementById('vocal-waveform');
    otherWaveform = document.getElementById('other-waveform');
    pianoWaveform = document.getElementById('piano-waveform');
    guitarWaveform = document.getElementById('guitar-waveform');
    bassWaveform = document.getElementById('bass-waveform');
    drumWaveform = document.getElementById('drum-waveform');
    allWaveforms = [originalWaveform, vocalWaveform, otherWaveform, pianoWaveform, guitarWaveform, bassWaveform, drumWaveform];
    allWaveforms.forEach(waveform => {
        waveform.onload = function () {
            waveform.style.display = 'block';
        };
        waveform.onerror = function () {
            console.log(waveform.id, 'onerror');
            waveform.style.display = 'none';
        };
    });
}
function setPartsVolume(id, title, setVolume = defaultVolume) {
    const titleHtml = `<span id="${id}-title" class="disabled">${title} %</span>`;
    const radiosHtml = getVolumeRadio(id, 0, setVolume === 0) +
        getVolumeRadio(id, 25, setVolume === 25) +
        getVolumeRadio(id, 50, setVolume === 50) +
        getVolumeRadio(id, 75, setVolume === 75) +
        getVolumeRadio(id, 100, setVolume === 100);
    const waveformHtml = `<img id="${id}-waveform" class="waveform"/>`;
    document.getElementById('parts').innerHTML +=
        `<div class="part">${titleHtml} ${radiosHtml}${waveformHtml}</div>
`;
}
function loadSong(target, videoId, url) {
    let src = url ?? `${songsBaseUrl}/${target.innerText}`;
    currentSongTitle.innerText = target.innerText;
    youtubeLink.href = `https://www.youtube.com/watch?v=${videoId}`;
    setPlayOrPauseEnabled(false);
    showLoadState(true, false);
    progress.value = 0;
    player.stopVideo();
    player.cueVideoById(videoId);
    allParts.forEach(audio => {
        audio.src = `${src}/${audio.id}.mp3`;
        audio.load();
        setPartEnabled(audio.id, false);
    });
    allWaveforms.forEach(waveform => {
        waveform.src = `${src}/${waveform.id.substring(0, waveform.id.indexOf('-'))}.png`;
        waveform.style.display = 'none';
        console.log(waveform.src);
    });
    return false;
}
function getVolumeRadio(id, volume, selected = false) {
    return `<input type="radio" name="${id}-radio" id="${id}${volume}" disabled="disabled"
onclick="setVolume(${id}, ${volume})" ${selected ? 'checked' : ''}
/><label id="${id}${volume}-label" for="${id}${volume}" class="part disabled">${volume} </label>
`;
}
function showLoadState(isLoading, isFailed) {
    playerLoading.style.display = isLoading ? 'block' : 'none';
    loading.style.display = isLoading ? 'inline' : 'none';
    loadFailed.style.display = isFailed ? 'inline' : 'none';
    mobileBeforePlayMessage.style.display =
        (!isLoading && !isFailed) && isMobile && !mobilePlayed ? 'block' : 'none';
    currentTime.style.display = isLoading || isFailed ? 'none' : 'inline';
    progress.style.display = isLoading || isFailed ? 'none' : 'inline';
    duration.style.display = isLoading || isFailed ? 'none' : 'inline';
}
function setPlayOrPauseEnabled(enabled) {
    if (isMobile && !mobilePlayed) {
        enabled = false;
    }
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
            controls: 0, // 停用預設控制面板
            //fs: 1  // 啟用全螢幕按鈕
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
            onError: (event) => {
                console.log('onError', event.data);
                showLoadState(false, true);
            },
            onPlaybackQualityChange: (event) => {
                console.log('onPlaybackQualityChange', event.data);
            },
            onPlaybackRateChange: (event) => {
                console.log('onPlaybackRateChange', event.data);
            },
            onApiChange: (event) => {
                console.log('onApiChange', event.target);
            },
        }
    });
}
function onPlayerReady(event) {
    console.log('onPlayerReady');
    player.setVolume(1);
}
function onPlayerStateChange(event) {
    switch (event.data) {
        case YT.PlayerState.UNSTARTED:
            console.log('onPlayerStateChange UNSTARTED');
            // player.setVolume(1);
            break;
        case YT.PlayerState.BUFFERING:
            console.log('onPlayerStateChange BUFFERING');
            break;
        case YT.PlayerState.CUED:
            console.log('onPlayerStateChange CUED');
            setPartEnabled('original', true);
            whenAllPartsReadySetPlay();
            break;
        case YT.PlayerState.PLAYING:
            console.log('onPlayerStateChange PLAYING');
            allParts.forEach(audio => {
                if (audio.readyState === HAVE_ENOUGH_DATA) {
                    audio.play();
                }
            });
            mobilePlayed = true;
            mobileBeforePlayMessage.style.display = 'none';
            setPlayOrPauseEnabled(true);
            playOrPause.innerHTML = '&#10074;&#10074;';
            break;
        case YT.PlayerState.PAUSED:
            console.log('onPlayerStateChange PAUSED');
            allParts.forEach(audio => {
                audio.pause();
            });
            playOrPause.innerHTML = '▶';
            syncTime(player.getCurrentTime());
            break;
        case YT.PlayerState.ENDED:
            console.log('onPlayerStateChange ENDED');
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
    // console.log('player', player.getDuration(), getTime(player.getDuration()));
    // allParts.forEach(audio => {
    //   console.log(audio.id, audio.duration, getTime(audio.duration));
    // });
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
        //traceTiming();
    };
    progress.oninput = function () {
        const time = vocal.duration * progress.value / 100;
        syncTime(time);
    };
}
function syncTime(time) {
    player.seekTo(time, true);
    allParts.forEach(audio => {
        audio.currentTime = time;
    });
}
function traceTiming() {
    const playerTime = player.getCurrentTime();
    console.log('player', playerTime, getTime(playerTime));
    allParts.forEach(audio => {
        console.log(audio.id, audio.currentTime - playerTime);
    });
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
    const title = document.getElementById(`${id}-title`);
    if (enabled) {
        title.classList.remove('disabled');
    }
    else {
        title.classList.add('disabled');
    }
    for (let volume of [0, 25, 50, 75, 100]) {
        const radio = document.getElementById(`${id}${volume}`);
        const label = document.getElementById(`${id}${volume}-label`);
        radio.disabled = !enabled;
        if (enabled) {
            label.classList.remove('disabled');
        }
        else {
            label.classList.add('disabled');
        }
    }
}
function setVolume(target, volume) {
    if (Array.isArray(target)) {
        document.getElementById(`allParts${volume}`).checked = true;
        target.forEach(audio => {
            document.getElementById(`${audio.id}${volume}`).checked = true;
            audio.volume = volume / 100;
        });
        if (volume === 0) {
            document.getElementById(`original${defaultVolume}`).checked = true;
            player.setVolume(defaultVolume);
        }
        else {
            document.getElementById(`original0`).checked = true;
            player.setVolume(1);
        }
        return;
    }
    if (target === original) {
        if (volume === 0) {
            setVolume(allParts, defaultVolume);
            document.getElementById(`original0`).checked = true;
            player.setVolume(1);
            return;
        }
        setVolume(allParts, 0);
        document.getElementById(`original${volume}`).checked = true;
        player.setVolume(volume);
        return;
    }
    document.getElementById(`original0`).checked = true;
    player.setVolume(1);
    target.volume = volume / 100;
}
