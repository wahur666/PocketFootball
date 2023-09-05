import PlayerController from "./PlayerController.ts";
import GameScene from "./GameScene.ts";
import Phaser from "phaser";


export default class GameController {

    boardWidth = 9;
    boardHeight = 10;
    redPlayer: PlayerController;
    bluePlayer: PlayerController;

    constructor(public scene: GameScene) {
        this.redPlayer = new PlayerController(this, true);
        this.bluePlayer = new PlayerController(this, false);
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

}
