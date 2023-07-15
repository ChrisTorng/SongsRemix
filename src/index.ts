const vocal = document.getElementById('vocal') as HTMLAudioElement;
const other = document.getElementById('other') as HTMLAudioElement;
const piano = document.getElementById('piano') as HTMLAudioElement;
const guitar = document.getElementById('guitar') as HTMLAudioElement;
const bass = document.getElementById('bass') as HTMLAudioElement;
const drum = document.getElementById('drum') as HTMLAudioElement;

const partVolumeTemplate = document.getElementById('part-volume-template') as HTMLTemplateElement;

main();

function main(): void {
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

function setPartsVolume(id: string, title: string): void {
    const titleHtml: string = `<span id="${title}">${title}</span>`;
    const radiosHtml: string = getVolumeRadio(id, title, 0) +
                               getVolumeRadio(id, title, 30) +
                               getVolumeRadio(id, title, 50) +
                               getVolumeRadio(id, title, 70) +
                               getVolumeRadio(id, title, 100, true);

    document.getElementById('parts')!.innerHTML += titleHtml + radiosHtml + '<br/>';
}

function getVolumeRadio(id: string, title: string, volume: number, selected: boolean = false): string {
    return `<input type="radio" name="${id}-radio" id="${id}${volume}" onchange="setVolume(${id}, ${volume})"
        ${selected ? 'checked' : ''}/><label id="${id}${volume}-label" for="${id}${volume}">${volume}%</label>`;
}

document.getElementById('play')!.addEventListener('click', () => {
    vocal.play();
    other.play();
    piano.play();
    guitar.play();
    bass.play();
    drum.play();
});

document.getElementById('pause')!.addEventListener('click', () => {
    vocal.pause();
    other.pause();
    piano.pause();
    guitar.pause();
    bass.pause();
    drum.pause();
});

function getVolume(part: string): number{
    var radios = document.getElementsByName(part) as NodeListOf<HTMLInputElement>;
    for (const radio of radios) {
        if (radio.checked) {
            return radio.valueAsNumber;
        }
    }

    return 0;
}

function setVolume(target: HTMLAudioElement, volume: number): void {
    target.volume = volume / 100;
}