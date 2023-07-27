type Song = {
    name: string;
    youtubeId: string;
}

type Group = {
    subTitle: string;
    songs: Song[];
}

type SongsList = {
    title: string;
    groups: Group[];
}

export async function fetchSongsList(url: string): Promise<SongsList> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json() as SongsList;
}

export function generateHTML(songsList: SongsList): string {
    let html = `<h2>${songsList.title}</h2>`;
    for (const group of songsList.groups) {
        html += `<h3>${group.subTitle}</h3><ol>`;
        for (const song of group.songs) {
            html += `<li><a href="#" onclick="loadSong(this, '${song.youtubeId}')">${song.name}</a></li>`;
        }
        html += `</ol>`;
    }
    return html;
}