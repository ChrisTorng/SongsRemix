[English](#songsremix-english)

# [SongsRemix](https://christorng.github.io/SongsRemix/src/)

事前製作區分六軌 (人聲、鼓組、貝斯、吉它、鋼琴、其他) 之音檔及波形圖，藉由此工具可以分享給大家。大家可以機動調整各軌之音量，與 YouTube 畫面一起播放。是設計給練團前各樂手及歌手需要仔細聽自己的 樂器/聲部 來做學習，亦可配合自我練習之用。

目前有下列曲目庫:
* [範例曲目庫](https://christorng.github.io/SongsRemixDemo/) ([原始碼](https://github.com/ChrisTorng/SongsRemixDemo))
* [UP 生命力教會](https://christorng.github.io/UpLifeSongs/) ([原始碼](https://github.com/ChrisTorng/UpLifeSongs))
* [UP 生命力教會舊版](https://christorng.github.io/UpLifeSongsBackup/) ([原始碼](https://github.com/ChrisTorng/UpLifeSongsBackup/))
* [音控訓練](https://christorng.github.io/AudioLeadershipSongs/) ([原始碼](https://github.com/ChrisTorng/AudioLeadershipSongs))

歡迎任何貢獻，包括程式、畫面、自動化工具與教學文件等。而若有新曲目則建議建立自己的曲目庫，並請發 [Issue](https://github.com/ChrisTorng/SongsRemix/issues) 通知我加入上述清單。

## 自行製作曲目庫

詳細流程請見 範例曲目庫 中的 [如何自行製作曲目庫](https://github.com/ChrisTorng/SongsRemixDemo/blob/main/HowTo_zht.md)。另 [範例曲目庫](https://github.com/ChrisTorng/SongsRemixDemo) 功能會保持在最新釋出版本，其他曲目庫版本不一定有跟上最新版。

## 未來計畫

* Linux/Mac/Windows 通用之自行製作曲目庫教學
* 若不開發僅製作曲目庫，刪除安裝 Node.js 之需求
* 先製作歌曲清單，後續可自動化執行下載音檔、分軌及波形圖
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
* 動態指定分軌項目及順序 (非固定為六軌)
* 多國語系支援
* 曲目搜尋功能

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
npm install
tsc -w
```

# [SongsRemix](https://christorng.github.io/SongsRemix/src/) English

Live remix splitted song's vocal and instruments. Designed for pratices. [Live demo](https://christorng.github.io/SongsRemix/src/).


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
npm install
tsc -w
```