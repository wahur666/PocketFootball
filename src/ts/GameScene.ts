import * as Phaser from "phaser";
import blue_player from "../assets/imgs/pieceBlue_border07.png";
import blue_ball from "../assets/imgs/pieceBlue_border12.png";
import red_player from "../assets/imgs/pieceRed_border06.png";
import red_ball from "../assets/imgs/pieceRed_border11.png";
import {SHARED_CONFIG} from "./index.ts";
import GameController from "./GameController.ts";
import Pointer = Phaser.Input.Pointer;
import Vector2 = Phaser.Math.Vector2;


export const calculateRect = (width: number, drawWidth: number, padding: number) => width * drawWidth + padding;



export enum Images {
    RED_PLAYER = "red-player",
    BLUE_PLAYER = "blue-player",
    RED_BALL = "red-ball",
    BLUE_BALL = "blue-ball",
}


export default class GameScene extends Phaser.Scene {

    private graphics: Phaser.GameObjects.Graphics;
    private gameController: GameController;

    constructor() {
        super("game");
        // @ts-ignore
        window.game = this;
        this.gameController = new GameController(this);
        console.log(this.gameController.field);
    }

    preload() {
        this.load.image(Images.RED_PLAYER, red_player);
        this.load.image(Images.BLUE_PLAYER, blue_player);
        this.load.image(Images.RED_BALL, red_ball);
        this.load.image(Images.BLUE_BALL, blue_ball);
    }

    create() {
        this.graphics = this.add.graphics();
        this.gameController.create();
        this.createFootballBoard();
    }

    get canvasWidth(): number {
        return this.game.canvas.width;
    }

    get canvasHeight(): number {
        return this.game.canvas.height
    }

    get drawWidth(): number {
        return Math.min((this.canvasWidth - 10) / this.gameController.boardWidth | 0, 50)
    }

    get halfDrawWidth(): number {
        return this.drawWidth / 2 | 0;
    }

    get calculatedLeftPadding(): number {
        return (this.canvasWidth - this.drawWidth * this.gameController.boardWidth) / 2
    }

    get calculatedTopPadding(): number {
        return (this.canvasHeight - this.drawWidth * this.gameController.boardHeight) / 2
    }

    mousePosToGridPos(ev: Pointer): Vector2 {
        const pos = ev.position;
        const x = Math.floor((pos.x - this.calculatedLeftPadding) / this.drawWidth);
        const y = Math.floor((pos.y - this.calculatedTopPadding) / this.drawWidth);
        return new Vector2(x, y);
    }

    gridPosToWorldPos(pos: Vector2): Vector2 {
        const x = calculateRect(pos.x, this.drawWidth, this.calculatedLeftPadding) + this.halfDrawWidth;
        const y = calculateRect(pos.y, this.drawWidth, this.calculatedTopPadding) + this.halfDrawWidth;
        return new Vector2(x, y);
    }

    private createFootballBoard() {
        let flag = false;
        // Draw checkerboard pattern
        for (let i = 0; i < this.gameController.boardWidth; i++) {
            flag = !flag;
            for (let j = 0; j < this.gameController.boardHeight; j++) {
                flag = !flag;
                if (j === 0 && [0, 1, 2, 6, 7, 8].includes(i)) continue;
                if (j === this.gameController.boardHeight - 1 && [0, 1, 2, 6, 7, 8].includes(i)) continue;
                if (j === 0 || j === this.gameController.boardHeight - 1) {
                    this.graphics.fillStyle(0xffffff);
                } else if (flag) {
                    this.graphics.fillStyle(0x009933);
                } else {
                    this.graphics.fillStyle(0x00e64d);
                }
                this.graphics.fillRect(calculateRect(i, this.drawWidth, this.calculatedLeftPadding), calculateRect(j, this.drawWidth, this.calculatedTopPadding), this.drawWidth, this.drawWidth);
            }
        }
        // Draw penalty box
        this.graphics.lineStyle(3, 0xffffff);
        this.graphics.strokeRect(calculateRect(3, this.drawWidth, this.calculatedLeftPadding), calculateRect(1, this.drawWidth, this.calculatedTopPadding), this.drawWidth * 3, this.drawWidth)
        this.graphics.strokeRect(calculateRect(3, this.drawWidth, this.calculatedLeftPadding), calculateRect(this.gameController.boardHeight - 2, this.drawWidth, this.calculatedTopPadding), this.drawWidth * 3, this.drawWidth)

        // Draw middle circle
        this.graphics.strokeCircle(this.canvasWidth / 2, this.canvasHeight / 2, this.drawWidth * 1.5)

        // Draw border
        this.graphics.strokeRect(calculateRect(0, this.drawWidth, this.calculatedLeftPadding), calculateRect(0, this.drawWidth, this.calculatedTopPadding), this.drawWidth * this.gameController.boardWidth, this.drawWidth * this.gameController.boardHeight)
        // Draw half way line
        this.graphics.lineBetween(this.calculatedLeftPadding, this.canvasHeight / 2, this.canvasWidth - this.calculatedLeftPadding, this.canvasHeight / 2);

        this.graphics.lineStyle(3, 0x000000);
        // Draw net border
        this.graphics.strokeRect(calculateRect(3, this.drawWidth, this.calculatedLeftPadding), calculateRect(0, this.drawWidth, this.calculatedTopPadding), this.drawWidth * 3, this.drawWidth)
        this.graphics.strokeRect(calculateRect(3, this.drawWidth, this.calculatedLeftPadding), calculateRect(this.gameController.boardHeight - 1, this.drawWidth, this.calculatedTopPadding), this.drawWidth * 3, this.drawWidth)
        // Draw net
        for (let i = 3; i < 6; i++) {
            this.drawNet(this.drawWidth, calculateRect(i, this.drawWidth, this.calculatedLeftPadding), calculateRect(0, this.drawWidth, this.calculatedTopPadding));
            this.drawNet(this.drawWidth, calculateRect(i, this.drawWidth, this.calculatedLeftPadding), calculateRect(this.gameController.boardHeight - 1, this.drawWidth, this.calculatedTopPadding));
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
        this.gameController.update(time, delta);
    }

}
