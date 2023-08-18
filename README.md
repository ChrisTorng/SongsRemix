[English](#songsremix-english)

# [SongsRemix](https://christorng.github.io/SongsRemix/src/)

顯示六軌聲部波形圖，機動調整歌曲之各分軌聲部音量，配合 YouTube 影片同步播放。為練團各樂器及歌者所設計。

[UP 生命力教會 示範](https://christorng.github.io/UpLifeSongs/) 及 [音控訓練 示範](https://christorng.github.io/AudioLeadershipSongs/)

目前有 [UP 生命力教會](https://github.com/ChrisTorng/UpLifeSongs) 及 [音控訓練](https://github.com/ChrisTorng/AudioLeadershipSongs) 兩個曲目庫可參考。

歡迎任何貢獻，包括程式、畫面及新曲目。

## [如何自行製作曲目庫](HowTo_zht.md)

第一次需要下載範例曲目庫、了解現有結構、上傳自己的網路空間、確認運作正常。

之後每一次加曲目的基本流程是取得原始音檔、製作分軌及波形圖、加入曲目資料、上傳網路空間。

詳細流程請見[如何自行製作曲目庫](HowTo_zht.md) (未完成)。

## 預先安裝
```
npm install -g typescript http-server
```

## 執行
```
cd src
npx http-server -p 3000 -c-1
```
或在 Windows 上 `run.cmd`.

開啟 [http://localhost:3000](http://localhost:3000)

## 開發
```
cd src
tsc -w
```

# [SongsRemix](https://christorng.github.io/SongsRemix/src/) English

Live remix splitted song's vocal and instruments. Designed for pratices. [Live demo](https://christorng.github.io/SongsRemix/src/).

Currently new songs needs to be added by me. Add [Issues](https://github.com/ChrisTorng/SongsRemix/issues) to notify me.

Welcome any contribution, including coding, layout and new songs.

## Requirements
```
npm install -g typescript http-server
```

## Run
```
cd src
npx http-server -p 3000 -c-1
```
Or Windows `run.cmd`.

Open [http://localhost:3000](http://localhost:3000).

## Development
```
cd src
tsc -w
```