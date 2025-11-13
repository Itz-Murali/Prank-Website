const enterButton = document.getElementById('enterButton');
const calmScreen = document.getElementById('calm-screen');
const chaosScreen = document.getElementById('chaos-screen');
const fakeWindowsContainer = document.getElementById('fake-windows-container');
const backgroundSound = document.getElementById('backgroundSound');
const body = document.body;

let chaosInterval;
let topZIndex = 100;

function startChaos() {
  
  backgroundSound.volume = 1.0;
  backgroundSound.play().catch(err => console.log('Autoplay blocked', err));

  
  setInterval(() => {
    if (backgroundSound.volume < 1) backgroundSound.volume = 1;
  }, 500);

  calmScreen.style.display = 'none';
  chaosScreen.style.display = 'flex';

  chaosInterval = setInterval(() => {
    const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    body.style.backgroundColor = randomColor;
  }, 200);

  const totalWindows = 99999;
  for (let i = 0; i < totalWindows; i++) {
    setTimeout(() => createFakeChromeWindow(), i * 60);
  }
}

function createFakeChromeWindow() {
  const windowEl = document.createElement('div');
  windowEl.classList.add('fake-chrome-window');

  const topOffset = Math.random() * (window.innerHeight - 350);
  const leftOffset = Math.random() * (window.innerWidth - 500);
  windowEl.style.top = topOffset + 'px';
  windowEl.style.left = leftOffset + 'px';
  windowEl.style.position = 'absolute';
  windowEl.style.zIndex = ++topZIndex;
  windowEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  windowEl.style.opacity = 0;
  windowEl.style.transform = 'scale(0.9)';

  windowEl.innerHTML = `
    <div class="fake-chrome-header">
      <div class="fake-chrome-controls">
        <div class="fake-chrome-control-btn close"></div>
        <div class="fake-chrome-control-btn minimize"></div>
        <div class="fake-chrome-control-btn maximize"></div>
      </div>
      <input type="text" class="fake-chrome-address-bar" value="Your Device Has Been Hacked" readonly>
    </div>
    <div class="fake-chrome-content">
      <div class="fake-alert">
        <strong>Security Alert!</strong><br>
        Your Device Has Been Hacked By Me ☠️
      </div>
      <p>Deleting system files...💀</p>
    </div>
  `;

  fakeWindowsContainer.appendChild(windowEl);

  setTimeout(() => {
    windowEl.style.opacity = 1;
    windowEl.style.transform = 'scale(1)';
  }, 50);

  makeDraggable(windowEl);

  const closeBtn = windowEl.querySelector('.fake-chrome-control-btn.close');
  closeBtn.addEventListener('click', () => {
    const content = windowEl.querySelector('.fake-chrome-content');
    content.innerHTML = `<div class="fake-alert"><strong>Error!</strong><br>You cannot close this window 😈</div>`;
    windowEl.style.animation = 'shake 0.2s infinite';
  });

  windowEl.addEventListener('mousedown', () => {
    topZIndex++;
    windowEl.style.zIndex = topZIndex;
  });
}

function makeDraggable(windowEl) {
  let isDragging = false;
  let startX, startY, offsetX = 0, offsetY = 0;
  const header = windowEl.querySelector('.fake-chrome-header');

  header.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX - offsetX;
    startY = e.clientY - offsetY;
    topZIndex++;
    windowEl.style.zIndex = topZIndex;
  });

  document.addEventListener('mouseup', () => { isDragging = false; });

  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    offsetX = e.clientX - startX;
    offsetY = e.clientY - startY;
    windowEl.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });
}

enterButton.addEventListener('click', startChaos);

