import * as Phaser from "phaser";
import {SHARED_CONFIG} from "./index.ts";


export const calculateRect = (width: number, drawWidth: number, padding: number) => width * drawWidth + padding;

export default class GameScene extends Phaser.Scene {

    private graphics: Phaser.GameObjects.Graphics;

    constructor() {
        super("game");
        // @ts-ignore
        window.game = this;
    }

    create() {
        this.graphics = this.add.graphics();
        this.createFootballBoard();
    }

    private createFootballBoard() {
        const boardWidth = 9;
        const boardHeight = 10;
        const canvasWidth = this.game.canvas.width;
        const canvasHeight = this.game.canvas.height;

        let drawWidth = Math.min((canvasWidth - 10) / boardWidth | 0, 50);

        let calculatedLeftPadding = (canvasWidth - drawWidth * boardWidth) / 2;
        let calculatedTopPadding = (canvasHeight - drawWidth * boardHeight) / 2;
        let flag = false;
        for (let i = 0; i < boardWidth; i++) {
            flag = !flag;
            for (let j = 0; j < boardHeight; j++) {
                flag = !flag;
                if (j === 0 && [0, 1, 2, 6, 7, 8].includes(i)) continue;
                if (j === boardHeight - 1 && [0, 1, 2, 6, 7, 8].includes(i)) continue;
                if (j === 0 || j === boardHeight - 1) {
                    this.graphics.fillStyle(0xffffff);
                } else if (flag) {
                    this.graphics.fillStyle(0x009933);
                } else {
                    this.graphics.fillStyle(0x00e64d);
                }
                this.graphics.fillRect(calculateRect(i, drawWidth, calculatedLeftPadding), calculateRect(j, drawWidth, calculatedTopPadding), drawWidth, drawWidth);
            }
        }
        this.graphics.lineStyle(3, 0xffffff);
        this.graphics.strokeRect(calculateRect(3, drawWidth, calculatedLeftPadding), calculateRect(1, drawWidth, calculatedTopPadding), drawWidth * 3, drawWidth)
        this.graphics.strokeRect(calculateRect(3, drawWidth, calculatedLeftPadding), calculateRect(boardHeight - 2, drawWidth, calculatedTopPadding), drawWidth * 3, drawWidth)

        this.graphics.strokeCircle(canvasWidth / 2, canvasHeight / 2, drawWidth * 1.5)

        this.graphics.strokeRect(calculateRect(0, drawWidth, calculatedLeftPadding), calculateRect(0, drawWidth, calculatedTopPadding), drawWidth * boardWidth, drawWidth * boardHeight)
        this.graphics.lineBetween(calculatedLeftPadding, canvasHeight / 2, canvasWidth - calculatedLeftPadding, canvasHeight / 2);

        this.graphics.lineStyle(3, 0x000000);
        this.graphics.strokeRect(calculateRect(3, drawWidth, calculatedLeftPadding), calculateRect(0, drawWidth, calculatedTopPadding), drawWidth * 3, drawWidth)
        this.graphics.strokeRect(calculateRect(3, drawWidth, calculatedLeftPadding), calculateRect(boardHeight - 1, drawWidth, calculatedTopPadding), drawWidth * 3, drawWidth)
        for (let i = 3; i < 6; i++) {
            this.drawNet(drawWidth, calculateRect(i, drawWidth, calculatedLeftPadding), calculateRect(0, drawWidth, calculatedTopPadding));
            this.drawNet(drawWidth, calculateRect(i, drawWidth, calculatedLeftPadding), calculateRect(boardHeight - 1, drawWidth, calculatedTopPadding));
        }
    }

    private drawNet(drawWidth: number, posX: number, posY: number) {
        const size = drawWidth;
        const lineWidth = 2;
        const numLines = 5; // Number of additional lines
        const lineSpacing = size / numLines;

        // Define the top-left corner (x, y) where the diagonal lines should start
        const startX = posX;
        const startY = posY;

        // Draw diagonal lines from left to right
        this.graphics.lineStyle(lineWidth, 0x000000);
        this.graphics.beginPath();
        this.graphics.moveTo(startX, startY);
        this.graphics.lineTo(startX + size, startY + size);
        this.graphics.strokePath();

        // Draw diagonal lines from right to left
        this.graphics.beginPath();
        this.graphics.moveTo(startX + size, startY);
        this.graphics.lineTo(startX, startY + size);
        this.graphics.strokePath();

        // Draw additional lines starting shifted from the top
        for (let i = 1; i <= numLines; i++) {
            // Left to right
            this.graphics.beginPath();
            this.graphics.moveTo(startX, startY + i * lineSpacing);
            this.graphics.lineTo(startX + size - i * lineSpacing, startY + size);
            this.graphics.strokePath();

            // Right to left
            this.graphics.beginPath();
            this.graphics.moveTo(startX + size, startY + i * lineSpacing);
            this.graphics.lineTo(startX + i * lineSpacing, startY + size);
            this.graphics.strokePath();

            // Lines shifted from left to right
            this.graphics.beginPath();
            this.graphics.moveTo(startX, startY + i * lineSpacing);
            this.graphics.lineTo(startX + i * lineSpacing, startY);
            this.graphics.strokePath();

            this.graphics.beginPath();
            this.graphics.moveTo(startX + size, startY + i * lineSpacing);
            this.graphics.lineTo(startX + size - i * lineSpacing, startY);
            this.graphics.strokePath();
        }
    }

    update(time: number, delta: number) {

    }

}
