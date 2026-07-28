import { createCanvas, registerFont } from "canvas";
import fs from "node:fs";

let fontRegistered = false;

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.arcTo(x + width, y, x + width, y + radius, radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
  ctx.lineTo(x + radius, y + height);
  ctx.arcTo(x, y + height, x, y + height - radius, radius);
  ctx.lineTo(x, y + radius);
  ctx.arcTo(x, y, x + radius, y, radius);
  ctx.closePath();
}

export function generateCaptionImage({
  text,
  videoWidth,
  fontPath,
  outputPath,
  fontSize = 52,
  paddingX = 34,
  paddingY = 22,
  lineSpacing = 10,
  radius = 24,
  bgColor = "#FFD400",
  textColor = "#000000",
  uppercase = true,
  strokeColor = "#000000",
  strokeWidth = 4,
  shadowColor = "rgba(0,0,0,0.35)",
  shadowBlur = 12,
  shadowOffsetX = 0,
  shadowOffsetY = 6,
  letterSpacing = 1,
}) {
  if (!fontRegistered) {
    registerFont(fontPath, {
      family: "Montserrat",
      weight: "900",
    });
    fontRegistered = true;
  }

  const processedText = uppercase ? text.toUpperCase() : text;

  const measureCanvas = createCanvas(10, 10);
  const measureCtx = measureCanvas.getContext("2d");
  measureCtx.font = `900 ${fontSize}px "Montserrat"`;

  const maxTextWidth = videoWidth * 0.8;
  const words = processedText.split(" ");
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = measureCtx.measureText(testLine).width;
    if (width > maxTextWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);

  const lineHeight = fontSize * 1.15;
  const lineWidths = lines.map((l) => measureCtx.measureText(l).width);
  const longestLineWidth = Math.max(...lineWidths);

  const boxWidth = Math.round(longestLineWidth + paddingX * 2);
  const boxHeight = Math.round(
    lines.length * lineHeight + (lines.length - 1) * lineSpacing + paddingY * 2
  );

  const canvasWidth = boxWidth + shadowBlur * 2;
  const canvasHeight = boxHeight + shadowBlur * 2;

  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");

  ctx.font = `900 ${fontSize}px "Montserrat"`;
  ctx.textBaseline = "middle";

  const boxX = shadowBlur;
  const boxY = shadowBlur;

  // Sombra + fundo (caixa única)
  ctx.save();
  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = shadowBlur;
  ctx.shadowOffsetX = shadowOffsetX;
  ctx.shadowOffsetY = shadowOffsetY;
  ctx.fillStyle = bgColor;
  roundRect(ctx, boxX, boxY, boxWidth, boxHeight, radius);
  ctx.fill();
  ctx.restore();

  // Contorno
  if (strokeColor && strokeWidth > 0) {
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = strokeColor;
    roundRect(ctx, boxX, boxY, boxWidth, boxHeight, radius);
    ctx.stroke();
  }

  // Texto (todas as linhas dentro da mesma caixa)
  ctx.textAlign = "center";
  const centerX = boxX + boxWidth / 2;

  lines.forEach((line, i) => {
    const lineWidth = lineWidths[i];
    const lineY = boxY + paddingY + (lineHeight + lineSpacing) * i + lineHeight / 2;

    if (letterSpacing > 0) {
      ctx.textAlign = "left";
      let cursorX = centerX - lineWidth / 2 - ((line.length - 1) * letterSpacing) / 2;
      for (const char of line) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000";
        ctx.strokeText(char, cursorX, lineY);

        ctx.fillStyle = textColor;
        ctx.fillText(char, cursorX, lineY);
        cursorX += ctx.measureText(char).width + letterSpacing;
      }
      ctx.textAlign = "center";
    } else {
      ctx.fillStyle = textColor;
      ctx.fillText(line, centerX, lineY);
    }
  });

  fs.writeFileSync(outputPath, canvas.toBuffer("image/png"));

  return { boxWidth: canvasWidth, boxHeight: canvasHeight };
}
