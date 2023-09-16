import PlayerController from "./PlayerController.ts";
import GameScene from "./GameScene.ts";
import Phaser from "phaser";
import { GridElement, GridElementType } from "./GridElement.ts";


export default class GameController {

    boardWidth = 9;
    boardHeight = 10;
    redPlayer: PlayerController;
    bluePlayer: PlayerController;
    field: GridElement[][];

    constructor(public scene: GameScene) {
        this.redPlayer = new PlayerController(this, true);
        this.bluePlayer = new PlayerController(this, false);
        this.field = [];
        this.createGrid();
    }

    create() {
        this.redPlayer.create();
        this.bluePlayer.create();
    }

    get input(): Phaser.Input.InputPlugin {
        return this.scene.input;
    }

    update(time: number, delta: number) {
        this.redPlayer.update(time, delta);
        this.bluePlayer.update(time, delta);
    }

    private createGrid() {
        for (let i = 0; i < this.boardWidth; i++) {
            const row: GridElement[] = [];
            for (let j = 0; j < this.boardHeight; j++) {
                if (j === 0 || j === this.boardHeight - 1) {
                    if ([0, 1, 2, 6, 7, 8].includes(i)) {
                        // Create OutOfBound
                        row.push(new GridElement(i, j, GridElementType.OutOfBound));
                    } else {
                        row.push(new GridElement(i, j, GridElementType.Goal));
                    }
                } else {
                    row.push(new GridElement(i, j, GridElementType.Field));
                }
            }
            this.field.push(row);
        }
    }
}
