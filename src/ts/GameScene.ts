import * as Phaser from "phaser";
import {SHARED_CONFIG} from "./index.ts";


export const GAME_SCALE: number = 2;
export const drawWidth = 20 * GAME_SCALE;
export const halfDrawWidth = drawWidth / 2;
export const calculateRect = (width: number) => width * drawWidth;

export default class GameScene extends Phaser.Scene {

    private graphics: Phaser.GameObjects.Graphics;

    constructor() {
        super("game");
        // @ts-ignore
        window.game = this;
    }

    create() {
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(2, 0x0000ff);

        const boardWidth =  9;
        const boardHeight = 8;
        const canvasWidth = this.game.canvas.width;
        const canvasHeight = this.game.canvas.height;

        for (let i = 0; i < boardWidth; i++) {
            for (let j = 0; j < boardHeight; j++) {
                    this.graphics.strokeRect(calculateRect(i), calculateRect(j), drawWidth, drawWidth);
            }
        }
    }

    update(time: number, delta: number) {

    }

}
