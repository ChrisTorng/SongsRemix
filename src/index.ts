const vocal = document.getElementById('vocal') as HTMLAudioElement;
const other = document.getElementById('other') as HTMLAudioElement;
const piano = document.getElementById('piano') as HTMLAudioElement;
const guitar = document.getElementById('guitar') as HTMLAudioElement;
const bass = document.getElementById('bass') as HTMLAudioElement;
const drum = document.getElementById('drum') as HTMLAudioElement;
const allParts = [vocal, other, piano, guitar, bass, drum];

const HAVE_ENOUGH_DATA = 4;

main();

function main(): void {
  setEvents();

  setPartsVolume('allParts', '全部');
  setPartsVolume('vocal', '人聲');
  setPartsVolume('other', '其他');
  setPartsVolume('piano', '鋼琴');
  setPartsVolume('guitar', '吉它');
  setPartsVolume('bass', '貝斯');
  setPartsVolume('drum', '鼓　');

  setPartEnabled('allParts', true);
}

function loadSong(song: string): boolean {
  setPlayOrPauseEnabled(false);
  showLoading(true);
  allParts.forEach(audio => {
    audio.src = `./songs/${song}/${audio.id}.mp3`;
    audio.load();
    audio.volume = 0.25;
    setPartEnabled(audio.id, false);
  });
  return false;
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
  return `<input type="radio" name="${id}-radio" id="${id}${volume}" disabled="disabled"
        onclick="setVolume(${id}, ${volume})" ${selected ? 'checked' : ''}
        /><label id="${id}${volume}-label" for="${id}${volume}" class="part">${volume} </label>`;
}

function showLoading(show: boolean): void {
  document.getElementById('loading')!.style.display = show ? 'inline' : 'none';
}

function setPlayOrPauseEnabled(enabled: boolean): void {
  (document.getElementById('playOrPause')! as HTMLInputElement).disabled = !enabled;
  if (!enabled) {
    document.getElementById('playOrPause')!.innerHTML = '▶';
  }
}

function whenAllPartsReady(): boolean {
  return allParts.every(audio => audio.readyState === HAVE_ENOUGH_DATA || audio.error);
}

function whenAllPartsReadySetPlayOrPauseEnabled(): void {
  if (whenAllPartsReady()) {
    setPlayOrPauseEnabled(true);
    showLoading(false);
  }
}

function setEvents(): void {
  document.getElementById('playOrPause')!.addEventListener('click', () => {
    if (vocal.paused) {
      allParts.forEach(audio => {
        if (audio.readyState === HAVE_ENOUGH_DATA) {
          audio.play();
        }
      });
      document.getElementById('playOrPause')!.innerHTML = '&#10074;&#10074;';
    } else {
      allParts.forEach(audio => {
        audio.pause();
      });
      document.getElementById('playOrPause')!.innerHTML = '▶';
    }
  });

  allParts.forEach(audio => audio.oncanplaythrough = function () {
    console.log(audio.id, 'oncanplaythrough');
    setPartEnabled(audio.id, true);
    whenAllPartsReadySetPlayOrPauseEnabled();
  });

  allParts.forEach(audio => audio.onerror = function () {
    switch (audio.error!.code) {
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

    whenAllPartsReadySetPlayOrPauseEnabled();
  });
}

function setPartEnabled(id: string, enabled: boolean): void {
  (document.getElementById(`${id}0`)! as HTMLInputElement).disabled = !enabled;
  (document.getElementById(`${id}25`)! as HTMLInputElement).disabled = !enabled;
  (document.getElementById(`${id}50`)! as HTMLInputElement).disabled = !enabled;
  (document.getElementById(`${id}75`)! as HTMLInputElement).disabled = !enabled;
  (document.getElementById(`${id}100`)! as HTMLInputElement).disabled = !enabled;
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