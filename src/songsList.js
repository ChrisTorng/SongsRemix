"use strict";
function getSongsBaseUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const songsListBase = urlParams.get('songsList');
    if (songsListBase) {
        return songsListBase;
    }
    if (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1") {
        location.href = '?songsList=//localhost:3001/';
    }
    else {
        location.href = '?songsList=../../SongsRemixDemo/';
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
    setTitle(songsListJson.title, songsListJson.titleUrl);
    try {
        return generateHTML(songsListJson.groups);
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
function setTitle(title, url) {
    const h1 = document.getElementsByTagName('h1')[0];
    h1.innerHTML = `${generateUrl(title, url)} - ${h1.innerHTML}`;
    new URL(songsBaseUrl).origin;
    // 更新父視窗之標題
    window.parent.postMessage({
        type: 'SET_TITLE',
        title: title
    }, new URL(songsBaseUrl).origin);
}
function generateHTML(groups) {
    let isFirst = true;
    let html = '';
    for (const group of groups) {
        html += `<h3>
<div onclick="toggleCollapsed(this.parentNode);">
<span class="arrow ${isFirst ? 'arrow-expanded' : ''}"></span>
${group.subTitle}</div>
${group.subTitleUrl ? `<a href="${group.subTitleUrl}" target="_blank">現場</a>` : ''}
</h3>`;
        html += `<ol ${isFirst ? '' : 'class="collapsed"'}>`;
        for (const song of group.songs) {
            html += `<li><a href="#title" onclick="loadSong(this, '${song.youtubeId}')">${song.name}</a></li>`;
        }
        html += `</ol>`;
        isFirst = false;
    }
    return html;
}
function generateUrl(title, url) {
    if (!url) {
        return title;
    }
    return `<a href="${url ?? ''}" target="_blank">${title}</a>`;
}
function toggleCollapsed(target) {
    let arrow = target.firstElementChild.firstElementChild;
    arrow.classList.toggle('arrow-expanded');
    let next = target.nextElementSibling;
    next.classList.toggle('collapsed');
}
