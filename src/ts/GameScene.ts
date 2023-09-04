import * as Phaser from "phaser";
import blue_player from "../assets/imgs/pieceBlue_border07.png";
import blue_ball from "../assets/imgs/pieceBlue_border12.png";
import red_player from "../assets/imgs/pieceRed_border06.png";
import red_ball from "../assets/imgs/pieceRed_border11.png";
import {SHARED_CONFIG} from "./index.ts";


export const calculateRect = (width: number, drawWidth: number, padding: number) => width * drawWidth + padding;

enum Images {
    RED_PLAYER = "red-player",
    BLUE_PLAYER = "blue-player",
    RED_BALL = "red-ball",
    BLUE_BALL = "blue-ball",
}


export default class GameScene extends Phaser.Scene {

    private graphics: Phaser.GameObjects.Graphics;

    constructor() {
        super("game");
        // @ts-ignore
        window.game = this;
    }

    preload() {
        this.load.image(Images.RED_PLAYER, red_player);
        this.load.image(Images.BLUE_PLAYER, blue_player);
        this.load.image(Images.RED_BALL, red_ball);
        this.load.image(Images.BLUE_BALL, blue_ball);
    }

    create() {
        this.graphics = this.add.graphics();
        this.createFootballBoard();
        this.add.image(300, 300, Images.RED_PLAYER);
        this.add.image(300, 350, Images.BLUE_BALL);
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
        // Draw checkerboard pattern
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
        // Draw penalty box
        this.graphics.lineStyle(3, 0xffffff);
        this.graphics.strokeRect(calculateRect(3, drawWidth, calculatedLeftPadding), calculateRect(1, drawWidth, calculatedTopPadding), drawWidth * 3, drawWidth)
        this.graphics.strokeRect(calculateRect(3, drawWidth, calculatedLeftPadding), calculateRect(boardHeight - 2, drawWidth, calculatedTopPadding), drawWidth * 3, drawWidth)

        // Draw middle circle
        this.graphics.strokeCircle(canvasWidth / 2, canvasHeight / 2, drawWidth * 1.5)

        // Draw border
        this.graphics.strokeRect(calculateRect(0, drawWidth, calculatedLeftPadding), calculateRect(0, drawWidth, calculatedTopPadding), drawWidth * boardWidth, drawWidth * boardHeight)
        // Draw half way line
        this.graphics.lineBetween(calculatedLeftPadding, canvasHeight / 2, canvasWidth - calculatedLeftPadding, canvasHeight / 2);

        this.graphics.lineStyle(3, 0x000000);
        // Draw net border
        this.graphics.strokeRect(calculateRect(3, drawWidth, calculatedLeftPadding), calculateRect(0, drawWidth, calculatedTopPadding), drawWidth * 3, drawWidth)
        this.graphics.strokeRect(calculateRect(3, drawWidth, calculatedLeftPadding), calculateRect(boardHeight - 1, drawWidth, calculatedTopPadding), drawWidth * 3, drawWidth)
        // Draw net
        for (let i = 3; i < 6; i++) {
            this.drawNet(drawWidth, calculateRect(i, drawWidth, calculatedLeftPadding), calculateRect(0, drawWidth, calculatedTopPadding));
            this.drawNet(drawWidth, calculateRect(i, drawWidth, calculatedLeftPadding), calculateRect(boardHeight - 1, drawWidth, calculatedTopPadding));
        }
    }

    private drawNet(size: number, startX: number, startY: number) {
        const lineWidth = 2;
        const numLines = 3; // Number of additional lines
        const lineSpacing = size / numLines;
        this.graphics.lineStyle(lineWidth, 0x000000);
        // Draw additional lines starting shifted from the top
        for (let i = 1; i <= numLines; i++) {
            // Left to right
            this.graphics.lineBetween(startX, startY + i * lineSpacing, startX + size - i * lineSpacing, startY + size);
            // Right to left
            this.graphics.lineBetween(startX + size, startY + i * lineSpacing, startX + i * lineSpacing, startY + size);
            // Lines shifted from left to right
            this.graphics.lineBetween(startX, startY + i * lineSpacing, startX + i * lineSpacing, startY);
            this.graphics.lineBetween(startX + size, startY + i * lineSpacing, startX + size - i * lineSpacing, startY);
        }
    }

    update(time: number, delta: number) {

    }

}
