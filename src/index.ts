const vocal = document.getElementById('vocal') as HTMLAudioElement;
const other = document.getElementById('other') as HTMLAudioElement;
const piano = document.getElementById('piano') as HTMLAudioElement;
const guitar = document.getElementById('guitar') as HTMLAudioElement;
const bass = document.getElementById('bass') as HTMLAudioElement;
const drum = document.getElementById('drum') as HTMLAudioElement;
const allParts = [vocal, other, piano, guitar, bass, drum];

const playOrPause = document.getElementById('playOrPause') as HTMLButtonElement;
const loading = document.getElementById('loading') as HTMLSpanElement;
const currentTime = document.getElementById('currentTime') as HTMLSpanElement;
const progress = document.getElementById('progress') as HTMLProgressElement;
const duration = document.getElementById('duration') as HTMLSpanElement;

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

  allParts.forEach(audio => {
    audio.volume = 0.25;
  });

  setPartEnabled('allParts', true);
}

function loadSong(song: string): boolean {
  setPlayOrPauseEnabled(false);
  showLoading(true);
  progress.value = 0;

  allParts.forEach(audio => {
    audio.src = `./songs/${song}/${audio.id}.mp3`;
    audio.load();
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
  loading.style.display = show ? 'inline' : 'none';
  currentTime.style.display = show ? 'none' : 'inline';
  progress.style.display = show ? 'none' : 'inline';
  duration.style.display = show ? 'none' : 'inline';
}

function setPlayOrPauseEnabled(enabled: boolean): void {
  playOrPause.disabled = !enabled;
  if (!enabled) {
    playOrPause.innerHTML = '▶';
  }
}

function whenAllPartsReady(): boolean {
  return allParts.every(audio => audio.readyState === HAVE_ENOUGH_DATA || audio.error);
}

function whenAllPartsReadySetPlay(): void {
  if (whenAllPartsReady()) {
    setPlayOrPauseEnabled(true);
    showLoading(false);
    showSongTotalTime();
  }
}

function showSongTotalTime(): void {
  const vocalTime = vocal.duration;
  const time = getTime(vocalTime);
  document.getElementById('duration')!.innerHTML = time;
}

function getTime(time: number): string {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  if (hours === 0) {
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;    
  }
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function setEvents(): void {
  playOrPause.addEventListener('click', () => {
    if (vocal.paused || vocal.ended) {
      allParts.forEach(audio => {
        if (audio.readyState === HAVE_ENOUGH_DATA) {
          audio.play();
        }
      });
      playOrPause.innerHTML = '&#10074;&#10074;';
    } else {
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

    whenAllPartsReadySetPlay();
  });

  vocal.onended = function () {
    playOrPause.innerHTML = '▶';
    vocal.currentTime = 0;
    progress.value = 0;
  };

  vocal.ontimeupdate = function () {
    const time = getTime(vocal.currentTime);
    currentTime.innerHTML = time;

    if (Number.isNaN(vocal.duration)) {
      progress.value = 0;
    } else {
      progress.value = vocal.currentTime / vocal.duration * 100;
    }
  };

  progress.oninput = function () {
    const time = vocal.duration * progress.value / 100;
    allParts.forEach(audio => {
      audio.currentTime = time;
    });
  };
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