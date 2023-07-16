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

    setPartsVolume('allParts', 'All');
    setPartsVolume('vocal', 'Vocal');
    setPartsVolume('other', 'Other');
    setPartsVolume('piano', 'Piano');
    setPartsVolume('guitar', 'Guitar');
    setPartsVolume('bass', 'Bass');
    setPartsVolume('drum', 'Drum');

    setEvents();
}

function setPartsVolume(id: string, title: string): void {
    const titleHtml: string = `<span class="title" id="${id}">${title}</span>`;
    const radiosHtml: string = getVolumeRadio(id, 0) +
                               getVolumeRadio(id, 25) +
                               getVolumeRadio(id, 50) +
                               getVolumeRadio(id, 75) +
                               getVolumeRadio(id, 100, true);

    document.getElementById('parts')!.innerHTML += titleHtml + radiosHtml + '<br/>';
}

function getVolumeRadio(id: string, volume: number, selected: boolean = false): string {
    return `<input type="radio" name="${id}-radio" id="${id}${volume}"
        onchange="setVolume(${id}, ${volume})" ${selected ? 'checked' : ''}
        /><label id="${id}${volume}-label" for="${id}${volume}">${volume}%</label>`;
}

function setEvents(): void {
    document.getElementById('play')!.addEventListener('click', () => {
        allParts.forEach(audio => audio.play());
    });

    document.getElementById('pause')!.addEventListener('click', () => {
        allParts.forEach(audio => audio.pause());
    });
}

function getVolume(part: string): number{
    var radios = document.getElementsByName(part) as NodeListOf<HTMLInputElement>;
    for (const radio of radios) {
        if (radio.checked) {
            return radio.valueAsNumber;
        }
    }

    return 0;
}

function setVolume(target: HTMLAudioElement | HTMLAudioElement[], volume: number): void {
    if (Array.isArray(target)) {
        target.forEach(audio => {
            (document.getElementById(`${audio.id}${volume}`)! as HTMLInputElement).checked = true;
        });
        return;
    }
    target.volume = volume / 100;
}