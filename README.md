[English](#songsremix-english)

# [SongsRemix](https://christorng.github.io/SongsRemix/src/)

顯示六軌聲部波形圖，機動調整歌曲之各分軌聲部音量，配合 YouTube 影片同步播放。為練團各樂手及歌手所設計。

線上展示有 [UP 生命力教會](https://christorng.github.io/UpLifeSongs/)、[UP 生命力教會舊版](https://christorng.github.io/UpLifeSongsBackup/) 及 [音控訓練](https://christorng.github.io/AudioLeadershipSongs/)。

曲目庫原始碼有 [UP 生命力教會](https://github.com/ChrisTorng/UpLifeSongs)、[UP 生命力教會舊版 示範](https://github.com/ChrisTorng/UpLifeSongsBackup/) 及 [音控訓練](https://github.com/ChrisTorng/AudioLeadershipSongs) 可參考。

歡迎任何貢獻，包括程式、畫面及新曲目。

## 如何自行製作曲目庫

第一次需要下載範例曲目庫、了解現有結構、上傳自己的網路空間、確認運作正常。

之後每一次加曲目的基本流程是取得原始音檔、製作分軌及波形圖、加入曲目資料、上傳網路空間。

詳細流程請見[如何自行製作曲目庫](HowTo_zht.md) (未完成)。

## 未來計畫

* 自行製作曲目庫教學
* 另開 YouTube 網站圖示
* 連結開啟曲目之譜
* 自由指定目標音檔網址
* 分軌及 YouTube 播放之同步問題改善
* 改善載入過程及完成結果顯示
* 改善音量設定 UI
* 改善分軌波形圖顯示
* 由音檔動態產出分軌波形圖
* 分軌波形圖同步顯示目前播放位置
* 可在分軌波形圖上指定跳至位置
* 記憶分軌音量設定
* 鎖定喜好分軌項目不受「全部」影響
* 動態指定分軌項目 (非固定為六軌)

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