let spriteSheet; // 儲存角色的水平精靈圖片。
let characterX; // 儲存角色目前的水平位置。
let characterY; // 儲存角色目前的垂直位置。
let characterWidth; // 儲存角色顯示寬度。
let characterHeight; // 儲存角色顯示高度。
const spriteFrameCount = 8; // 設定精靈圖包含的影格數量。
const movementSpeed = 4; // 設定角色每次繪製時的移動速度。

function preload() { // 在建立畫布前載入角色精靈圖片。
  spriteSheet = loadImage('合併/jump0015.png'); // 載入專案中的角色精靈圖。
} // 結束圖片載入函式。

function setup() { // 初始化全螢幕畫布與角色位置。
  createCanvas(windowWidth, windowHeight); // 建立符合瀏覽器視窗大小的畫布。
  imageMode(CENTER); // 將圖片繪製位置設定為影格中心點。
  characterX = width / 2; // 將角色水平位置設在畫布中央。
  characterY = height / 2; // 將角色垂直位置設在畫布中央。
  updateCharacterSize(); // 根據畫布大小計算角色顯示尺寸。
} // 結束初始化函式。

function draw() { // 每一畫格更新角色並繪製畫面。
  background('#778da9'); // 使用指定的背景色清除前一畫格。
  if (keyIsDown(LEFT_ARROW)) { // 偵測左方向鍵是否持續按下。
    characterX -= movementSpeed; // 按下左方向鍵時讓角色向左移動。
  } // 結束左方向鍵判斷。
  if (keyIsDown(RIGHT_ARROW)) { // 偵測右方向鍵是否持續按下。
    characterX += movementSpeed; // 按下右方向鍵時讓角色向右移動。
  } // 結束右方向鍵判斷。
  characterX = constrain(characterX, characterWidth / 2, width - characterWidth / 2); // 限制角色不超出畫布左右邊界。
  const frameWidth = spriteSheet.width / spriteFrameCount; // 計算精靈圖中單一影格的寬度。
  const frameIndex = floor(frameCount / 6) % spriteFrameCount; // 每六個畫格切換一次動畫影格。
  const sourceX = frameIndex * frameWidth; // 計算目前影格在精靈圖中的水平起點。
  image(spriteSheet, characterX, characterY, characterWidth, characterHeight, sourceX, 0, frameWidth, spriteSheet.height); // 繪製目前的角色動畫影格。
} // 結束每畫格更新函式。

function windowResized() { // 瀏覽器視窗尺寸改變時重新調整畫布。
  resizeCanvas(windowWidth, windowHeight); // 讓畫布持續填滿瀏覽器視窗。
  characterY = height / 2; // 視窗改變後將角色垂直位置維持在中央。
  updateCharacterSize(); // 依新的畫布大小重新計算角色尺寸。
  characterX = constrain(characterX, characterWidth / 2, width - characterWidth / 2); // 確保角色仍位於畫布左右邊界內。
} // 結束視窗尺寸更新函式。

function updateCharacterSize() { // 依精靈圖比例設定角色顯示尺寸。
  const frameWidth = spriteSheet.width / spriteFrameCount; // 計算單一角色影格的原始寬度。
  const frameHeight = spriteSheet.height; // 取得角色影格的原始高度。
  const scale = min(1, (width * 0.4) / frameWidth, (height * 0.55) / frameHeight); // 確保角色在不同尺寸畫布中都能完整顯示。
  characterWidth = frameWidth * scale; // 依縮放比例設定角色顯示寬度。
  characterHeight = frameHeight * scale; // 依縮放比例設定角色顯示高度。
} // 結束角色尺寸計算函式。
