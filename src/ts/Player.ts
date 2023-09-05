import Unit from "./Unit.ts";
import * as Phaser from "phaser";
import { Images } from "./GameScene.ts";
import Vector2 = Phaser.Math.Vector2;


export default class Player extends Unit {

    constructor(scene: Phaser.Scene, pos: Vector2, teamRed: boolean) {
        super(scene, pos.x, pos.y, teamRed ? Images.RED_PLAYER : Images.BLUE_PLAYER, teamRed);
    }
}
