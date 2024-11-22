const app = new PIXI.Application({
  width: 1000,
  height: 600,
  backgroundColor: 0xffffff,
  resizeTo: window
});
document.body.appendChild(app.view);

const background = PIXI.Sprite.from('Assets/BonusFrame.png');
const iconTexture = PIXI.Texture.from('Assets/bonusIcon.png');

app.stage.addChild(background);
background.width = app.screen.width;
background.height = app.screen.height;

let icons = [];
let winArray = [100, 200, 300, 400, 500, 600];
let usedWins = [];
let winText;

const iconSize = 100;

const iconSpacingX = (app.screen.width - 3 * iconSize) / 4;
const iconSpacingY = (app.screen.height - 2 * iconSize) / 3;

const startX = iconSpacingX;
const startY = iconSpacingY;

for (let i = 0; i < 6; i++) {
  let icon = new PIXI.Sprite(iconTexture);
  icon.x = startX + (i % 3) * (iconSize + iconSpacingX);
  icon.y = startY + Math.floor(i / 3) * (iconSize + iconSpacingY);


  icon.scale.set(1);

  icon.anchor.set(0.5);

  icon.interactive = true;
  icon.buttonMode = true;
  icon.isClicked = false;
  icon.on("pointerdown", () => onIconClick(icon));

  app.stage.addChild(icon);
  icons.push(icon);
}

function onIconClick(clickedIcon) {
  if (clickedIcon.isClicked) return;

  clickedIcon.isClicked = true;

  icons.forEach(icon => {
    if (icon !== clickedIcon) {
      if (winText != undefined) app.stage.removeChild(winText);
      icon.scale.set(1);
      icon.isClicked = false;
    }
  });

  const originalScale = clickedIcon.scale.x;
  const targetScale = originalScale * 1.1;
  const tweenDuration = 0.3;

  const startTime = Date.now();
  app.ticker.add(function animateIcon() {
    const elapsed = (Date.now() - startTime) / 1000;
    if (elapsed < tweenDuration) {
      const progress = elapsed / tweenDuration;
      clickedIcon.scale.set(originalScale + (targetScale - originalScale) * progress);
    } else {
      clickedIcon.scale.set(targetScale);
      app.ticker.remove(animateIcon);
    }
  });

  const availableWins = winArray.filter(win => !usedWins[length - 1]);

  if (availableWins.length > 0) {
    const randomWin = availableWins[Math.floor(Math.random() * availableWins.length)];
    usedWins.push(randomWin);
    // console.log(usedWins);
    displayWinMessage(randomWin, clickedIcon);
  }
}

function displayWinMessage(winValue, icon) {
  winText = new PIXI.Text(`Won: ₹${winValue}`, {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xFFFFFF,
    align: 'center',
    stroke: 0x000000,
    strokeThickness: 4
  });

  winText.anchor.set(0.5);
  winText.x = icon.x;
  winText.y = icon.y + 10;

  app.stage.addChild(winText);
}








