[English](#songsremix-english)

# [SongsRemix](https://christorng.github.io/SongsRemix/src/)

顯示六軌聲部波形圖，可機動調整歌曲之各分軌聲部音量，配合 YouTube 影片同步播放。為練團前各樂手及歌手需要仔細聽自己的 樂器/聲部 學習，亦可配合自己練習所設計。

目前有下列曲目庫:
* [範例曲目庫](https://christorng.github.io/SongsRemixDemo/) ([原始碼](https://github.com/ChrisTorng/SongsRemixDemo))
* [UP 生命力教會](https://christorng.github.io/UpLifeSongs/) ([原始碼](https://github.com/ChrisTorng/UpLifeSongs))
* [UP 生命力教會舊版](https://christorng.github.io/UpLifeSongsBackup/) ([原始碼](https://github.com/ChrisTorng/UpLifeSongsBackup/))
* [音控訓練](https://christorng.github.io/AudioLeadershipSongs/) ([原始碼](https://github.com/ChrisTorng/AudioLeadershipSongs))

歡迎任何貢獻，包括程式、畫面與教學文件等。而若有新曲目則建議建立自己的曲目庫，並請發 [Issue](https://github.com/ChrisTorng/SongsRemix/issues) 通知我加入上述清單。

## 自行製作曲目庫

詳細流程請見[如何自行製作曲目庫](https://github.com/ChrisTorng/SongsRemixDemo/blob/main/HowTo_zht.md)。

## 未來計畫

* 完成自行製作曲目庫教學 Windows 版
* Windows/Mac/Linux 通用之自行製作曲目庫教學
* 若不開發僅製作曲目庫，刪除 Node.js 之需求
* 另開 YouTube 網站圖示
* 連結開啟曲目之譜
* 自由指定目標音檔網址
* 分軌及 YouTube 播放之同步問題改善
* 改善載入過程及完成結果顯示
* 支援 YouTube 快速鍵
* 改善音量設定 UI
* 改善分軌波形圖顯示
* 由音檔動態產出分軌波形圖
* 分軌波形圖同步顯示目前播放位置
* 可在分軌波形圖上指定跳至位置
* 調整播放速度快慢
* 記憶分軌音量設定
* 鎖定喜好分軌項目不受「全部」切換影響
* 動態指定分軌項目 (非固定為六軌)

## 本機執行預先安裝
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