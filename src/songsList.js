"use strict";
function getSongsBaseUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const songsListBase = urlParams.get('songsList');
    if (songsListBase) {
        return songsListBase;
    }
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        location.href = '?songsList=//localhost:30012';
    }
    else {
        location.href = '?songsList=../../UpLifeSongs';
    }
    return null;
}
async function loadSongsList(songsBaseUrl) {
    let songsListJson;
    try {
        songsListJson = await fetchSongsList(songsBaseUrl + '/songsList.json');
    }
    catch (e) {
        throw `載入曲目清單失敗: ${e}`;
    }
    try {
        return generateHTML(songsListJson);
    }
    catch (e) {
        throw `讀取曲目清單失敗: ${e}`;
    }
}
async function fetchSongsList(url) {
    const response = await fetch(url, {
        method: 'GET',
        cache: 'no-store',
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}
function generateHTML(songsList) {
    let html = `<h2>${songsList.title}</h2>`;
    for (const group of songsList.groups) {
        html += `<h3>${group.subTitle}</h3><ol>`;
        for (const song of group.songs) {
            html += `<li><a href="#title" onclick="loadSong(this, '${song.youtubeId}')">${song.name}</a></li>`;
        }
        html += `</ol>`;
    }
    return html;
}
