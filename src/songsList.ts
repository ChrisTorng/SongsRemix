type Song = {
  name: string;
  youtubeId: string;
}

type Group = {
  subTitle: string;
  subTitleUrl: string;
  songs: Song[];
}

type SongsList = {
  title: string;
  titleUrl: string;
  groups: Group[];
}

function getSongsBaseUrl(): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  const songsListBase = urlParams.get('songsList');
  if (songsListBase) {
    return songsListBase;
  }

  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    location.href = '?songsList=//localhost:30012';
  } else {
    location.href = '?songsList=../../UpLifeSongs';
  }
  return null;
}

async function loadSongsList(songsBaseUrl: string): Promise<string> {
  let songsListJson: SongsList;
  try {
    songsListJson = await fetchSongsList(songsBaseUrl + '/songsList.json');
  } catch (e) {
    throw `載入曲目清單失敗: ${e}`;
  }

  try {
    return generateHTML(songsListJson);
  } catch (e) {
    throw`讀取曲目清單失敗: ${e}`;
  }
}

async function fetchSongsList(url: string): Promise<SongsList> {
  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json() as SongsList;
}

function generateHTML(songsList: SongsList): string {
  let isFirst = true;
  let html = `<h2>${generateUrl(songsList.title, songsList.titleUrl)}</h2>`;
  for (const group of songsList.groups) {
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

function generateUrl(title: string, url?: string): string {
  if (!url) {
    return title;
  }
  return `<a href="${url ?? ''}" target="_blank">${title}</a>`
}

function toggleCollapsed(target: HTMLHeadingElement): void {
  let arrow = target.firstElementChild!.firstElementChild! as HTMLElement;
  arrow.classList.toggle('arrow-expanded');
  let next = target.nextElementSibling!;
  next.classList.toggle('collapsed');
}