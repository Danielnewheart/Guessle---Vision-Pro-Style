
![Screenshot of Guessle](https://github.com/Danielnewheart/vision-pro-guessle/assets/87961226/156fd72d-ed34-4e97-8e7b-269fbdebaa38)

[中文版](#中文介紹) | [English Version](#guessle---vision-pro-style) 
[Live Demo](https://guessle-vision-pro-style.onrender.com/) may be loaded for up to 50 seconds because of server wake-up.

# Guessle - Vision Pro Style

## Introduction
This is my Personal Project during a Web development course, aiming to learn and get familiar with Express.js by implementing a simple Wordle game. Throughout this process, not only did I wish to master backend development skills, but I also wanted to explore the various possibilities of frontend UI design. Therefore, I decided to attempt designing the UI in a style similar to Apple VisionOS and added some special features, such as background movement with mouse movement and day-night mode switching, hoping to provide users with a more immersive and interesting gaming experience.

## Features

- **Guessle Core Gameplay**: Similar to Wordle, users can guess letters to find the correct word. Each guess will display corresponding hints to help users gradually approach the answer.

- **Apple VisionOS Style UI**: To make the game interface more unique and attractive, we referred to the design style of Apple VisionOS, adopting concise and modern elements and layouts.

- **Background Movement with Mouse Movement**: To increase interactivity and fun, the game background will slightly shift according to the user's mouse movement, simulating a sense of space and dynamic effect.

- **Day-Night Mode Switching**: Users can freely switch between day and night modes, which not only provides a better visual experience but also makes the game more in line with users' habits and preferences.

### Techniques

Used Express as the backend to dynamically generate HTML and save user states through Cookies & SessionId.

### Cautions

- This game is purely a prototype and does not contain many features that a complete product should have.
- No password system: Currently, it's not possible to establish a stable and secure password storage database. Creating an insecure password management system could severely impact users. Therefore, login and registration are not available, and you may enter into someone else's game record. Please be cautious.
- Appearance preferences are stateless: This is just for demonstration purposes, and appearance preferences are not stored on the server.

---

## 中文介紹
這是我在學習 Web 開發課程中的 Personal Project，目的是透過實作一個簡單的 Wordle 遊戲來學習和熟悉 Express.js。在這個過程中，我不僅希望能夠掌握後端開發的技能，同時也想要探索前端 UI 設計的各種可能性。因此，我決定嘗試將 UI 設計成類似 Apple VisionOS 的風格，並且加入了一些特別的功能，如背景隨滑鼠移動和日夜模式切換，以期望能夠提供使用者更加沉浸和有趣的遊戲體驗。

## 功能特色

- **Geussle 遊戲核心**：類似 Wordle，使用者可以透過猜測字母來找出正確的單詞，每次猜測後會顯示相對應的提示，幫助使用者逐步接近答案。

- **Apple VisionOS 風格 UI**：為了讓遊戲界面更加獨特和吸引人，我們參考了 Apple VisionOS 的設計風格，採用了簡潔而現代的元素和布局。

- **背景隨滑鼠移動**：為了增加互動性和趣味性，遊戲背景會根據使用者滑鼠的移動而輕微偏移，模擬出一種空間感和動態效果。

- **日夜模式切換**：使用者可以自由切換日夜模式，這不僅能夠提供更好的視覺體驗，也讓遊戲更加貼近使用者的使用習慣和偏好。

### 技術

使用了 Express 作為後端，動態產生 HTML，並透過 Cookie & SessionId 保存使用者狀態。

### 注意事項

- 這個遊戲純粹為一個 prototype，並不包含許多完整產品應該有的功能
- 沒有使用密碼系統：因為目前無法建立穩定安全的密碼儲存資料庫，如果隨意建立不安全的密碼管理，對於使用者有嚴重影響。所以無法登入即註冊，因此你可能會進入到其他人正在遊玩的紀錄中，請注意
- 外觀偏好無狀態：因為只是為了展示，並沒有將外觀偏好放入伺服器中
