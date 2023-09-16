import * as Phaser from "phaser";
import Unit from "./Unit.ts";
import GameController from "./GameController.ts";
import Pointer = Phaser.Input.Pointer;
import Vector2 = Phaser.Math.Vector2;
import Player from "./Player.ts";
import Ball from "./Ball.ts";


export default class PlayerController {

    units: Unit[];
    selectedUnit: Unit | null;

    constructor(private gameController: GameController, private teamRead: boolean) {
        this.units = [];
        this.selectedUnit = null;
    }

    mousePosToGridPos(ev: Pointer): Vector2 {
        return this.gameController.scene.mousePosToGridPos(ev);
    }

    gridPosToWorldPos(pos: Vector2): Vector2 {
        return this.gameController.scene.gridPosToWorldPos(pos);
    }

    create() {
        let vectors: Vector2[];
        if (this.teamRead) {
            vectors = [new Vector2(2, 1), new Vector2(4, 1), new Vector2(6, 1), new Vector2(3, 2), new Vector2(5, 2)];
            const ballPos = new Vector2(4, 3);
            const ball = new Ball(this.gameController.scene, this.gridPosToWorldPos(ballPos), true);
            this.units.push(ball);
            this.gameController.field[ballPos.x][ballPos.y].unit = ball;
        } else {
            vectors = [new Vector2(2, 8), new Vector2(4, 8), new Vector2(6, 8), new Vector2(3, 7), new Vector2(5, 7)];
            const ballPos = new Vector2(4, 6);
            const ball = new Ball(this.gameController.scene, this.gridPosToWorldPos(ballPos), false);
            this.units.push(ball);
            this.gameController.field[ballPos.x][ballPos.y].unit = ball;
        }
        this.units.push(...vectors.map(v => {
            const player = new Player(this.gameController.scene, this.gridPosToWorldPos(v), this.teamRead);
            this.gameController.field[v.x][v.y].unit = player;
            return player;
        }));
        this.units.forEach(u => u.setScale(this.gameController.scene.drawWidth * 0.8 / u.SIZE));
        this.gameController.input.on("pointerup", (pointer: Pointer) => {
            const pos = this.mousePosToGridPos(pointer);
            console.log(pos);
            if (0 <= pos.x && pos.x < this.gameController.boardWidth && 0 <= pos.y && pos.y < this.gameController.boardHeight) {
                const gridElement = this.gameController.field[pos.x][pos.y];
                console.log(gridElement);
                if (gridElement.unit) {
                    if (this.selectedUnit && this.selectedUnit === gridElement.unit) {
                        if (this.selectedUnit) {
                            this.selectedUnit.selected = false;
                            this.selectedUnit = null;
                        }
                    } else {
                        gridElement.unit.selected = true;
                        if (this.selectedUnit) {
                            this.selectedUnit.selected = false;
                        }
                        this.selectedUnit = gridElement.unit;
                    }
                } else if (this.selectedUnit) {
                    this.selectedUnit.selected = false;
                    this.selectedUnit = null;
                }
            }
        });
    }

    update(time: number, delta: number) {
        this.units.forEach(unit => unit.update(time, delta));
    }
}
