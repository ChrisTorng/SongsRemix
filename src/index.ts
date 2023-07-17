const vocal = document.getElementById('vocal') as HTMLAudioElement;
const other = document.getElementById('other') as HTMLAudioElement;
const piano = document.getElementById('piano') as HTMLAudioElement;
const guitar = document.getElementById('guitar') as HTMLAudioElement;
const bass = document.getElementById('bass') as HTMLAudioElement;
const drum = document.getElementById('drum') as HTMLAudioElement;
const allParts = [vocal, other, piano, guitar, bass, drum];

const partVolumeTemplate = document.getElementById('part-volume-template') as HTMLTemplateElement;

main();

function main(): void {
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

function setPartsVolume(id: string, title: string): void {
    const titleHtml: string = `<span id="${id}">${title}</span>`;
    const radiosHtml: string = getVolumeRadio(id, 0) +
                               getVolumeRadio(id, 25, true) +
                               getVolumeRadio(id, 50) +
                               getVolumeRadio(id, 75) +
                               getVolumeRadio(id, 100);

    document.getElementById('parts')!.innerHTML +=
        `<div class="part">${titleHtml} % ${radiosHtml}</div>
`;
}

function getVolumeRadio(id: string, volume: number, selected: boolean = false): string {
    return `<input type="radio" name="${id}-radio" id="${id}${volume}"
        onclick="setVolume(${id}, ${volume})" ${selected ? 'checked' : ''}
        /><label id="${id}${volume}-label" for="${id}${volume}" class="part">${volume} </label>`;
}

function setEvents(): void {
    document.getElementById('play')!.addEventListener('click', () => {
        allParts.forEach(audio => audio.play());
    });

    document.getElementById('pause')!.addEventListener('click', () => {
        allParts.forEach(audio => audio.pause());
    });
}

function setVolume(target: HTMLAudioElement | HTMLAudioElement[], volume: number): void {
    if (Array.isArray(target)) {
        target.forEach(audio => {
            (document.getElementById(`${audio.id}${volume}`)! as HTMLInputElement).checked = true;
            audio.volume = volume / 100;
        });
        return;
    }
    target.volume = volume / 100;
}