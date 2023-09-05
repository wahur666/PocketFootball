import * as Phaser from "phaser";
import Unit from "./Unit.ts";
import GameController from "./GameController.ts";
import Pointer = Phaser.Input.Pointer;
import Vector2 = Phaser.Math.Vector2;
import Player from "./Player.ts";
import Ball from "./Ball.ts";


export default class PlayerController {

    units: Unit[];

    constructor(private gameController: GameController, private teamRead: boolean) {
        this.units = [];
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
            this.units.push(new Ball(this.gameController.scene, this.gridPosToWorldPos(new Vector2(4, 3)), true));
        } else {
            vectors = [new Vector2(2, 8), new Vector2(4, 8), new Vector2(6, 8), new Vector2(3, 7), new Vector2(5, 7)];
            this.units.push(new Ball(this.gameController.scene, this.gridPosToWorldPos(new Vector2(4, 6)), false));
        }
        this.units.push(...vectors.map(v => new Player(this.gameController.scene, this.gridPosToWorldPos(v), this.teamRead)));
        this.units.forEach(u => u.setScale(this.gameController.scene.drawWidth * 0.8 / u.SIZE));
        this.gameController.input.on("pointermove", (pointer: Pointer) => {
            const pos = this.mousePosToGridPos(pointer);
            if (0 <= pos.x && pos.x < this.gameController.boardWidth && 0 <= pos.y && pos.y < this.gameController.boardHeight) {
                console.log(pos);
            }
        });
    }

    update(time: number, delta: number) {
        this.units.forEach(unit => unit.update(time, delta));
    }
}
