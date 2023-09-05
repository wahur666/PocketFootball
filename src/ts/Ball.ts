import Unit from "./Unit.ts";
import * as Phaser from "phaser";
import { Images } from "./GameScene.ts";
import Vector2 = Phaser.Math.Vector2;


export default class Ball extends Unit {


    constructor(scene: Phaser.Scene, pos: Vector2, teamRed: boolean) {
        super(scene, pos.x, pos.y, teamRed ? Images.RED_BALL : Images.BLUE_BALL, teamRed);
        console.log(this.width, this.height)
    }
}
