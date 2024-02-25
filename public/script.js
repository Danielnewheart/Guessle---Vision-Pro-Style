const background = document.getElementById('background');
const toggleButton = document.getElementById('toggleBackground');

const prefersDarkScheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

if (prefersDarkScheme) {
  background.classList.add("night");
}

toggleButton.addEventListener('click', () => {
  background.classList.toggle('night');
});

// 初始化最大移動範圍
let maxX = 0;
let maxY = 0;

// 計算最大移動範圍的函數
function calculateMaxMovement() {
  const excessWidth = window.innerWidth * 0.3; // 背景比視窗寬 10%
  const excessHeight = window.innerHeight * 0.3; // 背景比視窗高 10%
  maxX = excessWidth / 2;
  maxY = excessHeight / 2;
}

document.addEventListener('mousemove', (event) => {
  calculateMaxMovement();
  
  const { clientX, clientY } = event;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  // 計算滑鼠位置與中心的差值
  let moveX = (clientX - centerX) * 0.5;
  let moveY = (clientY - centerY) * 0.5;

  moveX = Math.max(-maxX, Math.min(maxX, moveX));
  moveY = Math.max(-maxY, Math.min(maxY, moveY));

  const background = document.getElementById('background');
  background.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
});

window.addEventListener('resize', calculateMaxMovement);

calculateMaxMovement();
